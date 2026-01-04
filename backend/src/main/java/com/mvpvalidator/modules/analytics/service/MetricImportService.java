package com.mvpvalidator.modules.analytics.service;

import com.mvpvalidator.core.TenantContext;
import com.mvpvalidator.modules.analytics.domain.Metric;
import com.mvpvalidator.modules.analytics.repository.MetricRepository;
import com.mvpvalidator.modules.project.repository.ProjectRepository;
import com.opencsv.CSVReader;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStreamReader;
import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class MetricImportService {

    private final MetricRepository metricRepository;
    private final ProjectRepository projectRepository;

    @Transactional
    public void importMetrics(UUID projectId, MultipartFile file) {
        var project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        // Security check: ensure project belongs to current tenant?
        // Tenant Filter already sets context, we should filter query by tenant in repo
        // or check here.
        // For MVP, relying on standard repo methods but adding a check is safer.
        if (!project.getTenantId().equals(TenantContext.getTenantId())) {
            throw new RuntimeException("Access Denied");
        }

        try (CSVReader reader = new CSVReader(new InputStreamReader(file.getInputStream()))) {
            List<String[]> rows = reader.readAll();
            // Assuming header row exists, skipping it if needed or simple no-header
            // Logic: Key, Timestamp, Value, Dimensions(JSON)

            List<Metric> metrics = new ArrayList<>();
            for (String[] row : rows) {
                // Basic validation
                if (row.length < 3)
                    continue;
                if (row[0].equalsIgnoreCase("key"))
                    continue; // Skip header

                Metric metric = Metric.builder()
                        .tenantId(TenantContext.getTenantId())
                        .project(project)
                        .key(row[0])
                        .timestamp(OffsetDateTime.parse(row[1])) // ISO Format
                        .value(new BigDecimal(row[2]))
                        .dimensionsJson(row.length > 3 ? row[3] : null)
                        .build();
                metrics.add(metric);
            }
            metricRepository.saveAll(metrics);

        } catch (Exception e) {
            throw new RuntimeException("Failed to parse CSV file: " + e.getMessage());
        }
    }
}

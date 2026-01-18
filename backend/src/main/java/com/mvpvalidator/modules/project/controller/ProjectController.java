package com.mvpvalidator.modules.project.controller;

import com.mvpvalidator.core.TenantContext;
import com.mvpvalidator.modules.analytics.service.MetricImportService;
import com.mvpvalidator.modules.project.domain.Project;
import com.mvpvalidator.modules.project.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectRepository projectRepository;
    private final MetricImportService metricImportService;
    private final com.mvpvalidator.modules.validation.repository.HypothesisRepository hypothesisRepository;

    @GetMapping
    public List<Project> getProjects() {
        return projectRepository.findByTenantId(TenantContext.getTenantId());
    }

    @PostMapping
    public Project createProject(@RequestBody Project project) {
        project.setTenantId(TenantContext.getTenantId());
        // project.setCreatedAt(OffsetDateTime.now()); handled by DB or listener?
        // JPA doesn't auto-set without listener/annotation usually if field is null,
        // reliant on DB default.
        return projectRepository.save(project);
    }

    @PostMapping("/{id}/metrics/import")
    public ResponseEntity<Void> importMetrics(
            @PathVariable UUID id,
            @RequestParam("file") MultipartFile file) {
        metricImportService.importMetrics(id, file);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}/dashboard")
    public ResponseEntity<DashboardDto> getDashboard(@PathVariable UUID id) {
        long totalHypotheses = hypothesisRepository.countByProjectId(id);
        long validatedHypotheses = hypothesisRepository.countByProjectIdAndStatus(id,
                com.mvpvalidator.modules.validation.domain.HypothesisStatus.VALIDATED);

        DashboardDto dto = new DashboardDto();
        dto.setProjectId(id);
        dto.setHypothesisCount((int) totalHypotheses);
        dto.setValidatedHypothesisCount((int) validatedHypotheses);

        // Simple readiness score calculation (mock logic replaced with slightly better
        // logic)
        // If total > 0, score = (validated / total) * 100
        int score = totalHypotheses > 0 ? (int) ((validatedHypotheses * 100) / totalHypotheses) : 0;
        dto.setValidationReadinessScore(score);

        return ResponseEntity.ok(dto);
    }

    @lombok.Data
    static class DashboardDto {
        private UUID projectId;
        private int hypothesisCount;
        private int validatedHypothesisCount;
        private int validationReadinessScore;
    }
}

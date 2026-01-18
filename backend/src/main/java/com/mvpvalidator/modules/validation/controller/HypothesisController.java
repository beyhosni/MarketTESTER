package com.mvpvalidator.modules.validation.controller;

import com.mvpvalidator.core.TenantContext;
import com.mvpvalidator.modules.validation.domain.Hypothesis;
import com.mvpvalidator.modules.validation.domain.HypothesisStatus;
import com.mvpvalidator.modules.validation.repository.HypothesisRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/hypotheses")
@RequiredArgsConstructor
public class HypothesisController {

    private final HypothesisRepository hypothesisRepository;

    @GetMapping
    public List<Hypothesis> getByProject(@RequestParam UUID projectId) {
        // In real app, check project belongs to tenant
        return hypothesisRepository.findByProjectId(projectId); // Should filter by tenant too ideally
    }

    @PostMapping
    public Hypothesis create(@RequestBody Hypothesis hypothesis) {
        hypothesis.setTenantId(TenantContext.getTenantId());
        return hypothesisRepository.save(hypothesis);
    }

    @PatchMapping("/{id}/status")
    public Hypothesis updateStatus(@PathVariable UUID id, @RequestBody HypothesisStatus status) {
        return hypothesisRepository.findById(id)
                .map(h -> {
                    h.setStatus(status);
                    return hypothesisRepository.save(h);
                })
                .orElseThrow(() -> new RuntimeException("Hypothesis not found"));
    }
}

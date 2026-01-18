package com.mvpvalidator.modules.validation.controller;

import com.mvpvalidator.modules.validation.domain.Experiment;
import com.mvpvalidator.modules.validation.domain.Evidence;
import com.mvpvalidator.modules.validation.repository.ExperimentRepository;
import com.mvpvalidator.modules.validation.repository.EvidenceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/experiments")
@RequiredArgsConstructor
public class ExperimentController {

    private final ExperimentRepository experimentRepository;
    private final EvidenceRepository evidenceRepository;

    @GetMapping
    public List<Experiment> getAllExperiments() {
        return experimentRepository.findAll();
    }

    // In real app we would filter by Project ID
    // @GetMapping("/project/{projectId}") ...

    @PostMapping
    public Experiment createExperiment(@RequestBody Experiment experiment) {
        // experiment.setStatus(ExperimentStatus.PLANNED); // Default
        return experimentRepository.save(experiment);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Experiment> getExperiment(@PathVariable UUID id) {
        return experimentRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{id}/evidence")
    public Evidence addEvidence(@PathVariable UUID id, @RequestBody Evidence evidence) {
        return experimentRepository.findById(id)
                .map(experiment -> {
                    evidence.setExperiment(experiment);
                    evidence.setTenantId(com.mvpvalidator.core.TenantContext.getTenantId());
                    return evidenceRepository.save(evidence);
                })
                .orElseThrow(() -> new RuntimeException("Experiment not found"));
    }
}

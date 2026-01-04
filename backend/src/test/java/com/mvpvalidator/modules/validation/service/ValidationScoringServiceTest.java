package com.mvpvalidator.modules.validation.service;

import com.mvpvalidator.modules.validation.domain.*;
import org.junit.jupiter.api.Test;

import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class ValidationScoringServiceTest {

    private final ValidationScoringService service = new ValidationScoringService();

    @Test
    void shouldCalculateScore_UseBaseStatus() {
        Hypothesis h = Hypothesis.builder()
                .status(HypothesisStatus.VALIDATED)
                .build();

        var result = service.calculateHypothesisScore(h);

        assertEquals(50, result.getScore());
        assertTrue(result.getExplanation().contains("Validated"));
    }

    @Test
    void shouldCalculateScore_WithEvidence() {
        Evidence ev = Evidence.builder()
                .confidenceScore(80) // Impact = 8
                .build();

        Experiment exp = Experiment.builder()
                .status(ExperimentStatus.DONE)
                .evidence(List.of(ev))
                .build();

        Hypothesis h = Hypothesis.builder()
                .status(HypothesisStatus.TESTED) // +20
                .experiments(List.of(exp)) // +10 (Done)
                .build();

        // Total expected: 20 (Tested) + 10 (Exp Done) + 8 (Evidence) = 38
        var result = service.calculateHypothesisScore(h);

        assertEquals(38, result.getScore());
    }

    @Test
    void shouldCapScoreAt100() {
        // Create a scenario that exceeds 100 conceptually
        Hypothesis h = Hypothesis.builder()
                .status(HypothesisStatus.VALIDATED) // 50
                .experiments(Collections.nCopies(6,
                        Experiment.builder().status(ExperimentStatus.DONE).build())) // 6 * 10 = 60
                .build();

        // 50 + 60 = 110 -> Cap 100
        var result = service.calculateHypothesisScore(h);

        assertEquals(100, result.getScore());
    }
}

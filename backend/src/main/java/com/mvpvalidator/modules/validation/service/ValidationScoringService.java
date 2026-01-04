package com.mvpvalidator.modules.validation.service;

import com.mvpvalidator.modules.validation.domain.*;
import lombok.Builder;
import lombok.Data;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ValidationScoringService {

    public HypothesisScore calculateHypothesisScore(Hypothesis hypothesis) {
        int score = 0;
        StringBuilder explanation = new StringBuilder();

        // 1. Base Score for Status
        if (hypothesis.getStatus() == HypothesisStatus.VALIDATED) {
            score += 50;
            explanation.append("Base score: +50 (Validated). ");
        } else if (hypothesis.getStatus() == HypothesisStatus.TESTED) {
            score += 20;
            explanation.append("Base score: +20 (Tested). ");
        }

        // 2. Evidence Impact
        List<Experiment> experiments = hypothesis.getExperiments();
        if (experiments != null) {
            for (Experiment exp : experiments) {
                if (exp.getStatus() == ExperimentStatus.DONE) {
                    score += 10;
                    explanation.append("Experiment done (+10). ");

                    if (exp.getEvidence() != null) {
                        for (Evidence ev : exp.getEvidence()) {
                            if (ev.getConfidenceScore() != null) {
                                int impact = ev.getConfidenceScore() / 10;
                                score += impact;
                                explanation.append("Evidence confidence impact (+" + impact + "). ");
                            }
                        }
                    }
                }
            }
        }

        // Cap at 100
        if (score > 100)
            score = 100;

        return HypothesisScore.builder()
                .score(score)
                .explanation(explanation.toString())
                .build();
    }

    @Data
    @Builder
    public static class HypothesisScore {
        private int score;
        private String explanation;
    }
}

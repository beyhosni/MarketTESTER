package com.mvpvalidator.modules.validation.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.OffsetDateTime;
import java.util.UUID;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "experiments")
public class Experiment {
    @Id
    @GeneratedValue
    private UUID id;

    @Column(name = "tenant_id", nullable = false)
    private UUID tenantId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hypothesis_id", nullable = false)
    private Hypothesis hypothesis;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ExperimentMethod method;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ExperimentStatus status;

    @Column(name = "success_criteria_json")
    private String successCriteriaJson;

    @Column(name = "created_at", insertable = false, updatable = false)
    private OffsetDateTime createdAt;

    @OneToMany(mappedBy = "experiment")
    private List<Evidence> evidence;
}

enum ExperimentMethod {
    INTERVIEW, SURVEY, LANDING_PAGE, ADS, PROTOTYPE
}

enum ExperimentStatus {
    PLANNED, IN_PROGRESS, DONE
}

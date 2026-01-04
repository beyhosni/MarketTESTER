package com.mvpvalidator.modules.validation.domain;

import com.mvpvalidator.modules.project.domain.Project;
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
@Table(name = "hypotheses")
public class Hypothesis {
    @Id
    @GeneratedValue
    private UUID id;

    @Column(name = "tenant_id", nullable = false)
    private UUID tenantId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;

    @Column(nullable = false)
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private HypothesisType type;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private HypothesisStatus status;

    @Column(name = "created_at", insertable = false, updatable = false)
    private OffsetDateTime createdAt;

    // Relations can be added here or strictly handled via Repositories.
    // For scoring efficient fetch, might be good to have them.
    @OneToMany(mappedBy = "hypothesis")
    private List<Experiment> experiments;

    @OneToMany(mappedBy = "hypothesis")
    private List<Decision> decisions;
}

enum HypothesisType {
    DESIRABILITY, VIABILITY, FEASIBILITY, USABILITY
}

enum HypothesisStatus {
    DRAFT, TESTED, VALIDATED, INVALIDATED
}

package com.mvpvalidator.modules.validation.repository;

import com.mvpvalidator.modules.validation.domain.*;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;

public interface HypothesisRepository extends JpaRepository<Hypothesis, UUID> {
    List<Hypothesis> findByProjectId(UUID projectId);
}

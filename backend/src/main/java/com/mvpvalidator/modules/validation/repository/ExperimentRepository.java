package com.mvpvalidator.modules.validation.repository;

import com.mvpvalidator.modules.validation.domain.Experiment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface ExperimentRepository extends JpaRepository<Experiment, UUID> {
}

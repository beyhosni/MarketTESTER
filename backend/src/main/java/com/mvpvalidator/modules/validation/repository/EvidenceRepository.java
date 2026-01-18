package com.mvpvalidator.modules.validation.repository;

import com.mvpvalidator.modules.validation.domain.Evidence;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface EvidenceRepository extends JpaRepository<Evidence, UUID> {
}

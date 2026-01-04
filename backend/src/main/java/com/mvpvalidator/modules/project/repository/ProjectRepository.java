package com.mvpvalidator.modules.project.repository;

import com.mvpvalidator.modules.project.domain.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;

public interface ProjectRepository extends JpaRepository<Project, UUID> {
    List<Project> findByTenantId(UUID tenantId);
}

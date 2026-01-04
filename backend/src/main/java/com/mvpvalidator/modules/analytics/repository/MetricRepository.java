package com.mvpvalidator.modules.analytics.repository;

import com.mvpvalidator.modules.analytics.domain.Metric;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface MetricRepository extends JpaRepository<Metric, UUID> {
}

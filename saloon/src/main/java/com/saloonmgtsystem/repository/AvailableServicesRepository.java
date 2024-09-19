package com.saloonmgtsystem.repository;

import com.saloonmgtsystem.models.AvailableServices;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AvailableServicesRepository extends JpaRepository<AvailableServices, Long> {
}

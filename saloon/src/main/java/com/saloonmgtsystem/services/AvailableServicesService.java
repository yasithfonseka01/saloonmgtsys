package com.saloonmgtsystem.services;

import com.saloonmgtsystem.models.AvailableServices;
import com.saloonmgtsystem.repository.AvailableServicesRepository;
import com.saloonmgtsystem.repository.AppointmentRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AvailableServicesService {
    @Autowired
    private AvailableServicesRepository availableServicesRepository;
    private AppointmentRepository appointmentRepository;

    public AvailableServices saveAvailableServices(AvailableServices availableServices) {
        return availableServicesRepository.save(availableServices);
    }

    public List<AvailableServices> getAllAvailableServices() {
        return availableServicesRepository.findAll();
    }

    public long getTotalServicesCount() {
        return availableServicesRepository.count(); // Calls the count method
    }

    public void deleteAvailableServices(Long id) {
        availableServicesRepository.deleteById(id);
    }


}

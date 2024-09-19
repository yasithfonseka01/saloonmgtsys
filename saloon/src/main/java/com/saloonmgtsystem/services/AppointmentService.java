package com.saloonmgtsystem.services;

import com.saloonmgtsystem.models.Appointment;
import com.saloonmgtsystem.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    public Appointment saveAppointment(Appointment appointment) {
        return appointmentRepository.save(appointment);
    }

    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    public Appointment getAppointmentById(Long id) {
        return appointmentRepository.findById(id).orElse(null);
    }

    public void deleteAppointment(Long id) {
        appointmentRepository.deleteById(id);
    }

    public long getTotalAppointmentCount() {
        return appointmentRepository.count();
    }

    public interface AppointmentServicesRepository extends JpaRepository<Appointment, Long> {
        void deleteByServiceId(Long serviceId);
    }

}

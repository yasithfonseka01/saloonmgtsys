package com.saloonmgtsystem.controller;

import com.saloonmgtsystem.models.Appointment;
import com.saloonmgtsystem.services.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @CrossOrigin
    @PostMapping("/save")
    public Appointment saveAppointment(@RequestBody Appointment appointment) {
        return appointmentService.saveAppointment(appointment);
    }

    @CrossOrigin
    @GetMapping("/all")
    public List<Appointment> getAllAppointments() {
        return appointmentService.getAllAppointments();
    }

    @CrossOrigin
    @GetMapping("/{id}")
    public Appointment getAppointmentById(@PathVariable Long id) {
        return appointmentService.getAppointmentById(id);
    }

    @CrossOrigin
    @DeleteMapping("/delete/{id}")
    public void deleteAppointment(@PathVariable Long id) {
        appointmentService.deleteAppointment(id);
    }

    @CrossOrigin
    @GetMapping("/count")
    public Map<String, Long> getTotalAppointmentCount() {
        long totalCount = appointmentService.getTotalAppointmentCount();

        // Create a map with "count" as the key
        Map<String, Long> response = new HashMap<>();
        response.put("count", totalCount);

        // Return the map, which will be automatically serialized to JSON
        return response;
    }
}

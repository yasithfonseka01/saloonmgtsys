package com.saloonmgtsystem.controller;

import com.saloonmgtsystem.models.AvailableServices;
import com.saloonmgtsystem.services.AvailableServicesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("/api/services")
public class AvailableServicesController {

    @Autowired
    private AvailableServicesService availableServicesService;

    // Save a new service
    @PostMapping("/save")
    public ResponseEntity<AvailableServices> saveAvailableServices(@RequestBody AvailableServices availableServices) {
        AvailableServices savedService = availableServicesService.saveAvailableServices(availableServices);
        return new ResponseEntity<>(savedService, HttpStatus.CREATED);
    }

    // Get all available services
    @GetMapping("/all")
    public ResponseEntity<List<AvailableServices>> getAllAvailableServices() {
        List<AvailableServices> services = availableServicesService.getAllAvailableServices();
        return ResponseEntity.ok().body(services);
    }

    @GetMapping("/count")
    public ResponseEntity<Map<String, Long>> getTotalServicesCount() {
        long count = availableServicesService.getTotalServicesCount();
        Map<String, Long> response = new HashMap<>();
        response.put("count", count); // Return the count as JSON with the key "count"
        return ResponseEntity.ok(response);
    }

    // Delete a service by ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Map<String, String>> deleteAvailableServices(@PathVariable Long id) {
        try {
            availableServicesService.deleteAvailableServices(id);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Service deleted successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "Failed to delete service: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }
}

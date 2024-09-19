package com.saloonmgtsystem.controller;

import com.saloonmgtsystem.models.Employee;
import com.saloonmgtsystem.services.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/employees")

public class EmployeeController {
    @Autowired
    private EmployeeService employeeService;

    // Create a new employee
    @PostMapping("/save")
    public Employee createEmployee(@RequestBody Employee employee) {
        return employeeService.saveEmployee(employee);
    }

    // Retrieve all employees
    @GetMapping("/all")
    public List<Employee> getAllEmployees() {
        return employeeService.getAllEmployees();
    }
}

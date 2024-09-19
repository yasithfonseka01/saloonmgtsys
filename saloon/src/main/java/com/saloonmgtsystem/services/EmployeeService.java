package com.saloonmgtsystem.services;

import com.saloonmgtsystem.models.Employee;
import com.saloonmgtsystem.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService {
    @Autowired
    private EmployeeRepository employeeRepository;

    // Save employee to database
    public Employee saveEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    // Retrieve all employees
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }
}

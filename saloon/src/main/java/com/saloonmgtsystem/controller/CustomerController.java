package com.saloonmgtsystem.controller;

import com.saloonmgtsystem.models.Customer;
import com.saloonmgtsystem.models.Employee;
import com.saloonmgtsystem.services.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/customers")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @PostMapping("/save")
    public Customer saveCustomer(@RequestBody Customer customer) {
        // Logic to save customer details
        return customerService.saveCustomer(customer);
    }

    @GetMapping("/all")
    public List<Customer> getAllCustomers() {
        return customerService.getAllCustomers();
    }

    @GetMapping("/count")
    public ResponseEntity<Object> getTotalCustomerCount() {
        long count = customerService.getTotalCustomerCount();
        return ResponseEntity.ok().body("{\"count\": " + count + "}");
    }
}

package com.saloonmgtsystem.services;

import com.saloonmgtsystem.models.Customer;
import com.saloonmgtsystem.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    public Customer saveCustomer(Customer customer) {
        return customerRepository.save(customer);
    }

    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    public long getTotalCustomerCount() {
        return customerRepository.count();
    }
}

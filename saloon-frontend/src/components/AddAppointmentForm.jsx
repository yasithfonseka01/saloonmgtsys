import React, { useState, useEffect } from 'react';
import '../styles/modal.css'; // Import CSS for the modal

const AddAppointmentForm = ({ isOpen, onClose, onSubmit }) => {
  const [customers, setCustomers] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/customers/all');
        const data = await response.json();
        setCustomers(data);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };

    const fetchServices = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/services/all');
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchCustomers();
    fetchServices();
  }, []);

  if (!isOpen) return null; // Don't render modal if it's not open

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    onSubmit(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>X</button>
        <h2>Add Appointment</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Customer:
            <select name="customerId" required>
              <option value="">Select Customer</option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>{customer.name}</option>
              ))}
            </select>
          </label>
          <label>
            Service:
            <select name="serviceId" required>
              <option value="">Select Service</option>
              {services.map((service) => (
                <option key={service.serviceId} value={service.serviceId}>{service.serviceName}</option>
              ))}
            </select>
          </label>
          <label>
            Appointment Date:
            <input type="date" name="appointmentDate" required />
          </label>
          <label>
            Time Slot:
            <input type="text" name="timeSlot" required />
          </label>
          <label>
            Status:
            <select name="status" required>
              <option value="">Select Status</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </label>
          <button type="submit">Add</button>
        </form>
      </div>
    </div>
  );
};

export default AddAppointmentForm;

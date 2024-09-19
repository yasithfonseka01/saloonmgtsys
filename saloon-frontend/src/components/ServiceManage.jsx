import React, { useState, useEffect } from 'react';
import AddServiceForm from './AddServiceForm.jsx'; // Ensure this is the correct path
import '../styles/crudManage.css'; // Your CSS for CustomerManage

const ServiceManage = () => {
  const [services, setServices] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/services/all');
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleAddService = async (formData) => {
    const payload = {
      serviceName: formData.get('serviceName'),
      description: formData.get('description'),
      price: parseFloat(formData.get('price')),
      duration: parseInt(formData.get('duration'), 10),
    };

    try {
      const response = await fetch('http://localhost:8080/api/services/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (result) {
        setServices([...services, result]);
        closeModal();
      }
    } catch (error) {
      console.error('Error adding service:', error);
    }
  };

  return (
    <div className='service-list'>
      <h1>Service List</h1>
      <button onClick={openModal} className='add-service-button'>Add Service</button>
      <table>
        <thead>
          <tr>
            <th>Service Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Duration (mins)</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service.serviceId}>
              <td>{service.serviceName}</td>
              <td>{service.description}</td>
              <td>Rs.{service.price.toFixed(2)}</td>
              <td>{service.duration}</td>
              <td>
                {/* Add actions like Edit/Delete here if needed */}
                <button className="delete-btn" onClick={() => handleDelete(service.serviceId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <AddServiceForm
          isOpen={isModalOpen}
          onClose={closeModal}
          onSubmit={handleAddService}
        />
      )}
    </div>
  );
};

export default ServiceManage;

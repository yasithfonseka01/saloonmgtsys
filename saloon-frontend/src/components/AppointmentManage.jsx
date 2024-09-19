import React, { useState, useEffect } from 'react';
import AddAppointmentForm from './AddAppointmentForm'; // Ensure this path is correct
import '../styles/appointmentManage.css'; // Your CSS for AppointmentManage

const AppointmentManage = () => {
  const [appointments, setAppointments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/appointments/all');
        const data = await response.json();
        setAppointments(data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleAddAppointment = async (formData) => {
    const payload = {
      customer: { id: parseInt(formData.get('customerId'), 10) },
      service: { serviceId: parseInt(formData.get('serviceId'), 10) },
      appointmentDate: formData.get('appointmentDate'),
      timeSlot: formData.get('timeSlot'),
      status: formData.get('status'),
    };

    try {
      const response = await fetch('http://localhost:8080/api/appointments/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (result) {
        setAppointments([...appointments, result]);
        closeModal();
      }
    } catch (error) {
      console.error('Error adding appointment:', error);
    }
  };

  const handleDelete = async (appointmentId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/appointments/delete/${appointmentId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setAppointments(appointments.filter((appointment) => appointment.appointmentId !== appointmentId));
      } else {
        console.error('Failed to delete the appointment');
      }
    } catch (error) {
      console.error('Error deleting appointment:', error);
    }
  };

  return (
    <div className='appointment-list'>
      <h1>Appointment List</h1>
      <button onClick={openModal} className='add-appointment-button'>Add Appointment</button>
      <table>
        <thead>
          <tr>
            <th>Customer</th>
            <th>Service</th>
            <th>Date</th>
            <th>Time Slot</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.appointmentId}>
              <td>{appointment.customer.name}</td>
              <td>{appointment.service.serviceName}</td>
              <td>{appointment.appointmentDate}</td>
              <td>{appointment.timeSlot}</td>
              <td>{appointment.status}</td>
              <td>
                <button className="delete-btn" onClick={() => handleDelete(appointment.appointmentId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <AddAppointmentForm
          isOpen={isModalOpen}
          onClose={closeModal}
          onSubmit={handleAddAppointment}
        />
      )}
    </div>
  );
};

export default AppointmentManage;

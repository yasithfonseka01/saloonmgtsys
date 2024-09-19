import React, { useState, useEffect } from 'react';
import AddCustomerForm from './AddCustomerForm'; // Create this form component
import '../styles/crudManage.css'; // Your CSS for CustomerManage

const CustomerManage = () => {
  const [customerData, setCustomerData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/customers/all', {
          method: 'GET',
        });
        const data = await response.json();
        if (Array.isArray(data)) {
          setCustomerData(data);
        } else {
          console.error('Invalid response data:', data);
        }
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    };

    fetchCustomerData();

    // Optionally, set up an interval to fetch the customer data every 10 seconds
    // const intervalId = setInterval(fetchCustomerData, 10000);
    // return () => clearInterval(intervalId); // Cleanup interval when component unmounts
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = async (formData) => {
    const name = formData.get('name');
    const phoneNumber = formData.get('phoneNumber');
    const email = formData.get('email');
    const registeredDate = formData.get('registeredDate');
    
    const payload = {
      name,
      phoneNumber,
      email,
      registeredDate,
    };

    try {
      const response = await fetch('http://localhost:8080/api/customers/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (result) {
        // Assuming the API returns the saved customer data with an id
        setCustomerData([result, ...customerData]);
        closeModal();
      }
    } catch (error) {
      console.error('Error adding new customer:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/customers/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setCustomerData(customerData.filter((item) => item.id !== id));
      }
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  // Implement handleUpdate function if needed

  return (
    <div className='customer-list'>
      <h1>Customer List</h1>
      <button onClick={openModal} className='add-customer-button'>Add Customer</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Registered Date</th>
            <th>Action</th> {/* New Action Column */}
          </tr>
        </thead>
        <tbody>
          {customerData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.phoneNumber}</td>
              <td>{item.email}</td>
              <td>{new Date(item.registeredDate).toLocaleDateString()}</td>
              <td>
                {/* <button className="update-btn" onClick={() => handleUpdate(item.id)}>Update</button> */}
                <button className="delete-btn" onClick={() => handleDelete(item.id)}>Delete</button>
              </td> {/* New buttons for each customer */}
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <AddCustomerForm
          isOpen={isModalOpen}
          onClose={closeModal}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default CustomerManage;

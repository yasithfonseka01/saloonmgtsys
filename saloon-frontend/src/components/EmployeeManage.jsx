import React, { useState, useEffect } from 'react';
import AddEmployeeForm from './AddEmployeeForm'; // Create this form component
import '../styles/crudManage.css'; // Your CSS for CustomerManage


const EmployeeManage = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/employees/all', {
          method: 'GET',
        });
        const data = await response.json();
        if (Array.isArray(data)) {
          setEmployeeData(data);
        } else {
          console.error('Invalid response data:', data);
        }
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    fetchEmployeeData();

    // Optionally, set up an interval to fetch the employee data every 10 seconds
    // const intervalId = setInterval(fetchEmployeeData, 10000);
    // return () => clearInterval(intervalId); // Cleanup interval when component unmounts
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = async (formData) => {
    const name = formData.get('name');
    const role = formData.get('role');
    const phoneNumber = formData.get('phoneNumber');
    const hiredDate = formData.get('hiredDate');
    
    const payload = {
      name,
      role,
      phoneNumber: phoneNumber || null,
      hiredDate,
    };

    try {
      const response = await fetch('http://localhost:8080/api/employees/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (result) {
        // Assuming the API returns the saved employee data with an id
        setEmployeeData([result, ...employeeData]);
        closeModal();
      }
    } catch (error) {
      console.error('Error adding new employee:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/employees/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setEmployeeData(employeeData.filter((item) => item.id !== id));
      }
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  // Implement handleUpdate function if needed

  return (
    <div className='employee-list'>
      <h1>Employee List</h1>
      <button onClick={openModal} className='add-employee-button'>Add Employee</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Role</th>
            <th>Phone Number</th>
            <th>Hired Date</th>
            <th>Action</th> {/* New Action Column */}
          </tr>
        </thead>
        <tbody>
          {employeeData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.role}</td>
              <td>{item.phoneNumber || 'N/A'}</td>
              <td>{new Date(item.hiredDate).toLocaleDateString()}</td>
              <td>
                {/* <button className="update-btn" onClick={() => handleUpdate(item.id)}>Update</button> */}
                <button className="delete-btn" onClick={() => handleDelete(item.id)}>Delete</button>
              </td> {/* New buttons for each employee */}
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <AddEmployeeForm
          isOpen={isModalOpen}
          onClose={closeModal}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default EmployeeManage;

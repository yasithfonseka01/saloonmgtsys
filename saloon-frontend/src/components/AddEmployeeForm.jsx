import React, { useState } from 'react';
import "../styles/addPostForm.css";

const AddEmployeeForm = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    phoneNumber: '',
    hiredDate: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', formData.name);
    form.append('role', formData.role);
    form.append('phoneNumber', formData.phoneNumber);
    form.append('hiredDate', formData.hiredDate);
    onSubmit(form);
  };

  if (!isOpen) return null;

  return (
    <div className='modal-overlay'>
      <div className='modal-content'>
        <h2>Add Employee</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type='text' name='name' value={formData.name} onChange={handleChange} required />
          </label>
          <label>
            Role:
            <input type='text' name='role' value={formData.role} onChange={handleChange} required />
          </label>
          <label>
            Phone Number:
            <input type='text' name='phoneNumber' value={formData.phoneNumber} onChange={handleChange} />
          </label>
          <label>
            Hired Date:
            <input type='date' name='hiredDate' value={formData.hiredDate} onChange={handleChange} required />
          </label>
          <button type='submit'>Save</button>
          <button type='button' onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default AddEmployeeForm;

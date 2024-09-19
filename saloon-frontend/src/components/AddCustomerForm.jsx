import React, { useState } from 'react';
import "../styles/addPostForm.css";

const AddCustomerForm = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    registeredDate: '',
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
    form.append('phoneNumber', formData.phoneNumber);
    form.append('email', formData.email);
    form.append('registeredDate', formData.registeredDate);
    onSubmit(form);
  };

  if (!isOpen) return null;

  return (
    <div className='modal-overlay'>
      <div className='modal-content'>
        <h2>Add Customer</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type='text' name='name' value={formData.name} onChange={handleChange} required />
          </label>
          <label>
            Phone Number:
            <input type='text' name='phoneNumber' value={formData.phoneNumber} onChange={handleChange} required />
          </label>
          <label>
            Email:
            <input type='email' name='email' value={formData.email} onChange={handleChange} required />
          </label>
          <label>
            Registered Date:
            <input type='date' name='registeredDate' value={formData.registeredDate} onChange={handleChange} required />
          </label>
          <button type='submit'>Save</button>
          <button type='button' onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default AddCustomerForm;

import React from 'react';
import "../styles/addPostForm.css";

const AddServiceForm = ({ isOpen, onClose, onSubmit }) => {
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
        <h2>Add Service</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Service Name:
            <input type="text" name="serviceName" required />
          </label>
          <label>
            Description:
            <input type="text" name="description" required />
          </label>
          <label>
            Price:
            <input type="number" name="price" step="0.01" required />
          </label>
          <label>
            Duration (mins):
            <input type="number" name="duration" required />
          </label>
          <button type="submit">Add</button>
        </form>
      </div>
    </div>
  );
};

export default AddServiceForm;

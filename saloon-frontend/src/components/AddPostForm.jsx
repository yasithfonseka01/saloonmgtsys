import React from 'react';
import '../styles/addPostForm.css'; // Add your CSS for the modal here

const AddPostForm = ({ isOpen, onClose, onSubmit }) => {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    onSubmit(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>X</button>
        <h2>Add New Post</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Message:
            <textarea name="message" required />
          </label>
          <label>
            Link (optional):
            <input type="text" name="link" />
          </label>
          <label>
            Published:
            <select name="published" required>
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </label>
          <label>
            Scheduled Publish Time (Unix Timestamp):
            <input type="number" name="scheduled_publish_time" placeholder="Unix timestamp" />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddPostForm;

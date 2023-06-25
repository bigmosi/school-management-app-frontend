import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Teacher.css";

function TeacherManagement({ teachers, formData, setFormData, fetchTeachers }) {

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (formData.id) {
        // Update teacher
        await axios.put(
          `http://localhost:8080/api/teachers/${formData.id}`,
          formData
        );
      } else {
        // Create teacher
        await axios.post('http://localhost:8080/api/teachers', formData);
      }
      fetchTeachers();
      clearFormData();
    } catch (error) {
      console.error('Error submitting teacher:', error);
    }
  };

  const handleEdit = (teacher) => {
    setFormData({
      id: teacher._id,
      name: teacher.name,
      email: teacher.email
    });
  };

  const handleDelete = async (teacherId) => {
    try {
      await axios.delete(`http://localhost:8080/api/teachers/${teacherId}`);
      fetchTeachers();
      clearFormData();
    } catch (error) {
      console.error('Error deleting teacher:', error);
    }
  };

  const clearFormData = () => {
    setFormData({
      name: '',
      email: ''
    });
  };

  return (
    <div>
      <h2>Teacher Management</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
          required
          placeholder="Please enter teacher name"
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
          required
          placeholder="Please enter email address"
        />
        <button type="submit" className="submit-button">
          {formData.id ? 'Update Teacher' : 'Add Teacher'}
        </button>
        <button type="button" className="clear-button" onClick={clearFormData}>
          Clear
        </button>
      </form>

      <h3>Teachers:</h3>
      {teachers.length === 0 ? (
        <p>No teachers available.</p>
      ) : (
        <ul className="teacher-list">
          {teachers.map((teacher) => (
            <li key={teacher._id} className="teacher-item">
              {teacher.name} | {teacher.email}
              <button
                className="edit-button"
                onClick={() => handleEdit(teacher)}
              >
                Edit
              </button>
              <button
                className="delete-button"
                onClick={() => handleDelete(teacher._id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TeacherManagement;

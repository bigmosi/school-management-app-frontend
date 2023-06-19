import React, { useState } from 'react';
import axios from 'axios';
import './StudentForm.css';

// StudentForm component for registering a new student
const StudentForm = () => {
  const [studentData, setStudentData] = useState({
    name: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    contact: {
      email: '',
      contactNumber: ''
    },
    emergencyContacts: []
  });

  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e) => {
    setStudentData({
      ...studentData,
      [e.target.name]: e.target.value
    });
  };

  const handleContactInputChange = (e) => {
    setStudentData({
      ...studentData,
      contact: {
        ...studentData.contact,
        [e.target.name]: e.target.value
      }
    });
  };

  const handleEmergencyContactInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedEmergencyContacts = [...studentData.emergencyContacts];
    updatedEmergencyContacts[index] = {
      ...updatedEmergencyContacts[index],
      [name]: value
    };

    setStudentData({
      ...studentData,
      emergencyContacts: updatedEmergencyContacts
    });
  };

  const addEmergencyContact = () => {
    setStudentData({
      ...studentData,
      emergencyContacts: [...studentData.emergencyContacts, {}]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send POST request to backend API endpoint to create a new student
      await axios.post('http://localhost:8080/api/students/', studentData);

      // Reset the form
      setStudentData({
        name: '',
        dateOfBirth: '',
        gender: '',
        address: '',
        contact: {
          email: '',
          contactNumber: ''
        },
        emergencyContacts: []
      });

      // Display success message or redirect to another page

      setSuccessMessage('Form submitted successfully.');

      // Hide the success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      // Display error message
      // ...
    }
  };


  return (
  <div>
     <h2 className="student-title">Add New Student</h2>
     <form onSubmit={handleSubmit} className="form-container">
      <label>Full Name:</label>
      <input
        type="text"
        name="name"
        value={studentData.name}
        onChange={handleInputChange}
        placeholder="Full Name"
        required
      />

      <label>Date of Birth:</label>
      <input
        type="date"
        name="dateOfBirth"
        value={studentData.dateOfBirth}
        onChange={handleInputChange}
        required
      />

      <label>Gender:</label>
      <select
        name="gender"
        value={studentData.gender}
        onChange={handleInputChange}
        required
      >
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>

      <label>Address:</label>
      <textarea
        name="address"
        value={studentData.address}
        onChange={handleInputChange}
        placeholder="Enter Address"
        required
      ></textarea>

      <label>Contact Email:</label>
      <input
        type="email"
        name="email"
        value={studentData.contact.email}
        onChange={handleContactInputChange}
        placeholder="Email"
        required
      />

      <label>Contact Phone:</label>
      <input
        type="tel"
        name="contactNumber"
        value={studentData.contact.contactNumber}
        onChange={handleContactInputChange}
        placeholder="Contact Number"
        required
      />

      <label>Emergency Contacts:</label>
      {studentData.emergencyContacts.map((emergencyContact, index) => (
        <div key={index}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={emergencyContact.name || ''}
            onChange={(e) => handleEmergencyContactInputChange(e, index)}
            required
          />
          <input
            type="text"
            name="relationship"
            placeholder="Relationship"
            value={emergencyContact.relationship || ''}
            onChange={(e) => handleEmergencyContactInputChange(e, index)}
            required
          />
          <input
            type="tel"
            name="contactNumber"
            placeholder="Contact Number"
            value={emergencyContact.contactNumber || ''}
            onChange={(e) => handleEmergencyContactInputChange(e, index)}
            required
          />
        </div>
      ))}
      {successMessage && <div className="success-message">{successMessage}</div>}
    <div className="button-container">
      <button type="button" onClick={addEmergencyContact} className="emergency-contact">
        Add Emergency Contact
      </button>
      <button type="submit">Submit</button>
    </div>
    </form>
  </div>
  );
};

export default StudentForm;

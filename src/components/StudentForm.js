import React, { useState } from 'react';
import axios from 'axios';
import './StudentForm.css';
import DisciplinaryForm from './DisciplnaryForm';

// StudentForm component for registering a new student
const StudentForm = () => {
  const [studentData, setStudentData] = useState({
    name: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    contact: {
      contactNumber: '',
      email: '',
    },
    emergencyContacts: [],
    attendance: [],
    academicPerformance: [],
    disciplinaryHistory: [],
  });

  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e) => {
    setStudentData({
      ...studentData,
      [e.target.name]: e.target.value,
    });
  };

  const handleContactInputChange = (e) => {
    setStudentData({
      ...studentData,
      contact: {
        ...studentData.contact,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleEmergencyContactInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedEmergencyContacts = [...studentData.emergencyContacts];
    updatedEmergencyContacts[index] = {
      ...updatedEmergencyContacts[index],
      [name]: value,
    };

    setStudentData({
      ...studentData,
      emergencyContacts: updatedEmergencyContacts,
    });
  };

  const addEmergencyContact = () => {
    setStudentData({
      ...studentData,
      emergencyContacts: [...studentData.emergencyContacts, {}],
    });
  };

  const handleDisciplinaryHistoryChange = (index, field, value) => {
    const updatedHistory = [...studentData.disciplinaryHistory];
    updatedHistory[index] = {
      ...updatedHistory[index],
      [field]: value,
    };
    setStudentData({
      ...studentData,
      disciplinaryHistory: updatedHistory,
    });
  };

  const addDisciplinaryHistory = () => {
    setStudentData({
      ...studentData,
      disciplinaryHistory: [
        ...studentData.disciplinaryHistory,
        { date: '', description: '' },
      ],
    });
  };

  const removeDisciplinaryHistory = (index) => {
    const updatedHistory = [...studentData.disciplinaryHistory];
    updatedHistory.splice(index, 1);
    setStudentData({
      ...studentData,
      disciplinaryHistory: updatedHistory,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send POST request to backend API endpoint to create a new student with disciplinary history
      await axios.post('http://localhost:8080/api/students/', studentData);
        console.log(studentData);
      // Reset the form
      setStudentData({
        name: '',
        dateOfBirth: '',
        gender: '',
        address: '',
        contact: {
          contactNumber: '',
          email: '',
        },
        emergencyContacts: [],
        attendance: [],
        academicPerformance: [],
        disciplinaryHistory: [],
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
     <h2 className="student-title">Add Students</h2>
     <form onSubmit={handleSubmit} className="form-container">
    <div className='form-main'>
    <div>
      <label>Full Name:</label>
      <input
        type="text"
        name="name"
        value={studentData.name}
        onChange={handleInputChange}
        placeholder="Full Name"
        required
      />
      </div>

      <div>
      <label>Date of Birth:</label>
      <input
        type="date"
        name="dateOfBirth"
        value={studentData.dateOfBirth}
        onChange={handleInputChange}
        required
      />
      </div>

      <div>
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
      </div>

      <div>
      <label>Address:</label>
      <textarea
        name="address"
        value={studentData.address}
        onChange={handleInputChange}
        placeholder="Enter Address"
        required
      ></textarea>
      </div>

      <div>
      <label>Contact Email:</label>
      <input
        type="email"
        name="email"
        value={studentData.contact.email}
        onChange={handleContactInputChange}
        placeholder="Email"
        required
      />
      </div>

      <div>
      <label>Contact Phone:</label>
      <input
        type="tel"
        name="contactNumber"
        value={studentData.contact.contactNumber}
        onChange={handleContactInputChange}
        placeholder="Contact Number"
        required
      />
      </div>
    </div>
      {/* <h3>Disciplinary History</h3> */}
        {studentData.disciplinaryHistory.map((history, index) => (
          <div key={index} className="disciplinary-history">
            <label>Date:</label>
            <input
              type="date"
              value={history.date}
              onChange={(e) =>
                handleDisciplinaryHistoryChange(index, 'date', e.target.value)
              }
            />

            <label>Description:</label>
            <input
              type="text"
              value={history.description}
              onChange={(e) =>
                handleDisciplinaryHistoryChange(index, 'description', e.target.value)
              }
            />

            <button type="button" onClick={() => removeDisciplinaryHistory(index)} className="remove-student">
              Remove
            </button>
          </div>
        ))}

        <button type="button" onClick={addDisciplinaryHistory} className="emergency-contact">
          Add Disciplinary History
        </button>
      <label>Emergency Contacts:</label>
      {studentData.emergencyContacts.map((emergencyContact, index) => (
        <div key={index} className="emergency-input">
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
      

        <div className="button-container">
          <button type="button" onClick={addEmergencyContact} className="emergency-contact">
            Add E        {successMessage && <div className="success-message">{successMessage}</div>}
mergency Contact
          </button>
          <button type="submit" className="add-student">Add Student</button>
        </div>
    </form>
  </div>
  );
};

export default StudentForm;

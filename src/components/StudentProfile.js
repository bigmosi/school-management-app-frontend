import { useState, useEffect } from "react";
import axios from "axios";
// StudentProfile component for displaying and updating a student's profile
const StudentProfile = ({ studentId }) => {
  const [studentData, setStudentData] = useState(null);
  const [selectedStudentId, setSelectedStudentId] = useState(null);

  const handleSelectStudent = (studentId) => {
    setSelectedStudentId(studentId);
  };

  useEffect(() => {
    // Fetch the student data from the backend API using the studentId
    const fetchStudentData = async () => {
      try {
        const response = await axios.get(`/api/students/${studentId}`);
        setStudentData(response.data);
      } catch (error) {
        // Display error message
        // ...
      }
    };

    fetchStudentData();
  }, [studentId]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send PUT request to backend API endpoint to update the student's information
      await axios.put(`/api/students/${studentId}`, studentData);

      // Display success message or redirect to another page
      // ...
    } catch (error) {
      // Display error message
      // ...
    }
  };

  if (!studentData) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Full Name:</label>
      <input
        type="text"
        name="name"
        value={studentData.name}
        onChange={handleInputChange}
        placeholder="full name"
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
        required
      ></textarea>

      <label>Contact Email:</label>
      <input
        type="email"
        name="email"
        value={studentData.contact.email}
        onChange={handleContactInputChange}
        required
      />

      <label>Contact Phone:</label>
      <input
        type="tel"
        name="phone"
        value={studentData.contact.phone}
        onChange={handleContactInputChange}
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

      <button type="submit">Update</button>
    </form>
  );
};

export default StudentProfile;

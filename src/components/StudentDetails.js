import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './StudentDetails.css';

const StudentDetails = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    fetchStudent();
  }, []);

  const fetchStudent = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/students/${id}`);
      console.log(response.data);
      setStudent(response.data);
    } catch (error) {
      console.error('Error fetching student:', error);
    }
  };

  if (!student) {
    return <div>Loading...</div>;
  }

  return (
    <div className="students-details">
      <h2>Student Details</h2>
      <div>
        <strong>Name:</strong> {student.name}
      </div>
      <div>
        <strong>Date of Birth:</strong> {student.dateOfBirth}
      </div>
      <div>
        <strong>Gender:</strong> {student.gender}
      </div>
      <div>
        <strong>Address:</strong> {student.address}
      </div>
      <div>
        <strong>Contact Email:</strong> {student.contact.email}
      </div>
      <div>
        <strong>Contact Number:</strong> {student.contact.contactNumber}
      </div>
      <div>
        <strong>Emergency Contacts:</strong>
        {student.emergencyContacts.map((emergencyContact, index) => (
          <div key={index} className="emergency-contact">
            <div>
              <strong>Name:</strong> {emergencyContact.name}
            </div>
            <div>
              <strong>Relationship:</strong> {emergencyContact.relationship}
            </div>
            <div>
              <strong>Contact Number:</strong> {emergencyContact.contactNumber}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentDetails;

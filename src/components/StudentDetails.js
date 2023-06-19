import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './StudentDetails.css';

const StudentDetails = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    fetchStudent();
    fetchAttendance();
  }, [id]);

  const fetchStudent = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/students/${id}`);
      setStudent(response.data);
    } catch (error) {
      console.error('Error fetching student:', error);
    }
  };

  const fetchAttendance = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/students/${id}/attendance`);
      setAttendance(response.data);
    } catch (error) {
      console.error('Error fetching attendance:', error);
    }
  }

  if (!student) {
    return <div>Loading...</div>;
  }

  return (
    <div className="students-details">
      <h2>Student Details</h2>
     <div className="attendance-container">
     <div className="attendance-item">
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
      </div>
     </div>
      <div className="emergency-container">
      <div>
        <h2>Emergency Contacts:</h2>
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
      <h2 className="section-heading">Attendance</h2>
      <div className="attendance-details">
        {
          attendance.length > 0 ? (
            attendance.map((attendanceItem, index) => (
              <div className="attendance-container">
                <div key={index} className="attendance-item">
                <div>
                  <strong>Date:</strong> {attendanceItem.date}
                </div>
                <div>
                  <strong>Status:</strong> {attendanceItem.status}
                </div>
              </div>
              </div>
            ))
          ) : (
            <div className="record">No attendance records found.</div>
          )
        }
      </div>
    </div>
  );
};

export default StudentDetails;

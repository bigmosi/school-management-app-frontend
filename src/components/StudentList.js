import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './StudentList.css';

const StudentList = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/students');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  return (
    <div className="student-list">
      <h2>Student List</h2>
      <div className="new-student">
        <Link to="/add-student" className="add-student-link">Add New Student</Link>
        <Link to="/attendance" className="add-student-link">Attendance</Link>
      </div>
      <div>
      <div>
        <h2>Total Number of Students:{students.length}</h2>
      </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date of Birth</th>
            <th>Gender</th>
            <th>Address</th>
            <th>Email</th>
            <th>Contact Number</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id} className="list-container">
              <td>
                <Link to={`/students/${student.id}`}>{student.name}</Link>
              </td>
              <td>{student.dateOfBirth}</td>
              <td>{student.gender}</td>
              <td>{student.address}</td>
              <td>{student.contact.email}</td>
              <td>{student.contact.contactNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;

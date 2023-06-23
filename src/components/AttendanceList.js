import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AttendanceList.css';

const AttendanceList = () => {
  const [attendanceList, setAttendanceList] = useState([]);
  const [studentNames, setStudentNames] = useState({});
  const [newAttendance, setNewAttendance] = useState({
    student: '',
    date: '',
    status: ''
  });

  useEffect(() => {
    fetchAttendanceList();
  }, []);

  const fetchAttendanceList = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/attendance');
      setAttendanceList(response.data);
      fetchStudentNames(response.data);
    } catch (error) {
      console.error('Error fetching attendance list:', error);
    }
  };

  const fetchStudentNames = async (attendanceData) => {
    const studentIds = attendanceData.map(attendance => attendance.student);
    const uniqueStudentIds = [...new Set(studentIds)];

    try {
      const response = await axios.get(`http://localhost:8080/api/students?ids=${uniqueStudentIds.join(',')}`); // Replace '/api/students/names' with your actual student API endpoint
      const namesMap = {};
      response.data.forEach(student => {
        namesMap[student.id] = student.name;
      });
      setStudentNames(namesMap);
    } catch (error) {
      console.error('Error fetching student names:', error);
    }
  };

  const handleInputChange = (e) => {
    setNewAttendance({ ...newAttendance, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/attendance', newAttendance);
      setAttendanceList([...attendanceList, response.data]);
      setNewAttendance({ student: '', date: '', status: '' });
    } catch (error) {
      console.error('Error adding new attendance:', error);
    }
  };

  return (
    <div className="attendance-conatiner">
      <div>
      <h2>Attendance</h2>
      <table className="attendance-table">
        <thead>
          <tr>
            <th>Student</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {attendanceList.map(attendance => (
            <tr key={attendance.id}>
              <td>{studentNames[attendance.student]}</td>
              <td>{attendance.date}</td>
              <td>{attendance.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      <div>
      <h2>Add New Attendance</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Student:
          <select
          name="student" 
          value={newAttendance.student} 
          onChange={handleInputChange}
          className="attendance-option"
          >
            <option value="">Select a student</option>
            {/* Render options dynamically based on available student names */}
            {Object.entries(studentNames).map(([id, name]) => (
              <option key={id} value={id}>{name}</option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Date:
          <input 
            type="date" 
            name="date" 
            value={newAttendance.date} 
            onChange={handleInputChange} 
            className="attendance-date"
             />
        </label>
        <br />
        <label>
          Status:
          <select 
          name="status" 
          value={newAttendance.status} 
          onChange={handleInputChange}
          className="attendance-option"
          >
            <option value="">Select a status</option>
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
          </select>
        </label>
        <br />
        <div className="attendance-button">
          <button type="submit">Add Attendance</button>
        </div>
      </form>
      </div>
    </div>
  );
};

export default AttendanceList;

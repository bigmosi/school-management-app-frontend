import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AttendanceList.css';

const AttendanceList = () => {
  const [attendanceList, setAttendanceList] = useState([]);
  const [studentNames, setStudentNames] = useState({});

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

  return (
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
  );
};

export default AttendanceList;

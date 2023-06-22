import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const AttendancePage = () => {
  const { id } = useParams();
  const [attendance, setAttendance] = useState([]);
  const [newAttendance, setNewAttendance] = useState({
    date: '',
    status: '',
  });

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/students/${id}/attendance`);
      console.log(response.data);
      setAttendance(response.data);
    } catch (error) {
      console.error('Error fetching attendance:', error);
    }
  };

  const handleAttendanceSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`http://localhost:8080/api/students/${id}/attendance`, newAttendance);
      setAttendance([...attendance, response.data]);
      setNewAttendance({
        date: '',
        status: '',
      });
    } catch (error) {
      console.error('Error adding attendance:', error);
    }
  };

  const handleAttendanceChange = (event) => {
    setNewAttendance({
      ...newAttendance,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div>
      <h2>Attendance Page</h2>
      <div>
        <h2>Attendance Records</h2>
        {attendance.length > 0 ? (
          <ul>
            {attendance.map((record) => (
              <li key={record.id}>
                <strong>Date:</strong> {record.date} - <strong>Status:</strong> {record.status}
              </li>
            ))}
          </ul>
        ) : (
          <div>No attendance records found.</div>
        )}
      </div>
      <div>
        <h2>Add Attendance</h2>
        <form onSubmit={handleAttendanceSubmit}>
          <div>
            <label>Date:</label>
            <input type="date" name="date" value={newAttendance.date} onChange={handleAttendanceChange} />
          </div>
          <div>
            <label>Status:</label>
            <select name="status" value={newAttendance.status} onChange={handleAttendanceChange}>
              <option value="">Select Status</option>
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
            </select>
          </div>
          <button type="submit">Add</button>
        </form>
      </div>
    </div>
  );
};

export default AttendancePage;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import './AttendanceList.css';

const AttendanceList = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [attendanceData, setAttendanceData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetchStudents();
    fetchAttendanceData();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/students");
      setStudents(response.data);
      setFilteredStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const fetchAttendanceData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/attendance");
      setAttendanceData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching attendance data:", error);
    }
  };

  const handleAttendanceChange = (studentId, date, status) => {
    const updatedAttendanceData = attendanceData.map((attendance) => {
      if (attendance.student.id === studentId && attendance.date === date) {
        return { ...attendance, status };
      }
      return attendance;
    });
    setAttendanceData(updatedAttendanceData);
  
    // Find the attendance record with matching studentId and date in the updated attendance data
    const attendanceRecord = updatedAttendanceData.find(
      (attendance) => attendance.student.id === studentId && attendance.date === date
    );
  
    // Send a request to update the attendance record on the backend
    axios
      .put(`http://localhost:8080/api/attendance/${attendanceRecord.id}`, { status })
      .then((response) => {
        console.log("Attendance updated successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error updating attendance:", error);
      });
  };  

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setSelectedDate(selectedDate);
    filterStudents(selectedDate);
  };

  const filterStudents = (selectedDate) => {
    if (selectedDate) {
      const filteredStudents = students.filter((student) => {
        const attendance = attendanceData.find(
          (attendance) =>
            attendance.student.id === student.id && attendance.date === selectedDate
        );
        return attendance;
      });
      setFilteredStudents(filteredStudents);
    } else {
      setFilteredStudents(students);
    }
  };

  const getAttendanceStatus = (studentId, date) => {
    const attendance = attendanceData.find(
      (attendance) =>
        attendance.student && attendance.student.id === studentId && attendance.date === date
    );
    return attendance ? attendance.status : "";
  };
  
  return (
    <div className="attendance-list">
      <h2>Attendance List</h2>
      <label>Date:</label>
      <input type="date" value={selectedDate} onChange={handleDateChange} />
      <table>
        <thead>
          <tr>
            <th>Student Name</th>
            {attendanceData.map((attendance) => (
              <th key={attendance.date}>{attendance.date}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student) => (
            <tr key={student.id}>
              <td>{student.name}</td>
              {attendanceData.map((attendance) => {
                const attendanceStatus = getAttendanceStatus(student.id, attendance.date);

                return (
                  <td key={attendance.date}>
                    <select
                      value={attendanceStatus}
                      onChange={(e) =>
                        handleAttendanceChange(student.id, attendance.date, e.target.value)
                      }
                    >
                      <option value="Present">Present</option>
                      <option value="Absent">Absent</option>
                    </select>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceList;

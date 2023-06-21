import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const AttendanceList = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetchAttendanceData();
  }, []);

  const fetchAttendanceData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/attendance");
      setAttendanceData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching attendance data:", error);
    }
  };

  const handleAttendanceChange = async (attendanceId, status) => {
    try {
      await axios.put(`http://localhost:8080/api/attendance/${id}`, {
        status: status,
      });
      // Refresh attendance data after successful update
      fetchAttendanceData();
    } catch (error) {
      console.error("Error updating attendance:", error);
    }
  };

  return (
    <div>
      <h2>Attendance List</h2>
      <table>
        <thead>
          <tr>
            <th>Student</th>
            <th>Date</th>
            <th>Status</th>
            <th>Class</th>
            <th>Session</th>
            <th>Remark</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.map((attendance) => (
            <tr key={attendance.id}>
              <td>{attendance.student.name}</td>
              <td>{attendance.date}</td>
              <td>
                <select
                  value={attendance.status}
                  onChange={(e) =>
                    handleAttendanceChange(attendance.id, e.target.value)
                  }
                >
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                </select>
              </td>
              <td>{attendance.class.name}</td>
              <td>{attendance.session}</td>
              <td>{attendance.remark}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceList;

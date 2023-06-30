import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import "./ReportAttendance.css";

function AttendanceReport() {
  const [report, setReport] = useState("");
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/students");

      if (response.status === 200) {
        const studentsData = response.data;
        setStudents(studentsData);
        setSelectedStudent(studentsData[0]?.id);
        setLoading(false);
      } else {
        setError("Failed to fetch students");
      }
    } catch (error) {
      console.error("Error fetching students:", error);
      setError("An error occurred while fetching the students.");
    }
  };

  const generateReport = async () => {
    // Rest of the code...
  };

  const handleStudentChange = (event) => {
    setSelectedStudent(event.target.value);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const downloadReport = () => {
    // Rest of the code...
  };

  return (
    <div>
      <h2 className="page-title">Attendance Report</h2>
      <div className="form-group">
        <label htmlFor="student">Student:</label>
        {loading ? (
          <p>Loading students...</p>
        ) : (
          <select id="student" value={selectedStudent} onChange={handleStudentChange} className="select-box">
            {students.length > 0 ? (
              students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.name}
                </option>
              ))
            ) : (
              <option>No students available</option>
            )}
          </select>
        )}
      </div>
      {/* Rest of the code... */}
    </div>
  );
}

export default AttendanceReport;

import React, { useState, useEffect } from "react";
import axios from "axios";

function AttendanceReport() {
  const [report, setReport] = useState("");
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");

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
      } else {
        setError("Failed to fetch students");
      }
    } catch (error) {
      console.error("Error fetching students:", error);
      setError("An error occurred while fetching the students.");
    }
  };

  const generateReport = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/reports", {
        startDate,
        endDate,
        studentId: selectedStudent,
      });

      if (response.status === 200) {
        const data = response.data;
        setReport(data.report);
        setError("");
      } else {
        const errorData = response.data;
        setError(errorData.message);
      }
    } catch (error) {
      console.error("Error generating attendance report:", error);
      setError("An error occurred while generating the report.");
    }
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
    const element = document.createElement("a");
    const file = new Blob([report], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "attendance_report.txt";
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div>
      <h2>Attendance Report</h2>
      <div>
        <label htmlFor="student">Student:</label>
        <select id="student" value={selectedStudent} onChange={handleStudentChange}>
          {students.map((student) => (
            <option key={student.id} value={student.id}>
              {student.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="startDate">Start Date:</label>
        <input
          id="startDate"
          type="date"
          value={startDate}
          onChange={handleStartDateChange}
        />
      </div>
      <div>
        <label htmlFor="endDate">End Date:</label>
        <input
          id="endDate"
          type="date"
          value={endDate}
          onChange={handleEndDateChange}
        />
      </div>
      <button onClick={generateReport}>Generate Attendance Report</button>
      {error && <p>{error}</p>}
      <pre>{report}</pre>
      {report && (
        <button onClick={downloadReport}>Download Report</button>
      )}
    </div>
  );
}

export default AttendanceReport;

import React, { useState, useEffect } from "react";
import axios from "axios";

function AttendanceReport() {
  const [report, setReport] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    generateReport();
  }, []);

  const generateReport = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/reports", {
        startDate: "2023-01-01",
        endDate: "2023-06-30",
        studentId: "64933837a83286db4c8e9559",
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

      setTimeout(() => {
        setError('');
      }, 5000);
    }
  };

  return (
    <div>
      <button onClick={generateReport}>Generate Attendance Report</button>
      {error && <p>{error}</p>}
      <pre>{report}</pre>
    </div>
  );
}

export default AttendanceReport;

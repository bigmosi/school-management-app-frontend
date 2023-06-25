import React, { useState, useEffect } from "react";
import axios from "axios";

function Timetable() {
    const [schedules, setSchedules] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [selectedSchedule, setSelectedSchedule] = useState(null);
    const [formData, setFormData] = useState({
        day: "",
        time: "",
        subjectId: "",
        teacherId: "",
    });

    useEffect(() => {
        fetchSchedules();
        fetchSubjects();
        fetchTeachers();
    }, []);

   const fetchSchedules =async () => {
    try {
        const response = await axios.get("http://localhost:8080/api/schedules");
        if (response.status === 200) {
            setSchedules(response.data);
        } else {
            console.error('Failed to fetch schedules');
        }      
    } catch (error) {
        console.error("Error fetching schedules:", error);
    }
   }
};

const fetchSubjects = async () => {
    try {
        const response = await axios.get("http://localhost:8080/api/subjects");
        if (response.status === 200) {
            setSubjects(response.data);
        } else {
            console.error("Failed to fetch subjects.");
        }
    } catch (error) {
        console.error("Error fetching subjects:", error);
    }
}

const fetchTeachers = async () => {
    try {
        const response = await axios.get("http://localhost:8080/api/teachers");
        if (response.status === 200) {
           setTeachers(response.data);
        } else {
            console.error("Failed to fetch teachers.");
        }
    } catch (error) {
        console.error("Error fetching teachers:", error);
    }
}

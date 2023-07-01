import React, { useState } from "react";
import axios from "axios";

const LessonPlan = () => {
    const [title, setTitle] = useState("");
    const [descripton, setDescription] = useState("");
    const [file, setFile] = useState(null);
    const [teacher, setTeacher] = useState("");
    const [success, setSuccess] = useState("");

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', descripton);
        formData.append('file', file);
        formData.append('teacher', teacher);

        try {
            const response = await axios.post('http://localhost:8080/api/lesson-plans/', formData);
            console.log('Lesson plan created:', (response).data);
            setTimeout(() => {
                setSuccess("Lesson plan submitted successfully.");
            }, 5000);
        } catch (error) {
            console.error('Error creating lesson plan', error);
        }
    }
    return (
        <div>
            <h2>Create Lesson Plan</h2>
        </div>
    );
}

export default LessonPlan;

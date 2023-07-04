import React, { useState, useEffect } from "react";
import axios from "axios";

const ExamTaking = ({ examId }) => {
    const [exam, setExam] = useState(null);
    const [userAnswers, setUserAnswers] = useState([]);
    const [submissionMessage, setSubmissionMessage] = useState('');

    useEffect(() => {
        fetchExam();
    });

    const fetchExam = async () => {
        try {
            const { data } = await axios.get(`ttp://localhost:8080/api/exams/${examId}`);

            setExam(data);
            setUserAnswers(new Array(data.questions.length).fill(''));
        } catch (error) {
            console.error('Error fetching exam', error);
        }
    };

    const handleAnswerChange = (index, value) => {
        const updatedAnswers = [...userAnswers];
        updatedAnswers[index] = value;
        setUserAnswers(updatedAnswers);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`http://localhost:8080/api/exams/${examId}/submit`, {
                userAnswers
            });

            setSubmissionMessage('Exam submitted successfully');

            setTimeout(() => {
                setSubmissionMessage('');
            }, 5000);

            // Clear user answers after submission
            setUserAnswers(new Array(exam.questions.length).fill(''));
        } catch (error) {
           console.error('Error submitting exam', error); 
        }
    };


}
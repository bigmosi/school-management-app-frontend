import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ExamDetails = ({ examId }) => {
    const [userAnswers, setUserAnswers] = useState([]);

    useEffect(() => {
        fetchUsersAnswers(examId);
    }, [examId]);

    const fetchUsersAnswers = async (examId) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/exams/${examId}/user-answers`)
            setUserAnswers(response.data);
        } catch (error) {
            console.error(error);
        }
    };

   return (
    <div>
        <h2>Exam Details</h2>
        <h3>User Answers:</h3>
        <ul>
            {userAnswers.map((answer, index) => (
                <li key={index}>{answer}</li>
            ))}
        </ul>
    </div>
   );
}

export default ExamDetails;
import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "./Spinner";

const ExamTaking = ({ examId }) => {
  const [exam, setExam] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [submissionMessage, setSubmissionMessage] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchExam();
  }, []);

  const fetchExam = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8080/api/exams/${examId}`);
      setExam(data);
      setUserAnswers(new Array(data.questions.length).fill(''));
    } catch (error) {
      console.error('Error fetching exam', error);
      setError('Failed to fetch exam');
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


  if (!exam) {
    return <Spinner />;
  }

  return (
    <div>
      <h2>{exam.examName}</h2>
      <form onSubmit={handleSubmit}>
        {exam.questions && exam.questions.map((question, index) => (
          <div key={question._id}>
            <h4>Question {index + 1}:</h4>
            <p>{question.questionText}</p>
            <div>
              {question.answerOptions.map((option, optionIndex) => (
                <div key={optionIndex}>
                  <label>
                    <input
                      type="radio"
                      value={option.optionText}
                      checked={userAnswers[index] === option.optionText}
                      onChange={(e) => handleAnswerChange(index, e.target.value)}
                    />
                    {option.optionText}
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
        {submissionMessage && <div>{submissionMessage}</div>}
        <button type="submit">Submit Exam</button>
      </form>
    </div>
  );
};

export default ExamTaking;

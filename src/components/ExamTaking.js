import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "./Spinner";

const ExamTaking = () => {
  const [exams, setExams] = useState([]);
  const [selectedExam, setSelectedExam] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [submissionMessage, setSubmissionMessage] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/exams");
      setExams(data);
    } catch (error) {
      console.error("Error fetching exams", error);
      setError("Failed to fetch exams");
    }
  };

  const handleExamSelect = (exam) => {
    setSelectedExam(exam);
    setUserAnswers(new Array(exam.questions.length).fill(""));
  };

  const handleAnswerChange = (index, value) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[index] = value;
    setUserAnswers(updatedAnswers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:8080/api/exams/${selectedExam._id}/submit`,
        {
          userAnswers,
        }
      );

      setSubmissionMessage("Exam submitted successfully");

      setTimeout(() => {
        setSubmissionMessage("");
      }, 5000);

      // Clear user answers after submission
      setUserAnswers(new Array(selectedExam.questions.length).fill(""));
    } catch (error) {
      console.error("Error submitting exam", error);
    }
  };

  if (!exams.length) {
    return <Spinner />;
  }

  return (
    <div>
      <h2>Select an Exam</h2>
      <ul>
        {exams.map((exam) => (
          <li key={exam._id} onClick={() => handleExamSelect(exam)}>
            {exam.examName}
          </li>
        ))}
      </ul>

      {selectedExam && (
        <div>
          <h2>{selectedExam.examName}</h2>
          <form onSubmit={handleSubmit}>
            {selectedExam.questions.map((question, index) => (
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
                          onChange={(e) =>
                            handleAnswerChange(index, e.target.value)
                          }
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
      )}
    </div>
  );
};

export default ExamTaking;

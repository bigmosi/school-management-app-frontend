import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "./Spinner";

const ExamTaking = () => {
  const [exams, setExams] = useState([]);
  const [selectedExam, setSelectedExam] = useState(null);
  const [selectedUserName, setSelectedUserName] = useState("");
  const [submissionMessage, setSubmissionMessage] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/exams");
      // Add the correct answer field to each question
      const examsWithCorrectAnswers = data.map((exam) => ({
        ...exam,
        questions: exam.questions.map((question) => ({
          ...question,
          selectedAnswer: "",
          isCorrect: false,
        })),
      }));
      setExams(examsWithCorrectAnswers);
    } catch (error) {
      console.error("Error fetching exams", error);
      setError("Failed to fetch exams");
    }
  };

  const handleExamSelect = (exam) => {
    setSelectedExam(exam);
  };

  const handleAnswerChange = (questionIndex, selectedAnswer) => {
    const updatedExam = { ...selectedExam };
    updatedExam.questions[questionIndex].selectedAnswer = selectedAnswer;
    setSelectedExam(updatedExam);
  };

  const handleNameChange = (e) => {
    setSelectedUserName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:8080/api/exams/${selectedExam._id}/submit`,
        {
          userName: selectedUserName,
          userAnswers: selectedExam.questions.map((question) => question.selectedAnswer),
        }
      );

      // Update the exams with the grading information
      const updatedExams = exams.map((exam) => {
        if (exam._id === selectedExam._id) {
          return {
            ...selectedExam,
            questions: selectedExam.questions.map((question) => ({
              ...question,
              isCorrect: question.selectedAnswer === question.correctAnswer,
            })),
          };
        }
        return exam;
      });

      setExams(updatedExams);

      setSubmissionMessage("Exam submitted successfully");

      setTimeout(() => {
        setSubmissionMessage("");
      }, 5000);

      // Clear selected exam and user name after submission
      setSelectedExam(null);
      setSelectedUserName("");
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
            <div>
              <label>
                Student Name:
                <input
                  type="text"
                  value={selectedUserName}
                  onChange={handleNameChange}
                />
              </label>
            </div>
            {selectedExam.questions.map((question, index) => (
              <div key={question._id}>
                <h4>Question {index + 1}:</h4>
                <h4>Question {index + 1}:</h4>
                <p>{question.questionText}</p>
                <div>
                  {question.answerOptions.map((option, optionIndex) => (
                    <div key={optionIndex}>
                      <label>
                        <input
                          type="radio"
                          value={option.optionText}
                          checked={question.selectedAnswer === option.optionText}
                          onChange={() =>
                            handleAnswerChange(index, option.optionText)
                          }
                        />
                        {option.optionText}
                      </label>
                    </div>
                  ))}
                </div>
                {question.isCorrect && (
                  <div className="correct-answer">Correct Answer</div>
                )}
                {!question.isCorrect && question.selectedAnswer && (
                  <div className="wrong-answer">Wrong Answer</div>
                )}
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

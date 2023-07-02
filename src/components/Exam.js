import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ExamForm = () => {
  const [examName, setExamName] = useState('');
  const [questionIds, setQuestionIds] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/questions');
      const { data } = response;
      setQuestions(data);
    } catch (error) {
      console.error('Error fetching questions', error);
    }
  };

  const handleQuestionSelect = (e) => {
    const selectedIds = Array.from(e.target.selectedOptions, (option) => option.value);
    setQuestionIds(selectedIds);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/exams', {
        examName,
        questionIds,
      });

      setSuccessMessage('Exam created successfully');
      setTimeout(() => {
        setSuccessMessage('');
      }, 5000);

      setExamName('');
      setQuestionIds([]);
    } catch (error) {
      console.error('Error creating exam', error);
    }
  };

  return (
    <div>
      <h2>Create Exam</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="examName">Exam Name:</label>
          <input
            type="text"
            id="examName"
            value={examName}
            onChange={(e) => setExamName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="questionIds">Select Questions:</label>
          <select
            multiple
            id="questionIds"
            value={questionIds}
            onChange={handleQuestionSelect}
            required
          >
            {questions.map((question) => (
              <option key={question._id} value={question._id}>
                {question.questionText}
              </option>
            ))}
          </select>
        </div>
        {successMessage && <div className="success-message">{successMessage}</div>}
        <button type="submit">Create Exam</button>
      </form>
    </div>
  );
};

export default ExamForm;

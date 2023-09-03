import { useState } from "react";
import axios from "axios";

const QuestionForm = () => {
  const [questionText, setQuestionText] = useState('');
  const [answerOptions, setAnswerOptions] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/questions', {
        questionText,
        answerOptions: answerOptions.map(option => ({ optionText: option, isCorrect: false })),
      });

      console.log('Question saved successfully:', response.data);

      // Reset form fields
      setQuestionText('');
      setAnswerOptions([]);
    } catch (error) {
      console.error('Failed to save question:', error);
    }
  };

  const handleAddAnswerOption = () => {
    setAnswerOptions([...answerOptions, '']);
  };

  const handleAnswerOptionChange = (index, value) => {
    const updatedOptions = [...answerOptions];
    updatedOptions[index] = value;
    setAnswerOptions(updatedOptions);
  };

  return (
    <div>
      <h2>Add Question</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="questionText">Question Text:</label>
          <input
            type="text"
            id="questionText"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Answer Options:</label>
          {answerOptions.map((option, index) => (
            <div key={index}>
              <input
                type="text"
                value={option}
                onChange={(e) => handleAnswerOptionChange(index, e.target.value)}
                required
              />
            </div>
          ))}
          <button type="button" onClick={handleAddAnswerOption}>
            Add Answer Option
          </button>
        </div>
        <button type="submit">Save Question</button>
      </form>
    </div>
  );
};

export default QuestionForm;

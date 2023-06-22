import React from 'react';

const DisciplinaryForm = ({ disciplinaryHistory, onDisciplinaryHistoryChange }) => {
    const handleDisciplinaryHistoryChange = (index, field, value) => {
      const updatedHistory = [...disciplinaryHistory];
      updatedHistory[index][field] = value;
      onDisciplinaryHistoryChange(updatedHistory);
    };
  
    const addDisciplinaryHistory = () => {
      onDisciplinaryHistoryChange([...disciplinaryHistory, { date: '', description: '' }]);
    };
  
    const removeDisciplinaryHistory = (index) => {
      const updatedHistory = [...disciplinaryHistory];
      updatedHistory.splice(index, 1);
      onDisciplinaryHistoryChange(updatedHistory);
    };
  
    return (
      <div>
        <h3>Disciplinary History</h3>
        {disciplinaryHistory.map((history, index) => (
          <div key={index}>
            <label>Date:</label>
            <input
              type="date"
              value={history.date}
              onChange={(e) => handleDisciplinaryHistoryChange(index, 'date', e.target.value)}
            />
  
            <label>Description:</label>
            <input
              type="text"
              value={history.description}
              onChange={(e) => handleDisciplinaryHistoryChange(index, 'description', e.target.value)}
            />
  
            <button type="button" onClick={() => removeDisciplinaryHistory(index)}>
              Remove
            </button>
          </div>
        ))}
  
        <button type="button" onClick={addDisciplinaryHistory}>
          Add Disciplinary History
        </button>
      </div>
    );
  };

export default DisciplinaryForm;

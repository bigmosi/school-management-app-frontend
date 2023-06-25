import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Subject.css";

function SubjectManagement() {
  const [subjects, setSubjects] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    teacherId: ''
  });

  useEffect(() => {
    fetchSubjects();
    fetchTeachers();
  }, []);

  const fetchSubjects = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/subjects');
      setSubjects(response.data);
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  };

  const fetchTeachers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/teachers');
      setTeachers(response.data);
    } catch (error) {
      console.error('Error fetching teachers:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (formData.id) {
        // Update subject
        await axios.put(
          `http://localhost:8080/api/subjects/${formData.id}`,
          formData
        );
      } else {
        // Create subject
        await axios.post('http://localhost:8080/api/subjects', formData);
      }
      fetchSubjects();
      clearFormData();
    } catch (error) {
      console.error('Error submitting subject:', error);
    }
  };

  const handleEdit = (subject) => {
    setFormData({
      id: subject._id,
      name: subject.name,
      code: subject.code,
      teacherId: subject.teacher._id
    });
  };

  const handleDelete = async (subjectId) => {
    try {
      await axios.delete(`http://localhost:8080/api/subjects/${subjectId}`);
      fetchSubjects();
      clearFormData();
    } catch (error) {
      console.error('Error deleting subject:', error);
    }
  };

  const clearFormData = () => {
    setFormData({
      name: '',
      code: '',
      teacherId: ''
    });
  };

  return (
    <div>
      <h2>Subject Management</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-field">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="code">Code:</label>
          <input
            type="text"
            id="code"
            name="code"
            value={formData.code}
            onChange={(e) =>
              setFormData({ ...formData, code: e.target.value })
            }
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="teacherId">Teacher:</label>
          <select
            id="teacherId"
            name="teacherId"
            value={formData.teacherId}
            onChange={(e) =>
              setFormData({ ...formData, teacherId: e.target.value })
            }
            required
          >
            <option value="">Select Teacher</option>
            {teachers.map((teacher) => (
              <option key={teacher._id} value={teacher._id}>
                {teacher.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-actions">
          <button type="submit">
            {formData.id ? 'Update Subject' : 'Add Subject'}
          </button>
          <button type="button" onClick={clearFormData}>
            Clear
          </button>
        </div>
      </form>

      <h3>Subjects:</h3>
      {subjects.length === 0 ? (
        <p>No subjects available.</p>
      ) : (
        <ul className="subject-list">
          {subjects.map((subject) => (
            <li key={subject._id} className="subject-item">
              {subject.name} - {subject.code} - {subject.teacher.name}
              <button onClick={() => handleEdit(subject)}>Edit</button>
              <button onClick={() => handleDelete(subject._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SubjectManagement;

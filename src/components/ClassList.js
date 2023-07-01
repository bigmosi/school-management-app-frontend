import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./ClassList.css";
import Spinner from './Spinner';

function ClassList() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    teacher: '',
    schedule: '',
    subject: '',
  });
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/classes');
      console.log(response.data);
      if (response.status === 200) {
        const classData = response.data;
        setClasses(classData);
        setLoading(false);
      } else {
        console.error('Failed to fetch classes');
      }
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  };

  const handleAddClick = () => {
    setIsAdding(true);
    setIsEditing(false);
    setFormData({ name: '', teacher: '', schedule: '', subject: '' });
  };

  const handleEditClick = (classItem) => {
    setIsEditing(true);
    setIsAdding(false);
    setFormData({
      name: classItem.name,
      teacher: classItem.teacher,
      schedule: classItem.schedule,
      subject: classItem.subject,
    });
  };

  const handleDeleteClick = async (classItem) => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/classes/${classItem._id}`);
      if (response.status === 200) {
        fetchClasses();
      }
    } catch (error) {
      console.error('Error deleting class:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (isAdding) {
        const response = await axios.post('http://localhost:8080/api/classes', formData);
        if (response.status === 201) {
          setIsAdding(false);
          fetchClasses();
        }
      } else if (isEditing) {
        const response = await axios.put(
          `http://localhost:8080/api/classes/${classes._id}`,
          formData
        );
        if (response.status === 200) {
          setIsEditing(false);
          fetchClasses();
        }
      }
    } catch (error) {
      console.error('Error submitting class:', error);
    }
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  if (classes.length === 0) {
    return <Spinner />
  }

  return (
    <div>
      <h2 className="page-title">Classes</h2>
      {classes.length === 0 ? (
        <p>No classes found.</p>
      ) : (
        <ul className="class-list">
          {classes.map((classItem) => (
            <li key={classItem._id} className="class-item">
              <h3>{classItem.name}</h3>
              <p>Teacher: {classItem.teacher}</p>
              <p>Schedule: {classItem.schedule}</p>
              <p>Subject: {classItem.subject}</p>
              <button className="edit-button" onClick={() => handleEditClick(classItem)}>
                Edit
              </button>
              <button className="delete-button" onClick={() => handleDeleteClick(classItem)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="class-form">
        <h2>{isAdding ? 'Add' : 'Edit'} Class</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Class:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Please enter class name..."
            />
          </label>
          <br />
          <label>
            Teacher:
            <input
              type="text"
              name="teacher"
              value={formData.teacher}
              onChange={handleChange}
              placeholder="Please enter teacher name..."
            />
          </label>
          <br />
          <label>
            Schedule:
            <input
              type="text"
              name="schedule"
              value={formData.schedule}
              onChange={handleChange}
              placeholder="Please enter schedule..."
            />
          </label>
          <br />
          <label>
            Subject:
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Please enter subject..."
            />
          </label>
          <br />
          <button type="submit" className="submit-button">
            {isAdding ? 'Add' : 'Update'}
          </button>
        </form>
      </div>

      <button className="add-button" onClick={handleAddClick}>
        Add Class
      </button>
    </div>
  );
}

export default ClassList;

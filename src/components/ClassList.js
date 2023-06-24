import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ClassList() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/classes');
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

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Classes</h2>
      {classes.length === 0 ? (
        <p>No classes found.</p>
      ) : (
        <ul>
          {classes.map((classItem) => (
            <li key={classItem._id}>
              <h3>{classItem.name}</h3>
              <p>Teacher: {classItem.teacher}</p>
              <p>Schedule: {classItem.schedule}</p>
              <p>Subject: {classItem.subject}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ClassList;

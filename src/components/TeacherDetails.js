import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import TeacherDetails from './TeacherDetails';

function TeacherDetailsPage() {
  const { id } = useParams();
  const [teacher, setTeacher] = useState(null);

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/teachers/${id}`);
        console.log(response.data);
        setTeacher(response.data);
      } catch (error) {
        console.error('Error fetching teacher:', error);
      }
    };

    fetchTeacher();
  }, [id]);

  return (
    <div>
      <h2>Teacher Details</h2>
      <TeacherDetails teacher={teacher} />
    </div>
  );
}

export default TeacherDetailsPage;

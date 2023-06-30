import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Timetable.css";

function TimetableManagement() {
  const [schedules, setSchedules] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [formData, setFormData] = useState({
    day: '',
    startTime: '',
    endTime: '',
    subjectId: '',
    teacherId: '',
    classId: ''
  });

  useEffect(() => {
    fetchSchedules();
    fetchSubjects();
    fetchTeachers();
    fetchClasses();
  }, []);

  const fetchSchedules = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/schedules');
      setSchedules(response.data);
    } catch (error) {
      console.error('Error fetching schedules:', error);
    }
  };

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

  const fetchClasses = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/classes');
      setClasses(response.data);
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  };

  const handleScheduleClick = (schedule) => {
    setSelectedSchedule(schedule);
    setFormData({
      day: schedule.day,
      startTime: schedule.startTime,
      endTime: schedule.endTime,
      subjectId: schedule.subject._id,
      teacherId: schedule.teacher._id,
      classId: schedule.classId || ''
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (selectedSchedule) {
        await axios.put(
          `http://localhost:8080/api/schedules/${selectedSchedule._id}`,
          formData
        );
      } else {
        await axios.post('http://localhost:8080/api/schedules', formData);
      }
      fetchSchedules();
      clearFormData();
    } catch (error) {
      console.error('Error submitting schedule:', error);
    }
  };

  const handleDelete = async (schedule) => {
    try {
      await axios.delete(`http://localhost:8080/api/schedules/${schedule._id}`);
      fetchSchedules();
      clearFormData();
    } catch (error) {
      console.error('Error deleting schedule:', error);
    }
  };

  const clearFormData = () => {
    setSelectedSchedule(null);
    setFormData({
      day: '',
      startTime: '',
      endTime: '',
      subjectId: '',
      teacherId: '',
      classId: ''
    });
  };

  return (
    <div className="timetable-management">
      <h2 className="timetable-management__title">Timetable Management</h2>
      <form className="timetable-management__form" onSubmit={handleSubmit}>
        <label htmlFor="day">Day:</label>
       <select
         id="day"
         name="day"
         value={formData.day}
         onChange={(e) => setFormData({ ...formData, day: e.target.value })}
         required
       >
         <option value="">Select Day</option>
         <option value="Monday">Monday</option>
         <option value="Tuesday">Tuesday</option>
         <option value="Wednesday">Wednesday</option>
         <option value="Thursday">Thursday</option>
         <option value="Friday">Friday</option>
       </select>

        <div>
          <label htmlFor="startTime">Start Time:</label>
          <input
            type="text"
            id="startTime"
            name="startTime"
            value={formData.startTime}
            onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
            required
            placeholder="Please enter start time"
          />
        </div>
        <div>
          <label htmlFor="endTime">End Time:</label>
          <input
            type="text"
            id="endTime"
            name="endTime"
            value={formData.endTime}
            onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
            required
            placeholder="Please enter end time"
          />
        </div>
        <div>
          <label htmlFor="subjectId">Subject:</label>
          <select
            id="subjectId"
            name="subjectId"
            value={formData.subjectId}
            onChange={(e) => setFormData({ ...formData, subjectId: e.target.value })}
            required
          >
            <option value="">Select Subject</option>
            {subjects.map((subject) => (
              <option key={subject._id} value={subject._id}>
                {subject.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="teacherId">Teacher:</label>
          <select
            id="teacherId"
            name="teacherId"
            value={formData.teacherId}
            onChange={(e) => setFormData({ ...formData, teacherId: e.target.value })}
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
        <div>
          <label htmlFor="classId">Class:</label>
          <select
            id="classId"
            name="classId"
            value={formData.classId}
            onChange={(e) => setFormData({ ...formData, classId: e.target.value })}
            required
          >
            <option value="">Select Class</option>
            {classes.map((classItem) => (
              <option key={classItem._id} value={classItem._id}>
                {classItem.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Save</button>
        <button type="button" onClick={clearFormData}>
          Clear
        </button>
      </form>
      <div className="timetable-management__schedules">
        <h3 className="timetable-management__schedules-title">Schedules:</h3>
        {schedules.length === 0 ? (
          <p>No schedules available.</p>
        ) : (
          <ul>
            {schedules.map((schedule) => (
              schedule.teacher && schedule.subject ? (
                <li
                  key={schedule._id}
                  onClick={() => handleScheduleClick(schedule)}
                  className={selectedSchedule?._id === schedule._id ? 'active' : ''}
                >
                  {schedule.day} | {schedule.startTime} - {schedule.endTime} | {schedule.subject.name} | {schedule.teacher.name}
                  <button onClick={() => handleDelete(schedule)}>Delete</button>
                </li>
              ) : null
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default TimetableManagement;

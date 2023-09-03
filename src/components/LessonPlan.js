import React, { useState, useEffect } from "react";
import axios from "axios";

const LessonPlan = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [teacher, setTeacher] = useState("");
  const [teachers, setTeachers] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [lessonPlans, setLessonPlans] = useState([]);

  useEffect(() => {
    fetchTeachers();
    fetchLessonPlans();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/teachers");
      setTeachers(response.data);
    } catch (error) {
      console.error("Error fetching teachers", error);
    }
  };

  const fetchLessonPlans = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/lesson-plans");
      setLessonPlans(response.data);
    } catch (error) {
      console.error("Error fetching lesson plans", error);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("file", file);
    formData.append("teacher", teacher);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/lesson-plans",
        formData
      );
      console.log("Lesson plan created:", response.data);
      setSuccessMessage("Form submitted successfully.");
      setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
      fetchLessonPlans();
    } catch (error) {
      console.error("Error creating lesson plan", error);
    }
  };

  return (
    <div>
      <h2>Create Lesson Plan</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div>
          <label htmlFor="file">File:</label>
          <input id="file" type="file" onChange={handleFileChange} />
        </div>
        <div>
          <label htmlFor="teacher">Teacher:</label>
          <select
            id="teacher"
            value={teacher}
            onChange={(e) => setTeacher(e.target.value)}
          >
            <option value="">Select a teacher</option>
            {teachers.map((teacher) => (
              <option key={teacher._id} value={teacher._id}>
                {teacher.name}
              </option>
            ))}
          </select>
        </div>
        {successMessage && <div className="success-message">{successMessage}</div>}
        <button type="submit">Create</button>
      </form>

      <div>
  <h2>Lesson Plans</h2>
  {lessonPlans.map((lessonPlan) => (
    <div key={lessonPlan._id}>
      <h3>{lessonPlan.title}</h3>
      <p>{lessonPlan.description}</p>
      <p>Teacher: {lessonPlan.teacher.name}</p>
      <a
        href={`http://localhost:8080/uploads/${lessonPlan.file}`}
        target="_blank"
        rel="noreferrer"
      >
        View File
      </a>
    </div>
  ))}
</div>

    </div>
  );
};

export default LessonPlan;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Form, Input, Select, Button } from 'antd';
import "./Subject.css";

const { Option } = Select;

function SubjectManagement() {
  const [subjects, setSubjects] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    code: '',
    teacherId: ''
  });

  const [isModalVisible, setIsModalVisible] = useState(false);

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

  const handleSubmit = async () => {
    try {
      if (formData.id) {
        await axios.put(`http://localhost:8080/api/subjects/${formData.id}`, formData);
      } else {
        await axios.post('http://localhost:8080/api/subjects', formData);
      }
      fetchSubjects();
      clearFormData();
      closeModal();
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
    openModal();
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
      id: '',
      name: '',
      code: '',
      teacherId: ''
    });
  };

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <h2>Subject Management</h2>
      <Button type="primary" onClick={openModal}>
        Add Subject
      </Button>

      <h3>Subjects:</h3>
      {subjects.length === 0 ? (
        <p>No subjects available.</p>
      ) : (
        <ul className="subject-list">
          {subjects.map((subject) => {
            const teacher = teachers.find((t) => t._id === subject.teacher);
            return (
              <li key={subject._id} className="subject-item">
                {subject.name} - {subject.code} - {teacher ? teacher.name : ''}
                <button onClick={() => handleEdit(subject)}>Edit</button>
                <button onClick={() => handleDelete(subject._id)}>Delete</button>
              </li>
            );
          })}
        </ul>
      )}

      <Modal
        title={formData.id ? 'Update Subject' : 'Add Subject'}
        visible={isModalVisible}
        onOk={handleSubmit}
        onCancel={closeModal}
      >
        <Form>
          <Form.Item label="Name">
            <Input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </Form.Item>

          <Form.Item label="Code">
            <Input
              type="text"
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              required
            />
          </Form.Item>

          <Form.Item label="Teacher">
            <Select
              value={formData.teacherId}
              onChange={(value) => setFormData({ ...formData, teacherId: value })}
              required
            >
              <Option value="">Select Teacher</Option>
              {teachers.map((teacher) => (
                <Option key={teacher._id} value={teacher._id}>
                  {teacher.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default SubjectManagement;

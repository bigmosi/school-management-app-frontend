import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Modal, Form, Input, Button, Select } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import './Subject.css';

const { Option } = Select;

function SubjectManagement() {
  const [subjects, setSubjects] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    teacherId: ''
  });
  const [modalVisible, setModalVisible] = useState(false);

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
      setModalVisible(false);
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
    setModalVisible(true);
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

  const columns = [
    {
      title: 'Subjects',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code'
    },
    {
      title: 'Teacher',
      dataIndex: 'teacher',
      key: 'teacher',
      render: (teacherId) => {
        const teacher = teachers.find((t) => t._id === teacherId);
        return teacher ? teacher.name : '';
      }
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, subject) => (
        <div>
          <Button onClick={() => handleEdit(subject)}>
            <EditOutlined />
          </Button>
          <Button onClick={() => handleDelete(subject._id)}>
            <DeleteOutlined />
          </Button>
        </div>
      )
    }
  ];

  return (
    <div>
      <h2>Subject Management</h2>
      <Button style={{ backgroundColor: '#001529', color: 'white', height: "45px", width: "120px" }} onClick={() => setModalVisible(true)}>
        Add Subject
      </Button>
      <Modal
        title={formData.id ? 'Update Subject' : 'Add Subject'}
        visible={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          clearFormData();
        }}
        footer={[
          <Button key="cancel" style={{ backgroundColor: 'red', color: 'white', height: "45px", width: "100px" }} onClick={() => setModalVisible(false)}>
            Cancel
          </Button>,
          <Button key="submit" style={{ backgroundColor: '#001529', color: 'white', height: "45px", width: "120px" }} onClick={handleSubmit}>
            {formData.id ? 'Update Subject' : 'Add Subject'}
          </Button>
        ]}
      >
        <Form layout="vertical">
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please enter subject name' }]}
          >
            <Input
              placeholder="Please enter subject name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item
            label="Code"
            name="code"
            rules={[{ required: true, message: 'Please enter subject code' }]}
          >
            <Input
              placeholder="Please enter subject code"
              value={formData.code}
              onChange={(e) =>
                setFormData({ ...formData, code: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item
            label="Teacher"
            name="teacherId"
            rules={[{ required: true, message: 'Please select a teacher' }]}
          >
            <Select
              placeholder="Please select a teacher"
              value={formData.teacherId}
              onChange={(value) =>
                setFormData({ ...formData, teacherId: value })
              }
            >
              {teachers.map((teacher) => (
                <Option key={teacher._id} value={teacher._id}>
                  {teacher.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      <h3>Subjects:</h3>
      {subjects.length === 0 ? (
        <p>No subjects available.</p>
      ) : (
        <Table dataSource={subjects} columns={columns} rowKey="_id" />
      )}
    </div>
  );
}

export default SubjectManagement;

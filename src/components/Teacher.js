import React, { useState } from 'react';
import axios from 'axios';
import { Table, Button, Form, Input } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import "./Teacher.css";

function TeacherManagement({ teachers, formData, setFormData, fetchTeachers }) {
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  const handleSubmit = async () => {
    try {
      if (formData.id) {
        // Update teacher
        await axios.put(`http://localhost:8080/api/teachers/${formData.id}`, formData);
      } else {
        // Create teacher
        await axios.post('http://localhost:8080/api/teachers', formData);
      }
      fetchTeachers();
      clearFormData();
    } catch (error) {
      console.error('Error submitting teacher:', error);
      console.log('Error response:', error.response); // Log the error response
    }
  };

  const handleEdit = (teacher) => {
    setFormData({
      id: teacher._id,
      name: teacher.name,
      email: teacher.email
    });
  };

  const handleDelete = async (teacherId) => {
    try {
      await axios.delete(`http://localhost:8080/api/teachers/${teacherId}`);
      fetchTeachers();
      clearFormData();
    } catch (error) {
      console.error('Error deleting teacher:', error);
    }
  };

  const clearFormData = () => {
    setFormData({
      name: '',
      email: ''
    });
  };

  return (
    <div>
      <h2>Teacher Management</h2>
      <div className="teacher-button">
        <Button
          style={{ backgroundColor: '#001529', color: 'white', height: "45px", width: "120px" }}
          onClick={() => handleEdit(null)}
        >
          Add Teacher
        </Button>
      </div>

      <Form onFinish={handleSubmit}>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please enter teacher name' }]}
        >
          <Input placeholder="Please enter teacher name" />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please enter email address' }]}
        >
          <Input placeholder="Please enter email address" />
        </Form.Item>
        <Button
          style={{ backgroundColor: '#001529', color: 'white', height: "45px", width: "120px" }}
          type="primary"
          htmlType="submit"
        >
          {formData.id ? 'Update Teacher' : 'Add Teacher'}
        </Button>
      </Form>

      <h3>Teachers: {teachers.length}</h3>
      {teachers.length === 0 ? (
        <p>No teachers available.</p>
      ) : (
        <Table
          dataSource={teachers}
          rowKey="_id"
        >
          <Table.Column
            title="Name"
            dataIndex="name"
            key="name"
            rowClassName={() => 'hoverable-row'}
            render={(text, teacher) => (
              <Link to={`/teacher/${teacher._id}`}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  {teacher.image && (
                    <img
                      src={`http://localhost:8080/uploads/${teacher.image}`}
                      alt={teacher.name}
                      style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                    />
                  )}
                  <span style={{ marginLeft: "10px" }}>{teacher.name}</span>
                </div>
              </Link>
            )}
          />
          <Table.Column title="Email" dataIndex="email" key="email" />
          <Table.Column title="Class" dataIndex="classroom" key="classroom" />
          <Table.Column title="Gender" dataIndex="gender" key="gender" />
          <Table.Column
            title="Actions"
            key="actions"
            render={(text, teacher) => (
              <div>
                <Button
                  className="button-collections"
                  onClick={() => handleEdit(teacher)}
                >
                  <EditOutlined />
                </Button>
                <Button onClick={() => handleDelete(teacher._id)}>
                  <DeleteOutlined />
                </Button>
              </div>
            )}
          />
        </Table>
      )}
    </div>
  );
}

export default TeacherManagement;

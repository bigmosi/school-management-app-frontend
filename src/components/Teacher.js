import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Modal, Form, Input, Button } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import "./Teacher.css";

function TeacherManagement({ teachers, formData, setFormData, fetchTeachers }) {
  const [modalVisible, setModalVisible] = useState(false);

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
      setModalVisible(false);
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
    setModalVisible(true);
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
      <Button type="primary" onClick={() => setModalVisible(true)}>
        Add Teacher
      </Button>
      <Modal
        title={formData.id ? 'Update Teacher' : 'Add Teacher'}
        visible={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          clearFormData();
        }}
        footer={[
          <Button key="cancel" onClick={() => setModalVisible(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleSubmit}>
            {formData.id ? 'Update Teacher' : 'Add Teacher'}
          </Button>
        ]}
      >
        <Form onFinish={handleSubmit}>
          <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please enter teacher name' }]}>
            <Input placeholder="Please enter teacher name" />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please enter email address' }]}>
            <Input placeholder="Please enter email address" />
          </Form.Item>
        </Form>
      </Modal>

      <h3>Teachers:</h3>
      {teachers.length === 0 ? (
        <p>No teachers available.</p>
      ) : (
        <Table dataSource={teachers} rowKey="_id">
          <Table.Column title="Name" dataIndex="name" key="name" />
          <Table.Column title="Email" dataIndex="email" key="email" />
          <Table.Column
            title="Actions"
            key="actions"
            render={(text, teacher) => (
              <div>
                <Button className="button-collections" onClick={() => handleEdit(teacher)}><EditOutlined /></Button>
                <Button onClick={() => handleDelete(teacher._id)}><DeleteOutlined /></Button>
              </div>
            )}
          />
        </Table>
      )}
    </div>
  );
}

export default TeacherManagement;

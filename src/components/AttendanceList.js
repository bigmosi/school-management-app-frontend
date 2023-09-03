import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Modal, Form, Input, Select, Button, Progress } from 'antd';
import './AttendanceList.css';
import Spinner from './Spinner';

const { Option } = Select;

const AttendanceList = ({ setAttendancePercent }) => {
  const [attendanceList, setAttendanceList] = useState([]);
  const [studentNames, setStudentNames] = useState({});
  const [newAttendanceModalVisible, setNewAttendanceModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchAttendanceList();
  }, []);

  useEffect(() => {
    calculateAttendancePercentage();
  }, [attendanceList]);


  const fetchAttendanceList = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/attendance');
      setAttendanceList(response.data);
      fetchStudentNames(response.data);
    } catch (error) {
      console.error('Error fetching attendance list:', error);
    }
  };

  const fetchStudentNames = async (attendanceData) => {
    const studentIds = attendanceData.map(attendance => attendance.student);
    const uniqueStudentIds = [...new Set(studentIds)];

    try {
      const response = await axios.get(`http://localhost:8080/api/students?ids=${uniqueStudentIds.join(',')}`);
      const namesMap = {};
      response.data.forEach(student => {
        namesMap[student.id] = student.name;
      });
      setStudentNames(namesMap);
    } catch (error) {
      console.error('Error fetching student names:', error);
    }
  };

  const handleAddAttendance = () => {
    setNewAttendanceModalVisible(true);
  };

  const handleCancelNewAttendance = () => {
    setNewAttendanceModalVisible(false);
    form.resetFields();
  };

  const handleNewAttendanceSubmit = async (values) => {
    try {
      const response = await axios.post('http://localhost:8080/api/attendance', values);
      setAttendanceList([...attendanceList, response.data]);
      setSuccessMessage('Attendance submitted successfully');

      form.resetFields();
      setNewAttendanceModalVisible(false);

      setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
    } catch (error) {
      console.error('Error adding new attendance:', error);
    }
  };

  const calculateAttendancePercentage = () => {
    if (attendanceList.length === 0) {
      setAttendancePercent(0);
    } else {
      const presentCount = attendanceList.filter(attendance => attendance.status === 'Present').length;
      const attendancePercentage = (presentCount / attendanceList.length) * 100;
      setAttendancePercent(attendancePercentage);
    }
  }

  const columns = [
    {
      title: 'Student',
      dataIndex: 'student',
      key: 'student',
      render: (student) => studentNames[student],
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
  ];

  if (attendanceList.length === 0) {
    return <Spinner />
  }

  return (
    <div className="attendance-container">
      <div>
        <div className="total-record">
          Attendance: {attendanceList.length}
        </div>
      <div className="button-conatiner">
        <Button style={{ backgroundColor: '#001529', color: 'white', height: "45px", width: "150px" }} onClick={handleAddAttendance}>Add Attendance</Button>
      </div>
        <Table columns={columns} dataSource={attendanceList} className="table-data" />
        <Modal
          title={<span style={{ fontFamily: "lato", fontSize: "20px", textAlign: "center" }}>Add New Attendance</span>}
          visible={newAttendanceModalVisible}
          onCancel={handleCancelNewAttendance}
          footer={null}
        >
          <Form form={form} onFinish={handleNewAttendanceSubmit} className="attendance-form">
  <Form.Item
    name="student"
    label="Student"
    className="text-input"
    rules={[{ required: true, message: 'Please select a student' }]}
  >
    <Select placeholder="Select a student" className="select-input">
      {Object.entries(studentNames).map(([id, name]) => (
        <Option key={id} value={id}>{name}</Option>
      ))}
    </Select>
  </Form.Item>

  <Form.Item
    name="date"
    label="Date"
    rules={[{ required: true, message: 'Please enter a date' }]}
  >
    <Input type="date" className="text-input" />
  </Form.Item>

  <Form.Item
    name="status"
    label="Status"
    rules={[{ required: true, message: 'Please select a status' }]}
  >
    <Select placeholder="Select a status" className="select-input">
      <Option value="Present">Present</Option>
      <Option value="Absent">Absent</Option>
    </Select>
  </Form.Item>

  {successMessage && <div className="success-message">{successMessage}</div>}

  <div className="attendance-button">
    <Button style={{ backgroundColor: '#001529', color: 'white', height: "45px", width: "100px" }} htmlType="submit">Submit</Button>
  </div>
</Form>

        </Modal>
      </div>
    </div>
  );
};

export default AttendanceList;

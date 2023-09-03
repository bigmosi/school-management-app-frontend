import React from 'react';
import LoginForm from "../components/LoginForm";
import { Card, Col, Row, Progress } from 'antd';
import './Home.css';
const HomePage = ({students, teachers, attendancePercent}) => {
  return (
    <div className="homepage">

      <h1>Welcome to new way University of Eduma</h1>
      <p>
        Manage your school efficiently with our comprehensive school management
        app.
      </p>
      <h3>How to enroll your child to a class ?</h3>

   <Row gutter={16}>
    <Col span={8}>
      <Card title={<span className='card-container'>Students</span>} bordered={false} className="card-container">
        {students.length}
      </Card>
    </Col>
    <Col span={8}>
      <Card title={<span className='teacher-container'>Teachers</span>} bordered={false} className="teacher-container">
        {teachers.length}
      </Card>
    </Col>
    <Col span={8}>
      <Card title={<span className='semester-container'>Semester</span>} bordered={false} className="semester-container">
        3
      </Card>
    </Col>
  </Row>
  <Card className="attendance-container  progress-bar">
    <h2>Attendance</h2>
    <Progress type="dashboard" percent={attendancePercent} format={() => `${attendancePercent.toFixed(2)}%`} />
  </Card>
  <LoginForm />
  </div>

  );
};

export default HomePage;

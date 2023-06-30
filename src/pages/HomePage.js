import React from 'react';
import { Card, Col, Row, Progress } from 'antd';
import './Home.css';


const HomePage = ({students, teachers, attendancePercent}) => {
  return (
    <div className="homepage">
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
  </div>
  );
};

export default HomePage;

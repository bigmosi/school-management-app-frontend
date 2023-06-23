import React from 'react';
import { Card, Col, Row } from 'antd';
import './Home.css';


const HomePage = ({students}) => {
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
        100
      </Card>
    </Col>
    <Col span={8}>
      <Card title={<span className='semester-container'>Semester</span>} bordered={false} className="semester-container">
        3
      </Card>
    </Col>
  </Row>
      {students.length}
      <h1>Welcome to new way University of Eduma</h1>
      <p>Manage your school efficiently with our comprehensive school management app.</p>
      <h3>How to enroll your child to a class ?</h3>
    </div>
  );
};

export default HomePage;

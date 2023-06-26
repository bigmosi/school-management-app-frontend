import React, { useState, useEffect } from 'react';
import { PieChartOutlined, UserOutlined, CodeOutlined, FileTextOutlined, SolutionOutlined, CheckCircleOutlined, DashboardOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu } from 'antd';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ClassList from './ClassList';
import axios from 'axios';
import StudentList from './StudentList';
import StudentForm from './StudentForm';
import StudentDetails from './StudentDetails';
import AdmissionForm from './Admission';
import AttendanceList from './AttendanceList';
import HomePage from '../pages/HomePage';
import './SidebarDashboard.css';
import './theme.less';
import AttendanceReport from './ReportAttendance';
import Timetable from './Timetable';
import TeacherManagement from './Teacher';
import SubjectManagement from './Subject';
import { useAuth } from '../auth/useAuth';

const { Header, Content, Footer, Sider } = Layout;

const SidebarDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

  useEffect(() => {
  }, []);

  
  useEffect(() => {
    fetchStudents();
    fetchTeachers();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/students');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
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

  const roles = {
    ADMIN: 'admin',
    TEACHER: 'teacher',
    STUDENT: 'student',
  };

  const permissions = {
    DASHBOARD: 'dashboard',
    STUDENTS: 'students',
    TEACHERS: 'teachers',
  };

  const { user } = useAuth();

  const items = [
    { key: 'home', icon: <DashboardOutlined />, label: 'Dashboard', path: '/home', roles: [roles.ADMIN, roles.TEACHER, roles.STUDENT] },
    { key: 'students', icon: <UserOutlined />, label: 'Student', path: '/students', roles: [roles.ADMIN, roles.TEACHER] },
    { key: 'teachers', icon: <CodeOutlined />, label: 'Teacher', path: '/teachers', roles: [roles.ADMIN] },
  ];

  const renderMenuItems = () => {
    const filteredItems = items.filter(item => {
      if (!item.roles.includes(user?.role)) {
        return false;
      }

      switch (item.key) {
        case 'home':
          return user?.permissions.includes(permissions.DASHBOARD);
        case 'students':
          return user?.permissions.includes(permissions.STUDENTS);
        case 'teachers':
          return user?.permissions.includes(permissions.TEACHERS);
        default:
          return true;
      }
    });

    return filteredItems.map(item => (
      <Menu.Item key={item.key} icon={item.icon}>
        <Link to={item.path}>{item.label}</Link>
      </Menu.Item>
    ));
  };

  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
          <div className="demo-logo-vertical" style={{ padding: '10px' }}>
            <img 
              src="/images/profile.jpeg" 
              alt="Logo" 
              style={{ color: "#fff", fontFamily: "lato"}}
              className="logo"
               />
          </div>
          <Menu theme="dark" defaultSelectedKeys={['home']} mode="inline">
            {renderMenuItems()}
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>All Students</Breadcrumb.Item>
            </Breadcrumb>
            <div>
              <Routes>
              <Route path="/home" element={<HomePage students={students} teachers={teachers} />} />
                <Route path="/students" element={<StudentList students={students} />} />
                <Route path="/students/:id" element={<StudentDetails />} />
                <Route path="/class" element={<ClassList />} />
                <Route path="/add-student" element={<StudentForm />} />
                <Route path="/admission" element={<AdmissionForm />} />
                <Route path="/attendance" element={<AttendanceList />} />
                <Route path="/attendance-report" element={<AttendanceReport />} />
                <Route path="/time-table" element={<Timetable />} />
                <Route path="/teacher" element={<TeacherManagement teachers={teachers} formData={formData} setFormData={setFormData} fetchTeachers={fetchTeachers} />} />
                <Route path="/subject" element={<SubjectManagement />} />

              </Routes>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Design ©2023 Created by Kinyera Amos</Footer>
        </Layout>
      </Layout>
    </Router>
  );
};

export default SidebarDashboard;


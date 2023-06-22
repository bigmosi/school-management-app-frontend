import React, { useState } from 'react';
import { FileOutlined, PieChartOutlined, UserOutlined, TeamOutlined, DesktopOutlined, ReadOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import StudentList from './StudentList';
import StudentForm from './StudentForm';
import StudentDetails from './StudentDetails';
import AdmissionForm from './Admission';
import AttendanceList from './AttendanceList';
import HomePage from '../pages/HomePage';
const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children, path) {
  return {
    key,
    icon,
    children,
    label,
    path,
  };
}

const items = [
  getItem('Home Page', 'home', <PieChartOutlined />, null, '/home'),
  getItem('Student List', 'students', <UserOutlined />, null, '/students'),
  getItem('Admission Form', 'admission', <UserOutlined />, null, '/admission'),
  getItem('Attendance List', 'attendance', <DesktopOutlined />, null, '/attendance'),
];

const SidebarDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div className="demo-logo-vertical" />
          <Menu theme="dark" defaultSelectedKeys={['home']} mode="inline">
            {items.map(item => (
              <Menu.Item key={item.key} icon={item.icon}>
                <Link to={item.path}>{item.label}</Link>
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
              <Routes>
                <Route path="/home" element={<HomePage />} />
                <Route path="/students" element={<StudentList />} />
                <Route path="/students/:id" element={<StudentDetails />} />
                <Route path="/add-student" element={<StudentForm />} />
                <Route path="/admission" element={<AdmissionForm />} />
                <Route path="/attendance" element={<AttendanceList />} />
              </Routes>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    </Router>
  );
};

export default SidebarDashboard;

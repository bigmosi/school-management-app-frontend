import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import {
  FileOutlined,
  PieChartOutlined,
  UserOutlined,
  DesktopOutlined,
} from "@ant-design/icons";
import StudentList from "./StudentList";
import StudentForm from "./StudentForm";
import StudentDetails from "./StudentDetails";
import AdmissionForm from "./Admission";
import AttendanceList from "./AttendanceList";
import HomePage from "../pages/HomePage";
import SignupForm from "./SignupForm";
import "./SidebarDashboard.css";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const SidebarDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={["home"]} mode="inline">
            <Menu.Item key="home" icon={<PieChartOutlined />}>
              <Link to="/">Dashboard</Link>
            </Menu.Item>
            <SubMenu key="student" icon={<UserOutlined />} title="Student">
              <Menu.Item key="studentList">
                <Link to="/students">Student List</Link>
              </Menu.Item>
              <Menu.Item key="addStudent">
                <Link to="/add-student">Add Student</Link>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="admission" icon={<FileOutlined />}>
              <Link to="/admission">Admission</Link>
            </Menu.Item>
            <Menu.Item key="attendance" icon={<DesktopOutlined />}>
              <Link to="/attendance">Attendance</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ padding: 0 }} />
          <Content style={{ margin: "0 16px" }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/signup" element={<SignupForm/>} />
              <Route path="/students" element={<StudentList />} />
              <Route path="/students/:id" element={<StudentDetails />} />
              <Route path="/add-student" element={<StudentForm />} />
              <Route path="/admission" element={<AdmissionForm />} />
              <Route path="/attendance" element={<AttendanceList />} />
            </Routes>
            {/* Additional contents */}
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Design © 2023 Created by Kinyera Amos
          </Footer>
        </Layout>
      </Layout>
    </Router>
  );
};

export default SidebarDashboard;

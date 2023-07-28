import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SidebarDashboard from './components/SidebarDashboard';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import ProtectedRoute from './components/protectedRoute';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/*" element={
          <ProtectedRoute element={<SidebarDashboard />} />
        } />
      </Routes>
    </Router>
  );
};

export default App;

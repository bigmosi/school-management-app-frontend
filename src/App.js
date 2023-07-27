import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SidebarDashboard from './components/SidebarDashboard';
import RegistrationForm from './components/RegistrationForm';
const App = () => {
  return (
   <Router>
     <Routes>
      <Route path="/" element={<SidebarDashboard />} />
      <Route path="/register" element={<RegistrationForm />} />
     </Routes>
   </Router>
    
  );
};

export default App;

import React from 'react';
import {
  BrowserRouter as Router, Routes, Route, useParams,
} from 'react-router-dom';
import HomePage from './pages/HomePage';
import StudentList from './components/StudentList';
import StudentForm from './components/StudentForm';
import StudentDetails from './components/StudentDetails';
import AdmissionForm from './components/Admission';
import AttendanceList from './components/AttendanceList';
import Navigation from './components/Navigation';

const App = () => {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/students" element={<StudentList />} />
        <Route path="/add-student" element={<StudentForm />} />
        <Route path="/students/:id" element={<StudentDetails />} />
        <Route path="/admission" element={<AdmissionForm />} />
        <Route path="/attendance" element={<AttendanceList />} />
      </Routes>
    </Router>
    
  );
};

export default App;

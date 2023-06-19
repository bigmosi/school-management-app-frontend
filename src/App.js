import React from 'react';
import {
  BrowserRouter as Router, Routes, Route, useParams,
} from 'react-router-dom';
import HomePage from './pages/HomePage';
import StudentPage from './pages/StudentPage';
import StudentForm from './components/StudentForm';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/students" element={<StudentPage />} />
        <Route path="/add-student" element={<StudentForm />} />
      </Routes>
    </Router>
  );
};

export default App;

import StudentForm from "./components/StudentForm";
import StudentProfile from "./components/StudentProfile";


const App = () => {
  
  return (
    <div>
      <h1>School Management System</h1>
      <StudentForm />
      <hr />
      <h2>Student Profiles</h2>
      {/* Render a list of student profiles */}
      {/* Use the StudentProfile component and pass the studentId */}
      <StudentProfile />
    </div>
  );
};

export default App;
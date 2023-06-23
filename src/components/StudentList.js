import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input, Modal, Pagination } from 'antd';
import './StudentList.css';

const { Search } = Input;

const StudentList = ({ students }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 7; // Number of students to display per page

  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1); // Reset current page when performing a search
  };

  const handleStudentClick = (student) => {
    setSelectedStudent(student);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setSelectedStudent(null);
    setIsModalVisible(false);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate the range of students to display based on the current page and page size
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const displayedStudents = filteredStudents.slice(startIndex, endIndex);

  return (
    <div className="student-list">
      <div>
        <Search
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="search-item"
        />
      </div>
      <h2>Students</h2>
      <div className="new-student">
        <Link to="/add-student" className="add-student-link">+ Add Student</Link>
        {/* <Link to="/attendance" className="add-student-link">Attendance</Link> */}
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Date of Birth</th>
              <th>Gender</th>
              <th>Address</th>
              <th>Email</th>
              <th>Contact Number</th>
            </tr>
          </thead>
          <tbody>
            {displayedStudents.map((student) => (
              <tr key={student.id} className="list-container">
                <td>
                  <span 
                    onClick={() => handleStudentClick(student)} 
                    className="modal"
                  >
                    {student.name}
                  </span>
                </td>
                <td>{student.dateOfBirth}</td>
                <td>{student.gender}</td>
                <td>{student.address}</td>
                <td>{student.contact.email}</td>
                <td>{student.contact.contactNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={filteredStudents.length}
        onChange={handlePageChange}
        className="pagination"
      />
      <Modal
        title={selectedStudent ? selectedStudent.name : ''}
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
        className="modal"
        style={{ height: '300px' }}
      >
        {selectedStudent && (
          <div>
            <p>Date of Birth: {selectedStudent.dateOfBirth}</p>
            <p>Gender: {selectedStudent.gender}</p>
            <p>Address: {selectedStudent.address}</p>
            <p>Email: {selectedStudent.contact.email}</p>
            <p>Contact Number: {selectedStudent.contact.contactNumber}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default StudentList;

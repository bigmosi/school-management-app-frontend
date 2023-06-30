import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input, Modal, Pagination, Table } from 'antd';
import './StudentList.css';

const { Search } = Input;

const StudentList = ({ students }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12; // Number of students to display per page

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

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text, record) => (
        <span onClick={() => handleStudentClick(record)} className="modal">
          {text}
        </span>
      ),
    },
    {
      title: 'Date of Birth',
      dataIndex: 'dateOfBirth',
      render: (text) => <span className="table-header-cell">{text}</span>,
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      render: (text) => <span className="table-header-cell">{text}</span>,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      render: (text) => <span className="table-header-cell">{text}</span>,
    },
    {
      title: 'Email',
      dataIndex: ['contact', 'email'],
      render: (text) => <span className="table-header-cell">{text}</span>,
    },
    {
      title: 'Contact Number',
      dataIndex: ['contact', 'contactNumber'],
      render: (text) => <span className="table-header-cell">{text}</span>,
    },
  ];

  return (
    <div className="student-list">
      <div className="new-student">
        <Link to="/add-student" className="add-student-link">New Student</Link>
      </div>
      <div>
        <input
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="search-item" />
      </div>
      <h2>Students: {students.length}</h2>
      <div className="table-container">
        <Table
          dataSource={displayedStudents}
          columns={columns}
          rowKey="id"
          pagination={false}
          className="custom-table"
        />
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={filteredStudents.length}
        onChange={handlePageChange}
        className="pagination"
      />
            </div>

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

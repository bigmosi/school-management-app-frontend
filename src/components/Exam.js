import axios from "axios";
import React, { useState, useEffect } from "react";
import { Table } from "antd";
import { Modal, Form, Input, DatePicker, TimePicker } from "antd";

const ExamScheduleForm = () => {
  const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [examSchedules, setExamSchedules] = useState([]);

  useEffect(() => {
    fetchExamSchedules();
  }, []);

  const fetchExamSchedules = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/exam-schedules");
      const { data } = response;
      setExamSchedules(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching exam schedules", error);
    }
  };

  const handleModalOk = () => {
    form.submit();
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    form.resetFields();
  };

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post("http://localhost:8080/api/exam-schedules", values);

      setSuccessMessage("Exam schedule created successfully");
      setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
      resetForm();
      fetchExamSchedules(); // Update the exam schedule list after creating a new schedule
    } catch (error) {
      console.error("Error creating exam schedule:", error);
    }

    setModalVisible(false);
    form.resetFields();
  };

  const resetForm = () => {
    form.resetFields();
  };

  return (
    <div>
      <button onClick={() => setModalVisible(true)}>Create Exam Schedule</button>
      <Modal
        visible={modalVisible}
        title="Create Exam Schedule"
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText="Create"
        cancelText="Cancel"
      >
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item
            name="examName"
            label="Exam Name"
            rules={[{ required: true, message: "Please enter the exam name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="examDate"
            label="Exam Date"
            rules={[{ required: true, message: "Please select the exam date" }]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            name="examTime"
            label="Exam Time"
            rules={[{ required: true, message: "Please select the exam time" }]}
          >
            <TimePicker format="HH:mm" />
          </Form.Item>
          <Form.Item
            name="examDuration"
            label="Exam Duration"
            rules={[{ required: true, message: "Please enter the exam duration" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="additionalInfo" label="Additional Information">
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
      {successMessage && <div className="success-message">{successMessage}</div>}
      <ExamScheduleList examSchedules={examSchedules} />
    </div>
  );
};

const ExamScheduleList = ({ examSchedules }) => {
  const columns = [
    {
      title: "Exam Name",
      dataIndex: "examName",
      key: "examName",
    },
    {
      title: "Exam Date",
      dataIndex: "examDate",
      key: "examDate",
    },
    {
      title: "Exam Duration",
      dataIndex: "examDuration",
      key: "examDuration",
    },
    {
      title: "Exam Time",
      dataIndex: "examTime",
      key: "examTime",
    },
    {
      title: "Additional Info",
      dataIndex: "additionalInfo",
      key: "additionalInfo",
    },
  ];

  return <Table dataSource={examSchedules} columns={columns} rowKey="_id" />;
};

export default ExamScheduleForm;

import React from "react";
import { Form, Input, Select, Button } from "antd";
import axios from "axios";

const { Option } = Select;

const AdmissionForm = () => {
  const [form] = Form.useForm(); // Access the form instance

  const onFinish = (values) => {
    axios
      .post("http://localhost:8080/api/admissions/", values)
      .then((response) => {
        console.log("Form submitted:", response.data);
        form.resetFields(); // Reset form fields after submission
      })
      .catch((error) => {
        console.log("Error submitting form:", error);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Form validation failed:", errorInfo);
  };

  return (
    <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
      <Form.Item name="name" label="Full Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item name="class" label="Class" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item
        name={["contact", "email"]}
        label="Email"
        rules={[{ required: true, type: "email" }]}
      >
        <Input placeholder="Email" />
      </Form.Item>

      <Form.Item
        name={["contact", "contactNumber"]}
        label="Contact Phone"
        rules={[{ required: true, pattern: /^\d{10}$/ }]}
      >
        <Input placeholder="Contact Number" />
      </Form.Item>

      <Form.Item name="address" label="Address">
        <Input />
      </Form.Item>

      <Form.Item name="dateOfBirth" label="Date Of Birth">
        <Input type="date" />
      </Form.Item>

      <Form.Item name="placeOfBirth" label="Place Of Birth">
        <Input />
      </Form.Item>

      <Form.Item name="district" label="District">
        <Input />
      </Form.Item>

      <Form.Item name="nationality" label="Nationality">
        <Input />
      </Form.Item>

      <Form.Item name="religion" label="Religion" rules={[{ required: true }]}>
        <Select placeholder="Select Religion">
          <Option value="Christianity">Christianity</Option>
          <Option value="Islam">Islam</Option>
          <Option value="Hinduism">Hinduism</Option>
          <Option value="Buddhism">Buddhism</Option>
          <Option value="Judaism">Judaism</Option>
          <Option value="other">Other</Option>
        </Select>
      </Form.Item>

      <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
        <Select placeholder="Select Gender">
          <Option value="Male">Male</Option>
          <Option value="Female">Female</Option>
          <Option value="Other">Other</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="behaviour"
        label="Behaviour"
        rules={[{ required: true }]}
      >
        <Select placeholder="Select Behaviour">
          <Option value="Mild">Mild</Option>
          <Option value="Normal">Normal</Option>
          <Option value="Hyperactive">Hyperactive</Option>
        </Select>
      </Form.Item>

      <Form.Item name="illness" label="Illness">
        <Input />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AdmissionForm;

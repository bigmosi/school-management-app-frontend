import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button } from "antd";
import "./Announcement.css";


const AnnouncementForm = ({ visible, onSubmit, onCancel }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, content });
    setTitle("");
    setContent("");
  };

  return (
    <Modal
      title="Create Announcement"
      visible={visible}
      onCancel={onCancel}
      footer={null}
      className="announcement-model"
    >
      <form onSubmit={handleSubmit} className="announcement-form">
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            required
            className="form-control"
          ></textarea>
        </div>
        <Button type="primary" htmlType="submit">
          Create
        </Button>
      </form>
    </Modal>
  );
};

const Announcement = () => {
  const [showModal, setShowModal] = useState(false);
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/annoucements");
      setAnnouncements(response.data);
    } catch (error) {
      console.error("Error fetching announcements");
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      const response = await axios.post("http://localhost:8080/api/annoucements", formData);
      alert("Announcement created successfully");
      fetchAnnouncements(); // Refresh the announcements after creating a new one
      setShowModal(false);
    } catch (error) {
      console.error("Error creating announcement");
      alert("Error occurred announcement.");
    }
  };

  return (
    <div>
      <Button type="primary" onClick={() => setShowModal(true)}>
        Create Announcement
      </Button>

      <AnnouncementForm
        visible={showModal}
        onSubmit={handleFormSubmit}
        onCancel={() => setShowModal(false)}
      />

      <div  className="announcement-list">
        <h2>All Announcements</h2>
        {announcements.length === 0 ? (
          <p>No announcements available</p>
        ) : (
          <ul>
            {announcements.map((announcement) => (
              <li key={announcement.id}>
                <h3>{announcement.title}</h3>
                <p>{announcement.content}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Announcement;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, notification, Badge, Pagination } from "antd";
import { BellOutlined } from "@ant-design/icons";
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
  const [unreadAnnouncements, setUnreadAnnouncements] = useState([]);
  const [readAnnouncementIds, setReadAnnouncementIds] = useState([]);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  useEffect(() => {
    // Filter unread announcements from the list
    const filteredAnnouncements = announcements.filter(
      (announcement) =>
        !announcement.read && !readAnnouncementIds.includes(announcement.id)
    );
    setUnreadAnnouncements(filteredAnnouncements);
  }, [announcements, readAnnouncementIds]);

  useEffect(() => {
    const storedReadAnnouncementIds = JSON.parse(localStorage.getItem("readAnnouncementIds"));
    if (storedReadAnnouncementIds) {
      setReadAnnouncementIds(storedReadAnnouncementIds);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("readAnnouncementIds", JSON.stringify(readAnnouncementIds));
  }, [readAnnouncementIds]);

  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/announcements");
      const fetchedAnnouncements = response.data;
      setAnnouncements(fetchedAnnouncements);
    } catch (error) {
      console.error("Error fetching announcements:", error);
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      const response = await axios.post("http://localhost:8080/api/announcements", formData);
      alert("Announcement created successfully");
      fetchAnnouncements();
      setShowModal(false);
    } catch (error) {
      console.error("Error creating announcement");
      alert("Error occurred while creating the announcement.");
    }
  };

  const markAnnouncementAsRead = (announcementId) => {
    setReadAnnouncementIds((prevIds) => [...prevIds, announcementId]);
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

      <div className="announcement-list">
        <h2>All Announcements</h2>
        {announcements.length === 0 ? (
          <p>No announcements available</p>
        ) : (
          <ul className="container">
            {announcements.map((announcement) => (
              <li key={announcement.id} className="list-container">
                <h3>{announcement.title}</h3>
                <p>{announcement.content}</p>
                {!readAnnouncementIds.includes(announcement.id) && (
                  <Badge count="New" className="announcement-badge" />
                )}
                <Button onClick={() => markAnnouncementAsRead(announcement.id)}>
                  Mark as Read
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};


export default Announcement;

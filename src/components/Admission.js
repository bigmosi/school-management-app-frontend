import axios from "axios";
import React, { useState, useEffect } from "react";

const AdmissionForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    class: "",
    contactNumber: "",
    email: "",
    address: "",
    dateOfBirth: "",
    placeOfBirth: "",
    district: "",
    nationality: "",
    religion: "",
    gender: "",
    behaviour: "",
    illness: ""
  });

  useEffect(() => {
    fetchFormData();
  }, []);

  const fetchFormData = () => {
    axios
      .get("http://localhost:8080/api/admissions/")
      .then((response) => {
        setFormData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching form data:", error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8080/api/admissions/", formData)
      .then((response) => {
        console.log("Form submitted:", response.data);
        // Clear form fields after submission
        setFormData({
          name: "",
          class: "",
          contactNumber: "",
          email: "",
          address: "",
          dateOfBirth: "",
          placeOfBirth: "",
          district: "",
          nationality: "",
          religion: "",
          gender: "",
          behaviour: "",
          illness: ""
        });
      })
      .catch((error) => {
        console.log("Error submitting form:", error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Check if the name contains a dot indicating nested property
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prevData) => ({
        ...prevData,
        [parent]: {
          ...prevData[parent],
          [child]: value
        }
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  console.log("formData:", formData);

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="fullName">Full Name:</label>
      <input
        type="text"
        id="fullName"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />

      <label htmlFor="class">Class:</label>
      <input
        type="text"
        id="class"
        name="class"
        value={formData.class}
        onChange={handleChange}
      />

      <label>Email:</label>
      <input
        type="email"
        name="contact.email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />

      <label>Contact Phone:</label>
      <input
        type="tel"
        name="contact.contactNumber"
        value={formData.contactNumber}
        onChange={handleChange}
        placeholder="Contact Number"
        required
      />

      <label htmlFor="address">Address: </label>
      <input
        type="text"
        id="address"
        name="address"
        value={formData.address}
        onChange={handleChange}
      />

      <label htmlFor="dateOfBirth">Date Of Birth: </label>
      <input
        type="date"
        id="dateOfBirth"
        name="dateOfBirth"
        value={formData.dateOfBirth}
        onChange={handleChange}
      />

      <label htmlFor="placeOfBirth">Place Of Birth: </label>
      <input
        type="text"
        id="placeOfBirth"
        name="placeOfBirth"
        value={formData.placeOfBirth}
        onChange={handleChange}
      />

      <label htmlFor="district">District: </label>
      <input
        type="text"
        id="district"
        name="district"
        value={formData.district}
        onChange={handleChange}
      />

      <label htmlFor="nationality">Nationality: </label>
      <input
        type="text"
        id="nationality"
        name="nationality"
        value={formData.nationality}
        onChange={handleChange}
      />

      <label htmlFor="religion">Religion: </label>
      <select
        name="religion"
        value={formData.religion}
        onChange={handleChange}
        required
      >
        <option value="">Select Religion</option>
        <option value="Christianity">Christianity</option>
        <option value="Islam">Islam</option>
        <option value="Hinduism">Hinduism</option>
        <option value="Buddhism">Buddhism</option>
        <option value="Judaism">Judaism</option>
        <option value="other">Other</option>
      </select>

      <label htmlFor="gender">Gender: </label>
      <select
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        required
      >
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>

      <label htmlFor="behaviour">Behaviour:</label>
      <select
        name="behaviour"
        value={formData.behaviour}
        onChange={handleChange}
        required
      >
        <option value="">Select Behaviour</option>
        <option value="Mild">Mild</option>
        <option value="Normal">Normal</option>
        <option value="Hyperactive">Hyperactive</option>
      </select>

      <label htmlFor="illness">Illness:</label>
      <input
        type="text"
        id="illness"
        name="illness"
        value={formData.illness}
        onChange={handleChange}
      />

      <button type="submit">Submit</button>
    </form>
  );
};

export default AdmissionForm;

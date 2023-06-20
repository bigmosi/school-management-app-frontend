import React, { useState } from "react";

const AdmissionForm = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        class: '',
        contactNumber: '',
        previousSchool: [{
          name: '',
          location: '',
          class: '',
          yearofstudy: '',
          grade: ''
        }],
        address: '',
        dateOfBirth: '',
        placeOfBirth: '',
        district: '',
        nationality: '',
        religion: '',
        gender: '',
        behaviour: '',
        illness: ''
      });

      const handlePreviousSchoolChange = (index, field, value) => {
        setFormData((prevData) => {
            const updatedPreviousSchool = [...prevData.previousSchool];
            updatedPreviousSchool[index][field] = value;
            return {
                ...prevData,
                previousSchool: updatedPreviousSchool,
            };
        });
      };

      const addPreviousSchool = () => {
        setFormData((prevData) => ({
          ...prevData,
          previousSchool: [
            ...prevData.previousSchool,
            {
              name: '',
              location: '',
              class: '',
              yearofstudy: '',
              grade: '',
            }
          ],
        }));
      };

      const removePreviousSchool = (index) => {
        setFormData((prevData) => {
          const updatedPreviousSchool = [...prevData.previousSchool];
          updatedPreviousSchool.splice(index, 1);
          return {
            ...prevData,
            previousSchool: updatedPreviousSchool,
          }
        });
      }
      
}
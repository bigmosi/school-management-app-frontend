import React, { useState } from "react";
import axios from "axios";

const Announcement = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/api/annoucements', { title, content });

            setTitle('');
            setContent('');
            alert('Announcement created successfully');
        } catch (error) {
            console.error('Error creating announcement');
            alert('Error occurred announcement.');
        }
    }

    return (
        <div>
            <h1>Create Announcement</h1>
        </div>
    );
}

export default Announcement;

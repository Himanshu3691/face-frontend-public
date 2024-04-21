import React, { useState } from 'react';
import axios from 'axios';

const StudentRegister = () => {
    const [formData, setFormData] = useState({
        name: "",
        roll: "",
        email: "",
        password: "",
        branch: "",
        year: "",
        sem: "",
        images: []
    });

    const handleFormChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: name === 'roll' ? String(value) : value
        }));
    };

    const handleFileChange = (event) => {
        setFormData(prevData => ({
            ...prevData,
            images: event.target.files
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.keys(formData).forEach(key => {
            if (key !== 'images') {
                data.append(key, formData[key]);
            } else {
                Array.from(formData[key]).forEach((file, index) => {
                    data.append(`images`, file);
                });
            }
        });
    
        try {
            const response = await axios.post('http://127.0.0.1:8000/studentregister/', data);
            console.log('Student registered:', response.data);
            alert('Student registered successfully');
        } catch (error) {
            console.error('Error registering student:', error);
            alert('An error occurred while registering student');
        }
    };
    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
            <input type="text" name="name" placeholder="Name" onChange={handleFormChange} required className="px-4 py-2 border border-gray-300 rounded" />
            <input type="number" name="roll" placeholder="Roll No" onChange={handleFormChange} required className="px-4 py-2 border border-gray-300 rounded" />
            <input type="text" name="email" placeholder="Email" onChange={handleFormChange} required className="px-4 py-2 border border-gray-300 rounded" />
            <input type="text" name="password" placeholder="Password" onChange={handleFormChange} required className="px-4 py-2 border border-gray-300 rounded" />
            <input type="text" name="branch" placeholder="Branch" onChange={handleFormChange} required className="px-4 py-2 border border-gray-300 rounded" />
            <input type="text" name="year" placeholder="Year" onChange={handleFormChange} required className="px-4 py-2 border border-gray-300 rounded" />
            <input type="text" name="sem" placeholder="Semester" onChange={handleFormChange} required className="px-4 py-2 border border-gray-300 rounded" />
            <input type="file" name="images" multiple onChange={handleFileChange}  className="px-4 py-2 border border-gray-300 rounded" />
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Register</button>
        </form>
    );
};

export default StudentRegister;
import React, { useState } from 'react';
import axios from 'axios';

import AttendanceForm from './attandenceform/AttandenceForm';
import ImageUpload from './ImageUpload';



const TakeAttandence = () => {
    const [imageData, setImageData] = useState([]);
    const [imagePreviewUrls, setImagePreviewUrls] = useState([]);
    const [numberOfPersons, setNumberOfPersons] = useState(null);
    const [attendanceData, setAttendanceData] = useState({
        yearData: "",
        semData: "",
        branchData: "",
        lectureData: "",
        lectureNameData: ""
    });

    const handleSendData = async () => {
        // Assuming that imageData is prepared properly for an API call
        const formData = new FormData();
        imageData.forEach(file => {
            formData.append('images', file);
        });

        try {
            // Send image data
            const imageResponse = await axios.post('http://127.0.0.1:8000/frame/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
                
            
            });
            
            
            // Send attendance data
            const attendanceResponse = await axios.post('http://127.0.0.1:8000/framedata/', attendanceData);
            
            console.log('Image API Response:', imageResponse.data);
            console.log('Attendance API Response:', attendanceResponse.data);
            alert('Both data sent successfully');
            
                setNumberOfPersons(imageResponse.data.face_counts);
                console.log('Number of persons detected:', imageResponse.data.face_counts);
            
            
        } catch (error) {
            console.error('API call failed:', error);
            alert('Failed to send data');
        }
    };

    return (
        <div>
            <ImageUpload setImageData={setImageData} setImagePreviewUrls={setImagePreviewUrls} imagePreviewUrls={imagePreviewUrls} setNumberOfPersons={setNumberOfPersons} />
            <AttendanceForm setAttendanceData={setAttendanceData} attendanceData={attendanceData} />
            <button onClick={handleSendData}>Send All Data</button>
            {numberOfPersons && <p className=' text-black bg-blue-950'>Number of persons detected: {numberOfPersons}</p>}
        </div>
    );
}

export default TakeAttandence;
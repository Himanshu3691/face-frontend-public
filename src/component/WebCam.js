// App.js

import React, { useState } from 'react';
import axios from 'axios';

function WebCam() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [numberOfPersons, setNumberOfPersons] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    // Preview the selected image
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await axios.post('http://127.0.0.1:8000/dataapi/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setNumberOfPersons(response.data.numberOfPersons);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleSubmit}>Submit</button>
      {imagePreviewUrl && (
        <div>
          <img src={imagePreviewUrl} alt="Selected" style={{ maxWidth: '100%', maxHeight: '200px' }} />
        </div>
      )}
      {numberOfPersons && <p>Number of persons detected: {numberOfPersons}</p>}
    </div>
  );
}

export default WebCam;
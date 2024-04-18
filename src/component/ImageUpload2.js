import React, { useState } from 'react';
import axios from 'axios';

function ImageUpload2() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [faceCounts, setFaceCounts] = useState(null);
  const [imagePreviewUrls, setImagePreviewUrls] = useState([]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);

    // Preview the selected images
    const readers = files.map((file, index) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrls(prevState => {
          let copy = [...prevState];
          copy[index] = reader.result;
          return copy;
        });
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    selectedFiles.forEach(file => {
      formData.append('images', file);
    });

    try {
      const response = await axios.post('http://127.0.0.1:8000/frame/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setFaceCounts(response.data.face_counts);
    } catch (error) {
      console.error('Error uploading images:', error);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" multiple onChange={handleFileChange} />
      <button onClick={handleSubmit}>Upload</button>
      {imagePreviewUrls.map((url, index) => (
        <img key={index} src={url} alt="Preview" />
      ))}
      {faceCounts && faceCounts.map((count, index) => (
        <p key={index}>Image {index + 1}: {count} faces detected</p>
      ))}
    </div>
  );
}

export default ImageUpload2;
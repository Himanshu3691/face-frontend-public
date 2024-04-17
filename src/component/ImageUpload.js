import React, { useState, useRef } from 'react';
import axios from 'axios';

function ImageUpload() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [faceCounts, setFaceCounts] = useState([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState([]);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(prevState => [...prevState, ...files]);

    const readers = files.map((file, index) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrls(prevState => [...prevState, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const captureImage = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
    const dataUrl = canvas.toDataURL('image/png');
    setSelectedFiles(prevState => [...prevState, dataUrl]);
    setImagePreviewUrls(prevState => [...prevState, dataUrl]);
  };

  const startCamera = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        videoRef.current.srcObject = stream;
      })
      .catch(err => console.error('Error accessing the camera:', err));
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const deleteImage = (index) => {
    setSelectedFiles(prevState => prevState.filter((_, i) => i !== index));
    setImagePreviewUrls(prevState => prevState.filter((_, i) => i !== index));
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
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center space-y-4">
        <input type="file" accept="image/*" multiple onChange={handleFileChange} className="form-input" />
        <div className="flex space-x-2">
          <button onClick={startCamera} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Start Camera</button>
          <button onClick={stopCamera} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Stop Camera</button>
          <button onClick={captureImage} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Capture Image</button>
          <button onClick={handleSubmit} className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">Upload</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {imagePreviewUrls.map((url, index) => (
            <div key={index} className="relative">
              <img src={url} alt={`Preview ${index}`} className="rounded-lg shadow-lg max-w-full h-auto" />
              <button onClick={() => deleteImage(index)} className="absolute top-0 right-0 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-full">X</button>
            </div>
          ))}
        </div>
        {faceCounts && faceCounts.map((count, index) => (
          <p key={index} className="text-lg text-gray-800">Image {index + 1}: {count} faces detected</p>
        ))}
      </div>
    </div>
  );
}

export default ImageUpload;

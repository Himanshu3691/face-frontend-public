import React, { useState, useRef } from 'react';
import axios from 'axios';

function ImageUpload() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [faceCounts, setFaceCounts] = useState(null);
  const [imagePreviewUrls, setImagePreviewUrls] = useState([]);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(prevState => [...prevState, ...files]);

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

  const captureImage = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
    const dataUrl = canvas.toDataURL('image/png');
    const blob = dataURItoBlob(dataUrl);
    setSelectedFiles(prevState => [...prevState, blob]);
    setImagePreviewUrls(prevState => [...prevState, dataUrl]);
  };

  const startCamera = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        videoRef.current.srcObject = stream;
      })
      .catch(err => console.error(err));
  };

  const dataURItoBlob = (dataURI) => {
    var byteString = atob(dataURI.split(',')[1]);
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], {type: mimeString});
  }

  const deleteImage = (index) => {
    setSelectedFiles(prevState => prevState.filter((_, i) => i !== index));
    setImagePreviewUrls(prevState => prevState.filter((_, i) => i !== index));
  };
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
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
      <button onClick={startCamera}>Start Camera</button>
      <button onClick={stopCamera}>Stop Camera</button>
      <video ref={videoRef} autoPlay></video>
      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
      <button onClick={captureImage}>Capture Image</button>
      <button onClick={handleSubmit}>Upload</button>
      {imagePreviewUrls.map((url, index) => (
        <div key={index}>
          <img src={url} alt={`Preview ${index}`} />
          <button onClick={() => deleteImage(index)}>Delete</button>
        </div>
      ))}
      {faceCounts && faceCounts.map((count, index) => (
        <p key={index}>Image {index + 1}: {count} faces detected</p>
      ))}
    </div>
  );
}

export default ImageUpload;
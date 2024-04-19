
import './ImageUpload.css';


import React, { useRef } from 'react';

function ImageUpload({ setImageData, imagePreviewUrls, setImagePreviewUrls ,setNumberOfPersons}) {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        setImageData(files); // Directly set files

        // Generate preview URLs
        const newImagePreviewUrls = files.map(file => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            return new Promise((resolve) => {
                reader.onloadend = () => resolve(reader.result);
            });
        });

        Promise.all(newImagePreviewUrls).then(results => {
            setImagePreviewUrls(results);
        });
    };

    const captureImage = () => {
        const canvas = canvasRef.current;
        const video = videoRef.current;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        const dataUrl = canvas.toDataURL('image/png');
        setImageData(prevState => [...prevState, dataUrl]);
        setImagePreviewUrls(prevState => [...prevState, dataUrl]);
    };

    const startCamera = () => {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                videoRef.current.srcObject = stream;
            })
            .catch(err => console.error(err));
    };

    const stopCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const tracks = videoRef.current.srcObject.getTracks();
            tracks.forEach(track => track.stop());
            videoRef.current.srcObject = null;
        }
    };

    const deleteImage = (index) => {
        setImageData(prevState => prevState.filter((_, i) => i !== index));
        setImagePreviewUrls(prevState => prevState.filter((_, i) => i !== index));
    };

    return (
        <div className="image-upload">
            <h1 className='text'>Take Attendance</h1>
            <input type="file" accept="image/*" multiple onChange={handleFileChange} />
            <div className="camera-controls">
                <button onClick={startCamera}>Start Camera</button>
                <button onClick={stopCamera}>Stop Camera</button>
                <button onClick={captureImage}>Capture Image</button>
            </div>
            <video ref={videoRef} autoPlay className="video-feed"></video>
            <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
            <div className="image-previews">
                {imagePreviewUrls.map((url, index) => (
                    <div key={index} className="image-preview">
                        <img src={url} alt={`Preview ${index}`} />
                        <button onClick={() => deleteImage(index)}>✖</button>
                    </div>
                ))}
            </div>
            

        </div>
    );
}

export default ImageUpload;
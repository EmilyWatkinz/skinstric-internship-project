import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import './NextStep.css';

function NextStep() {
  const navigate = useNavigate();
  const galleryInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [stream, setStream] = useState(null);

  const handleCameraClick = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' }, 
        audio: false 
      });
      setStream(mediaStream);
      setShowCamera(true);
      
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      }, 100);
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Could not access camera. Please check permissions.');
    }
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    if (video && canvas) {
      const context = canvas.getContext('2d');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
    
      const base64Image = canvas.toDataURL('image/jpeg');
      
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      setShowCamera(false);
      
      uploadImage(base64Image);
    }
  };

  const closeCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    setShowCamera(false);
  };

  const handleGalleryClick = () => {
    galleryInputRef.current.click();
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const uploadImage = async (base64Image) => {
    setIsUploading(true);

    try {
      navigate('/analysis-loading');
      
      const response = await fetch('https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: base64Image
        })
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Analysis results:', data);
        localStorage.setItem('analysisResults', JSON.stringify(data));
      } else {
        console.error('Error:', response.statusText);
        alert('Failed to analyze image. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to process image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleImageCapture = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const base64Image = await convertToBase64(file);
      uploadImage(base64Image);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to process image. Please try again.');
    }
  };

  return (
    <div className="next-step-page">
      <Header showStartAnalysis={true} />
      <input 
        type="file"
        ref={galleryInputRef}
        accept="image/*"
        onChange={handleImageCapture}
        style={{ display: 'none' }}
      />
      
      {showCamera && (
        <div className="camera-modal">
          <div className="camera-container">
            <video ref={videoRef} autoPlay playsInline className="camera-video"></video>
            <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
            <div className="camera-controls">
              <button onClick={capturePhoto} className="capture-button">Capture</button>
              <button onClick={closeCamera} className="close-camera-button">Cancel</button>
            </div>
          </div>
        </div>
      )}
      
      <img 
        src={process.env.PUBLIC_URL + "/new-camera.svg"}
        alt="Camera" 
        className="camera-icon"
        onClick={handleCameraClick}
        style={{ opacity: isUploading ? 0.5 : 1, cursor: isUploading ? 'wait' : 'pointer' }}
      />
      <img 
        src={process.env.PUBLIC_URL + "/gallery.svg"}
        alt="Gallery" 
        className="gallery-icon"
        onClick={handleGalleryClick}
        style={{ opacity: isUploading ? 0.5 : 1, cursor: isUploading ? 'wait' : 'pointer' }}
      />
      <img 
        src={process.env.PUBLIC_URL + "/back-button-icon-text-shrunk.svg"}
        alt="Back" 
        className="back-button-icon"
        onClick={() => navigate('/take-test')}
      />
    </div>
  );
}

export default NextStep;

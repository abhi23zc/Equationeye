import React, { useCallback, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { Camera as CameraIcon, Power } from 'lucide-react';

export const Camera = ({ onCapture }) => {
  const webcamRef = useRef(null);
  const [isEnabled, setIsEnabled] = useState(true);

  const capture = useCallback(() => {
    if (!isEnabled) return;
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      onCapture(imageSrc);
    }
  }, [onCapture, isEnabled]);

  const toggleCamera = () => {
    setIsEnabled(prev => !prev);
  };

  return (
    <div className="relative">
      {isEnabled ? (
        <Webcam
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className="w-full rounded-lg shadow-lg"
          videoConstraints={{
            width: 720,
            height: 480,
            facingMode: "environment"
          }}
        />
      ) : (
        <div className="w-full h-[480px] bg-gray-200 rounded-lg shadow-lg flex items-center justify-center">
          <p className="text-gray-600">Camera is disabled</p>
        </div>
      )}
      
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
        <button
          onClick={()=>{
            capture()
            console.log("Capture")
          }}
          disabled={!isEnabled}
          className={`bg-blue-600 text-white px-6 py-3 rounded-full flex items-center gap-2 transition-colors ${
            !isEnabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
          }`}
        >
          <CameraIcon size={20} />
          <span>Capture Problem</span>
        </button>
        
        <button
          onClick={toggleCamera}
          className={`px-4 py-3 rounded-full flex items-center justify-center transition-colors ${
            isEnabled ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-green-600 text-white hover:bg-green-700'
          }`}
        >
          <Power size={20} />
        </button>
      </div>
    </div>
  );
};
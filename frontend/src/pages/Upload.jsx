import React, { useRef, useState } from "react";
import "./Upload.css";

const Upload = () => {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleChooseFiles = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleDeleteFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  return (
    <div className="upload-box">
      <div className="upload-icon">
        <svg width="64"  height="64"  fill="none"  xmlns="http://www.w3.org/2000/svg">
          <rect width="64" height="64" rx="12" fill="#7B61FF" fillOpacity="0.15"/>
          <path d="M32 20v16M32 36l-6-6m6 6l6-6" stroke="#7B61FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="20" y="40" width="24" height="4" rx="2" fill="#7B61FF" />
        </svg>
      </div>
      <button className="choose-files-btn" onClick={handleChooseFiles}>
        CHOOSE FILES
      </button>
      <input
        type="file"
        accept="application/pdf"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <div className="drop-text">or drop files here</div>
      {selectedFile && (
        <div className="selected-file">
          <span>Selected: {selectedFile.name}</span>
          <button onClick={handleDeleteFile} className="delete-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"viewBox="0 0 24 24"fill="none"stroke="red"strokeWidth="2"strokeLinecap="round"strokeLinejoin="round"  >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default Upload;

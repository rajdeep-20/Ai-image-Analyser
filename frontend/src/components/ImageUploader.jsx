import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import './ImageUploader.css';

const ImageUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
      setResult(null);
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      toast.error('Please select an image first!');
      return;
    }
    const formData = new FormData();
    formData.append('image', selectedFile);
    setLoading(true);
    const toastId = toast.loading('Analyzing the image...');
    try {
      const res = await axios.post('http://localhost:5000/upload', formData);
      setResult(res.data);
      toast.success('Analysis complete!', { id: toastId });
    } catch (error) {
      toast.error('Something went wrong.', { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`uploader-container ${result ? 'with-results' : 'initial'}`}>
      <input type="file" accept="image/*" onChange={handleFileChange} className="file-input" id="file-upload" />
      <label htmlFor="file-upload" className="file-label">
        Choose Image
      </label>
      {preview && (
        <div className="preview-section">
          <img src={preview} alt="Preview" className="image-preview" />
          <button onClick={handleSubmit} disabled={loading} className="upload-btn">
            {loading ? 'Analyzing...' : 'Analyze Image'}
          </button>
        </div>
      )}
      {result && (
        <div className="results-section">
          <h2>Analysis Results</h2>
          <div className="result-item">
            <strong>Caption:</strong>
            <p>"{result.caption}"</p>
          </div>
          <div className="result-item">
            <strong>Labels:</strong>
            <ul>
              {result.labels.map((label, index) => (
                <li key={index}>
                  {label.label} (Score: {label.score.toFixed(2)})
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
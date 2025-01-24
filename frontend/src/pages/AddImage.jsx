import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAllCategories, getAllImages } from '../../redux/reducers/gallerySlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function AddImage() {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState('');
  const [progress, setProgress] = useState(0); // State for upload progress
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllCategories());
  }, []);

  const { categories } = useSelector((state) => state.gallery);

  const handleFileChange = (e) => {
    setFile(e.target.files);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Array.from(file).forEach((fileItem) => {
      formData.append("image", fileItem);
    });
    formData.append("category", category);

    try {
      const response = await axios.post(
        "https://gallery-local.onrender.com/api/v1/upload/images", // Use your endpoint
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percentCompleted);
          },
        }
      );
      console.log("Uploaded files:", response.data.uploadedFiles);
      setProgress(0); // Reset progress after upload
      dispatch(getAllImages());
      navigate("/");
    } catch (error) {
      console.error("Error uploading images:", error);
      setProgress(0); // Reset progress on error
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-sm">
        <h2 className="text-center mb-4">Add Image</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="imageInput" className="form-label">Upload Image</label>
            <input type="file" className="form-control" id="imageInput" onChange={handleFileChange} multiple />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="categorySelect" className="form-label">Category</label>
            <select className="form-select" id="categorySelect" onChange={handleCategoryChange}>
              {
                categories && categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))
              }
            </select>
          </div>
          <div className="form-group mb-3">
            {progress > 0 && (
              <div className="progress">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: `${progress}%` }}
                  aria-valuenow={progress}
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  {progress}%
                </div>
              </div>
            )}
          </div>
          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-primary">Upload</button>
            <button type="button" className="btn btn-secondary" onClick={() => navigate("/")}>Go to Home</button>
          </div>
        </form>
      </div>
    </div>
  );
}

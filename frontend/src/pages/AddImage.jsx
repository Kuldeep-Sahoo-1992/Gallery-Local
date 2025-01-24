import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAllCategories, getAllImages, postNewImage } from '../../redux/reducers/gallerySlice';
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate} from "react-router-dom"

export default function AddImage() {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState('');
  const formData = new FormData()
  const navigate=useNavigate()
  useEffect(() => {

    dispatch(getAllCategories());

  }, []);
  
  const { categories } = useSelector((state) => state.gallery);
  console.log("cat-->>", categories);
  
  const handleFileChange = (e) => {
    setFile(e.target.files);
  };
  
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault()
    Array.from(file).forEach((fileItem) => {
      formData.append("image", fileItem);
    });
    formData.append("category", category)
    dispatch(postNewImage(formData));
    dispatch(getAllImages());
    navigate("/")
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
                  <option key={cat._id} value={cat._id} >{cat.name}</option>
                ))
              }
            </select>
          </div>
          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-primary">Upload</button>
            <button type="button" className="btn btn-secondary">Go to Home</button>
          </div>
        </form>
      </div>
    </div>
  );
}
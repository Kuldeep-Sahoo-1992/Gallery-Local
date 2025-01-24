import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from 'react-redux';
import { postNewCategory,getAllCategories } from '../../redux/reducers/gallerySlice';
const AddCategories = () => {
  const [name, setName] = useState('');
  const dispatch = useDispatch()
  const navigate=useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(postNewCategory(name))
    dispatch(getAllCategories())
    navigate("/add-image")
  };

  return (
    <div className="container mt-5   ">
      <h2 className="mb-4">Add Category</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="categoryInput">Enter Category</label>
          <input
            name='name'
            type="text"
            className="form-control"
            id="categoryInput"
            placeholder="Enter category"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="">
          <button type="submit" className="btn btn-primary mt-3">Add Category</button>
          <Link to={"/"}>  <button type="button" className="btn btn-secondary mt-3 mx-4" >Go to Home</button></Link>
        </div>
      </form>
    </div>
  );
}

export default AddCategories;
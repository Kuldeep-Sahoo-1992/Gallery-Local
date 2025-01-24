import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import AddCategories from "./pages/AddCategories";
import AddImage from "./pages/AddImage";
import Headers from "./pages/Headers";


function App() {

  return (
    <div className="">
      <Headers />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-category" element={<AddCategories />} />
        <Route path="/add-image" element={<AddImage />} />
      </Routes>
    </div>

  )
}

export default App

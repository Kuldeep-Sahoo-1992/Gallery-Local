import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialValues = { images: [], categories: [] };

export const getAllImages = createAsyncThunk(
  "images/fetchallimages",
  async () => {
    const response = await axios.get("https://gallery-local.onrender.com//api/v1/get/images");
    // console.log(response);

    return response.data.fetchAllImages;
  }
);
export const getAllCategories = createAsyncThunk(
  "categories/fetchallcategories",
  async () => {
    const response = await axios.get(
      "https://gallery-local.onrender.com//api/v1/get/categories"
    );
    // console.log(response);

    return response.data.fetchAllCategories;
  }
);
export const postNewCategory = createAsyncThunk(
  "categories/postnewcategory",
  async (payload) => {
    const response = await axios.post(
      "https://gallery-local.onrender.com//api/v1/add/category",
      { name: payload }
    );
    // console.log(response);

    return response.data;
  }
);
export const postNewImage = createAsyncThunk(
  "categories/postnewimage",
  async (payload) => {
    try {
      const response = await axios.post(
        "https://gallery-local.onrender.com//api/v1/upload/images", // Updated endpoint for multiple images
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Make sure the request is sent as form data
          },
        }
      );
      return response.data.uploadedFiles; // Return the uploaded files info
    } catch (error) {
      console.error("Error uploading images:", error);
      throw new Error(
        error.response ? error.response.data.message : error.message
      );
    }
  }
);

export const getSingleImage = createAsyncThunk(
  "categories/getsingleimage",
  async (payload) => {
    const response = await axios.get(
      `https://gallery-local.onrender.com//api/v1/get/singleImage?category=${payload}`
    );
    console.log(response);

    return response.data.getCategoryBasedImages;
  }
);

const gallerySlice = createSlice({
  name: "gallerySlice",
  initialState: initialValues,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllImages.fulfilled, (state, action) => {
      state.images = action.payload;
    });
    builder.addCase(getAllCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
    builder.addCase(getSingleImage.fulfilled, (state, action) => {
      state.images = action.payload;
    });
  },
});

export default gallerySlice.reducer;

import { configureStore } from "@reduxjs/toolkit";
import gallerySlice from "./reducers/gallerySlice.js";
const store = configureStore({
  reducer: {
    gallery: gallerySlice,
  },
});

export default store;

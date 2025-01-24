import galleryModel from "./../models/gallery.js";
import categoryModel from "./../models/category.js";
// const uploadImage = async (req, res) => {
//   const { category } = req.body;

//   try {
//     if (!category) {
//       return res.status(400).json({ message: "All fields arrequired" });
//     }
//     const addImage = galleryModel({
//       name: req.file.filename,
//       category: category,
//     });
//     const saved_image = await addImage.save();
//     if (saved_image) {
//       return res.status(200).json({ message: "successfully upload file..." });
//     }
//   } catch (error) {
//     return res.status(400).json({ message: error.message });
//   }
// };
export const uploadImages = async (req, res) => {
  const { category } = req.body;

  try {
    // Validate category
    if (!category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if files are provided
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    // Save each file in the database
    const images = req.files.map((file) => ({
      name: file.filename,
      category: category,
    }));

    // Save all images in the database
    const savedImages = await galleryModel.insertMany(images);

    if (savedImages) {
      return res.status(200).json({
        message: "Files uploaded successfully",
        uploadedFiles: savedImages,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


export const addNewCategory = async (req, res) => {
  const { name } = req.body;
  try {
    if (!name) {
      return res.status(400).json({ message: "All fields arrequired" });
    }
    const newCategory = categoryModel({
      name: name,
    });
    const saved_category = await newCategory.save();
    if (saved_category) {
      return res
        .status(200)
        .json({ message: "Category added bro", newCategory });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const fetchAllCategories = await categoryModel.find({});
    return res.status(200).json({ fetchAllCategories });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
export const getAllImages = async (req, res) => {
  try {
    const fetchAllImages = await galleryModel.find({});
    return res.status(200).json({ fetchAllImages });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const getSingleImage = async (req, res) => {
  const { category } = req.query;
  try {
    if (!category) {
      return res.status(400).json({ message: "all fields are required" });
    }
    const getCategoryBasedImages = await galleryModel.find({
      category,
    });
    return res.status(200).json({ getCategoryBasedImages });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// export default uploadImage;

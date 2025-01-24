import express from "express";
import connectToMongo from "./config/db.js";
import router from "./routes/gallery.js";
import cors from "cors";

connectToMongo();

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());
app.use("/api/v1", router);
app.use(express.static("public/upload"));
app.listen(PORT, () => {
  console.log(`Api is running on port: ${PORT}`);
});

import express from "express";
import connectToMongo from "./config/db.js";
import router from "./routes/gallery.js";
import cors from "cors";
import path from "path";

connectToMongo();

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());
app.use("/api/v1", router);
app.use(express.static("public/upload"));

// --------------------------deployment------------------------------

const __dirname1 = path.resolve();

app.use(express.static(path.join(__dirname1, "/frontend/dist")));

app.get("*", (req, res) =>
  res.sendFile(path.resolve(__dirname1, "frontend", "dist", "index.html"))
);
// --------------------------deployment------------------------------

app.listen(PORT, () => {
  console.log(`Api is running on port: ${PORT}`);
});

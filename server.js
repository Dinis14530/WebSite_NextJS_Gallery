import express from "express";
import multer from "multer";
import cors from "cors";

const app = express();
app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

let photos = []; // Fotos armazenadas em memória (podes trocar por BD)

app.post("/upload", upload.single("photo"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "Nenhum ficheiro enviado" });

  const newPhoto = {
    src: `/uploads/${req.file.filename}`,
    title: req.body.title,
    date: new Date().toISOString().split("T")[0],
    location: req.body.location
  };
  photos.push(newPhoto);
  res.json(newPhoto);
});

app.use("/uploads", express.static("uploads"));

app.listen(5000, () => console.log("Servidor a correr na porta 5000"));

import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import nextConnect from "next-connect";

// Configura Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configura multer para armazenar imagem em memória
const upload = multer({ storage: multer.memoryStorage() });

// Configura Next.js API com next-connect
const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(500).json({ error: `Erro: ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Método ${req.method} não permitido` });
  },
});

apiRoute.use(upload.single("photo"));

apiRoute.post(async (req, res) => {
  try {
    const file = req.file;
    const result = await cloudinary.uploader.upload_stream(
      { folder: "album" },
      (error, result) => {
        if (error) return res.status(500).json({ error });
        res.status(200).json({
          url: result.secure_url,
          title: req.body.title,
          location: req.body.location,
          date: new Date().toISOString().split("T")[0],
        });
      }
    );

    // Escrever o buffer da imagem no upload_stream
    result.end(file.buffer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export const config = {
  api: {
    bodyParser: false, // necessário para multer
  },
};

export default apiRoute;

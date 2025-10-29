import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "../styles/upload.css";
import { PhotoContext } from "../context/PhotoContext";

export default function Upload() {
  const { addPhoto } = useContext(PhotoContext);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Escolhe uma foto!");

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "minha_galeria"); // substitui pelo teu preset

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/do8vyzeih/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (data.secure_url) {
        const newPhoto = {
          src: data.secure_url, // URL da Cloudinary
          title,
          location,
          date: new Date().toISOString().split("T")[0],
        };

        addPhoto(newPhoto);
        setTitle("");
        setLocation("");
        setFile(null);
        alert("✅ Foto enviada com sucesso!");
      } else {
        alert("❌ Erro ao enviar foto!");
      }
    } catch (err) {
      console.error(err);
      alert("Erro na comunicação com a Cloudinary");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <header className="upload-header">
        <Link to="/galeria">
          <button className="btn">Voltar à Galeria</button>
        </Link>
      </header>

      <div className="upload-container">
        <h1>Adicionar Nova Foto</h1>
        <form onSubmit={handleSubmit} className="upload-form">
          <input
            type="text"
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Localização"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
          <button type="submit" className="btn" disabled={loading}>
            {loading ? "A enviar..." : "Enviar Foto"}
          </button>
        </form>
      </div>
    </div>
  );
}

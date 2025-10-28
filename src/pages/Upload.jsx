import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "../styles/upload.css";
import { PhotoContext } from "../context/PhotoContext"; // importa o contexto

export default function Upload() {
  const { addPhoto } = useContext(PhotoContext); // função para adicionar foto ao contexto
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) return alert("Escolhe uma foto!");

    const reader = new FileReader();
    reader.onloadend = () => {
      const img = new Image();
      img.src = reader.result;

      img.onload = () => {
        // Reduz a imagem para 800px de largura máxima
        const maxWidth = 800;
        const scale = maxWidth / img.width;
        const canvas = document.createElement("canvas");
        canvas.width = img.width > maxWidth ? maxWidth : img.width;
        canvas.height = img.height * (img.width > maxWidth ? scale : 1);

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        const resizedData = canvas.toDataURL("image/jpeg", 0.7); // qualidade 70%

        const newPhoto = {
          src: resizedData, // base64 da imagem reduzida
          title,
          location,
          date: new Date().toISOString().split("T")[0], // data atual
        };

        addPhoto(newPhoto); // adiciona ao contexto
        setTitle("");
        setLocation("");
        setFile(null);
        alert("Foto enviada com sucesso!");
      };
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      {/* Header fixo com botão de saída */}
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
          <button type="submit" className="btn">Enviar Foto</button>
        </form>
      </div>
    </div>
  );
}

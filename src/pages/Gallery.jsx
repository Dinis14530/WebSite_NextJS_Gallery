import { useState, useEffect, useContext } from "react";
import "../styles/gallery.css";
import { Link } from "react-router-dom";
import { PhotoContext } from "../context/PhotoContext";

export default function Gallery() {
  const [search, setSearch] = useState("");
  const { photos, removePhoto } = useContext(PhotoContext);

  useEffect(() => {
    document.body.classList.add("scroll");
    return () => document.body.classList.remove("scroll");
  }, []);

  const filteredPhotos = photos.filter(photo =>
    photo.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <header className="gallery-header">
        <div className="header-controls">
          <Link to="/">
            <button className="btn">Página Principal</button>
          </Link>
          <Link to="/upload">
            <button className="btn">Adicionar Foto</button>
          </Link>
          <input
            type="text"
            placeholder="Pesquisar por título..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
        </div>
      </header>

      <main>
        <div className="main-inner">
          <h1>Galeria de Fotos</h1>

          <div className="gallery-container">
            {filteredPhotos.map((photo, index) => (
              <div className="gallery-item" key={index}>
                {photo.src ? (
                    <img src={photo.src} alt={photo.title} />
                ) : (
                    <div className="placeholder">Sem Imagem</div>
                )}
                <h3>{photo.title}</h3>
                <p>{photo.date} — {photo.location}</p>
                <p
                    className="delete-text"
                    onClick={() => removePhoto(index)}
                >
                    Eliminar
                </p>
                </div>
            ))}
            {filteredPhotos.length === 0 && <p>Nenhuma foto encontrada.</p>}
          </div>
        </div>
      </main>
    </div>
  );
}

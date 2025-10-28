import { PhotoProvider } from "./context/PhotoContext";
import Home from "./pages/home";
import Gallery from "./pages/Gallery";
import Upload from "./pages/Upload";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <PhotoProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/galeria" element={<Gallery />} />
          <Route path="/upload" element={<Upload />} />
        </Routes>
      </Router>
    </PhotoProvider>
  );
}

export default App;

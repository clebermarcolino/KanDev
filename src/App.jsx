import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import KanDev from "./pages/KanDev";
import EsqueceSenha from "./pages/EsqueceSenha";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/esquece-senha" element={<EsqueceSenha />} />

        <Route path="/kandev" element={<KanDev />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
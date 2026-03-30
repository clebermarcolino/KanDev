import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import KanDev from "./pages/KanDev";
import EsqueceSenha from "./pages/EsqueceSenha";


export default function App() {
  const [page, setPage] = useState("home");

  const navigate = (destino) => setPage(destino);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setPage("kandev");
    }
  }, []);

  return (
    <>
      {page === "home"     && <Home     navigate={navigate} />}
      {page === "login"    && <Login    navigate={navigate} />}
      {page === "cadastro" && <Cadastro navigate={navigate} />}
      {page === "kandev"   && <KanDev   navigate={navigate} />}
      {page === "esquece-senha" && <EsqueceSenha navigate={navigate} />}
    </>
  );
}
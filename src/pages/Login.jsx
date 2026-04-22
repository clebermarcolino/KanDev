import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/login.css";
import "../styles/base.css";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", senha: "" });
  const [erros, setErros] = useState({});
  const [visibilidade, setVisibilidade] = useState({
    senha: false,
  });
  
  const toggleVisibilidade = (campo) => {
    setVisibilidade((prev) => ({
      ...prev,
      [campo]: !prev[campo],
    }));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
    setErros({ ...erros, [e.target.id]: "" });
  };

  const validar = () => {
  const novosErros = {};

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(form.email)) {
    novosErros.email = "Informe um email válido.";
  }

  if (form.senha.length < 6) {
    novosErros.senha = "A senha deve ter pelo menos 6 caracteres.";
  }

  return novosErros;
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    const novosErros = validar();
    if (Object.keys(novosErros).length > 0) {
      setErros(novosErros);
      return;
    }

    try {
      const { data: usuarios } = await api.get(
      `/usuarios?email=${form.email}&senha=${form.senha}`
    );

    if (usuarios.length === 0) {
      setErros({ geral: "Email ou senha inválidos." });
      return;
    }

      const usuario = usuarios[0];
      localStorage.setItem("usuarioId", usuario.id);
      localStorage.setItem("usuarioNome", usuario.nome);
      navigate("/kandev");
      } catch (error) {
        setErros({ geral: "Erro ao fazer login. Tente novamente." });
      }
  };

  return (
    <div className="page-login">
      <div className="background"></div>

      <div className="container">
        <div className="logo-area">
          <div className="logo" onClick={() => navigate("/")}>
            <h1>KanDev</h1>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-grupo">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder={"\u{1F582} Digite seu email"}
              required
              autoComplete="off"
              value={form.email}
              onChange={handleChange}
              className={erros.email ? "input-erro" : ""}
            />
            {erros.email && <span className="mensagem-erro">{erros.email}</span>}
          </div>

          <div className="form-grupo">
            <label htmlFor="senha">Senha</label>
            <div className="input-com-icone">
              <input
                type={visibilidade.senha ? "text" :"password"}
                id="senha"
                placeholder={"\u{1F512} Digite sua senha"}
                required
                value={form.senha}
                onChange={handleChange}
                className={erros.senha ? "input-erro" : ""}
              />
              <button 
              type="button" 
              className="btn-olho" 
              onClick={() => toggleVisibilidade("senha")}
            >
              {visibilidade.senha ? "\u{25C9}" : "\u{25CE}"}
            </button>
            </div>
            <div className="password-wrapper">
              
            </div>
            {erros.senha && <span className="mensagem-erro">{erros.senha}</span>}
          </div>

          <div className="senha">
            <button className="link-btn" onClick={() => navigate("/esquece-senha")}>
              Esqueceu a senha?
            </button>
          </div>

          <button type="submit" className="btn-login">
            Entrar
          </button>
        </form>
        {erros.geral && (
          <span className="mensagem-erro" style={{ textAlign: "center", display: "block", marginTop: "8px" }}>
            {erros.geral}
          </span>
        )}

        <div className="cadastro">
          <p>Não possui uma conta?</p>
          <button className="link-btn" onClick={() => navigate("/cadastro")}>
            Crie sua conta agora
          </button>
        </div>
      </div>
    </div>
  );
}
import { useState } from "react";
import api from "../services/api";
import "../styles/login.css";
import "../styles/base.css";

export default function Login({ navigate }) {
  const [form, setForm] = useState({ email: "", senha: "" });
  const [erros, setErros] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
    setErros({ ...erros, [e.target.id]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", {
        email: form.email,
        senha: form.senha
      });
      localStorage.setItem("token", response.data.token);
      navigate("kandev");
    } catch (error) {
      setErros({ geral: "Email ou senha inválidos." });
    }
  };

  return (
    <div className="page-login">
      <div className="background"></div>

      <div className="container">
        <div className="logo-area">
          <div className="logo" onClick={() => navigate("home")}>
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
            <div className="password-wrapper">
              <input
                type="password"
                id="senha"
                placeholder={"\u{1F512} Digite sua senha"}
                required
                value={form.senha}
                onChange={handleChange}
                className={erros.senha ? "input-erro" : ""}
              />
            </div>
            {erros.senha && <span className="mensagem-erro">{erros.senha}</span>}
          </div>

          <div className="senha">
            <button className="link-btn" onClick={() => navigate("esquece-senha")}>
              Esqueceu a senha?
            </button>
          </div>

          <button type="submit" className="btn-login">
            Entrar
          </button>
        </form>

        <div className="separator">
          <span>ou</span>
        </div>

        <div className="google-placeholder">
          <button className="btn-google">
            <svg width="18" height="18" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
            Continuar com Google
          </button>
        </div>

        <div className="cadastro">
          <p>Não possui uma conta?</p>
          <button className="link-btn" onClick={() => navigate("cadastro")}>
            Crie sua conta agora
          </button>
        </div>
      </div>
    </div>
  );
}
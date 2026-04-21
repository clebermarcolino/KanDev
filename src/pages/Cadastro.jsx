import { useState } from "react";
import api from "../services/api";
import "../styles/cadastro.css";
import "../styles/base.css";

export default function Cadastro({ navigate }) {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
  });

  const [erros, setErros] = useState({});
  const [visibilidade, setVisibilidade] = useState({
    senha: false,
    confirmarSenha: false,
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

  if (form.nome.trim().length < 3) {
    novosErros.nome = "O nome deve ter pelo menos 3 caracteres.";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(form.email)) {
    novosErros.email = "Informe um email válido.";
  }

  if (form.senha.length < 6) {
    novosErros.senha = "A senha deve ter pelo menos 6 caracteres.";
  } else if (!/[A-Z]/.test(form.senha)) {
    novosErros.senha = "A senha deve conter pelo menos uma letra maiúscula.";
  } else if (!/[0-9]/.test(form.senha)) {
    novosErros.senha = "A senha deve conter pelo menos um número.";
  }

  if (form.senha !== form.confirmarSenha) {
    novosErros.confirmarSenha = "As senhas não coincidem.";
  }

  return novosErros;
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    const novosErros = validar();
    if(Object.keys(novosErros).length > 0) {
      setErros(novosErros);
      return;
    }

    try {
      const emailNormalizado = form.email.toLowerCase();
      const { data: existentes } = await api.get(`/usuarios?email=${emailNormalizado}`);

      if (existentes.length > 0) {
        setErros({ email: "Este email já está cadastrado." });
        return;
      }

      const { data: novoUsuario } = await api.post("/usuarios", {
        nome: form.nome,
        email: emailNormalizado,
        senha: form.senha,
        fotoPerfil: null,
      });

      localStorage.setItem("usuarioId", novoUsuario.id);
      localStorage.setItem("usuarioNome", novoUsuario.nome);
      alert("\u2705 Cadastro realizado!");
      navigate("login");
    } catch (error) {
      setErros({ email: "Erro ao cadastrar. Tente novamente. " });
    }
  };

  return (
    <div className="page-cadastro">
      <div className="container">
        <div className="logo" onClick={() => navigate("home")}>
          <h1>KanDev</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-grupo">
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              id="nome"
              placeholder={"\u{1F464} Digite seu nome"}
              value={form.nome}
              onChange={handleChange}
              className={erros.nome ? "input-erro" : ""}
            />
            {erros.nome && <span className="mensagem-erro">{erros.nome}</span>}
          </div>

          <div className="form-grupo">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder={"\u{1F582} Digite seu email"}
              required
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
              type={visibilidade.senha ? "text" : "password"}
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
            
            {erros.senha && <span className="mensagem-erro">{erros.senha}</span>}
          </div>

          <div className="form-grupo">
            <label htmlFor="confirmarSenha">Confirmar senha</label>
            <div className="input-com-icone">
              <input
              type={visibilidade.novaSenha ? "text" : "password"}
              id="confirmarSenha"
              placeholder={"\u{1F512} Digite sua senha novamente"}
              required
              value={form.confirmarSenha}
              onChange={handleChange}
              className={erros.confirmarSenha ? "input-erro" : ""}
            />
            <button 
              type="button" 
              className="btn-olho" 
              onClick={() => toggleVisibilidade("novaSenha")}
            >
              {visibilidade.novaSenha ? "\u{25C9}" : "\u{25CE}"}
            </button>
            </div>
            
            {erros.confirmarSenha && <span className="mensagem-erro">{erros.confirmarSenha}</span>}
          </div>

          <button type="submit" className="btn-criar-conta">
            <p>Cadastrar</p>
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

        <div className="login-link">
          <p>Já possui uma conta?</p>
          <button className="link-btn" onClick={() => navigate("login")}>
            Entrar
          </button>
        </div>
      </div>
    </div>
  );
}
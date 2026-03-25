import { useState } from "react";
import "../styles/esquece-senha.css";

export default function EsqueceSenha({ navigate }) {
  const [form, setForm] = useState({
    email: "",
    novaSenha: "",
    confirmarSenha: "",
  });

  const [erros, setErros] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
    setErros({ ...erros, [e.target.id]: "" });
  };

  const validar = () => {
    const novosErros = {};

    // Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      novosErros.email = "Informe um email válido.";
    }

    // Nova senha
    if (form.novaSenha.length < 6) {
      novosErros.novaSenha = "A senha deve ter pelo menos 6 caracteres.";
    } else if (!/[A-Z]/.test(form.novaSenha)) {
      novosErros.novaSenha = "A senha deve conter pelo menos uma letra maiúscula.";
    } else if (!/[0-9]/.test(form.novaSenha)) {
      novosErros.novaSenha = "A senha deve conter pelo menos um número.";
    }

    // Confirmar senha
    if (form.novaSenha !== form.confirmarSenha) {
      novosErros.confirmarSenha = "As senhas não coincidem.";
    }

    return novosErros;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const novosErros = validar();

    if (Object.keys(novosErros).length > 0) {
      setErros(novosErros);
      return;
    }

    alert("\u2705 Senha redefinida com sucesso!");
    navigate("login");
  };

  return (
    <div className="page-esquece-senha">
      <div className="container">
        <div className="logo">
          <h1>KanDev</h1>
        </div>

        <div className="titulo-area">
          <h2>Informe seu email e escolha uma nova senha</h2>
        </div>

        <form onSubmit={handleSubmit}>
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
            <label htmlFor="novaSenha">Nova senha</label>
            <input
              type="password"
              id="novaSenha"
              placeholder={"\u{1F512} Digite sua nova senha"}
              required
              value={form.novaSenha}
              onChange={handleChange}
              className={erros.novaSenha ? "input-erro" : ""}
            />
            {erros.novaSenha && <span className="mensagem-erro">{erros.novaSenha}</span>}
          </div>

          <div className="form-grupo">
            <label htmlFor="confirmarSenha">Confirmar nova senha</label>
            <input
              type="password"
              id="confirmarSenha"
              placeholder={"\u{1F512} Confirme sua nova senha"}
              required
              value={form.confirmarSenha}
              onChange={handleChange}
              className={erros.confirmarSenha ? "input-erro" : ""}
            />
            {erros.confirmarSenha && <span className="mensagem-erro">{erros.confirmarSenha}</span>}
          </div>

          <button type="submit" className="btn-redefinir">
            Redefinir senha
          </button>
        </form>

        <div className="voltar-login">
          <button className="link-btn" onClick={() => navigate("login")}>
            ← Voltar para o login
          </button>
        </div>
      </div>
    </div>
  );
}
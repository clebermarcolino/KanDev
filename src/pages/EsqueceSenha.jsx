import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/esquece-senha.css";
import "../styles/base.css";

export default function EsqueceSenha() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    novaSenha: "",
    confirmarSenha: "",
  });

  const [erros, setErros] = useState({});
  const [carregando, setCarregando] = useState(false);
  const [visibilidade, setVisibilidade] = useState({
  novaSenha: false,
  confirmarSenha: false,
});

const toggleVisibilidade = (campo) => {
  setVisibilidade((prev) => ({
    ...prev,
    [campo]: !prev[campo],
  }));
};

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
    if (erros[id]) setErros((prev) => ({ ...prev, [id]: "" }));
  };

  const validar = () => {
    const novosErros = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      novosErros.email = "Informe um email válido.";
    }

    if (form.novaSenha.length < 6) {
      novosErros.novaSenha = "A senha deve ter pelo menos 6 caracteres.";
    } else if (!/[A-Z]/.test(form.novaSenha)) {
      novosErros.novaSenha = "A senha deve conter pelo menos uma letra maiúscula.";
    } else if (!/[0-9]/.test(form.novaSenha)) {
      novosErros.novaSenha = "A senha deve conter pelo menos um número.";
    }

    if (form.novaSenha !== form.confirmarSenha) {
      novosErros.confirmarSenha = "As senhas não coincidem.";
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

    setCarregando(true);

    try {
        const { data: usuarios } = await api.get(`/usuarios?email=${form.email}`);

        if (usuarios.length === 0) {
          setErros({ email: "Email não encontrado." });
          setCarregando(false);
          return;
        }

        const usuario = usuarios[0];
        await api.patch(`/usuarios/${usuario.id}`, { senha: form.novaSenha });
      alert("\u2705 Senha redefinida com sucesso!");
      navigate("/login");
    } catch (error) {
          setErros({ email: "Erro ao redefinir senha. Tente novamente." });
    }
    finally {
      setCarregando(false);
    }
  };

  return (
    <div className="page-esquece-senha">
      <div className="container">
        <div className="logo" onClick={() => navigate("/")}>
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
            <div className="input-com-icone">
              <input
              type={visibilidade.novaSenha ? "text" : "password"}
              id="novaSenha"
              placeholder={"\u{1F512} Digite sua nova senha"}
              required
              value={form.novaSenha}
              onChange={handleChange}
              className={erros.novaSenha ? "input-erro" : ""}
            />
            <button 
              type="button" 
              className="btn-olho" 
              onClick={() => toggleVisibilidade("novaSenha")}
            >
              {visibilidade.novaSenha ? "\u{25C9}" : "\u{25CE}"}
            </button>
          </div>
            
            {erros.novaSenha && <span className="mensagem-erro">{erros.novaSenha}</span>}
          </div>

          <div className="form-grupo">
            <label htmlFor="confirmarSenha">Confirmar nova senha</label>
            <div className="input-com-icone">
              <input
              type={visibilidade.confirmarSenha ? "text" : "password"}
              id="confirmarSenha"
              placeholder={"\u{1F512} Confirme sua nova senha"}
              required
              value={form.confirmarSenha}
              onChange={handleChange}
              className={erros.confirmarSenha ? "input-erro" : ""}
            />
            <button 
              type="button" 
              className="btn-olho" 
              onClick={() => toggleVisibilidade("confirmarSenha")}
            >
              {visibilidade.confirmarSenha ? "\u{25C9}" : "\u{25CE}"}
            </button>
            </div>
            {erros.confirmarSenha && <span className="mensagem-erro">{erros.confirmarSenha}</span>}
          </div>

          <button type="submit" className="btn-redefinir" disabled={carregando}>
            {carregando ? "Processando" : "Redefinir Senha"}
          </button>
        </form>

        <div className="voltar-login">
          <button className="link-btn" onClick={() => navigate("/login")}>
            ← Voltar para o login
          </button>
        </div>
      </div>
    </div>
  );
}
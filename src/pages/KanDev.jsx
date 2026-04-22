import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/kandev.css";
import img_vazio from "../assets/img_vazio.jpg";
import icon_profile from "../assets/icon_profile.png";
import "../styles/base.css";

const STATUS = ["TODO", "DOING", "DONE"];
const LABELS = {
  "TODO": "Começar",
  "DOING": "Fazendo",
  "DONE": "Concluído",
};
const EMPTY_MSG = {
  "TODO": "Nenhuma tarefa para começar",
  "DOING": "Nenhuma tarefa em andamento",
  "DONE": "Nenhuma tarefa concluída",
};

export default function Kandev() {
  const navigate = useNavigate();
  const [tarefas, setTarefas] = useState([]);
  const [modalTarefaAberto, setModalTarefaAberto] = useState(false);
  const [novaTarefa, setNovaTarefa] = useState({ titulo: "", descricao: "", status: "TODO" });
  const [editando, setEditando] = useState(null);
  const [modalPerfilAberto, setModalPerfilAberto] = useState(false);
  const [dropdownPerfilAberto, setDropdownPerfilAberto] = useState(false);
  const [temaEscuro, setTemaEscuro] = useState(false);
  const [fotoPerfil, setFotoPerfil] = useState(null);
  const [fotoPreview, setFotoPreview] = useState(null);
  const inputFotoRef = useRef(null);

  const [perfil, setPerfil] = useState({
    nome: "",
    email: ""
  });

  useEffect(() => {
    const id = localStorage.getItem("usuarioId");
    if (!id) { 
      navigate("/login"); 
      return; 
    }
    carregarDados(id);
  }, [navigate]);

  const carregarDados = async (id) => {
    try {
      const [tarefasRes, usuarioRes] = await Promise.all([
        api.get(`/tarefas?usuarioId=${id}`),
        api.get(`/usuarios/${id}`)
      ]);
      setTarefas(tarefasRes.data);
      setPerfil({ nome: usuarioRes.data.nome, email: usuarioRes.data.email });
      setFotoPerfil(usuarioRes.data.fotoPerfil || null);
    } catch (error) {
      console.error("Erro ao carregar dados", error);
      navigate("/login");
    }
  };

  const abrirModalTarefa = () => {
    setNovaTarefa({ titulo: "", descricao: "", status: "TODO" });
    setEditando(null);
    setModalTarefaAberto(true);
  };

  const fecharModalTarefa = () => setModalTarefaAberto(false);

  const salvarTarefa = async (e) => {
    e.preventDefault();
    if (!novaTarefa.titulo.trim()) return;
    const usuarioId = localStorage.getItem("usuarioId");

    try {
      if (editando !== null) {
          await api.put(`/tarefas/${editando}`, { ...novaTarefa, usuarioId });

      } else {
          await api.post("/tarefas", { ...novaTarefa, usuarioId });
      }
      carregarDados(usuarioId);
      fecharModalTarefa();
    } catch (error) {
      console.error("Erro ao salvar tarefa", error);
    }
  };

  const editarTarefa = (tarefa) => {
    setNovaTarefa({ titulo: tarefa.titulo, descricao: tarefa.descricao || "", status: tarefa.status });
    setEditando(tarefa.id);
    setModalTarefaAberto(true);
  };

  const excluirTarefa = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir esta tarefa?")) {
      try {
        await api.delete(`/tarefas/${id}`);
        carregarDados(localStorage.getItem("usuarioId"));
      } catch (error) {
        console.error("Erro ao excluir tarefa", error);
      }
    }
  };

  const salvarPerfil = async (e) => {
    e.preventDefault();
    const id = localStorage.getItem("usuarioId");
    try {
        await api.patch(`/usuarios/${id}`, {
        nome: perfil.nome,
        fotoPerfil: fotoPreview || fotoPerfil
    });
      setFotoPerfil(fotoPreview || fotoPerfil);
      setModalPerfilAberto(false);
      alert("\u2705 Perfil atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar perfil", error);
    }
  };

  const handleDrop = async (e, novoStatus) => {
    e.preventDefault();
    const id = parseInt(e.dataTransfer.getData("text/plain"));
    const tarefa = tarefas.find(t => t.id === id);
    if (tarefa) {
      try {
        await api.patch(`/tarefas/${id}`, { status: novoStatus });
        carregarDados(localStorage.getItem("usuarioId"));
      } catch (error) {
        console.error("Erro ao mover tarefa", error);
      }
    }
  };

  const handleDragOver = (e) => {
  e.preventDefault();
};

const handleDragStart = (e, id) => {
  e.dataTransfer.setData("text/plain", id);
};

const handleDragEnd = (e) => {
  e.currentTarget.classList.remove("dragging");
};

const abrirModalPerfil = () => {
  setModalPerfilAberto(true);
  setDropdownPerfilAberto(false);
};

const fecharModalPerfil = () => {
  setModalPerfilAberto(false);
};

const handleFotoChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setFotoPreview(reader.result);
    };
    reader.readAsDataURL(file);
    setFotoPerfil(file);
  }
};

  return (
    <div className={`page-kandev ${temaEscuro ? "tema-escuro" : ""}`}>
      <header>
        <div className="logo">KanDev</div>

        <div className="header-acoes">
          <button className="btn-novo" onClick={abrirModalTarefa}>
            <span></span> Nova Tarefa
          </button>

          <div className="perfil-container">
            <div
              className="perfil-icone"
              onClick={() => setDropdownPerfilAberto(!dropdownPerfilAberto)}
            >
              
              <img
                src={fotoPerfil || icon_profile}
                alt="Perfil"
                style={{ objectFit: "cover", width: "100%", height: "100%", borderRadius: "50%" }}
              />
            </div>

            {dropdownPerfilAberto && (
              <div className="perfil-dropdown">
                <div className="dropdown-item" onClick={abrirModalPerfil}>
                  {"\u{02699} Editar Perfil"}
                </div>
                <div className="dropdown-item" onClick={() => {
                  setTemaEscuro(!temaEscuro);
                  setDropdownPerfilAberto(false);
                }}>
                  {temaEscuro ? "\u{1F31E} Tema Claro" : "\u{1F313} Tema Escuro"}
                </div>
                <div className="dropdown-separator"></div>
                <div className="dropdown-item logout" onClick={() => {
                  localStorage.removeItem("usuarioId");
                  localStorage.removeItem("usuarioNome");
                  navigate("/login");
                }}>
                  {"\u{1F6AA} Sair"}
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <main>
        {STATUS.map((status) => {
          const cartoes = tarefas.filter((t) => t.status === status);
          return (
            <section
              className="coluna"
              key={status}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, status)}
              onDragEnter={(e) => e.currentTarget.classList.add("drag-over")}
              onDragLeave={(e) => e.currentTarget.classList.remove("drag-over")}
            >
              <div className="coluna-header">
                <span>{LABELS[status]}</span>
                <span className="contador">({cartoes.length})</span>
              </div>

              <div className="cartoes-container">
                {cartoes.map((tarefa) => (
                  <div
                    key={tarefa.id}
                    className="cartao-tarefa"
                    draggable
                    onDragStart={(e) => handleDragStart(e, tarefa.id)}
                    onDragEnd={handleDragEnd}
                  >
                    <div className="titulo">{tarefa.titulo}</div>
                    {tarefa.descricao && <div className="descricao">{tarefa.descricao}</div>}
                    <div className="acoes">
                      <span title="Editar" onClick={() => editarTarefa(tarefa)}>{'\u270F'}</span>
                      <span title="Excluir" onClick={() => excluirTarefa(tarefa.id)}>🗑️</span>
                    </div>
                  </div>
                ))}
              </div>

              {cartoes.length === 0 && (
                <div className="coluna-vazia">
                  <div className="vazia-icone">
                    <img src={img_vazio} alt="vazio" />
                  </div>
                  <p>{EMPTY_MSG[status]}</p>
                </div>
              )}
            </section>
          );
        })}
      </main>

      <footer>
        <p>
          &copy; 2026 -{" "}
          <a href="https://github.com/clebermarcolino" target="_blank" rel="noreferrer">Cleber</a>
          {" "}e{" "}
          <a href="https://github.com/carloshgalves" target="_blank" rel="noreferrer">Carlos</a>
        </p>
      </footer>

      {modalTarefaAberto && (
        <div className="modal-overlay" onClick={fecharModalTarefa}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-icon">{editando !== null ? "✏️" : "📝"}</div>
              <h2>{editando !== null ? "Editar Tarefa" : "Nova Tarefa"}</h2>
              <button className="modal-fechar" onClick={fecharModalTarefa}>✕</button>
            </div>

            <form onSubmit={salvarTarefa}>
              <div className="form-grupo">
                <label htmlFor="titulo">Título da tarefa</label>
                <input
                  type="text"
                  id="titulo"
                  placeholder="Título de sua anotação"
                  required
                  value={novaTarefa.titulo}
                  onChange={(e) => setNovaTarefa({ ...novaTarefa, titulo: e.target.value })}
                />
              </div>

              <div className="form-grupo">
                <label htmlFor="descricao">Descrição</label>
                <textarea
                  id="descricao"
                  placeholder="Detalhes adicionais..."
                  value={novaTarefa.descricao}
                  onChange={(e) => setNovaTarefa({ ...novaTarefa, descricao: e.target.value })}
                />
              </div>

              {editando !== null && (
                <div className="form-grupo">
                  <label htmlFor="status">Coluna</label>
                  <select
                    id="status"
                    value={novaTarefa.status}
                    onChange={(e) => setNovaTarefa({ ...novaTarefa, status: e.target.value })}
                  >
                    {STATUS.map((s) => (
                      <option key={s} value={s}>{LABELS[s]}</option>
                    ))}
                  </select>
                </div>
              )}

              <div className="modal-acoes">
                <button type="button" className="btn-cancelar" onClick={fecharModalTarefa}>
                  Cancelar
                </button>
                <button type="submit" className="btn-salvar">
                  {editando !== null ? "Salvar Alterações" : "Criar Tarefa"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {modalPerfilAberto && (
        <div className="modal-overlay" onClick={fecharModalPerfil}>
          <div className="modal perfil-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Meu Perfil</h2>
              <button className="modal-fechar" onClick={fecharModalPerfil}>✕</button>
            </div>

            <form onSubmit={salvarPerfil}>

              <div className="foto-perfil-area">
                <div className="foto-perfil-preview" onClick={() => inputFotoRef.current.click()}>
                  <img
                    src={fotoPreview || fotoPerfil || icon_profile}
                    alt="Foto de perfil"
                  />
                  <div className="foto-perfil-overlay">
                    <span>{"\u{1F4F7} Alterar foto"}</span>
                  </div>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  ref={inputFotoRef}
                  style={{ display: "none" }}
                  onChange={handleFotoChange}
                />
              </div>

              <div className="form-grupo">
                <label>Nome Completo</label>
                <input
                  type="text"
                  value={perfil.nome}
                  onChange={(e) => setPerfil({ ...perfil, nome: e.target.value })}
                />
              </div>

              <div className="form-grupo">
                <label>Email</label>
                <input
                  type="email"
                  value={perfil.email}
                  onChange={(e) => setPerfil({ ...perfil, email: e.target.value })}
                />
              </div>

              <div className="modal-acoes">
                <button type="button" className="btn-cancelar" onClick={fecharModalPerfil}>
                  Cancelar
                </button>
                <button type="submit" className="btn-salvar">Salvar Alterações</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
import { useState } from "react";
import "../styles/kandev.css";

const STATUS = ["começar", "fazendo", "concluído"];
const LABELS = {
  "começar": "Começar",
  "fazendo": "Fazendo",
  "concluído": "Concluído",
};
const EMPTY_MSG = {
  "começar": "Nenhuma tarefa para começar",
  "fazendo": "Nenhuma tarefa em andamento",
  "concluído": "Nenhuma tarefa concluída",
};

let nextId = 1;

export default function Kandev({ navigate }) {
  const [tarefas, setTarefas] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [novaTarefa, setNovaTarefa] = useState({ titulo: "", descricao: "", status: "começar" });
  const [editando, setEditando] = useState(null);

  const abrirModal = () => {
    setNovaTarefa({ titulo: "", descricao: "", status: "começar" });
    setEditando(null);
    setModalAberto(true);
  };

  const fecharModal = () => setModalAberto(false);

  const salvarTarefa = (e) => {
    e.preventDefault();
    if (!novaTarefa.titulo.trim()) return;

    if (editando !== null) {
      setTarefas(tarefas.map((t) => (t.id === editando ? { ...t, ...novaTarefa } : t)));
    } else {
      setTarefas([...tarefas, { ...novaTarefa, id: nextId++ }]);
    }
    fecharModal();
  };

  const excluirTarefa = (id) => {
    setTarefas(tarefas.filter((t) => t.id !== id));
  };

  const editarTarefa = (tarefa) => {
    setNovaTarefa({ titulo: tarefa.titulo, descricao: tarefa.descricao, status: tarefa.status });
    setEditando(tarefa.id);
    setModalAberto(true);
  };

  const moverTarefa = (id, direcao) => {
    const idx = STATUS.indexOf(tarefas.find((t) => t.id === id).status);
    const novoIdx = idx + direcao;
    if (novoIdx < 0 || novoIdx >= STATUS.length) return;
    setTarefas(tarefas.map((t) => (t.id === id ? { ...t, status: STATUS[novoIdx] } : t)));
  };

  return (
    <div className="kandev-page">
      <header>
        <div className="logo">KanDev</div>
        <div className="header-acoes">
          <button className="btn-novo" onClick={abrirModal}>
            <span>＋</span> Nova Tarefa
          </button>
          <div className="Perfil">
            <div className="perfil-icone">👤</div>
          </div>
        </div>
      </header>

      <main>
        {STATUS.map((status) => {
          const cartoes = tarefas.filter((t) => t.status === status);
          return (
            <section className="coluna" key={status} data-status={status}>
              <div className="coluna-header">
                <span>{LABELS[status]}</span>
                <span className="contador">({cartoes.length})</span>
              </div>

              <div className="cartoes-container">
                {cartoes.map((tarefa) => (
                  <div className="cartao-tarefa" key={tarefa.id}>
                    <div className="titulo">{tarefa.titulo}</div>
                    {tarefa.descricao && (
                      <div className="descricao">{tarefa.descricao}</div>
                    )}
                    <div className="acoes">
                      <span title="Editar" onClick={() => editarTarefa(tarefa)}>✏️</span>
                      <span title="Mover para trás" onClick={() => moverTarefa(tarefa.id, -1)}>◀</span>
                      <span title="Mover para frente" onClick={() => moverTarefa(tarefa.id, 1)}>▶</span>
                      <span title="Excluir" onClick={() => excluirTarefa(tarefa.id)}>🗑️</span>
                    </div>
                  </div>
                ))}
              </div>

              {cartoes.length === 0 && (
                <div className="coluna-vazia">
                  <div className="vazia-icone">📋</div>
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

      {modalAberto && (
        <div className="modal-overlay" onClick={fecharModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editando !== null ? "Editar Tarefa" : "Nova Tarefa"}</h2>
              <button className="modal-fechar" onClick={fecharModal}>✕</button>
            </div>
            <form onSubmit={salvarTarefa}>
              <div className="form-grupo">
                <label htmlFor="titulo">Título</label>
                <input
                  type="text"
                  id="titulo"
                  placeholder="Nome da tarefa"
                  required
                  value={novaTarefa.titulo}
                  onChange={(e) => setNovaTarefa({ ...novaTarefa, titulo: e.target.value })}
                />
              </div>
              <div className="form-grupo">
                <label htmlFor="descricao">Descrição</label>
                <textarea
                  id="descricao"
                  placeholder="Descrição opcional"
                  value={novaTarefa.descricao}
                  onChange={(e) => setNovaTarefa({ ...novaTarefa, descricao: e.target.value })}
                />
              </div>
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
              <div className="modal-acoes">
                <button type="button" className="btn-cancelar" onClick={fecharModal}>Cancelar</button>
                <button type="submit" className="btn-salvar">
                  {editando !== null ? "Salvar" : "Criar Tarefa"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

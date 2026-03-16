import "../styles/home.css";

export default function Home({ navigate }) {
  return (
    <>
      <header>
        <div className="hero-container">
          <h1>KanDev</h1>
          <p>
            Kanban simples, rápido e feito para planejar seu cotidiano. Organize
            tarefas, projetos, ideias sem complicação e totalmente gratuito.
          </p>
          <button className="btn-login" onClick={() => navigate("login")}>
            Login
          </button>
          <button className="btn-cadastro" onClick={() => navigate("cadastro")}>
            Cadastre-se
          </button>
        </div>
      </header>

      <main>
        <h2>Por que usar o KanDev?</h2>
        <div className="grid">
          <div className="card">
            <h3>Colunas prontas</h3>
            <p>
              Fluxo simples de organização de
              tarefas.
            </p>
          </div>
          <div className="card">
            <h3>Fácil e rápido</h3>
            <p>Interface intuitiva, direta e carregamento rápido.</p>
          </div>
          <div className="card">
            <h3>Dark mode e responsividade</h3>
            <p>Modo escuro e interface responsiva.</p>
          </div>
        </div>
      </main>

      <footer>
        <p>
          &copy; 2026 -{" "}
          <a
            href="https://github.com/clebermarcolino"
            target="_blank"
            rel="noreferrer"
          >
            Cleber
          </a>{" "}
          e{" "}
          <a
            href="https://github.com/carloshgalves"
            target="_blank"
            rel="noreferrer"
          >
            Carlos
          </a>
        </p>
      </footer>
    </>
  );
}

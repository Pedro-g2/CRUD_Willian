import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, useNavigate, Link } from "react-router-dom";
import InserirTarefa from "./InserirTarefa";
import VisualizarTarefas from "./VisualizarTarefas";

// Componente Home sem estilização
function Home() {
  return (
    <div>
      <h1>Bem-vindo ao Gerenciador de Tarefas</h1>
      <div>
        <Link to="/inserir">
          <button>Inserir Tarefa</button>
        </Link>
        <Link to="/visualizar">
          <button>Visualizar Tarefas</button>
        </Link>
      </div>
    </div>
  );
}

function App() {
  const [tarefas, setTarefas] = useState([]);
  const [novoTitulo, setNovoTitulo] = useState("");
  const [novaDescricao, setNovaDescricao] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3001/tarefas").then((res) => setTarefas(res.data));
  }, []);

  const adicionarTarefa = () => {
    if (!novoTitulo.trim()) {
      setErro("Título é obrigatório");
      return;
    }
    setErro("");
    axios.post("http://localhost:3001/tarefas", { titulo: novoTitulo, descricao: novaDescricao }).then((res) => {
      setTarefas([...tarefas, res.data]);
      setNovoTitulo("");
      setNovaDescricao("");
      navigate("/visualizar");
    });
  };

  const alternarConclusao = (id) => {
    const tarefa = tarefas.find(t => t.id === id);
    axios.put(`http://localhost:3001/tarefas/${id}`, { concluida: !tarefa.concluida }).then((res) => {
      setTarefas(tarefas.map(t => (t.id === id ? res.data : t)));
    });
  };

  const removerTarefa = (id) => {
    axios.delete(`http://localhost:3001/tarefas/${id}`).then(() => {
      setTarefas(tarefas.filter(t => t.id !== id));
    });
  };

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/visualizar"
        element={
          <VisualizarTarefas
            tarefas={tarefas}
            alternarConclusao={alternarConclusao}
            removerTarefa={removerTarefa}
          />
        }
      />
      <Route
        path="/inserir"
        element={
          <InserirTarefa
            onAdicionar={adicionarTarefa}
            erro={erro}
            setNovoTitulo={setNovoTitulo}
            setNovaDescricao={setNovaDescricao}
            novoTitulo={novoTitulo}
            novaDescricao={novaDescricao}
          />
        }
      />
    </Routes>
  );
}

export default function AppWithRouter() {
  return (
    <Router>
      <App />
    </Router>
  );
}

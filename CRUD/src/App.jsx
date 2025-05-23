import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, useNavigate, Link } from "react-router-dom";
import InserirTarefa from "./InserirTarefa";
import VisualizarTarefas from "./VisualizarTarefas";

// Componente Home com botões de navegação
function Home() {
  return (
    <div className="flex flex-col items-center pt-16 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Bem-vindo ao Gerenciador de Tarefas</h1>
      <div className="flex gap-4">
        <Link to="/inserir">
          <button className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition">Inserir Tarefa</button>
        </Link>
        <Link to="/visualizar">
          <button className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600 transition">Visualizar Tarefas</button>
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

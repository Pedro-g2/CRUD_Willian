import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/tarefas").then((res) => setTarefas(res.data));
  }, []);

  const adicionarTarefa = () => {
    axios.post("http://localhost:3001/tarefas", { titulo: novaTarefa }).then((res) => {
      setTarefas([...tarefas, res.data]);
      setNovaTarefa("");
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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Lista de Tarefas</h1>

      <div className="flex mb-4">
        <input
          className="border p-2"
          value={novaTarefa}
          onChange={(e) => setNovaTarefa(e.target.value)}
          placeholder="Adicionar nova tarefa"
        />
        <button onClick={adicionarTarefa} className="bg-blue-500 text-white p-2 ml-2">
          Adicionar
        </button>
      </div>

      <ul className="w-64">
        {tarefas.map(tarefa => (
          <li key={tarefa.id} className="flex justify-between p-2 bg-white rounded shadow mb-2">
            <span className={tarefa.concluida ? "line-through text-gray-500" : ""}>
              {tarefa.titulo}
            </span>
            <div>
              <button
                className="text-green-500 mr-2"
                onClick={() => alternarConclusao(tarefa.id)}
              >
                {tarefa.concluida ? "Desmarcar" : "Concluir"}
              </button>
              <button className="text-red-500" onClick={() => removerTarefa(tarefa.id)}>
                Excluir
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

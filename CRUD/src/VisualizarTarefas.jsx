import React from "react";
import { Link } from "react-router-dom";

export default function VisualizarTarefas({ tarefas, alternarConclusao, removerTarefa }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Lista de Tarefas</h1>
      <div className="flex gap-4 mb-4">
        <Link to="/inserir" className="text-blue-600 underline">
          Inserir Nova Tarefa
        </Link>
        <Link to="/" className="text-gray-700 underline">
          Página Inicial
        </Link>
      </div>
      <ul className="w-64 list-none p-0">
        {tarefas.map(tarefa => (
          <li
            key={tarefa.id}
            className="flex flex-col p-4 bg-white rounded-lg border border-black shadow mb-[3px]"
          >
            <div className="flex justify-between items-center">
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
            </div>
            <div>
              {tarefa.descricao}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
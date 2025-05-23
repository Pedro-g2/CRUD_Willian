import React from "react";
import { Link } from "react-router-dom";

export default function InserirTarefa({ onAdicionar, erro, setNovoTitulo, setNovaDescricao, novoTitulo, novaDescricao }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Inserir Tarefa</h1>
      <div className="flex flex-col mb-4 w-64">
        <input
          className="border p-2 mb-2"
          value={novoTitulo}
          onChange={e => setNovoTitulo(e.target.value)}
          placeholder="Título da tarefa"
        />
        <textarea
          className="border p-2 mb-2"
          value={novaDescricao}
          onChange={e => setNovaDescricao(e.target.value)}
          placeholder="Descrição da tarefa"
        />
        <button onClick={onAdicionar} className="bg-blue-500 text-white p-2">
          Adicionar
        </button>
        <div className="flex gap-4 mt-2">
          <Link to="/visualizar" className="text-blue-600 underline">
            Visualizar Tarefas
          </Link>
          <Link to="/" className="text-gray-700 underline">
            Página Inicial
          </Link>
        </div>
      </div>
      {erro && (
        <div className="text-red-600 font-bold mb-2">{erro}</div>
      )}
    </div>
  );
}
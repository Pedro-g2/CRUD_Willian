import React from "react";
import { Link } from "react-router-dom";

export default function InserirTarefa({ onAdicionar, erro, setNovoTitulo, setNovaDescricao, novoTitulo, novaDescricao }) {
  return (
    <div>
      <h1>Inserir Tarefa</h1>
      <div>
        <input
          value={novoTitulo}
          onChange={e => setNovoTitulo(e.target.value)}
          placeholder="Título da tarefa"
        />
        <textarea
          value={novaDescricao}
          onChange={e => setNovaDescricao(e.target.value)}
          placeholder="Descrição da tarefa"
        />
        <button onClick={onAdicionar}>
          Adicionar
        </button>
        <div>
          <Link to="/visualizar">
            Visualizar Tarefas
          </Link>
          {" | "}
          <Link to="/">
            Página Inicial
          </Link>
        </div>
      </div>
      {erro && (
        <div>{erro}</div>
      )}
    </div>
  );
}
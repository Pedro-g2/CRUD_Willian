import { Link } from "react-router-dom";

export default function VisualizarTarefas({ tarefas, alternarConclusao, removerTarefa }) {
  return (
    <div>
      <h1>Lista de Tarefas</h1>
      <div>
        <Link to="/inserir">Inserir Nova Tarefa</Link> |{" "}
        <Link to="/">Página Inicial</Link>
      </div>
      <ul>
        {tarefas.map(tarefa => (
          <li key={tarefa.id} className="li">
            <div>
              <span style={tarefa.concluida ? { textDecoration: "line-through", color: "gray" } : {}}>
                <label htmlFor="titulo" class="titulo_card">Título: </label>
                <span name="titulo" >{tarefa.titulo}</span>
              </span>
            </div>
            <div>
              <label htmlFor="descricao" class="titulo_card">Descrição: </label>
                <span name="descricao">{tarefa.descricao}</span>
            </div>

            <span class="botao">
              <button onClick={() => alternarConclusao(tarefa.id)}>
                {tarefa.concluida ? "Desmarcar" : "Concluir"}
              </button>
            </span>
            
            <span class="botao">
              <button onClick={() => removerTarefa(tarefa.id)}>
                Excluir
              </button>
            </span>
            
          </li>
        ))}
      </ul>
    </div>
  );
}
const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());

// Configuração completa de CORS
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
};
app.use(cors(corsOptions));

// Lista de tarefas simulada
let tarefas = [
  { id: 1, titulo: 'Estudar React', concluida: false },
  { id: 2, titulo: 'Criar um projeto Tailwind', concluida: true }
];

// CRUD da lista de tarefas
app.get('/tarefas', (req, res) => res.json(tarefas));
app.post('/tarefas', (req, res) => {
  const { titulo } = req.body;
  const novaTarefa = { id: tarefas.length + 1, titulo, concluida: false };
  tarefas.push(novaTarefa);
  res.status(201).json(novaTarefa);
});
app.put('/tarefas/:id', (req, res) => {
  const tarefa = tarefas.find(t => t.id === parseInt(req.params.id));
  if (tarefa) {
    tarefa.titulo = req.body.titulo ?? tarefa.titulo;
    tarefa.concluida = req.body.concluida ?? tarefa.concluida;
    res.json(tarefa);
  } else {
    res.status(404).json({ erro: 'Tarefa não encontrada' });
  }
});
app.delete('/tarefas/:id', (req, res) => {
  tarefas = tarefas.filter(t => t.id !== parseInt(req.params.id));
  res.json({ mensagem: 'Tarefa removida com sucesso' });
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

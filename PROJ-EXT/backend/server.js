// server.js
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importa o CORS

const app = express();
const port = 3001; // Porta do backend

// Configuração do CORS
app.use(cors());

// Configuração do body-parser
app.use(bodyParser.json());

// Configuração da conexão com o MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',          // Coloque aqui o seu usuário do MySQL
  password: '8151',          // Coloque aqui a sua senha do MySQL
  database: 'meubanco'
});

// Conectar ao MySQL
db.connect(err => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err);
    return;
  }
  console.log('Conectado ao MySQL com sucesso!');
});

// Rota para obter todos os usuários
app.get('/users', (req, res) => {
  const sql = 'SELECT * FROM users';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao obter usuários:', err);
      res.status(500).send('Erro ao obter usuários');
    } else {
      res.json(results);
    }
  });
});

// Rota para obter um usuário por ID
app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM users WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Erro ao obter usuário:', err);
      res.status(500).send('Erro ao obter usuário');
    } else {
      res.json(result);
    }
  });
});

// Rota para adicionar um novo usuário
app.post('/users', (req, res) => {
  const { name, email } = req.body;
  const sql = 'INSERT INTO users (name, email) VALUES (?, ?)';
  db.query(sql, [name, email], (err, result) => {
    if (err) {
      console.error('Erro ao adicionar usuário:', err);
      res.status(500).send('Erro ao adicionar usuário');
    } else {
      res.status(201).json({ id: result.insertId, name, email });
    }
  });
});

// Rota para atualizar um usuário
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const sql = 'UPDATE users SET name = ?, email = ? WHERE id = ?';
  db.query(sql, [name, email, id], (err, result) => {
    if (err) {
      console.error('Erro ao atualizar usuário:', err);
      res.status(500).send('Erro ao atualizar usuário');
    } else {
      res.send('Usuário atualizado com sucesso!');
    }
  });
});

// Rota para deletar um usuário
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM users WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Erro ao deletar usuário:', err);
      res.status(500).send('Erro ao deletar usuário');
    } else {
      res.send('Usuário deletado com sucesso!');
    }
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

// Importando a biblilhoteca do express e passando a porta 
const express = require('express');
const app = express();
const PORT = 3000;

// Lista de produtos (simulando um "banco de dados" em memória)
let produtos = [];


// Middleware para registrar informações de cada chamada
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});


// Adiciona um middleware para trabalhar com json nas reqs.
app.use(express.json());

app.get('/produtos', (req, res)=>{
  res.json(produtos)
})

// Rota para adicionar um novo produto
app.post('/produtos', (req, res) => {
  const produto = req.body;

  if (produtos.length > 0){
    produto.id = produtos[produtos.length - 1].id + 1
  } else{
    produto.id = 1
  }
  const { nome, preco, descricao } = req.body;
  produtos.push(produto);
  res.status(201).send('Produto adicionado com sucesso.');
});

//Rota para listar os produtos
app.get('/produtos/:id', (req, res) => {
  const { id } = req.params;
  const produto = produtos.find(produto => produto.id === parseInt(id));
  if (!produto) {
      res.status(404).send('Produto não encontrado.');
      return;
  }
  res.json(produto);
});
 
//Rota para Atualizar os produtos
app.put('/produtos/:id', (req, res) => {
  const { id } = req.params;
  const newData = req.body;
  const index = produtos.findIndex(produto => produto.id === parseInt(id));
  if (index === -1) {
      res.status(404).send('Produtos não encontrado.');
      return;
  }
  produtos[index] = { ...produtos[index], ...newData };
  res.status(200).send('Produtos atualizado com sucesso.');
});

//Rota Para deletar um Produto
app.delete('/produtos/:id', (req, res) => {
  const { id } = req.params;
  const index = produtos.findIndex(produto => produto.id === parseInt(id));
  if (index === -1) {
      res.status(404).send('Produtos não encontrado.');
      return;
  }
  produtos.splice(index, 1);
  res.status(200).send('Produtos deletado com sucesso.');
});

  app.listen(3000, function(){  
    console.log("Servidor Rodando!!!")
});
const express = require("express");
const cors = require("cors");

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(express.static("public")); // Serve os arquivos da pasta public

// "Banco de dados" temporario em memoria
let produtos = [
  { id: 1, nome: "Teclado Mecanico", quantidade: 10, preco: 150.0 },
  { id: 2, nome: "Mouse Gamer", quantidade: 3, preco: 80.0 },
];

// Rota 1: Listar produtos
app.get("/api/produtos", (req, res) => {
  res.json(produtos);
});

// Rota 2: Cadastrar produto
app.post("/api/produtos", (req, res) => {
  const { nome, quantidade, preco } = req.body;

  if (!nome || quantidade === undefined || preco === undefined) {
    return res.status(400).json({ erro: "Todos os campos são obrigatórios." });
  }

  const novoProduto = {
    id: Date.now(),
    nome,
    quantidade: Number(quantidade),
    preco: Number(preco),
  };

  produtos.push(novoProduto);
  res.status(201).json(novoProduto);
});

// Rota 3: Excluir produto
app.delete("/api/produtos/:id", (req, res) => {
  const id = Number(req.params.id);

  const indice = produtos.findIndex((produto) => produto.id === id);

  if (indice === -1) {
    return res.status(404).json({
      error: "Produto não encontrado.",
    });
  }

  const produtoRemovido = produtos.splice(indice, 1);

  res.json({
    mensagem: "Produto excluído com sucesso.",
    produto: produtoRemovido[0],
  });
});

// Inicialização do servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor Xtok rodando em http://localhost:${PORT}`);
});

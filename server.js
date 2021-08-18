const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Setup server port
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

// rota de teste
app.get('/', (req, res) => {
  res.send("Funcionou");
});

// Rimport das rotas
const produtoRoutes = require('./src/routes/produtoRoutes');
const compraRoutes = require('./src/routes/compraRoutes');

//rotas
app.use('/produto', produtoRoutes);
app.use('/compra', compraRoutes);

app.listen(port, () => {
  console.log(`Servidor executando na porta: ${port}`);
});
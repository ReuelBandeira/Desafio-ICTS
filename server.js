const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());

// Setup server port
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use("/public", express.static(__dirname + "/public"));

// rota de teste
app.get("/", (req, res) => {
  res.send("Funcionou");
});

// import das rotas
const produtoRoutes = require("./src/routes/produtoRoutes");
const compraRoutes = require("./src/routes/compraRoutes");

//rotas
app.use("/produto", produtoRoutes);
app.use("/compra", compraRoutes);

app.listen(port, () => {
  console.log(`Servidor executando na porta: ${port}`);
});

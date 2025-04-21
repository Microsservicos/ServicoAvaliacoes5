const express = require("express");
const path = require("path");
require("dotenv").config();

const reviewRoutes = require("./routes/reviewRoutes");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/reviews", reviewRoutes);

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Serviço de Avaliações rodando na porta ${PORT}`);
  console.log("http://localhost:3005");
});

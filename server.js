const express = require("express");
const mongoose = require("mongoose");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

app.use(express.json());

mongoose.connect("mongodb+srv://cristianoipigua_db_user:29CWwCc6j6rZntSm@cluster0.vbr7ice.mongodb.net/orders");

mongoose.connection.on("connected", () => {
  console.log("MongoDB conectado");
});

app.use("/", orderRoutes);

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
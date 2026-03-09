const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

function mapOrder(data) {
  return {
    orderId: data.numeroPedido,
    value: data.valorTotal,
    creationDate: data.dataCriacao,
    items: data.items.map(item => ({
      productId: Number(item.idItem),
      quantity: item.quantidadeItem,
      price: item.valorItem
    }))
  };
}

// criar pedido
router.post("/order", async (req, res) => {
  const mapped = mapOrder(req.body);
  const order = new Order(mapped);
  await order.save();
  res.json(order);
});

// buscar pedido
router.get("/order/:id", async (req, res) => {
  const order = await Order.findOne({ orderId: req.params.id });
  res.json(order);
});

// listar pedidos
router.get("/order/list", async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

// atualizar pedido
router.put("/order/:id", async (req, res) => {
  const mapped = mapOrder(req.body);
  const order = await Order.findOneAndUpdate(
    { orderId: req.params.id },
    mapped,
    { new: true }
  );
  res.json(order);
});

// deletar pedido
router.delete("/order/:id", async (req, res) => {
  await Order.findOneAndDelete({ orderId: req.params.id });
  res.json({ message: "Pedido deletado" });
});

module.exports = router;
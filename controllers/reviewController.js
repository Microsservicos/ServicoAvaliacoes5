
const reviewModel = require("../models/reviewModel");
const pool = require("../db");

exports.createReview = async (req, res) => {
  const { order_id, user_id, restaurant_id, rating, comment } = req.body;

  if (!order_id || !user_id || !restaurant_id || !rating) {
    return res.status(400).json({ error: "Campos obrigatórios ausentes." });
  }

  try {
    const isOrderConfirmed = await reviewModel.checkOrderConfirmed(order_id);

    if (!isOrderConfirmed) {
      return res.status(400).json({ error: "Pedido não confirmado ou inexistente." });
    }

    await reviewModel.createReview(order_id, user_id, restaurant_id, rating, comment);
    res.status(201).json({ message: "Avaliação criada com sucesso!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};

exports.getReviewsByRestaurant = async (req, res) => {
  const { restaurant_id } = req.query;

  if (!restaurant_id) {
    return res.status(400).json({ error: "restaurant_id é obrigatório." });
  }

  try {
    const reviews = await reviewModel.getReviewsByRestaurant(restaurant_id);
    res.json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar avaliações." });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const id = req.params.id;
    await reviewModel.deleteReview(id);
    res.status(200).json({ message: "Review deletada com sucesso." });
  } catch (error) {
    console.error("Erro ao deletar review:", error);
    res.status(500).json({ message: "Erro interno ao deletar review." });
  }
};


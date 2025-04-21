const pool = require("../db");

exports.checkOrderConfirmed = async (order_id) => {
  const [rows] = await pool.query(
    "SELECT pagamento_confirmado FROM orders WHERE id = ?",
    [order_id]
  );

  return rows.length > 0 && rows[0].pagamento_confirmado === 1;
};

exports.createReview = async (order_id, user_id, restaurant_id, rating, comment) => {
  await pool.query(
    `INSERT INTO reviews (order_id, user_id, restaurant_id, rating, comment)
     VALUES (?, ?, ?, ?, ?)`,
    [order_id, user_id, restaurant_id, rating, comment || null]
  );
};

exports.getReviewsByRestaurant = async (restaurant_id) => {
  const [rows] = await pool.query(
    "SELECT * FROM reviews WHERE restaurant_id = ?",
    [restaurant_id]
  );
  return rows;
};

exports.deleteReview = async (id) => {
  await pool.query("DELETE FROM reviews WHERE id = ?", [id]);
};

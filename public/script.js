async function loadReviews() {
  const restaurantId = document.getElementById("restaurantId").value;
  const list = document.getElementById("reviewsList");
  list.innerHTML = "";

  try {
    const res = await fetch(`/reviews?restaurant_id=${restaurantId}`);
    const data = await res.json();

    if (!data.length) {
      list.innerHTML = "<li>Nenhuma avaliação encontrada.</li>";
      return;
    }

    data.forEach((r) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>Nota:</strong> ${r.rating} <br>
        <strong>Comentário:</strong> ${r.comment || "Sem comentário"}
        <br><button onclick="deleteReview(${r.id})" class="button">Deletar</button>
      `;
      list.appendChild(li);
    });
  } catch (err) {
    console.error("Erro ao buscar avaliações:", err);
  }
}

async function createReview(event) {
  event.preventDefault();

  const order_id = document.getElementById("orderId").value;
  const user_id = document.getElementById("userId").value;
  const restaurant_id = document.getElementById("restaurantId").value;
  const rating = document.getElementById("rating").value;
  const comment = document.getElementById("comment").value;

  try {
    const res = await fetch("/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ order_id, user_id, restaurant_id, rating, comment })
    });

    const data = await res.json();
    document.getElementById("result").innerText = data.message || data.error;
  } catch (err) {
    console.error("Erro ao enviar avaliação:", err);
  }
}

async function deleteReview(id) {
  if (confirm("Tem certeza que deseja deletar esta avaliação?")) {
    const response = await fetch(`/reviews/${id}`, { method: "DELETE" });

    if (response.ok) {
      alert("Avaliação deletada!");
      loadReviews();
    } else {
      alert("Erro ao deletar avaliação.");
    }
  }
}

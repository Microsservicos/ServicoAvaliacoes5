# Sistema de Avaliações - Serviço de Delivery

Sistema de avaliações para um serviço de delivery de comida. O objetivo é permitir que os clientes façam avaliações sobre os restaurantes, incluindo notas e comentários, e que as avaliações possam ser consultadas, criadas e deletadas.

---

## Funcionalidades

- **Criar Avaliação**: Usuários podem fazer uma avaliação de um restaurante, informando a nota, o comentário e o pedido associado.
- **Listar Avaliações**: As avaliações de um restaurante podem ser consultadas através do ID do restaurante.
- **Deletar Avaliação**: Avaliações podem ser deletadas caso o usuário deseje.

---


## ⚙️ Instalação

1. Clone o repositório:

```bash
git clone https://github.com/Microsservicos/ServicoAvaliacoes5.git
```

2. Instale as dependências:

```bash
npm install
```

3. Configure o arquivo `.env` com suas variáveis de ambiente:

```env
DB_HOST=switchback.proxy.rlwy.net
DB_PORT=54582  
DB_USER=root
DB_PASSWORD=XGHNbPlETOYsCGhxymjHVeJmVaTZdtiZ
DB_NAME=railway
```


---

## Exemplos de requisição

### Buscar avaliações de um restaurante


**Endpoint:** `GET /reviews?restaurant_id=1`

#### curl
```bash
curl -X GET "http://localhost:3005/reviews?restaurant_id=1"
```

#### fetch
```js
fetch("http://localhost:3005/reviews?restaurant_id=1")
  .then(res => res.json())
  .then(data => console.log(data));
```

---

### Criar uma nova avaliação

**Endpoint:** `POST /reviews`

**Corpo esperado:**
```json
{
  "order_id": 123,
  "user_id": 45,
  "restaurant_id": 1,
  "rating": 4,
  "comment": "Entrega rápida e comida excelente!"
}
```

#### curl
```bash
curl -X POST http://localhost:3005/reviews   -H "Content-Type: application/json"   -d '{
    "order_id": 123,
    "user_id": 45,
    "restaurant_id": 1,
    "rating": 4,
    "comment": "Entrega rápida e comida excelente!"
  }'
```

---

### Deletar uma avaliação

**Endpoint:** `DELETE /reviews/:id`

#### curl
```bash
curl -X DELETE http://localhost:3005/reviews/7
```

#### fetch
```js
fetch("http://localhost:3005/reviews/7", {
  method: "DELETE"
}).then(res => res.json()).then(data => console.log(data));
```

---

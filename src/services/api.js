/**
 * API Service (Create React App)
 *
 * 1) Create `.env` at project root
 * 2) Set: REACT_APP_API_URL=https://YOUR-BACKEND.onrender.com
 * 3) Restart `npm start`
 */
const API_URL = process.env.REACT_APP_API_URL;

/**
 * TODO: If your backend routes differ, update the paths here.
 * Required endpoints:
 * - GET    /allcards
 * - POST   /addcard
 * - PUT    /updatecard/:id
 * - DELETE /deletecard/:id
 */

function authHeader() { 
  const token = localStorage.getItem("token"); 
  return token ? { Authorization: `Bearer ${token}` } : {}; 
} 
 

export async function login(credentials) {
  return fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
}

export async function getCards() {
  const res = await fetch(`${API_URL}/allcards`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export const getCardById = async (id) => {
    const res = await fetch(`${API_URL}/editcard/${id}`);
    if (!res.ok) throw new Error("Failed to fetch card");
    return res.json();
};

// Protect ONLY addCard in this demo 
export async function addCard(card) {
  const res = await fetch(`${API_URL}/addcard`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(), 
    },
    body: JSON.stringify(card),
  });
  return res.json();
}

/*PUT update an existing card*/
export async function updateCard(id, card) {
  const res = await fetch(`${API_URL}/editcard/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(card),
  });
  return res.json();
}

/**DELETE a card by ID*/
export async function deleteCard(id) {
  const res = await fetch(`${API_URL}/deletecard/${id}`, {
    method: "DELETE",
  });
  return res.json();
}

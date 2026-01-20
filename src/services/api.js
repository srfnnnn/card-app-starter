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


export async function addCard(card) {
  const res = await fetch(`${API_URL}/addcard`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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




// export async function getCards() {
//   try {
//     console.log("Fetching cards from:", `${API_URL}/allcards`);
//     const res = await fetch(`${API_URL}/allcards`);

//     // Check HTTP status
//     if (!res.ok) {
//       throw new Error(`HTTP error! status: ${res.status}`);
//     }

//     const data = await res.json();
//     console.log("Data received from API:", data);

//     // Make sure we always return an array
//     if (Array.isArray(data)) return data;
//     if (Array.isArray(data?.cards)) return data.cards;

//     console.warn("API returned unexpected format, returning empty array");
//     return [];
//   } catch (err) {
//     console.error("Fetch error:", err);
//     // rethrow for component to handle
//     throw new Error(
//       err.message || "Failed to fetch cards. Check API and CORS."
//     );
//   }
// }

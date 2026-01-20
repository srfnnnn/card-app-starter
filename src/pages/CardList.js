// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Card from "../components/Card";
// import { getCards, deleteCard } from "../services/api";

// export default function CardList() {
//     const [cards, setCards] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [busyId, setBusyId] = useState(null); // card id being deleted
//     const [error, setError] = useState("");
//     const navigate = useNavigate();

//     useEffect(() => {
//         async function fetchCards() {
//             try {
//                 setLoading(true);
//                 const data = await getCards();  
//                 setCards(data);
//             } catch (err) {
//                 setError("Failed to load cards.");
//             } finally {
//                 setLoading(false);
//             }
//         }

//         fetchCards();
//     }, []); 

//     const handleDelete = async (card) => {
//         if (!card?.id) return;

//         const ok = window.confirm(`Delete "${card.card_name}"?`);
//         if (!ok) return;

//         setBusyId(card.id);
//         setError("");

//         try {
//             await deleteCard(card.id);
//             setCards((prev) => prev.filter((c) => c.id !== card.id));
//         } catch (err) {
//             setError(err?.message || "Failed to delete card.");
//         } finally {
//             setBusyId(null);
//         }
//     };
    
//     const handleEdit = (card) => {
//       navigate(`/editcard/${card.id}`);
//     };


//     return (
//         <main className="page">
//             <h1>Cards</h1>

//             {error && <p className="error">{error}</p>}

//             {loading ? (
//                 <p>Loading...</p>
//             ) : cards.length === 0 ? (
//                 <p>No cards found.</p>
//             ) : (
//                 <div className="grid">
//                     {cards.map((card) => (
//                         <Card
//                             key={card.id}
//                             card={card}
//                             onDelete={handleDelete}
//                             onEdit={handleEdit}
//                             busy={busyId === card.id}
//                         />
//                     ))}
//                 </div>
//             )}
//         </main>
//     );
// }

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Card from "../components/Card";
import { getCards, deleteCard } from "../services/api";

export default function CardList() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState(null);

  const location = useLocation();

  async function fetchCards() {
    try {
      setLoading(true);
      const data = await getCards();
      setCards(data);
    } catch {
      setError("Failed to load cards.");
    } finally {
      setLoading(false);
    }
  }

  // Refetch whenever the location changes
  useEffect(() => {
    fetchCards();
  }, [location]);

  async function handleDelete(id) {
    try {
      setBusyId(id);
      await deleteCard(id);
      setCards(prev => prev.filter(card => card.id !== id));
    } catch {
      setError("Failed to delete card.");
    } finally {
      setBusyId(null);
    }
  }

  if (loading) return <p>Loading cards...</p>;

  return (
    <main>
      <h2>Card List</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {cards.length === 0 ? (
        <p>No cards yet.</p>
      ) : (
        <div className="card-list">
          {cards.map(card => (
            <Card
              key={card.id}
              card={card}
              onDelete={() => handleDelete(card.id)}
              busy={busyId === card.id}
            />
          ))}
        </div>
      )}
    </main>
  );
}


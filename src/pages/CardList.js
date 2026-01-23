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
  const confirmed = window.confirm(
    "Are you sure you want to delete this card? This action cannot be undone."
  );

  if (!confirmed) return;

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
      <h1 className="title">Card List</h1>
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


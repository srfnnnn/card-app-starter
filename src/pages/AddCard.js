import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CardForm from "../components/CardForm";
import { addCard } from "../services/api";

export default function AddCard() {
  /* TODO: Complete the AddCard page
    - display a form for adding a new card (use the CardForm component to display the form)
    - handle form submission to call addCard API
    - handle busy and error states
    - style as a form UI */

  const navigate = useNavigate();

  const [card, setCard] = useState({
    card_name: "",
    card_pic: "",
  });

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setCard(prev => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setBusy(true);
      setError(null);

      await addCard(card);


      navigate("/cards");
    } catch (err) {
      setError("Failed to add card. Please try again.");
    } finally {
      setBusy(false);
    }
  }


  return (
    <main className="form-page">
      <h1 className="title">Add New Card</h1>

      <CardForm
        card={card}
        onChange={handleChange}
        onSubmit={handleSubmit}
        busy={busy}
        error={error}
        submitText="Add Card"
      />
    </main>
 );
}

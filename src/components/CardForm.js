// src/components/CardForm.jsx
export default function CardForm({ card, onChange, onSubmit, busy, error, submitText }) {
  // fallback to empty object so inputs never break
  const safeCard = card || { card_name: "", card_pic: "" };

  return (
    <form onSubmit={onSubmit} className="card-form">
      {error && <p className="error" style={{ color: "red" }}>{error}</p>}

      <div className="cardform">
        <label htmlFor="card_name">Card Name:</label>
        <input
          type="text"
          id="card_name"
          name="card_name"       // must match the key in card state
          value={safeCard.card_name}
          onChange={onChange}
          disabled={busy}
          placeholder="Enter card name"
          required
        />
      </div>

      <div className="cardform">
        <label htmlFor="card_pic">Card URL:</label>
        <input
          type="url"
          id="card_pic"
          name="card_pic"        // must match the key in card state
          value={safeCard.card_pic}
          onChange={onChange}
          disabled={busy}
          placeholder="Enter card URL"
          required
        />
      </div>

      <button className="click" type="submit" disabled={busy}>
        {busy ? "Saving..." : submitText}
      </button>
    </form>
  );
}


import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Home() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://onlinecardappwebservice-y487.onrender.com/allcards")
      .then((res) => res.json())
      .then((data) => {
        setCards(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching cards:", err);
        setLoading(false);
      });
  }, []);
  return (
    <div className="home">
      <div className="headerHome">
        <h1>Manage all your cards in one secure place.</h1>
        <p>Track spending, organize cards, and stay in control of your finances with ease</p>
      </div>

      <div className="add">
        <Link to="/addcard" className="addbutton">Add new card</Link>
      </div>

      <h1 className="title">All Cards</h1>

      {/* Cards Section */}
      <div className="cards">

        {loading && <p>Loading cards...</p>}

        {!loading && cards.length === 0 && (
          <p>No cards found. Add one to get started!</p>
        )}

        {!loading &&
          cards.map((card) => (
            <div className="card" key={card.id}>
              <img
              src={card.card_pic}
              alt={card.card_name}
              className="card-image"
              />

              <h3>{card.card_name}</h3>
            </div>
          ))}
      </div>

    </div>


  );
}

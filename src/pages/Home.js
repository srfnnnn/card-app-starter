import { Link } from "react-router-dom";

export default function Home() {
  /* TODO: Design and complete the Home page
    - display instructions
    - link to Cards page
    - style as a landing page */
  return (
    <div className="home">
      <div >
        <h1>Manage all your cards in one secure place.</h1>
        <p>Track spending, organize cards, and stay in control of your finances with ease</p>
      </div>

      <div className="add">
        <Link to="/addcard" className="addbutton">Add new card</Link>
      </div>

    </div>
  );
}

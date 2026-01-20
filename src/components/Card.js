import {Link} from "react-router-dom";

export default function Card({card, onDelete, busy}) {
    /* TODO: Complete the Card component
      - display the card image and name
      - display the card ID
      - edit button linking to edit page
      - delete button calling onDelete with the card object
      - style as a card UI */

    return (
        <div>
            <img src={card.card_pic} width='240' height='360'/>
            <p>{card.card_name}</p>
            <p>{card.id}</p>

            <Link to={`/editcard/${card.id}`}>
                <button disabled={busy}>Edit</button>
            </Link>

            <button disabled={busy} onClick={() => onDelete(card)}>
                Delete
            </button>
        </div>
    )
}
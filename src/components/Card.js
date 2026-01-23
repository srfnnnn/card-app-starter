import {Link} from "react-router-dom";

export default function Card({card, onDelete, busy}) {
    /* TODO: Complete the Card component
      - display the card image and name
      - display the card ID
      - edit button linking to edit page
      - delete button calling onDelete with the card object
      - style as a card UI */

    return (
        <div className="display"> 
                <img  className="display-image" src={card.card_pic} width='240' height='360'/>
                <p className="headline">{card.card_name}</p>
                <p className="headline">{card.id}</p>

                <Link to={`/editcard/${card.id}`}>
                <button className="clickEdit" disabled={busy}>Edit</button>
                </Link>

                <button  className="clickDelete" disabled={busy} onClick={() => onDelete(card)}>
                    Delete
                </button>
            </div>
    )
}
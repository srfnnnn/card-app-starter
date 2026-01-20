import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CardForm from "../components/CardForm";
import { getCardById, updateCard } from "../services/api";

export default function EditCard() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [card, setCard] = useState({ card_name: "", card_pic: "" });
    const [loading, setLoading] = useState(true); 
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState("");

    // Fetch existing card data and pre-fill the form
    useEffect(() => {
        const fetchCard = async () => {
            try {
                const data = await getCardById(id);
                setCard(data); // this fills the inputs
            } catch (err) {
                setError(err?.message || "Failed to load card.");
            } finally {
                setLoading(false);
            }
        };
        fetchCard();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCard((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setBusy(true);
        setError("");

        try {
            await updateCard(id, card);
            navigate("/cards");
        } catch (err) {
            setError(err?.message || "Failed to update card.");
        } finally {
            setBusy(false);
        }
    };

    return (
        <main className="page">
            <h1>Edit Card</h1>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <CardForm
                    card={card} // already filled with current values
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                    busy={busy}
                    error={error}
                    submitText="Save Changes"
                />
            )}
        </main>
    );
}



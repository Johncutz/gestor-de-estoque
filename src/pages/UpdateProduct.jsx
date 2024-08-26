import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import useItemCollection from "../hooks/useItemCollection";
import NewItemForm from "../components/NewItemForm";

UpdateProduct.propTypes = {
    updateItem: PropTypes.func.isRequired,
};

export default function UpdateProduct() {
    const { id } = useParams();
    const { updateItems } = useItemCollection();
    const [item, setItem] = useState(null);

    useEffect(() => {
        const storedItems = JSON.parse(localStorage.getItem("obc-item-lib")) || [];
        const product = storedItems.find((item) => item.id === parseInt(id));
        setItem(product);
    }, [id]);

    if (!item) return <h2>Oops... Esse produto não foi encontrado =(</h2>;

    const handleUpdateItem = (updatedItem) => {
        updateItems(item.id, updatedItem);
    };

    return (
        <section>
            <p>Atualizar Item - {item.name}</p>
            <NewItemForm
                initialValues={item}
                updateItem={handleUpdateItem}
                isEditing={true}
            />
        </section>
    );
}

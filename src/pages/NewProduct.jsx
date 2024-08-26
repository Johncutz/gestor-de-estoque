import NewItemForm from "../components/NewItemForm";
import useItemCollection from "../hooks/useItemCollection";

export default function NewProduct() {
    const { addItems } = useItemCollection()

    return (
        <section>
            <NewItemForm addItem={addItems} />
        </section>
    )
}
import { useState } from "react";
import PropTypes from "prop-types";
import TextInput from "./TextInput";
import NumberInput from "./NumberInput";
import SelectInput from "./SelectInput";
import ReturnStock from "./ReturnStock";

NewItemForm.propTypes = {
    addItem: PropTypes.func,
    updateItem: PropTypes.func,
    initialValues: PropTypes.shape({
        name: PropTypes.string,
        qtd: PropTypes.number,
        price: PropTypes.number,
        desc: PropTypes.string,
        select: PropTypes.string,
    }),
    isEditing: PropTypes.bool,
};

export default function NewItemForm({ addItem, updateItem, initialValues = {}, isEditing = false }) {
    const [name, setName] = useState(initialValues.name || "");
    const [qtd, setQtd] = useState(initialValues.qtd || 0);
    const [price, setPrice] = useState(initialValues.price || "");
    const [desc, setDesc] = useState(initialValues.desc || "");
    const [select, setSelect] = useState(initialValues.select || "");
    const [addedItem, setAddedItem] = useState(false);

    const handleSubmit = (ev) => {
        ev.preventDefault();
        if (isEditing) {
            updateItem({ ...initialValues, name, qtd, price, desc, select });
        } else {
            addItem({ name, qtd, price, desc, select });
        }
        setName("");
        setQtd(0);
        setPrice("");
        setDesc("");
        setSelect("");
        setAddedItem(true);
    };

    return (
        <section>
            {!addedItem ? (
                <form onSubmit={handleSubmit}>
                    <TextInput id="name" label="Nome: " value={name} setValue={setName} />
                    <NumberInput id="quantidade" label="Quantidade: " value={qtd} setValue={setQtd} />
                    <NumberInput id="price" label="Preço: " value={price} setValue={setPrice} />
                    <SelectInput id="select" label="Selecione: " value={select} setValue={setSelect} />
                    <TextInput id="description" label="Descrição: " value={desc} setValue={setDesc} />
                    <button type="submit">{isEditing ? "Atualizar" : "Salvar"}</button>
                </form>
            ) : (
                <ReturnStock text={`Produto ${isEditing ? "atualizado" : "adicionado"} com sucesso! =)`} />
            )}
        </section>
    );
}

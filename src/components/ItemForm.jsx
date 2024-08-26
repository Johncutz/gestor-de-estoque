import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import TextInput from "./TextInput";
import NumberInput from "./NumberInput";
import SelectInput from "./SelectInput";
import ReturnStock from "./ReturnStock";

ItemForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    initialData: PropTypes.shape({
        name: PropTypes.string,
        qtd: PropTypes.number,
        price: PropTypes.number,
        desc: PropTypes.string,
        select: PropTypes.string,
    }),
    buttonText: PropTypes.string,
};

ItemForm.defaultProps = {
    initialData: {
        name: "",
        qtd: "",
        price: "",
        desc: "",
        select: "",
    },
    buttonText: "Salvar",
};

export default function ItemForm({ onSubmit, initialData, buttonText }) {
    const [name, setName] = useState(initialData.name);
    const [qtd, setQtd] = useState(initialData.qtd);
    const [price, setPrice] = useState(initialData.price);
    const [desc, setDesc] = useState(initialData.desc);
    const [select, setSelect] = useState(initialData.select);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        setName(initialData.name);
        setQtd(initialData.qtd);
        setPrice(initialData.price);
        setDesc(initialData.desc);
        setSelect(initialData.select);
    }, [initialData]);

    const handleSubmit = (ev) => {
        ev.preventDefault();
        onSubmit({ name, qtd, price, desc, select });
        setSubmitted(true);
    };

    return (
        <section>
            {!submitted ? (
                <form onSubmit={handleSubmit}>
                    <TextInput id="name" label="Nome: " value={name} setValue={setName} />
                    <NumberInput id="quantidade" label="Quantidade: " value={qtd} setValue={setQtd} />
                    <NumberInput id="price" label="Preço: " value={price} setValue={setPrice} />
                    <SelectInput id="select" label="Selecione: " value={select} setValue={setSelect} />
                    <TextInput id="description" label="Descrição: " value={desc} setValue={setDesc} />
                    <button type="submit">{buttonText}</button>
                </form>
            ) : (
                <ReturnStock text="Operação realizada com sucesso! =)" />
            )}
        </section>
    );
}

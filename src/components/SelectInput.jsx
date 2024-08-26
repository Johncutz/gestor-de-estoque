import PropTypes from "prop-types";

SelectInput.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    setValue: PropTypes.func.isRequired,
};

export default function SelectInput({ id, label, value, setValue }) {
    return (
        <div>
            <label htmlFor={id}>{label}</label>
            <select
                name={id}
                id={id}
                value={value}
                onChange={(e) => setValue(e.target.value)}
            >
                <option value="">Selecione uma categoria...</option>
                <option value="Esporte">Esporte</option>
                <option value="Eletronicos">Eletrônicos</option>
                <option value="Casa">Casa</option>
            </select>
        </div>
    );
}
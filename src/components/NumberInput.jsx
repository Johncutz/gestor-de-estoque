import PropTypes from "prop-types"

NumberInput.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.number,
    setValue: PropTypes.func
}

export default function NumberInput({ id, label, value, setValue }) {
    return (
        <div>
            <label htmlFor={id}>{label}</label>
            <input type="number" name={id} id={id} value={value} onChange={(e) => setValue(e.target.value)} min="0" max="100" />
        </div>
    )
}
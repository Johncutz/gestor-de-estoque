import { Link } from "react-router-dom"

import PropTypes from "prop-types"

ReturnStock.propTypes = {
    text: PropTypes.string,
}

export default function ReturnStock({ text }) {
    return (
        <div>
            <h2>{text}</h2>
            <Link to="/estoque">
                <button>Voltar</button>
            </Link>
        </div>
    )
}
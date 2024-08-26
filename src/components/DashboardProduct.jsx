import PropTypes from "prop-types"
import { Link } from "react-router-dom"

DashboardProduct.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    qtd: PropTypes.number.isRequired,
    onRemove: PropTypes.func.isRequired
}

export default function DashboardProduct({ id, name, qtd, onRemove }) {
    return (
        <tbody>
            <tr>
                <td>{name}</td>
                <td>{qtd} unid.</td>
                <td>
                    <Link to={`/view/${id}`} onRemove={onRemove}><button>Ver</button></Link>
                </td>
            </tr>
        </tbody>
    )
}

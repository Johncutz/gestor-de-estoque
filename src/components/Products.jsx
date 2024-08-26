import PropTypes from "prop-types"
import { Link } from "react-router-dom"

Products.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    qtd: PropTypes.number.isRequired,
    select: PropTypes.string,
    onUpdate: PropTypes.func,
    onRemove: PropTypes.func.isRequired
}

export default function Products({ id, name, qtd, select, onRemove }) {
    return (
        <tbody>
            <tr>
                <td>{id}</td>
                <td>{name}</td>
                <td>{qtd} unid.</td>
                <td>{select}</td>
                <td>
                    <Link to={`/view/${id}`} onRemove={onRemove}><button>Ver</button></Link>
                    <Link to={`/update/${id}`} ><button>Atualizar</button></Link>
                    <button onClick={onRemove}>Excluir</button>
                </td>
            </tr>
        </tbody>
    )
}

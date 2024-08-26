import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import useItemCollection from "../hooks/useItemCollection"
import ReturnStock from "../components/ReturnStock"
import { Link } from "react-router-dom"

export default function ViewProduct() {
    const { id } = useParams()
    const [item, setItem] = useState(null)
    const [removeItem, setRemoveItem] = useState(false)
    const { removeItems } = useItemCollection()

    useEffect(() => {
        const storedItems = JSON.parse(localStorage.getItem("obc-item-lib")) || []
        const product = storedItems.find(item => item.id === parseInt(id))
        setItem(product)
    }, [id])

    function removeAndReturn() {
        removeItems(item.id)
        setRemoveItem(true)
    }

    if (!item) return <h2>Oops... Esse produto não foi encontrado =(</h2>

    return (
        <section>
            {
                !removeItem ? (
                    <div>
                        <div>
                            <p>{item.name}</p>
                            <Link to={`/update/${id}`} ><button>Atualizar</button></Link>
                            <button onClick={removeAndReturn}>Excluir</button>
                        </div>
                        <div>
                            <p>Categoria: {item.select}</p>
                            <p>Quantidade em estoque: {item.qtd}</p>
                            <p>Preço: R${item.price}</p>
                        </div>
                        <div>
                            <p>{item.desc}</p>
                        </div>
                        <div>
                            <p>Cadastrado em: {item.createdAt}</p>
                            <p>Atualizado em: {item.updatedAt}</p>
                        </div>
                    </div>
                ) : (
                    <ReturnStock text="Produto removido com sucesso! =)" />
                )
            }

        </section>
    )
}

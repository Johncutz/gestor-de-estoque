import useItemCollection from "../hooks/useItemCollection"
import Products from "../components/Products"

export default function Estoque() {
    const { items, removeItems } = useItemCollection()

    return (
        <section>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Em estoque</th>
                        <th>Categoria</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                {
                    items.length > 0 ? items.map((item) => (
                        <Products
                            key={item.id}
                            id={item.id}
                            name={item.name}
                            qtd={item.qtd}
                            select={item.select}
                            onRemove={() => removeItems(item.id)}
                        />
                    )) : (
                        <></>
                    )
                }
            </table>
        </section>
    )
}
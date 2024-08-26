import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header>
            <section>
                <div>
                    <p>React Stock</p>
                </div>
                <nav style={{ display: "flex", gap: "2rem" }}>
                    <Link to="/">Início</Link>
                    <Link to="/estoque">Items</Link>
                </nav>
            </section>
            <section>
                <h1>Stock Items</h1>
            </section>
            <section>
                <Link to="/estoque"><button>Todos os itens</button></Link>
                <Link to={`/novo-item`} ><button>Novo Item</button></Link>
            </section>
        </header>
    )
}
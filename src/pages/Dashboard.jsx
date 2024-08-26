import { useEffect, useState } from "react";
import useItemCollection from "../hooks/useItemCollection";
import DashboardProduct from "../components/DashboardProduct";

const meses = {
    janeiro: '01',
    fevereiro: '02',
    março: '03',
    abril: '04',
    maio: '05',
    junho: '06',
    julho: '07',
    agosto: '08',
    setembro: '09',
    outubro: '10',
    novembro: '11',
    dezembro: '12'
};

function converterData(data) {
    // Dividindo a string da data para extrair dia, mês e ano
    const partes = data.split(', ')[1].split(' de ');
    const dia = partes[0];
    const mes = meses[partes[1]];
    const ano = partes[2];

    // Retornando a data no formato dia/mês/ano
    return `${dia}/${mes}/${ano}`;
}

const formatDateActualy = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() retorna o mês de 0 a 11
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

const verificaUltimos5Dias = (data1, data2) => {
    // Função para converter data no formato 'dia/mês/ano' para 'ano-mês-dia'
    const converterParaFormatoPadrao = (dataStr) => {
        const partes = dataStr.split('/');
        if (partes.length === 3) {
            const dia = partes[0];
            const mes = partes[1];
            const ano = partes[2];
            return `${ano}-${mes}-${dia}`;
        }
        return null;
    };

    // Converter datas para o formato 'ano-mês-dia' para facilitar a comparação
    const data1FormatoPadrao = converterParaFormatoPadrao(data1);
    const data2FormatoPadrao = converterParaFormatoPadrao(data2);

    // Verificar se conseguimos converter as datas corretamente
    if (!data1FormatoPadrao || !data2FormatoPadrao) {
        console.error('Erro na conversão das datas.');
        return false; // Saída padrão se houver erro na conversão
    }

    // Calcular a diferença em milissegundos
    const data1Timestamp = Date.parse(data1FormatoPadrao);
    const data2Timestamp = Date.parse(data2FormatoPadrao);
    const diffEmMilissegundos = Math.abs(data2Timestamp - data1Timestamp);

    // Calcular a diferença em dias
    const diffEmDias = Math.ceil(diffEmMilissegundos / (1000 * 60 * 60 * 24));

    // Verificar se a diferença é menor ou igual a 5 dias
    return diffEmDias <= 10;
};

export default function Dashboard() {
    const { items, removeItems } = useItemCollection();
    const [totalQtd, setTotalQtd] = useState(0);
    const [itemsUnder10, setItemsUnder10] = useState([]);
    const [testeRecentes, setTesteRecentes] = useState([]);

    useEffect(() => {
        if (items && items.length > 0) {

            const currentDate = new Date();
            const formatedDateNow = formatDateActualy(currentDate)
            const recenteItems = items.filter(item => {
                const getDate = converterData(item.createdAt)
                const test = verificaUltimos5Dias(getDate, formatedDateNow)

                if (test) {
                    return item
                }

            })

            setTesteRecentes(recenteItems)

            const total = items.reduce((sum, item) => sum + parseInt(item.qtd, 10), 0);
            setTotalQtd(total);

            const itemsLessThan10 = items.filter(item => parseInt(item.qtd, 10) < 10);
            setItemsUnder10(itemsLessThan10);

        }
    }, [items]);


    return (
        <section>
            <section>
                <h1>Dashboard</h1>
            </section>
            <section>
                <div>
                    <p>Diversidade de items</p>
                    <p>{items.length}</p>
                </div>
                <div>
                    <p>Inventário total</p>
                    <p>{totalQtd}</p>
                </div>
                <div>
                    <p>Itens recentes</p>
                    <p>{testeRecentes.length}</p>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Itens acabando</th>
                            <th>Qtd</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    {testeRecentes.map(item => (
                        <DashboardProduct
                            key={item.id}
                            id={item.id}
                            name={item.name}
                            qtd={item.qtd}
                            onRemove={() => removeItems(item.id)}
                        />
                    ))}
                </table>
                <div>
                    <p>Itens acabando</p>
                    <p>{itemsUnder10.length}</p>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Itens acabando</th>
                            <th>Qtd</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    {itemsUnder10.map(item => (
                        <DashboardProduct
                            key={item.id}
                            id={item.id}
                            name={item.name}
                            qtd={item.qtd}
                            onRemove={() => removeItems(item.id)}
                        />
                    ))}
                </table>
            </section>
        </section>
    );
}

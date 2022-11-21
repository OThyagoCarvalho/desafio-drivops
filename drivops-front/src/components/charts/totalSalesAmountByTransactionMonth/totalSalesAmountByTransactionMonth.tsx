import axios from 'axios';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import useSWR from 'swr';
import authHeader from '../../../services/authHeader';

export default function TotalSalesAmountByMonths() {
    const userSalesFetcher = () =>
        axios
            .get('/sales', {
                headers: authHeader(),
                baseURL: import.meta.env.VITE_API_BASE_URL
            })
            .then(response => response.data)
            .catch(error => {
                console.log(error);
            });

    const { data: sales } = useSWR('/sales', userSalesFetcher);

    //creates an array of objects with the transactionDate and the total sales amount
    const monthsWithTransactions = sales?.map((sale: any) =>
        new Date(sale.transactionDate).getMonth()
    );
    const uniqueMonthsWithTransaction = [...new Set(monthsWithTransactions)];
    const totalSalesAmountByMonthsArray = uniqueMonthsWithTransaction.map(
        month => {
            const totalSalesAmount = sales
                ?.filter(
                    (sale: any) =>
                        new Date(sale.transactionDate).getMonth() === month
                )
                .reduce((acc: any, sale: any) => acc + sale.price, 0);
            return { month, totalSalesAmount };
        }
    );
    const sortedTotalSalesAmountByMonthsArray =
        totalSalesAmountByMonthsArray.sort(
            (a: any, b: any) => a.month - b.month
        );

    return (
        <div>
            <ResponsiveContainer width="25%" minWidth={250} height={250}>
                <BarChart
                    width={150}
                    height={40}
                    data={sortedTotalSalesAmountByMonthsArray}
                >
                    <Tooltip />
                    <XAxis dataKey="month" />
                    <YAxis dataKey="totalSalesAmount" />
                    <Bar dataKey="totalSalesAmount" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
            <p> Valor Total de Vendas por mes</p>
        </div>
    );
}

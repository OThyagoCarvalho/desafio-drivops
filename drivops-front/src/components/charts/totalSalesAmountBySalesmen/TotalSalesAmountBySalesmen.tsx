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

export default function TotalSalesAmountBySalesmen() {
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

    //creates an array of objects with the salesman id and the total sales amount
    const salesmenIds = sales?.map((sale: any) => sale.salesmanId);
    const uniqueSalesmenIds = [...new Set(salesmenIds)];
    const totalSalesAmountBySalesmenArray = uniqueSalesmenIds.map(id => {
        const totalSalesAmount = sales
            ?.filter((sale: any) => sale.salesmanId === id)
            .reduce((acc: any, sale: any) => acc + sale.price, 0);
        return { id, totalSalesAmount };
    });
    const sortedTotalSalesAmountBySalesmenArray =
        totalSalesAmountBySalesmenArray.sort(
            (a: any, b: any) => a.totalSalesAmount - b.totalSalesAmount
        );

    return (
        <div>
            <ResponsiveContainer width="25%" minWidth={250} height={250}>
                <BarChart
                    width={150}
                    height={40}
                    data={sortedTotalSalesAmountBySalesmenArray}
                >
                    {' '}
                    <XAxis dataKey="id" />
                    <YAxis dataKey="totalSalesAmount" />
                    <Tooltip />
                    <Bar dataKey="totalSalesAmount" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
            <p> Valor Total de Vendas por Id do Vendedor</p>
        </div>
    );
}

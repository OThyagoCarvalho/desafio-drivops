import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import TotalSalesAmountBySalesmen from '../../components/charts/totalSalesAmountBySalesmen/TotalSalesAmountBySalesmen';
import TotalSalesAmountByMonths from '../../components/charts/totalSalesAmountByTransactionMonth/totalSalesAmountByTransactionMonth';
import CreateCarComponent from '../../components/createCar/CreateCarComponent';
import CreateSaleComponent from '../../components/createSale/CreateSaleComponent';
import CreateSalesman from '../../components/createSalesman/CreateSalesman';
import HeaderComponent from '../../components/header/HeaderComponent';
import authHeader from '../../services/authHeader';
import styles from './DashboardPage.module.scss';

export default function DashboardPage() {
    const navigate = useNavigate();
    const fetchUser = () =>
        axios
            .get('/users/me', {
                headers: authHeader(),
                baseURL: import.meta.env.VITE_API_BASE_URL
            })
            .then(response => response.data)
            .catch(error => {
                if (error.response.status === 401) {
                    alert('Your session has expired. Please signin again.');
                    navigate('/signin');
                }
                console.log(error);
            });

    const { data, error } = useSWR('/users/me', fetchUser);

    if (error) return <div>failed to load</div>;
    if (!data) return <div>loading...</div>;

    return (
        <main>
            <HeaderComponent name={data.name} email={data.email} />
            <div className={styles.createButtons}>
                <CreateSalesman />
                <CreateCarComponent />
                <CreateSaleComponent />
            </div>
            <div className={styles.maxContentContainer}>
                <div className={styles.chart}>
                    <TotalSalesAmountBySalesmen />
                </div>
                <div className={styles.chart}>
                    <TotalSalesAmountByMonths />
                </div>
            </div>
        </main>
    );
}

import axios from 'axios';
import { useState } from 'react';
import useSWR from 'swr';
import authHeader from '../../services/authHeader';
import styles from './CreateSaleComponent.module.scss';

export default function CreateSaleComponent() {
    //get all salesmen to populate the dropdown
    const salesmanListFetcher = () =>
        axios
            .get('/salesmen', {
                headers: authHeader(),
                baseURL: import.meta.env.VITE_API_BASE_URL
            })
            .then(response => response.data)
            .catch(error => {
                console.log(error);
            });
    const { data: salesmanList } = useSWR('/salesmen', salesmanListFetcher);

    const [saleData, setSaleData] = useState({
        salesmanId: -1,
        carId: -1,
        price: 0,
        transactionDate: new Date()
    });

    //get all cars to populate the dropdown
    const carsListFetcher = () =>
        axios
            .get('/cars', {
                headers: authHeader(),
                baseURL: import.meta.env.VITE_API_BASE_URL
            })
            .then(response => response.data)
            .catch(error => {
                console.log(error);
            });
    const { data: carsList } = useSWR('/cars', carsListFetcher);
    
    const handleOpenCloseModal = () => {
        const modal = document.querySelector('#sale-modal');
        const closeModalButton = document.querySelector(
            '#closeSaleModalButton'
        );
        modal.showModal();
        closeModalButton?.addEventListener('click', () => {
            modal.close();
            setSaleData({
                salesmanId: -1,
                carId: -1,
                price: 0,
                transactionDate: new Date()
            });
        });
    };

    const handleSubmitCreateSale = () => {
        console.log(saleData);
        try {
            axios
                .post('/sales', saleData, {
                    headers: authHeader(),
                    baseURL: import.meta.env.VITE_API_BASE_URL
                })
                .then(response => {
                    if (response.status === 201) {
                        alert('Sale successfully recorded');
                        const modal = document.querySelector('#sale-modal');
                        modal.close();
                        setSaleData({
                            salesmanId: -1,
                            carId: -1,
                            price: 0,
                            transactionDate: new Date()
                        });
                    }
                });
        } catch (error) {
            alert(error);
        }
    };

    return (
        <div className={styles.createSaleContainer}>
            <h3>Create sale</h3>
            <span>
                <button
                    id="opensaleModalButton"
                    type="button"
                    onClick={handleOpenCloseModal}
                >
                    +
                </button>
            </span>

            <dialog id="sale-modal" className={styles.modal}>
                <form method="dialog">
                    <div className={styles.createSaleFormInput}>
                        <label htmlFor="salesmanId">Salesman</label>
                        <select
                            required
                            id="salesmanId"
                            name="salesmanId"
                            value={saleData.salesmanId}
                            onChange={e =>
                                setSaleData({
                                    ...saleData,
                                    salesmanId: Number(e.target.value)
                                })
                            }
                        >
                            <option value="-1" disabled selected>
                                Select salesman
                            </option>
                            {salesmanList?.map((salesman: any) => (
                                <option key={salesman.id} value={salesman.id}>
                                    {salesman.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className={styles.createSaleFormInput}>
                        <label htmlFor="carId">Car</label>
                        <select
                            required
                            id="carId"
                            name="carId"
                            value={saleData.carId}
                            onChange={e =>
                                setSaleData({
                                    ...saleData,
                                    carId: Number(e.target.value)
                                })
                            }
                        >
                            <option value="-1" disabled selected>
                                Select car
                            </option>
                            {carsList?.map((car: any) => (
                                <option key={car.id} value={car.id}>
                                    {car.model} - {car.licensePlate}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className={styles.createSaleFormInput}>
                        <label htmlFor="price">Transaction Price</label>
                        <input
                            required
                            type="text"
                            id="price"
                            name="price"
                            value={saleData.price}
                            onChange={e =>
                                setSaleData({
                                    ...saleData,
                                    price: Number(e.target.value)
                                })
                            }
                        />
                    </div>
                    <div className={styles.createSaleFormInput}>
                        <label htmlFor="transactionDate">
                            Transaction Date
                        </label>
                        <input
                            required
                            type="date"
                            id="transactionDate"
                            name="transactionDate"
                            value={new Date(saleData.transactionDate).toISOString().split('T')[0]}
                            onChange={e =>
                                setSaleData({
                                    ...saleData,
                                    transactionDate: new Date(e.target.value)
                                })
                            }
                        />
                    </div>
                    {saleData.salesmanId === -1 || saleData.carId === -1 ? (
                        <button disabled className={styles.disabledButton}>
                            Must select salesman and car
                        </button>
                    ) : (
                        <button onClick={handleSubmitCreateSale} type="submit">
                            Save
                        </button>
                    )}
                </form>
                <button
                    id="closeSaleModalButton"
                    className={styles.closeModalButton}
                    type="button"
                >
                    X
                </button>
            </dialog>
        </div>
    );
}

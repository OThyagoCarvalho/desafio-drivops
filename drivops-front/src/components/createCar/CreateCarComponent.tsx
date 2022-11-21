import axios from 'axios';
import { useState } from 'react';
import authHeader from '../../services/authHeader';
import styles from './CreateCarComponent.module.scss';

export default function CreateCarComponent() {
    const [carData, setCarData] = useState({
        licensePlate: '',
        model: '',
        color: '',
        year: 0,
        forSale: false
    });
    const handleOpenCloseModal = () => {
        const modal = document.querySelector('#car-modal');
        const closeModalButton = document.querySelector('#closeCarModalButton');
        modal.showModal();
        closeModalButton?.addEventListener('click', () => {
            modal.close();
            setCarData({
                licensePlate: '',
                model: '',
                color: '',
                year: 0,
                forSale: false
            });
        });
    };

    const handleSubmitCreateCar = () => {
        try {
            axios
                .post('/cars', carData, {
                    headers: authHeader(),
                    baseURL: import.meta.env.VITE_API_BASE_URL
                })
                .then(response => {
                    if (response.status === 201) {
                        alert(
                            'Vehicle ' +
                                response.data.licensePlate +
                                ' created successfully'
                        );
                        const modal = document.querySelector('#modal');
                        modal.close();
                        setCarData({
                            licensePlate: '',
                            model: '',
                            color: '',
                            year: 0,
                            forSale: false
                        });
                    }
                });
        } catch (error) {
            alert(error);
        }
    };

    return (
        <div className={styles.createCarContainer}>
            <h3>Create Car</h3>
            <span>
                <button
                    id="openCarModalButton"
                    type="button"
                    onClick={handleOpenCloseModal}
                >
                    +
                </button>
            </span>

            <dialog id="car-modal" className={styles.modal}>
                <form method="dialog">
                    <div className={styles.createCarFormInput}>
                        <label htmlFor="licensePlate">Car License Plate</label>
                        <input
                            required
                            type="text"
                            id="licensePlate"
                            name="licensePlate"
                            value={carData.licensePlate}
                            onChange={e =>
                                setCarData({
                                    ...carData,
                                    licensePlate: e.target.value
                                })
                            }
                        />
                    </div>
                    <div className={styles.createCarFormInput}>
                        <label htmlFor="model">Car Model</label>
                        <input
                            required
                            type="text"
                            id="model"
                            name="model"
                            value={carData.model}
                            onChange={e =>
                                setCarData({
                                    ...carData,
                                    model: e.target.value
                                })
                            }
                        />
                    </div>
                    <div className={styles.createCarFormInput}>
                        <label htmlFor="color">Car Color</label>
                        <input
                            required
                            type="text"
                            id="color"
                            name="color"
                            value={carData.color}
                            onChange={e =>
                                setCarData({
                                    ...carData,
                                    color: e.target.value
                                })
                            }
                        />
                    </div>
                    <div className={styles.createCarFormInput}>
                        <label htmlFor="year">Car Year</label>
                        <input
                            required
                            type="number"
                            min="1950"
                            max={new Date().getFullYear()}
                            step="1"
                            id="licensePlate"
                            name="licensePlate"
                            value={carData.year}
                            onChange={e =>
                                setCarData({
                                    ...carData,
                                    year: Number(e.target.value)
                                })
                            }
                        />
                    </div>
                    <div className={styles.createCarFormInput}>
                        <label htmlFor="forSale">List for Sale?</label>
                        <input
                            required
                            type="checkbox"
                            id="forSale"
                            name="forSale"
                            value={carData.model}
                            onChange={e =>
                                
                                setCarData({
                                    ...carData,
                                    forSale:
                                        e.target.checked
                                })
                            }
                        />
                    </div>
                    <button onClick={handleSubmitCreateCar} type="submit">
                        Save
                    </button>
                </form>
                <button
                    id="closeCarModalButton"
                    className={styles.closeModalButton}
                    type="button"
                >
                    X
                </button>
            </dialog>
        </div>
    );
}

import axios from 'axios';
import { useState } from 'react';
import authHeader from '../../services/authHeader';
import styles from './CreateSalesman.module.scss';

export default function CreateSalesman() {
    const [salesmanName, setSalesmanName] = useState('');
    const handleOpenCloseModal = () => {
        const modal = document.querySelector('#modal');
        const closeModalButton = document.querySelector('#closeModalButton');
        modal.showModal();
        closeModalButton?.addEventListener('click', () => {
            modal.close();
            setSalesmanName('');
        });
    };

    const handleSubmitCreateSalesman = () => {
        try {
            axios
                .post(
                    '/salesmen',
                    { name: salesmanName },
                    {
                        headers: authHeader(),
                        baseURL: import.meta.env.VITE_API_BASE_URL
                    }
                )
                .then(response => {
                    if (response.status === 201) {
                        alert(response.data.name + ' created successfully');
                        const modal = document.querySelector('#modal');
                        modal.close();
                        setSalesmanName('');
                    }
                });
        } catch (error) {
            alert(error);
        }
    };

    return (
        <div className={styles.createSalesmanContainer}>
            <h3>Create Salesman</h3>
            <span>
                <button
                    id="openModalButton"
                    type="button"
                    onClick={handleOpenCloseModal}
                >
                    +
                </button>
            </span>

            <dialog id="modal" className={styles.modal}>
                <form method="dialog">
                    <div className={styles.createSalesmanFormInput}>
                        <label htmlFor="name">Salesman Name</label>
                        <input
                            required
                            type="text"
                            id="name"
                            name="name"
                            value={salesmanName}
                            onChange={e => setSalesmanName(e.target.value)}
                        />
                        <button
                            onClick={handleSubmitCreateSalesman}
                            type="submit"
                        >
                            Save
                        </button>
                    </div>
                </form>
                <button
                    id="closeModalButton"
                    className={styles.closeModalButton}
                    type="button"
                >
                    X
                </button>
            </dialog>
        </div>
    );
}

import { useNavigate } from 'react-router-dom';
import styles from './HeaderComponent.module.scss';

interface HeaderComponentProps {
    name?: string;
    email: string;
}

export default function HeaderComponent({ email, name }: HeaderComponentProps) {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('access_token');
        navigate('/signin');
    };

    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerMaxContentContainer}>
                <div className={styles.headerContentContainer}>
                    {name ? <p>Olá, {name}</p> : <p>Olá, {email}</p>}
                    <button onClick={handleLogout}>Sign Out</button>
                </div>
            </div>
        </header>
    );
}

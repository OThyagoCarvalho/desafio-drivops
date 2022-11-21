import { useState } from 'react';
import styles from './SigninPage.module.scss';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function SigninPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navitage = useNavigate();

    const handleSignIn = (event: React.MouseEvent) => {
        event.preventDefault();

        axios
            .post(
                '/auth/signin',
                {
                    email,
                    password
                },
                { baseURL: import.meta.env.VITE_API_BASE_URL }
            )
            .then(response => {
                if (response.status === 200) {
                    localStorage.setItem(
                        'access_token',
                        response.data.access_token
                    );
                    navitage('/dashboard');
                }
            })
            .catch(error => {
                alert(error.response.data.message);
            });
    };

    return (
        <main className={styles.signinPageContainer}>
            <div className={styles.signinFormContainer}>
                <h1>Sign In</h1>
                <div>
                    <form className={styles.signinForm}>
                        <div className={styles.signinFormInput}>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                name="email"
                                required
                                id="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                        <div className={styles.signinFormInput}>
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                name="password"
                                required
                                id="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                        <button
                            type="submit"
                            onClick={event => {
                                event.preventDefault;
                                handleSignIn(event);
                            }}
                        >
                            Sign In
                        </button>
                    </form>
                    <p>
                        Doesn't have an account?
                        <Link to="/">Sign up</Link>
                    </p>
                </div>
            </div>
        </main>
    );
}

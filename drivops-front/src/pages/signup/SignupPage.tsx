import { useState } from 'react';
import styles from './SignupPage.module.scss';
import axios from 'axios';
import { Link, redirect } from 'react-router-dom';

export default function SignupPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [accountCreated, setAccountCreated] = useState(false);
    const handleSignUp = (event: React.MouseEvent) => {
        event.preventDefault();
        if (password !== passwordConfirm) {
            alert('Passwords do not match');
        } else {
            axios
                .post(
                    '/auth/signup',
                    {
                        email,
                        password
                    },
                    { baseURL: import.meta.env.VITE_API_BASE_URL }
                )
                .then(response => {
                    if (response.status === 201) {
                        alert('Account created successfully');
                        setAccountCreated(true);
                    }
                })
                .catch(error => {
                    alert(error.response.data.message);
                });
        }
    };

    return (
        <main className={styles.signinPageContainer}>
            <div className={styles.signinFormContainer}>
                <h1>Sign Up</h1>
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
                                name="passwordConfirm"
                                required
                                id="passwordConfirm"
                                value={passwordConfirm}
                                onChange={e =>
                                    setPasswordConfirm(e.target.value)
                                }
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
                                handleSignUp(event);
                            }}
                        >
                            Sign Up
                        </button>
                    </form>
                    {accountCreated ? (
                        <p className={styles.successAlert}>
                            Account created successfully.
                            <Link className={styles.highlightedLink} to="/signin">Sign In</Link>
                        </p>
                    ) : (
                        <p>
                            Already have an account?
                            <Link to="/signin">Sign In</Link>
                        </p>
                    )}
                </div>
            </div>
        </main>
    );
}

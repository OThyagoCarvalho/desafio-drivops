import SignupPage from './pages/signup/SignupPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SigninPage from './pages/signin/SigninPage';
import DashboardPage from './pages/dashboard/DashboardPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<SignupPage />} />
                <Route path="/signin" element={<SigninPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
            </Routes>
        </Router>
    );
}

export default App;

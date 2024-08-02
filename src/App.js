import React from 'react';
import AppRoutes from './routes';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import './styles/global.css';

const App = () => {
    return (
        <AuthProvider>
            <Header />
            <main>
                <AppRoutes />
            </main>
            <Footer />
        </AuthProvider>
    );
};

export default App;

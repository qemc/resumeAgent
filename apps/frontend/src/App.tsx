import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import { MyResumePage } from '@/pages/MyResumePage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    {import.meta.env.VITE_ENABLE_REGISTRATION !== 'false' && (
                        <Route path="/register" element={<RegisterPage />} />
                    )}
                    <Route path="/my-resume" element={
                        <ProtectedRoute>
                            <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
                                <Navbar />
                                <main className="py-8">
                                    <MyResumePage />
                                </main>
                            </div>
                        </ProtectedRoute>
                    } />
                    <Route path="/" element={<Navigate to="/my-resume" replace />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;


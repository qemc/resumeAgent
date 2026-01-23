import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import ResumeForm from './components/ResumeForm';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/" element={
                        <ProtectedRoute>
                            <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
                                <Navbar />
                                <main className="py-8">
                                    <ResumeForm />
                                </main>
                            </div>
                        </ProtectedRoute>
                    } />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;

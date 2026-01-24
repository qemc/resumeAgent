import { useState, type FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';

export default function LoginPage() {
    const navigate = useNavigate();
    const { login, isAuthenticated } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Redirect if already logged in
    if (isAuthenticated) {
        navigate('/');
        return null;
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            await login(email, password);
            navigate('/');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Login failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-secondary/20 p-4">
            <Card className="w-full max-w-md p-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-foreground">Welcome Back</h1>
                    <p className="text-muted-foreground mt-2">Sign in to your account</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        required
                        autoComplete="email"
                    />

                    <Input
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        autoComplete="current-password"
                    />

                    {error && (
                        <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-lg">
                            {error}
                        </div>
                    )}

                    <Button
                        type="submit"
                        className="w-full"
                        size="lg"
                        isLoading={isLoading}
                    >
                        Sign In
                    </Button>
                </form>

                <p className="text-center text-muted-foreground text-sm mt-6">
                    {import.meta.env.VITE_ENABLE_REGISTRATION !== 'false' && (
                        <>
                            Don't have an account?{' '}
                            <Link to="/register" className="text-primary hover:underline font-medium">
                                Create one
                            </Link>
                        </>
                    )}
                </p>
            </Card>
        </div>
    );
}

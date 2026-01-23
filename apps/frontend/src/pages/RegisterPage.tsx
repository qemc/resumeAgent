import { useState, type FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';

// Password validation rules
const passwordRules = {
    minLength: 8,
    hasUppercase: /[A-Z]/,
    hasNumber: /\d/,
    hasSpecial: /[!@#$%^&*(),.?":{}|<>]/,
};

const validatePassword = (password: string): string[] => {
    const errors: string[] = [];
    if (password.length < passwordRules.minLength) {
        errors.push(`At least ${passwordRules.minLength} characters`);
    }
    if (!passwordRules.hasUppercase.test(password)) {
        errors.push('At least 1 uppercase letter');
    }
    if (!passwordRules.hasNumber.test(password)) {
        errors.push('At least 1 number');
    }
    if (!passwordRules.hasSpecial.test(password)) {
        errors.push('At least 1 special character');
    }
    return errors;
};

export default function RegisterPage() {
    const navigate = useNavigate();
    const { register, isAuthenticated } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Redirect if already logged in
    if (isAuthenticated) {
        navigate('/');
        return null;
    }

    // Live password validation
    const passwordErrors = validatePassword(password);
    const passwordsMatch = password === confirmPassword;
    const isPasswordValid = passwordErrors.length === 0;
    const canSubmit = email && password && confirmPassword && isPasswordValid && passwordsMatch;

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!passwordsMatch) {
            setError('Passwords do not match');
            return;
        }

        if (!isPasswordValid) {
            setError('Password does not meet requirements');
            return;
        }

        setIsLoading(true);

        try {
            await register(email, password);
            navigate('/');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-secondary/20 p-4">
            <Card className="w-full max-w-md p-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-foreground">Create Account</h1>
                    <p className="text-muted-foreground mt-2">Start building your resume</p>
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

                    <div>
                        <Input
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                            autoComplete="new-password"
                            error={password && !isPasswordValid ? 'Password does not meet requirements' : undefined}
                        />

                        {/* Password requirements checklist */}
                        {password && (
                            <ul className="mt-2 space-y-1 text-xs">
                                <li className={password.length >= 8 ? 'text-green-600' : 'text-muted-foreground'}>
                                    ✓ At least 8 characters
                                </li>
                                <li className={passwordRules.hasUppercase.test(password) ? 'text-green-600' : 'text-muted-foreground'}>
                                    ✓ At least 1 uppercase letter
                                </li>
                                <li className={passwordRules.hasNumber.test(password) ? 'text-green-600' : 'text-muted-foreground'}>
                                    ✓ At least 1 number
                                </li>
                                <li className={passwordRules.hasSpecial.test(password) ? 'text-green-600' : 'text-muted-foreground'}>
                                    ✓ At least 1 special character
                                </li>
                            </ul>
                        )}
                    </div>

                    <Input
                        label="Confirm Password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        autoComplete="new-password"
                        error={confirmPassword && !passwordsMatch ? 'Passwords do not match' : undefined}
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
                        disabled={!canSubmit}
                    >
                        Create Account
                    </Button>
                </form>

                <p className="text-center text-muted-foreground text-sm mt-6">
                    Already have an account?{' '}
                    <Link to="/login" className="text-primary hover:underline font-medium">
                        Sign in
                    </Link>
                </p>
            </Card>
        </div>
    );
}

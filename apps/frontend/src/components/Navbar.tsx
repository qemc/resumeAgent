import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/Button';

export default function Navbar() {
    const { user, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    const navItems = [
        { path: '/my-resume', label: 'My Resume Data' },
    ];

    return (
        <nav className="bg-card border-b border-border shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo / Brand */}
                    <div className="flex items-center gap-8">
                        <Link to="/" className="text-xl font-bold text-primary">
                            ResumeAgent
                        </Link>

                        {/* Navigation Tabs */}
                        <div className="hidden sm:flex items-center gap-1">
                            {navItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${location.pathname === item.path
                                        ? 'bg-primary/10 text-primary'
                                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                                        }`}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* User Section */}
                    <div className="flex items-center gap-4">
                        {user && (
                            <span className="text-sm text-muted-foreground hidden sm:block">
                                {user.email}
                            </span>
                        )}
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleLogout}
                        >
                            Logout
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

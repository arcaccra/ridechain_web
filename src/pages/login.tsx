import {Link, useNavigate} from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import {useAuth} from '../contexts/AuthContext';

const rydeViolet = '#8f2fff';
const Spinner = () => (
    <svg className="animate-spin h-5 w-5 text-white mx-auto" viewBox="0 0 24 24">
        <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
        />
        <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        />
    </svg>
);

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const {login} = useAuth();
    const navigate = useNavigate();

    // Inject pulse animation CSS once
    useEffect(() => {
        if (!document.getElementById('rydechain-pulse-style')) {
            const style = document.createElement('style');
            style.id = 'rydechain-pulse-style';
            style.innerHTML = `
        @keyframes rydechain-pulse {
          0% { box-shadow: 0 0 0 0 rgba(143,47,255,0.4); }
          70% { box-shadow: 0 0 0 12px rgba(143,47,255,0); }
          100% { box-shadow: 0 0 0 0 rgba(143,47,255,0); }
        }
        .rydechain-pulse {
          animation: rydechain-pulse 1.2s infinite;
        }
      `;
            document.head.appendChild(style);
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const response = await fetch('https://app.arcaccra.com/apis/accounts/login/', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email, password}),
            });
            if (response.ok) {
                const data = await response.json();
                login(data.token, data.user);
                navigate('/');
            } else {
                const errorData = await response.json();
                setError(errorData.detail || 'Login failed');
            }
        } catch {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-neutral-950 text-gray-100 flex items-center justify-center px-4 py-8">
            <div
                className="w-full max-w-7xl rounded-3xl border border-white/10 bg-neutral-900/40 backdrop-blur-xl overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    {/* Left: Form */}
                    <div className="p-8 md:py-12 md:px-24">
                        <div className="flex items-center gap-2 mb-12">
                            <img src="https://img.icons8.com/ios-filled/50/8f2fff/car--v1.png" alt="RydeChain"
                                 className="w-8 h-8"/>
                            <span className="text-lg font-semibold" style={{color: rydeViolet}}>RydeChain</span>
                        </div>
                        <div className="mb-32">
                            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Welcome!</h1>
                            <p className="text-sm text-gray-400 mt-1">Log in to continue to RydeChain.</p>
                        </div>

                        <form className="space-y-5" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email" className="block text-xs font-medium text-gray-300 mb-1 hidden">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-neutral-900/60 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#8f2fff]/40 focus:border-[#8f2fff]/60"
                                    placeholder="you@email.com"
                                    disabled={loading}
                                />
                            </div>
                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-xs font-medium text-gray-300 mb-1 hidden">
                                        Password
                                    </label>
                                    <span
                                        className="text-xs text-gray-400">{/* Forgot password link placeholder */}</span>
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-neutral-900/60 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#8f2fff]/40 focus:border-[#8f2fff]/60"
                                    placeholder="Your password"
                                    disabled={loading}
                                />
                            </div>
                            {error && <p className="text-sm text-red-400 text-center">{error}</p>}
                            <button
                                type="submit"
                                className={`w-full py-2.5 rounded-xl font-semibold text-white shadow-md transition bg-gradient-to-r from-[#8f2fff] to-[#b47aff] hover:from-[#6d1bbd] hover:to-[#a06be6] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8f2fff] focus:ring-offset-neutral-950 flex items-center justify-center ${loading ? 'rydechain-pulse' : ''}`}
                                disabled={loading}
                            >
                                {loading ? <Spinner/> : 'Log in'}
                            </button>
                        </form>
                        <div className="mt-6 text-center text-xs text-gray-400 md:mt-24">
                            Don’t have an account?{' '}
                            <Link to="/register" className="font-medium" style={{color: rydeViolet}}>
                                Sign up
                            </Link>
                        </div>
                    </div>

                    {/* Right: Visual / Marketing */}
                    <div className="relative hidden md:block bg-neutral-900/60">
                        <div className="absolute inset-0 opacity-[0.07]"
                             style={{backgroundImage: 'radial-gradient(circle at 30% 20%, #8f2fff 0%, transparent 40%), radial-gradient(circle at 70% 80%, #b47aff 0%, transparent 40%)'}}/>
                        <div className="relative h-full w-full p-12 flex flex-col justify-between">
                            <div className="flex justify-end">
                                <select
                                    className="text-xs bg-neutral-800/60 border border-white/10 rounded-full px-3 py-1 text-gray-300">
                                    <option>English</option>
                                </select>
                            </div>
                            <div className="space-y-4">
                                <h2 className="text-3xl font-bold leading-tight">
                                    400K+ users. 50M+ AI
                                    <br/> generated graphics.
                                </h2>
                                <button type="button"
                                        className="self-start text-xs bg-[#8f2fff]/20 text-[#c7a4ff] border border-[#8f2fff]/30 rounded-full px-3 py-1 hover:bg-[#8f2fff]/30 transition">
                                    Join Now
                                </button>
                            </div>
                            <div
                                className="relative w-full h-48 rounded-2xl border border-white/10 bg-neutral-950/60 overflow-hidden">
                                <div className="absolute inset-0 opacity-[0.06]"
                                     style={{backgroundImage: 'radial-gradient(600px 200px at 50% 120%, #8f2fff, transparent)'}}/>
                                <div
                                    className="absolute inset-x-6 bottom-6 h-24 border border-white/10 rounded-xl bg-neutral-900/60"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
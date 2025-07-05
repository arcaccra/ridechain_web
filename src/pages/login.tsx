import { useState } from 'react';

export default function AdminLoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-md">
                <div className="bg-white shadow-2xl rounded-xl border border-slate-200 overflow-hidden">
                    <div className="bg-slate-800 text-white p-6 text-center">
                        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                        <p className="text-slate-300 mt-2">Secure Administrator Login</p>
                    </div>

                    <form onSubmit={handleLogin} className="p-8 space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-slate-700 font-medium mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your admin email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 transition duration-300"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-slate-700 font-medium mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 transition duration-300"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 px-3 flex items-center text-slate-500 hover:text-slate-700"
                                >
                                    {showPassword ? "Hide" : "Show"}
                                </button>
                            </div>
                            <a
                                href="/admin/forgot-password"
                                className="text-sm text-slate-500 hover:text-slate-700 mt-2 inline-block"
                            >
                                Forgot Password?
                            </a>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-slate-800 text-white py-3 rounded-lg hover:bg-slate-700 transition duration-300 ease-in-out"
                        >
                            Log In
                        </button>
                    </form>

                    <div className="bg-slate-100 p-4 text-center text-sm text-slate-600 border-t">
                        Authorized Personnel Only
                    </div>
                </div>

                <div className="text-center mt-4 text-slate-500 text-xs">
                    © 2024 Ride Management System | Confidential Access
                </div>
            </div>
        </div>
    );
};
import { Link, useNavigate } from 'react-router-dom';
                      import React, { useState, useEffect } from 'react';
                      import { useAuth } from '../contexts/AuthContext';

                      const rydeViolet = '#8f2fff';
                      const rydeGradient = 'linear-gradient(135deg, #8f2fff 0%, #b47aff 100%)';

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
                        const { login } = useAuth();
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
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({ email, password }),
                            });
                            if (response.ok) {
                              const data = await response.json();
                              login(data.token, { full_name: data.user.full_name, email: data.user.email, avatar: data.user.avatar });
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
                          <div
                            className="min-h-screen flex items-center justify-center bg-gray-100 relative"
                            style={{
                              background: 'radial-gradient(circle at 20% 20%, #f3e8ff 0%, #f8fafc 100%)',
                            }}
                          >
                            {/* RydeChain logo and name */}
                            <div className="absolute top-8 left-8 flex items-center gap-2">
                              <img
                                src="https://img.icons8.com/ios-filled/50/8f2fff/car--v1.png"
                                alt="RydeChain"
                                className="w-10 h-10"
                              />
                              <span className="text-xl font-bold" style={{ color: rydeViolet }}>RydeChain</span>
                            </div>
                            <div
                              className="w-full max-w-md p-8 rounded-2xl shadow-2xl border border-gray-200 bg-white/90 backdrop-blur-md"
                              style={{
                                boxShadow: '0 8px 32px 0 rgba(143,47,255,0.10)',
                              }}
                            >
                              <div className="text-center mb-6">
                                <div
                                  className="mx-auto mb-4 flex items-center justify-center w-16 h-16 rounded-full"
                                  style={{
                                    background: rydeGradient,
                                    boxShadow: '0 2px 8px 0 rgba(143,47,255,0.10)',
                                  }}
                                >
                                  <img
                                    src="https://img.icons8.com/ios-filled/50/ffffff/car--v1.png"
                                    alt="RydeChain"
                                    className="w-10 h-10"
                                  />
                                </div>
                                <h1 className="text-3xl font-extrabold text-gray-900 mb-1">Sign in</h1>
                                <p className="text-sm text-gray-500">
                                  Dashboard for Cardano-powered ride-sharing
                                </p>
                              </div>
                              <form className="space-y-5" onSubmit={handleSubmit}>
                                <div>
                                  <label htmlFor="email" className="block text-xs font-semibold text-gray-700 mb-1 hidden">
                                    Email address
                                  </label>
                                  <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-[#8f2fff] focus:ring-2 focus:ring-[#8f2fff]/20 transition outline-none bg-gray-50"
                                    placeholder="you@email.com"
                                    disabled={loading}
                                  />
                                </div>
                                <div>
                                  <label htmlFor="password" className="block text-xs font-semibold text-gray-700 mb-1 hidden">
                                    Password
                                  </label>
                                  <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-[#8f2fff] focus:ring-2 focus:ring-[#8f2fff]/20 transition outline-none bg-gray-50"
                                    placeholder="Your password"
                                    disabled={loading}
                                  />
                                </div>
                                {error && <p className="text-sm text-red-600 text-center">{error}</p>}
                                <button
                                  type="submit"
                                  className={`w-full py-2 rounded-lg font-semibold text-white shadow-md transition bg-gradient-to-r from-[#8f2fff] to-[#b47aff] hover:from-[#6d1bbd] hover:to-[#a06be6] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8f2fff] flex items-center justify-center ${loading ? 'rydechain-pulse' : ''}`}
                                  disabled={loading}
                                >
                                  {loading ? <Spinner /> : 'Sign in'}
                                </button>
                              </form>
                              <div className="mt-6 text-center text-xs text-gray-500">
                                Or{' '}
                                <Link to="/register" className="font-medium" style={{ color: rydeViolet }}>
                                  create a new account
                                </Link>
                              </div>
                            </div>
                          </div>
                        );
                      };

                      export default Login;
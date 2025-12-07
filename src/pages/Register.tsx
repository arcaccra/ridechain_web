import {Link, useNavigate} from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import {useAuth} from '../contexts/AuthContext';

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

            const Register = () => {
              const [currentStep, setCurrentStep] = useState(1);
              const [formData, setFormData] = useState({
                id: 0,
                avatar: '',
                full_name: '',
                email: '',
                country: 'GH',
                current_location: {},
                phone_number: '',
                password1: '',
                password2: ''
              });
              const [avatarFile, setAvatarFile] = useState<File | null>(null);
              const [avatarPreview, setAvatarPreview] = useState<string>('');
              const [error, setError] = useState('');
              const [loading, setLoading] = useState(false);
              const { login } = useAuth();
              const navigate = useNavigate();

              const totalSteps = 4;

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

              useEffect(() => {
                captureLocation();
              }, []);

              const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
                const { name, value } = e.target;
                setFormData(prev => ({
                  ...prev,
                  [name]: value
                }));
              };

              const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                const file = e.target.files?.[0];
                if (file) {
                  setAvatarFile(file);
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setAvatarPreview(reader.result as string);
                    setFormData(prev => ({
                      ...prev,
                      avatar: reader.result as string
                    }));
                  };
                  reader.readAsDataURL(file);
                }
              };

              const nextStep = () => {
                if (currentStep < totalSteps) {
                  setCurrentStep(currentStep + 1);
                  setError('');
                }
              };

              const prevStep = () => {
                if (currentStep > 1) {
                  setCurrentStep(currentStep - 1);
                  setError('');
                }
              };

  const captureLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        // API expects current_location stored as [latitude, longitude]
        const locationArray = [position.coords.latitude, position.coords.longitude];

        setFormData(prev => ({
          ...prev,
          current_location: locationArray
        }));
      },
      (error) => {
        let errorMessage = 'Unable to get your location';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location access denied. You can continue without location.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information unavailable.';
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out.';
            break;
        }
        setError(errorMessage);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000
      }
    );
  };

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 1: {
        // Full name at least 2 chars
        return formData.full_name.trim().length >= 2;
      }
      case 2: {
        // Email must look valid; phone must match E.164 (max 15 digits)
        const email = formData.email.trim();
        const phone = formData.phone_number.trim();
        const emailValid = email.includes('@') && email.includes('.');
        const phoneValid = /^\+?[1-9]\d{1,14}$/.test(phone);
        return emailValid && phoneValid;
      }
      case 3: {
        // Passwords at least 6 chars and equal
        const p1 = formData.password1.trim();
        const p2 = formData.password2.trim();
        return p1.length >= 6 && p2.length >= 6 && p1 === p2;
      }
      case 4:
        return true;
      default:
        return false;
    }
  };

  const submitRegistration = async () => {
    setError('');

    // Validate all fields before submitting
    if (!validateCurrentStep()) {
      setError('Please complete all fields correctly before submitting');
      return;
    }

    // Also check passwords match for completeness
    if (formData.password1 !== formData.password2) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      // Prepare FormData for API
      const form = new FormData();
      form.append('full_name', formData.full_name.trim());
      form.append('email', formData.email.trim());
      form.append('country', formData.country);
      form.append('phone_number', formData.phone_number.trim());
      form.append('password1', formData.password1);
      form.append('password2', formData.password2);
      if (Array.isArray(formData.current_location)) {
        // API expects current_location as a JSON string (array)
        form.append('current_location', JSON.stringify(formData.current_location));
      }
      if (avatarFile) {
        form.append('avatar', avatarFile);
      }
      // Log the data being sent for debugging
      console.log('Sending registration data (FormData):', {
        full_name: formData.full_name.trim(),
        email: formData.email.trim(),
        country: formData.country,
        phone_number: formData.phone_number.trim(),
        password1: formData.password1,
        password2: formData.password2,
        current_location: Array.isArray(formData.current_location) ? formData.current_location : undefined,
        avatarFile: avatarFile,
      });
      const response = await fetch('https://app.arcaccra.com/apis/accounts/register/', {
        method: 'POST',
        // Do not set Content-Type; browser will set the multipart boundary
        body: form,
      });

      console.log('Response status:', response.status);

      if (response.ok) {
        const data = await response.json();
        console.log('Success response:', data);
        if (data.token) {
          login(data.token, {
            full_name: data.user?.full_name || formData.full_name,
            email: data.user?.email || formData.email,
            avatar: data.user?.avatar
          } as import('@/interfaces/User').IUser);
          navigate('/');
        } else {
          navigate('/login', { state: { message: 'Registration successful! Please log in.' } });
        }
      } else {
        const errorData = await response.json();
        console.log('Error response:', errorData);
        console.log('Full error details:', {
          status: response.status,
          statusText: response.statusText,
          data: errorData
        });

        // More detailed error message
        let errorMessage = 'Registration failed';
        if (errorData.detail) {
          errorMessage = errorData.detail;
        } else if (errorData.message) {
          errorMessage = errorData.message;
        } else if (errorData.errors) {
          // Handle validation errors
          errorMessage = Object.entries(errorData.errors).map(([field, messages]) =>
              `${field}: ${Array.isArray(messages) ? messages.join(', ') : messages}`
          ).join('; ');
        } else if (typeof errorData === 'string') {
          errorMessage = errorData;
        }

        setError(`${errorMessage} (Status: ${response.status})`);
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

              const handleNextClick = () => {
                if (validateCurrentStep()) {
                  nextStep();
                } else {
                  // Specific error messages per step
                  switch (currentStep) {
                    case 1:
                      setError('Please enter your full name (at least 2 characters).');
                      break;
                    case 2:
                      setError('Please enter a valid email and a phone number in international format (e.g., +233xxxxxxxxx).');
                      break;
                    case 3:
                      if (formData.password1 !== formData.password2) {
                        setError('Passwords do not match.');
                      } else {
                        setError('Passwords must be at least 6 characters and match.');
                      }
                      break;
                    default:
                      setError('Please complete all required fields correctly.');
                  }
                }
              };

              const handleSubmit = (e: React.FormEvent) => {
                e.preventDefault();
                if (validateCurrentStep()) {
                  submitRegistration().then(r => r);
                } else {
                  // Specific error messages per step
                  switch (currentStep) {
                    case 1:
                      setError('Please enter your full name (at least 2 characters).');
                      break;
                    case 2:
                      setError('Please enter a valid email and a phone number of at least 8 digits.');
                      break;
                    case 3:
                      if (formData.password1 !== formData.password2) {
                        setError('Passwords do not match.');
                      } else {
                        setError('Passwords must be at least 6 characters and match.');
                      }
                      break;
                    default:
                      setError('Please complete all required fields correctly.');
                  }
                }
              };

              return (
                <div className="min-h-screen bg-neutral-950 text-gray-100 flex items-center justify-center px-4 py-8">
                  <div className="w-full max-w-7xl rounded-3xl border border-white/10 bg-neutral-900/40 backdrop-blur-xl overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                      {/* Left: Form */}
                      <div className="p-8 md:py-12 md:px-24">
                        <div className="flex items-center gap-2 mb-12">
                          <img src="https://img.icons8.com/ios-filled/50/8f2fff/car--v1.png" alt="RydeChain" className="w-8 h-8" />
                          <span className="text-lg font-semibold" style={{ color: rydeViolet }}>RydeChain</span>
                        </div>
                    <div className="text-center mb-16">
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
                      <h1 className="text-3xl font-extrabold text-gray-100 mb-1">Create Account</h1>
                      <p className="text-sm text-gray-400">
                        Step {currentStep} of {totalSteps}
                      </p>
                      {/* Progress Bar */}
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                        <div
                          className="h-2 rounded-full transition-all duration-300"
                          style={{
                            width: `${(currentStep / totalSteps) * 100}%`,
                            background: rydeGradient,
                          }}
                        />
                      </div>
                    </div>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                      {/* Step 1: Personal Information */}
                      {currentStep === 1 && (
                        <div className="space-y-4">
                          <h2 className="text-lg font-semibold text-gray-200 text-center mb-4">Personal Information</h2>
                          <div>
                            <input
                              id="full_name"
                              name="full_name"
                              type="text"
                              required
                              value={formData.full_name}
                              onChange={handleInputChange}
                              className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-neutral-900/60 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#8f2fff]/40 focus:border-[#8f2fff]/60"
                              placeholder="Full Name"
                              disabled={loading}
                            />
                          </div>
                          <div>
                            <select
                              id="country"
                              name="country"
                              value={formData.country}
                              onChange={handleInputChange}
                              className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-neutral-900/60 text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#8f2fff]/40 focus:border-[#8f2fff]/60"
                              disabled={loading}
                            >
                              <option value="GH">Ghana</option>
                              <option value="NG">Nigeria</option>
                              <option value="KE">Kenya</option>
                              <option value="ZA">South Africa</option>
                              <option value="US">United States</option>
                              <option value="GB">United Kingdom</option>
                              <option value="CA">Canada</option>
                            </select>
                          </div>
                        </div>
                      )}

                      {/* Step 2: Contact Information */}
                      {currentStep === 2 && (
                        <div className="space-y-4">
                          <h2 className="text-lg font-semibold text-gray-200 text-center mb-4">Contact Information</h2>
                          <div>
                            <input
                              id="email"
                              name="email"
                              type="email"
                              autoComplete="email"
                              required
                              value={formData.email}
                              onChange={handleInputChange}
                              className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-neutral-900/60 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#8f2fff]/40 focus:border-[#8f2fff]/60"
                              placeholder="you@email.com"
                              disabled={loading}
                            />
                          </div>
                          <div>
                            <input
                              id="phone_number"
                              name="phone_number"
                              type="tel"
                              required
                              value={formData.phone_number}
                              onChange={handleInputChange}
                              className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-neutral-900/60 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#8f2fff]/40 focus:border-[#8f2fff]/60"
                              placeholder="Phone Number"
                              disabled={loading}
                            />
                          </div>
                        </div>
                      )}

                      {/* Step 3: Security */}
                      {currentStep === 3 && (
                        <div className="space-y-4">
                          <h2 className="text-lg font-semibold text-gray-200 text-center mb-4">Security</h2>
                          <div>
                            <input
                              id="password1"
                              name="password1"
                              type="password"
                              autoComplete="new-password"
                              required
                              value={formData.password1}
                              onChange={handleInputChange}
                              className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-neutral-900/60 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#8f2fff]/40 focus:border-[#8f2fff]/60"
                              placeholder="Password"
                              disabled={loading}
                            />
                          </div>
                          <div>
                            <input
                              id="password2"
                              name="password2"
                              type="password"
                              autoComplete="new-password"
                              required
                              value={formData.password2}
                              onChange={handleInputChange}
                              className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-neutral-900/60 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#8f2fff]/40 focus:border-[#8f2fff]/60"
                              placeholder="Confirm Password"
                              disabled={loading}
                            />
                          </div>
                          {formData.password1 && formData.password2 && formData.password1 !== formData.password2 && (
                            <p className="text-sm text-red-600 text-center">Passwords do not match</p>
                          )}
                        </div>
                      )}

                      {/* Step 4: Avatar Upload */}
                      {currentStep === 4 && (
                        <div className="space-y-4">
                          <h2 className="text-lg font-semibold text-gray-200 text-center mb-4">Profile Picture</h2>
                          <div className="flex flex-col items-center space-y-4">
                            {avatarPreview ? (
                              <div className="relative">
                                <img
                                  src={avatarPreview}
                                  alt="Avatar preview"
                                  className="w-24 h-24 rounded-full object-cover border-4 border-gray-200"
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    setAvatarFile(null);
                                    setAvatarPreview('');
                                    setFormData(prev => ({ ...prev, avatar: '' }));
                                  }}
                                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                                >
                                  ×
                                </button>
                              </div>
                            ) : (
                              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                              </div>
                            )}
                            <div className="w-full">
                              <input
                                id="avatar"
                                name="avatar"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                                disabled={loading}
                              />
                              <label
                                htmlFor="avatar"
                                className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-neutral-900/60 text-gray-300 hover:bg-neutral-900/80 cursor-pointer flex items-center justify-center focus-within:ring-2 focus-within:ring-[#8f2fff]/40 focus-within:border-[#8f2fff]/60"
                              >
                                {avatarFile ? 'Change Picture' : 'Choose Profile Picture (Optional)'}
                              </label>
                            </div>
                          </div>
                        </div>
                      )}

                      {error && <p className="text-sm text-red-400 text-center">{error}</p>}

                      {/* Navigation Buttons */}
                      <div className="flex space-x-4">
                        {currentStep > 1 && (
                          <button
                            type="button"
                            onClick={prevStep}
                            className="flex-1 py-2.5 rounded-xl font-semibold text-gray-100 bg-neutral-800 hover:bg-neutral-700 border border-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8f2fff] focus:ring-offset-neutral-950 transition"
                            disabled={loading}
                          >
                            Previous
                          </button>
                        )}

                        {currentStep < totalSteps ? (
                          <button
                            type="button"
                            onClick={handleNextClick}
                            className="flex-1 py-2.5 rounded-xl font-semibold text-white shadow-md transition bg-gradient-to-r from-[#8f2fff] to-[#b47aff] hover:from-[#6d1bbd] hover:to-[#a06be6] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8f2fff] focus:ring-offset-neutral-950"
                            disabled={loading}
                          >
                            Next
                          </button>
                        ) : (
                          <button
                            type="submit"
                            className={`flex-1 py-2.5 rounded-xl font-semibold text-white shadow-md transition bg-gradient-to-r from-[#8f2fff] to-[#b47aff] hover:from-[#6d1bbd] hover:to-[#a06be6] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8f2fff] focus:ring-offset-neutral-950 flex items-center justify-center ${loading ? 'rydechain-pulse' : ''}`}
                            disabled={loading}
                          >
                            {loading ? <Spinner /> : 'Create Account'}
                          </button>
                        )}
                      </div>
                    </form>
                    <div className="mt-6 md:mt-24 text-center text-xs text-gray-400">
                      Already have an account?{' '}
                      <Link to="/login" className="font-medium" style={{ color: rydeViolet }}>
                        Sign in here
                      </Link>
                    </div>
                      </div>

                      {/* Right: Visual / Marketing */}
                      <div className="relative hidden md:block bg-neutral-900/60">
                        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'radial-gradient(circle at 30% 20%, #8f2fff 0%, transparent 40%), radial-gradient(circle at 70% 80%, #b47aff 0%, transparent 40%)' }} />
                        <div className="relative h-full w-full p-12 flex flex-col justify-between">
                          <div className="flex justify-end">
                            <select className="text-xs bg-neutral-800/60 border border-white/10 rounded-full px-3 py-1 text-gray-300">
                              <option>English</option>
                            </select>
                          </div>
                          <div className="space-y-4">
                            <h2 className="text-3xl font-bold leading-tight">
                              400K+ users. 50M+ AI
                              <br /> generated graphics.
                            </h2>
                            <button type="button" className="self-start text-xs bg-[#8f2fff]/20 text-[#c7a4ff] border border-[#8f2fff]/30 rounded-full px-3 py-1 hover:bg-[#8f2fff]/30 transition">
                              Join Now
                            </button>
                          </div>
                          <div className="relative w-full h-48 rounded-2xl border border-white/10 bg-neutral-950/60 overflow-hidden">
                            <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'radial-gradient(600px 200px at 50% 120%, #8f2fff, transparent)' }} />
                            <div className="absolute inset-x-6 bottom-6 h-24 border border-white/10 rounded-xl bg-neutral-900/60" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            };
                export default Register;
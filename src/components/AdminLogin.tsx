import React, { useState } from 'react';
import { ShieldCheck, Lock, Mail, Eye, EyeOff, AlertCircle, ArrowLeft, KeyRound } from 'lucide-react';
import { playClickSound, playAlertSound, playSuccessChime } from '../utils/audio';

interface AdminLoginProps {
  onLoginSuccess: () => void;
  onNavigateHome: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({
  onLoginSuccess,
  onNavigateHome,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Authorized credentials
  const VALID_CREDENTIALS = [
    { email: 'kane69251@gmail.com', pass: 'Pawguard7892@' },
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsLoading(true);
    playClickSound();

    setTimeout(() => {
      const normalizedEmail = email.trim().toLowerCase();
      const isValid = VALID_CREDENTIALS.some(
        (cred) => (cred.email.toLowerCase() === normalizedEmail || cred.email === normalizedEmail) && cred.pass === password
      );

      if (isValid) {
        setIsLoading(false);
        playSuccessChime();
        try {
          localStorage.setItem('pawguard_admin_auth', 'true');
          sessionStorage.setItem('pawguard_admin_session', 'true');
        } catch (err) {
          console.error(err);
        }
        onLoginSuccess();
      } else {
        setIsLoading(false);
        playAlertSound();
        setErrorMsg('Invalid admin credentials. Please check your email and password.');
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#fbf6f0] flex flex-col justify-between text-[#352018]">
      
      {/* Minimal Top Header - Only Logo and Back link */}
      <header className="h-20 border-b border-[#ebdcca] bg-[#fbf6f0]/95 px-4 sm:px-8 flex items-center justify-between">
        <button
          onClick={onNavigateHome}
          className="flex items-center gap-2.5 group text-left focus:outline-none"
        >
          <div className="w-10 h-10 rounded-2xl bg-[#4a2e1b] flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
              <circle cx="12" cy="15" r="4.5" />
              <circle cx="6.5" cy="10" r="2.2" />
              <circle cx="17.5" cy="10" r="2.2" />
              <circle cx="9" cy="6" r="2.2" />
              <circle cx="15" cy="6" r="2.2" />
            </svg>
          </div>
          <span className="font-fredoka text-2xl sm:text-3xl font-bold tracking-tight text-[#352018]">
            PawGuard
          </span>
        </button>

        <button
          onClick={onNavigateHome}
          className="text-xs font-fredoka font-semibold text-[#8a5b3a] hover:text-[#4a2e1b] flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#ebd7c3] hover:bg-[#faefe4] transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Exit to Website</span>
        </button>
      </header>

      {/* Center Login Box */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 py-12">
        <div className="bg-white rounded-3xl max-w-md w-full p-8 sm:p-10 border-2 border-[#ebd7c3] shadow-xl space-y-6">
          
          {/* Card Title */}
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-[#faefe4] text-[#4a2e1b] flex items-center justify-center mx-auto border border-[#ebd7c3] shadow-sm">
              <ShieldCheck className="w-7 h-7 text-[#4a2e1b]" />
            </div>
            <h1 className="font-fredoka text-2xl sm:text-3xl font-bold text-[#26160d]">
              Admin Portal Login
            </h1>
            <p className="text-xs sm:text-sm text-[#8a5b3a]">
              Restricted area. Please sign in with your administrative account to access the dashboard.
            </p>
          </div>

          {/* Error Alert */}
          {errorMsg && (
            <div className="bg-[#fee2e2] text-[#991b1b] p-3.5 rounded-2xl border border-[#fca5a5] text-xs flex items-center gap-2.5 animate-shake">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span className="font-medium">{errorMsg}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="block text-xs font-fredoka font-bold text-[#4a2e1b] uppercase tracking-wider">
                Admin Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Input your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#ebd7c3] bg-[#fbf6f0] text-sm text-[#352018] focus:outline-none focus:ring-2 focus:ring-[#4a2e1b]"
                />
                <Mail className="w-4 h-4 text-[#8a5b3a] absolute left-3.5 top-3.5" />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="block text-xs font-fredoka font-bold text-[#4a2e1b] uppercase tracking-wider">
                Password
              </label>
              <div className="relative flex items-center">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Input your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 rounded-xl border border-[#ebd7c3] bg-[#fbf6f0] text-sm text-[#352018] focus:outline-none focus:ring-2 focus:ring-[#4a2e1b]"
                />
                <Lock className="w-4 h-4 text-[#8a5b3a] absolute left-3.5 pointer-events-none" />
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    playClickSound();
                    setShowPassword((prev) => !prev);
                  }}
                  className="absolute right-2 p-2 rounded-lg text-[#8a5b3a] hover:text-[#4a2e1b] hover:bg-[#faefe4] transition-colors focus:outline-none cursor-pointer z-10"
                  title={showPassword ? 'Hide password' : 'Show password'}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4 text-[#4a2e1b]" />
                  ) : (
                    <Eye className="w-4 h-4 text-[#8a5b3a]" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#4a2e1b] hover:bg-[#352018] text-white font-fredoka font-semibold text-sm sm:text-base py-3.5 rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isLoading ? (
                  <span>Authenticating...</span>
                ) : (
                  <>
                    <KeyRound className="w-4 h-4" />
                    <span>Sign In to Dashboard</span>
                  </>
                )}
              </button>
            </div>

          </form>

          {/* Security Notice */}
          <div className="pt-4 border-t border-[#ebd7c3] text-center">
            <p className="text-[11px] text-[#8a5b3a] leading-relaxed">
              Protected administrative portal. Unauthorized access attempts are monitored and recorded.
            </p>
          </div>

        </div>
      </div>

      {/* Minimal Footer */}
      <footer className="py-4 border-t border-[#ebdcca] text-center text-xs text-[#8a5b3a]">
        PawGuard Administrative System © 2026
      </footer>

    </div>
  );
};

import { useState } from 'react';

interface LoginPageProps {
  onLogin: () => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => onLogin(), 1200);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left - Branding */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' }}>
        <div className="max-w-md">
          <div className="flex items-center gap-3 mb-8">
            <svg width="40" height="40" viewBox="0 0 30 30" fill="none">
              <circle cx="11" cy="15" r="7.5" stroke="#818cf8" strokeWidth="1.5" fill="none" opacity="0.7" />
              <circle cx="19" cy="15" r="7.5" stroke="#60a5fa" strokeWidth="1.5" fill="none" opacity="0.7" />
              <path d="M 4 15 L 8 15 L 10 9 L 12.5 20 L 15 12 L 17 17 L 19 15 L 26 15" stroke="#a5b4fc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <circle cx="15" cy="15" r="2.5" fill="#a5b4fc" />
            </svg>
            <span className="text-2xl font-bold text-white tracking-tight">GlucoTwin</span>
          </div>
          <h2 className="text-3xl font-bold text-white leading-tight mb-4">
            Personalized Digital Twin for Predictive Diabetes Risk Management
          </h2>
          <p className="text-gray-400 text-base leading-relaxed mb-8">
            AI-powered physiological modeling that creates a living virtual representation of each patient, enabling real-time risk prediction and what-if simulation.
          </p>
          <div className="space-y-4">
            {[
              { label: 'Real-time Monitoring', desc: 'Continuous glucose, heart rate, and activity tracking' },
              { label: 'Predictive Analytics', desc: '2-hour glucose spike prediction with explainability' },
              { label: 'What-If Simulation', desc: 'Explore intervention scenarios before committing' },
            ].map((f) => (
              <div key={f.label} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center mt-0.5 shrink-0">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6L5 9L10 3" stroke="#818cf8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-200">{f.label}</div>
                  <div className="text-xs text-gray-500">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 pt-8 border-t border-white/10">
            <span className="text-[10px] text-gray-600 uppercase tracking-[0.2em]">Research Prototype · Digital Twin Challenge 2026</span>
          </div>
        </div>
      </div>

      {/* Right - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-10">
            <svg width="32" height="32" viewBox="0 0 30 30" fill="none">
              <circle cx="11" cy="15" r="7.5" stroke="#6366f1" strokeWidth="1.5" fill="none" opacity="0.7" />
              <circle cx="19" cy="15" r="7.5" stroke="#3b82f6" strokeWidth="1.5" fill="none" opacity="0.7" />
              <path d="M 4 15 L 8 15 L 10 9 L 12.5 20 L 15 12 L 17 17 L 19 15 L 26 15" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <circle cx="15" cy="15" r="2.5" fill="#818cf8" />
            </svg>
            <span className="text-xl font-bold text-gray-900">GlucoTwin</span>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-1">Welcome back</h1>
          <p className="text-sm text-gray-500 mb-8">Sign in to access the clinical dashboard</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
              <input
                type="email"
                defaultValue="dr.chen@glucotwin.io"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm bg-white hover:border-gray-400 transition-colors"
                placeholder="you@hospital.org"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <input
                type="password"
                defaultValue="••••••••"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm bg-white hover:border-gray-400 transition-colors"
                placeholder="••••••••"
              />
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-600">
                <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                Remember me
              </label>
              <a href="#" className="text-indigo-600 hover:text-indigo-700 font-medium">Forgot password?</a>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign in'
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-100 text-center">
            <span className="text-[11px] text-gray-400">
              🔒 Synthetic data only · No real patient information
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
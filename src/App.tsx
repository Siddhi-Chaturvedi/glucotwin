import { useState, useCallback } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { LoginPage } from './pages/LoginPage';
import { PatientSelectPage } from './pages/PatientSelectPage';
import { DashboardPage } from './pages/DashboardPage';
import { DigitalTwinPage } from './pages/DigitalTwinPage';
import { LivePage } from './pages/LivePage';
import { PredictionPage } from './pages/PredictionPage';
import { WhatIfPage } from './pages/WhatIfPage';
import { HistoryPage } from './pages/HistoryPage';
import { ModelPage } from './pages/ModelPage';

type AppState = 'login' | 'select' | 'app';

export default function App() {
  const [state, setState] = useState<AppState>('login');
  const [isDemoMode, setIsDemoMode] = useState(false);

  const handleLogin = useCallback(() => setState('select'), []);
  const handleSelect = useCallback(() => setState('app'), []);
  const handleLogout = useCallback(() => { setState('login'); setIsDemoMode(false); }, []);
  const toggleDemo = useCallback(() => setIsDemoMode(p => !p), []);

  if (state === 'login') return <LoginPage onLogin={handleLogin} />;
  if (state === 'select') return <PatientSelectPage onSelect={handleSelect} />;

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout isDemoMode={isDemoMode} onToggleDemo={toggleDemo} onLogout={handleLogout} />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage isDemoMode={isDemoMode} />} />
          <Route path="/digital-twin" element={<DigitalTwinPage isDemoMode={isDemoMode} />} />
          <Route path="/live" element={<LivePage isDemoMode={isDemoMode} />} />
          <Route path="/prediction" element={<PredictionPage />} />
          <Route path="/what-if" element={<WhatIfPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/model" element={<ModelPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
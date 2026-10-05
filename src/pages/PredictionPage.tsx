import { Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, ComposedChart, ReferenceLine } from 'recharts';
import { currentPrediction } from '../data/mockData';

export function PredictionPage() {
  return (
    <div className="space-y-6 animate-fade-up max-w-[1440px]">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Predictions</h1>
        <p className="text-sm text-gray-500 mt-0.5">AI-powered glucose prediction and risk assessment</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col items-center">
          <div className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-4">2-Hour Risk</div>
          <div className="relative" style={{ width: 160, height: 86 }}>
            <svg width="160" height="86" viewBox="0 0 160 86">
              <path d="M 8 82 A 72 72 0 0 1 152 82" fill="none" stroke="#f3f4f6" strokeWidth="10" strokeLinecap="round" />
              <path d="M 8 82 A 72 72 0 0 1 152 82" fill="none" stroke="#ef4444" strokeWidth="10" strokeLinecap="round"
                strokeDasharray={`${(currentPrediction.riskProbability / 100) * Math.PI * 72} ${Math.PI * 72}`} />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-end"><span className="text-4xl font-extrabold text-red-600 tabular-nums">{currentPrediction.riskProbability}%</span></div>
          </div>
          <div className="mt-2 px-3 py-1 bg-red-50 rounded-full"><span className="text-xs font-bold text-red-700">HIGH RISK</span></div>
          <div className="mt-4 grid grid-cols-2 gap-4 w-full text-center">
            <div><div className="text-[10px] text-gray-400 uppercase">Peak</div><div className="text-lg font-bold text-gray-900">{currentPrediction.predictedPeak}<span className="text-xs text-gray-400 ml-1">mg/dL</span></div></div>
            <div><div className="text-[10px] text-gray-400 uppercase">Horizon</div><div className="text-lg font-bold text-gray-900">{currentPrediction.horizon}</div></div>
          </div>
          <div className="mt-6 w-full space-y-2.5">
            {[
              { label: 'Model', value: 'GlucoTwin-v2.3.1' },
              { label: 'Peak Time', value: currentPrediction.peakTime },
              { label: 'Confidence', value: 'High' },
            ].map(i => (
              <div key={i.label} className="flex justify-between py-1.5 border-b border-gray-50 last:border-0">
                <span className="text-xs text-gray-400">{i.label}</span>
                <span className="text-xs font-semibold text-gray-700">{i.value}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-4">Predicted Glucose Trajectory</div>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={currentPrediction.trajectory} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
                <XAxis dataKey="time" tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={{ stroke: '#e5e7eb' }} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} domain={[80, 260]} width={35} />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8, border: '1px solid #e5e7eb' }} />
                <ReferenceLine y={180} stroke="#ef4444" strokeDasharray="6 4" strokeWidth={1} />
                <ReferenceLine x="10:45" stroke="#374151" strokeDasharray="4 4" strokeWidth={1} label={{ value: 'NOW', position: 'top', fontSize: 9, fill: '#374151' }} />
                <Area type="monotone" dataKey="upper" stroke="none" fill="rgba(239,68,68,0.06)" />
                <Area type="monotone" dataKey="lower" stroke="none" fill="#fff" />
                <Line type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={2.5} dot={false} activeDot={{ r: 4 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-4">Risk Factors</div>
            <div className="space-y-3">
              {currentPrediction.explanations.map(e => (
                <div key={e.factor}>
                  <div className="flex justify-between mb-1.5"><span className="text-sm text-gray-700">{e.factor}</span><span className="text-sm font-bold text-gray-800 tabular-nums">{e.contribution}%</span></div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden"><div className="h-full rounded-full" style={{ width: `${e.contribution}%`, background: 'linear-gradient(90deg, #fbbf24, #ef4444)' }} /></div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100"><p className="text-xs text-gray-500 italic">"{currentPrediction.insight}"</p></div>
          </div>
        </div>
      </div>
    </div>
  );
}
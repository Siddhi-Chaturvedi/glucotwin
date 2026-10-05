import { modelMetrics } from '../data/mockData';

export function ModelPage() {
  const m = modelMetrics;
  return (
    <div className="space-y-6 animate-fade-up max-w-[1440px]">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Model Insights</h1>
        <p className="text-sm text-gray-500 mt-0.5">Technical details about the prediction model</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-4">Configuration</div>
            {[
              { l: 'Version', v: m.version }, { l: 'Dataset', v: m.trainingDataset },
              { l: 'Test Period', v: m.testPeriod }, { l: 'Horizon', v: m.predictionHorizon },
              { l: 'Retrained', v: m.lastRetrained },
            ].map(i => (
              <div key={i.l} className="py-2 border-b border-gray-50 last:border-0">
                <div className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">{i.l}</div>
                <div className="text-sm font-medium text-gray-800 mt-0.5">{i.v}</div>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-4">Features ({m.features.length})</div>
            <div className="space-y-1.5">
              {m.features.map((f, i) => (
                <div key={i} className="flex items-center gap-2.5 py-1">
                  <span className="w-5 h-5 rounded bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-400 shrink-0">{i + 1}</span>
                  <span className="text-sm text-gray-700">{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-5">Performance Metrics</div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                { l: 'ROC-AUC', v: m.metrics.rocAuc, d: 'Area under ROC curve' },
                { l: 'PR-AUC', v: m.metrics.prAuc, d: 'Precision-recall AUC' },
                { l: 'Precision', v: m.metrics.precision, d: 'Positive predictive value' },
                { l: 'Recall', v: m.metrics.recall, d: 'Sensitivity' },
                { l: 'F1 Score', v: m.metrics.f1, d: 'Precision-recall balance' },
                { l: 'Calibration', v: m.metrics.calibration, d: 'Predicted vs observed' },
              ].map(m => (
                <div key={m.l} className="bg-gray-50 rounded-lg p-4">
                  <div className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">{m.l}</div>
                  <div className="text-2xl font-bold text-gray-900 tabular-nums mt-1">{m.v.toFixed(2)}</div>
                  <div className="text-[10px] text-gray-400 mt-0.5">{m.d}</div>
                  <div className="mt-2.5 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${m.v * 100}%`, background: 'linear-gradient(90deg, #6366f1, #3b82f6)' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-4">Data Provenance</div>
            <div className="space-y-3">
              {[
                { s: 'EHR', t: 'Synthetic / Anonymized' },
                { s: 'CGM Stream', t: 'Simulated stream' },
                { s: 'Wearable', t: 'Open-source dataset' },
              ].map(i => (
                <div key={i.s} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                  <div><div className="text-sm font-medium text-gray-800">{i.s}</div><div className="text-[11px] text-gray-400">{i.t}</div></div>
                  <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /><span className="text-[10px] font-semibold text-emerald-600 uppercase">Active</span></div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gray-100 rounded-xl p-4 text-center">
            <p className="text-xs text-gray-500">🔒 Synthetic / Anonymized Data · No identifiable patient information</p>
          </div>
        </div>
      </div>
    </div>
  );
}
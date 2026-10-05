// GlucoTwin Mock Data - Realistic healthcare simulation data
// In production, all data would come from actual model outputs and EHR systems

export interface Patient {
  id: string;
  name: string;
  age: number;
  bmi: number;
  hba1c: number;
  diabetesDuration: number; // years
  diagnosisType: 'T1DM' | 'T2DM';
}

export interface PhysiologicalReading {
  timestamp: number;
  glucose: number;
  heartRate: number;
  hrv: number;
  steps: number;
  activity: number; // METs
  sleepStage: 'awake' | 'light' | 'deep' | 'rem';
}

export interface Baseline {
  glucose: { low: number; high: number; typical: number };
  heartRate: { low: number; high: number; typical: number };
  hrv: { low: number; high: number; typical: number };
  steps: { low: number; high: number; typical: number };
  sleepHours: { low: number; high: number; typical: number };
  activity: { low: number; high: number; typical: number };
}

export interface Prediction {
  riskProbability: number;
  riskLevel: 'stable' | 'monitoring' | 'elevated' | 'high-risk';
  predictedPeak: number;
  peakTime: string;
  horizon: string;
  trajectory: { time: string; value: number; lower?: number; upper?: number }[];
  explanations: { factor: string; contribution: number; direction: 'up' | 'down' }[];
  insight: string;
}

export interface Scenario {
  id: string;
  name: string;
  description: string;
  icon: string;
  riskProbability: number;
  predictedPeak: number;
  trajectory: { time: string; value: number }[];
}

export interface HistoryEvent {
  timestamp: string;
  date: string;
  type: 'glucose' | 'activity' | 'risk' | 'sleep' | 'meal' | 'prediction';
  title: string;
  description: string;
  severity: 'info' | 'warning' | 'alert';
}

export interface ModelMetrics {
  version: string;
  trainingDataset: string;
  testPeriod: string;
  predictionHorizon: string;
  features: string[];
  metrics: {
    rocAuc: number;
    prAuc: number;
    precision: number;
    recall: number;
    f1: number;
    calibration: number;
  };
  lastRetrained: string;
}

export const currentPatient: Patient = {
  id: 'P1024',
  name: 'John Doe',
  age: 52,
  bmi: 28.4,
  hba1c: 7.8,
  diabetesDuration: 8,
  diagnosisType: 'T2DM',
};

export const patientBaseline: Baseline = {
  glucose: { low: 110, high: 145, typical: 128 },
  heartRate: { low: 68, high: 82, typical: 74 },
  hrv: { low: 35, high: 55, typical: 45 },
  steps: { low: 4000, high: 8500, typical: 6200 },
  sleepHours: { low: 5.5, high: 7.5, typical: 6.5 },
  activity: { low: 1.2, high: 2.8, typical: 1.9 },
};

function generateStreamData(count: number): PhysiologicalReading[] {
  const now = Date.now();
  const data: PhysiologicalReading[] = [];
  let glucose = 142;
  let hr = 78;
  let hrv = 42;
  let steps = 3200;

  for (let i = 0; i < count; i++) {
    const t = now - (count - i) * 5000;
    glucose += (Math.random() - 0.35) * 4;
    glucose = Math.max(80, Math.min(280, glucose));
    hr += (Math.random() - 0.48) * 3;
    hr = Math.max(55, Math.min(130, hr));
    hrv += (Math.random() - 0.52) * 2;
    hrv = Math.max(15, Math.min(80, hrv));
    steps += Math.floor(Math.random() * 50);

    const stages: PhysiologicalReading['sleepStage'][] = ['awake', 'awake', 'awake', 'light', 'deep', 'rem'];
    data.push({
      timestamp: t,
      glucose: Math.round(glucose * 10) / 10,
      heartRate: Math.round(hr),
      hrv: Math.round(hrv),
      steps,
      activity: Math.round((1 + Math.random() * 2.5) * 10) / 10,
      sleepStage: stages[Math.floor(Math.random() * stages.length)],
    });
  }
  return data;
}

export const liveStreamData = generateStreamData(200);

export function getLatestReading(): PhysiologicalReading {
  return liveStreamData[liveStreamData.length - 1];
}

export function getCurrentReading(): PhysiologicalReading {
  return getLatestReading();
}

export const currentPrediction: Prediction = {
  riskProbability: 87,
  riskLevel: 'high-risk',
  predictedPeak: 214,
  peakTime: '+1h 45m',
  horizon: '2 hours',
  trajectory: [
    { time: '10:00', value: 145 },
    { time: '10:15', value: 152 },
    { time: '10:30', value: 160 },
    { time: '10:45', value: 168, lower: 158, upper: 178 },
    { time: '11:00', value: 178, lower: 163, upper: 193 },
    { time: '11:15', value: 189, lower: 168, upper: 210 },
    { time: '11:30', value: 198, lower: 172, upper: 224 },
    { time: '11:45', value: 206, lower: 176, upper: 236 },
    { time: '12:00', value: 214, lower: 180, upper: 248 },
    { time: '12:15', value: 210, lower: 174, upper: 246 },
    { time: '12:30', value: 202, lower: 165, upper: 239 },
    { time: '12:45', value: 192, lower: 155, upper: 229 },
  ],
  explanations: [
    { factor: 'Rising glucose trend', contribution: 31, direction: 'up' },
    { factor: 'Poor sleep quality', contribution: 24, direction: 'up' },
    { factor: 'Low physical activity', contribution: 18, direction: 'up' },
    { factor: 'Elevated heart rate', contribution: 14, direction: 'up' },
    { factor: 'Historical patterns', contribution: 13, direction: 'up' },
  ],
  insight:
    'Glucose is rising faster than the patient\'s typical morning pattern. Reduced sleep and low activity are contributing to increased predicted risk.',
};

export const whatIfScenarios: Scenario[] = [
  {
    id: 'none',
    name: 'No Intervention',
    description: 'Current trajectory without changes',
    icon: '—',
    riskProbability: 87,
    predictedPeak: 214,
    trajectory: [
      { time: '10:45', value: 168 },
      { time: '11:00', value: 178 },
      { time: '11:15', value: 189 },
      { time: '11:30', value: 198 },
      { time: '11:45', value: 206 },
      { time: '12:00', value: 214 },
      { time: '12:15', value: 210 },
      { time: '12:30', value: 202 },
      { time: '12:45', value: 192 },
    ],
  },
  {
    id: 'walk',
    name: '20-min Walk',
    description: 'Light walking activity now',
    icon: '🚶',
    riskProbability: 52,
    predictedPeak: 191,
    trajectory: [
      { time: '10:45', value: 168 },
      { time: '11:00', value: 172 },
      { time: '11:15', value: 178 },
      { time: '11:30', value: 185 },
      { time: '11:45', value: 191 },
      { time: '12:00', value: 188 },
      { time: '12:15', value: 182 },
      { time: '12:30', value: 175 },
      { time: '12:45', value: 168 },
    ],
  },
  {
    id: 'activity',
    name: 'Increased Activity',
    description: '30-min moderate exercise',
    icon: '🏃',
    riskProbability: 38,
    predictedPeak: 182,
    trajectory: [
      { time: '10:45', value: 168 },
      { time: '11:00', value: 165 },
      { time: '11:15', value: 170 },
      { time: '11:30', value: 178 },
      { time: '11:45', value: 182 },
      { time: '12:00', value: 176 },
      { time: '12:15', value: 168 },
      { time: '12:30', value: 158 },
      { time: '12:45', value: 148 },
    ],
  },
  {
    id: 'meal',
    name: 'Meal Modification',
    description: 'Low-glycemic meal instead',
    icon: '🥗',
    riskProbability: 45,
    predictedPeak: 186,
    trajectory: [
      { time: '10:45', value: 168 },
      { time: '11:00', value: 174 },
      { time: '11:15', value: 180 },
      { time: '11:30', value: 186 },
      { time: '11:45', value: 184 },
      { time: '12:00', value: 178 },
      { time: '12:15', value: 170 },
      { time: '12:30', value: 162 },
      { time: '12:45', value: 155 },
    ],
  },
  {
    id: 'combined',
    name: 'Combined Scenario',
    description: 'Walk + meal modification',
    icon: '⚡',
    riskProbability: 28,
    predictedPeak: 172,
    trajectory: [
      { time: '10:45', value: 168 },
      { time: '11:00', value: 164 },
      { time: '11:15', value: 165 },
      { time: '11:30', value: 172 },
      { time: '11:45', value: 170 },
      { time: '12:00', value: 162 },
      { time: '12:15', value: 152 },
      { time: '12:30', value: 142 },
      { time: '12:45', value: 135 },
    ],
  },
];

export const historyEvents: HistoryEvent[] = [
  {
    timestamp: '10:30',
    date: 'Today',
    type: 'risk',
    title: 'Risk level increased to HIGH',
    description: 'Predicted glucose spike probability exceeded 80% threshold',
    severity: 'alert',
  },
  {
    timestamp: '10:15',
    date: 'Today',
    type: 'glucose',
    title: 'Glucose trend accelerated',
    description: 'Rate of change exceeded +1.2 mg/dL/min, above baseline pattern',
    severity: 'warning',
  },
  {
    timestamp: '09:50',
    date: 'Today',
    type: 'activity',
    title: 'Activity level below baseline',
    description: 'Step count 62% below typical morning pattern',
    severity: 'warning',
  },
  {
    timestamp: '09:00',
    date: 'Today',
    type: 'meal',
    title: 'Breakfast recorded',
    description: 'Estimated carbohydrate load: 65g. Higher than recommended.',
    severity: 'info',
  },
  {
    timestamp: '08:30',
    date: 'Today',
    type: 'sleep',
    title: 'Sleep quality assessed',
    description: '5.2 hours sleep. Deep sleep 18% below personal baseline.',
    severity: 'warning',
  },
  {
    timestamp: '17:20',
    date: 'Yesterday',
    type: 'glucose',
    title: 'Previous glucose spike resolved',
    description: 'Peak reached 198 mg/dL at 16:45, returned to baseline by 17:20',
    severity: 'info',
  },
  {
    timestamp: '14:00',
    date: 'Yesterday',
    type: 'prediction',
    title: 'Afternoon prediction accurate',
    description: 'Model predicted spike within 8% of actual peak',
    severity: 'info',
  },
  {
    timestamp: '09:30',
    date: 'Yesterday',
    type: 'activity',
    title: 'Morning walk completed',
    description: '22-minute walk, 2,400 steps. Positive impact on glucose.',
    severity: 'info',
  },
];

export const modelMetrics: ModelMetrics = {
  version: 'GlucoTwin-v2.3.1',
  trainingDataset: 'Synthetic EHR + OpenAPS-derived (n=12,480 patient-days)',
  testPeriod: '2025-09-01 to 2025-12-31 (held-out)',
  predictionHorizon: '2 hours',
  features: [
    'CGM glucose (last 60 min)',
    'Glucose rate of change',
    'Heart rate (current + trend)',
    'HRV (RMSSD)',
    'Step count (last 2 hours)',
    'Activity level (METs)',
    'Sleep duration & quality',
    'Time of day',
    'Carbohydrate intake estimate',
    'Historical glucose patterns',
  ],
  metrics: {
    rocAuc: 0.89,
    prAuc: 0.74,
    precision: 0.82,
    recall: 0.76,
    f1: 0.79,
    calibration: 0.91,
  },
  lastRetrained: '2026-09-20',
};

export const digitalTwinStates = [
  { id: 'stable', label: 'Stable', active: false },
  { id: 'monitoring', label: 'Monitoring', active: false },
  { id: 'elevated', label: 'Elevated', active: true },
  { id: 'high-risk', label: 'High Risk', active: false },
  { id: 'predicted-event', label: 'Predicted Event', active: false },
];

export const dataProvenance = {
  sources: [
    { name: 'EHR', type: 'Synthetic / Anonymized', status: 'active' },
    { name: 'CGM Stream', type: 'Simulated stream', status: 'active' },
    { name: 'Wearable', type: 'Open-source dataset', status: 'active' },
  ],
  lastUpdated: new Date().toISOString(),
  modelVersion: 'GlucoTwin-v2.3.1',
};

// Utility to generate new readings in demo mode
let demoGlucose = 168;
let demoHr = 91;
let demoHrv = 38;

export function generateNewReading(): PhysiologicalReading {
  demoGlucose += (Math.random() - 0.38) * 3;
  demoGlucose = Math.max(90, Math.min(260, demoGlucose));
  demoHr += (Math.random() - 0.45) * 2;
  demoHr = Math.max(60, Math.min(120, demoHr));
  demoHrv += (Math.random() - 0.55) * 1.5;
  demoHrv = Math.max(20, Math.min(70, demoHrv));

  return {
    timestamp: Date.now(),
    glucose: Math.round(demoGlucose * 10) / 10,
    heartRate: Math.round(demoHr),
    hrv: Math.round(demoHrv),
    steps: 3200 + Math.floor(Math.random() * 100),
    activity: Math.round((1 + Math.random() * 2) * 10) / 10,
    sleepStage: 'awake',
  };
}
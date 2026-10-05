import type { Patient } from '../../data/mockData';

interface PatientCardProps {
  patient: Patient;
}

export function PatientCard({ patient }: PatientCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold text-gray-900 tracking-tight">Patient {patient.id}</h2>
          <p className="text-sm text-gray-400 mt-0.5">
            Type {patient.diagnosisType} · {patient.diabetesDuration} years since diagnosis
          </p>
        </div>
        <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center">
          <span className="text-sm font-bold text-white">{patient.id.slice(-2)}</span>
        </div>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
        {[
          { label: 'Age', value: `${patient.age}`, unit: 'yrs' },
          { label: 'BMI', value: patient.bmi.toFixed(1), unit: '' },
          { label: 'HbA1c', value: `${patient.hba1c}`, unit: '%' },
          { label: 'Duration', value: `${patient.diabetesDuration}`, unit: 'yrs' },
          { label: 'Type', value: patient.diagnosisType, unit: '' },
        ].map((item) => (
          <div key={item.label} className="text-center py-2 bg-gray-50 rounded-lg">
            <div className="text-[10px] text-gray-400 uppercase tracking-[0.12em] font-semibold mb-0.5">
              {item.label}
            </div>
            <div className="text-base font-bold text-gray-900 tabular-nums">
              {item.value}
              {item.unit && (
                <span className="text-[10px] font-medium text-gray-400 ml-0.5">{item.unit}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
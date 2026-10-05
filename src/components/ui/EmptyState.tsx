interface EmptyStateProps {
  title: string;
  message: string;
  icon?: string;
}

export function EmptyState({ title, message, icon = '◎' }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
      <div className="w-12 h-12 rounded-full bg-navy-50 flex items-center justify-center mb-4">
        <span className="text-xl text-navy-300">{icon}</span>
      </div>
      <h3 className="text-base font-bold text-navy-700 mb-1">{title}</h3>
      <p className="text-sm text-navy-400 max-w-xs">{message}</p>
    </div>
  );
}
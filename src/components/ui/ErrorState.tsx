interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  onFallback?: () => void;
}

export function ErrorState({
  title = 'Data Unavailable',
  message = 'Real-time stream temporarily unavailable.',
  onRetry,
  onFallback,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
      <div className="w-12 h-12 rounded-full bg-elevated-light flex items-center justify-center mb-4">
        <span className="text-xl">⚠</span>
      </div>
      <h3 className="text-base font-bold text-navy-900 mb-1">{title}</h3>
      <p className="text-sm text-navy-500 mb-5 max-w-xs">{message}</p>
      <div className="flex items-center gap-3">
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-4 py-2 bg-navy-900 text-white text-sm font-medium rounded-lg hover:bg-navy-800 transition-colors focus:outline-none focus:ring-2 focus:ring-navy-500 focus:ring-offset-2"
          >
            Retry
          </button>
        )}
        {onFallback && (
          <button
            onClick={onFallback}
            className="px-4 py-2 bg-surface-card text-navy-700 text-sm font-medium rounded-lg border border-navy-200 hover:bg-navy-50 transition-colors focus:outline-none focus:ring-2 focus:ring-navy-300 focus:ring-offset-2"
          >
            Use Historical Data
          </button>
        )}
      </div>
    </div>
  );
}
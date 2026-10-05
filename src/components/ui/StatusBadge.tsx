import { clsx } from 'clsx';

interface StatusBadgeProps {
  status: 'stable' | 'monitoring' | 'elevated' | 'high-risk';
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  showLabel?: boolean;
}

const statusConfig = {
  stable: {
    color: 'bg-stable',
    lightBg: 'bg-stable-light',
    text: 'text-stable-dark',
    icon: '✓',
    label: 'Stable',
  },
  monitoring: {
    color: 'bg-clinical-500',
    lightBg: 'bg-clinical-100',
    text: 'text-clinical-800',
    icon: '◉',
    label: 'Monitoring',
  },
  elevated: {
    color: 'bg-elevated',
    lightBg: 'bg-elevated-light',
    text: 'text-elevated-dark',
    icon: '▲',
    label: 'Elevated',
  },
  'high-risk': {
    color: 'bg-high-risk',
    lightBg: 'bg-high-risk-light',
    text: 'text-high-risk-dark',
    icon: '⚠',
    label: 'High Risk',
  },
};

export function StatusBadge({ status, size = 'md', showIcon = true, showLabel = true }: StatusBadgeProps) {
  const config = statusConfig[status];
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-3 py-1 text-xs',
    lg: 'px-4 py-1.5 text-sm',
  };

  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 font-semibold rounded-full tracking-wide uppercase',
        config.lightBg,
        config.text,
        sizeClasses[size]
      )}
      role="status"
      aria-label={`Status: ${config.label}`}
    >
      {showIcon && (
        <span className={clsx('w-2 h-2 rounded-full', config.color)} aria-hidden="true" />
      )}
      {showLabel && config.label}
    </span>
  );
}
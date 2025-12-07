interface PulsingIconProps {
  color?: string;
  size?: number;
  className?: string;
}

export function PulsingIcon({ color = 'bg-green-500', size = 3, className = '' }: PulsingIconProps) {
  return (
    <span className={`relative flex h-${size} w-${size} ${className}`}>
      <span
        className={`animate-ping absolute inline-flex h-full w-full rounded-full ${color} opacity-75`}
      ></span>
      <span className={`relative inline-flex rounded-full h-${size} w-${size} ${color}`}></span>
    </span>
  );
}

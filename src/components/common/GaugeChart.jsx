import React from 'react';

export default function GaugeChart({
  value = 0.5, // 0 to 1 or 0 to max
  max = 1.0,
  size = 120,
  strokeWidth = 10,
  label = '',
  sublabel = '',
  accent = 'cyan', // cyan, violet, green, orange, red
  displayFormat = 'percent' // 'percent', 'decimal', 'score'
}) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * (circumference * 0.75); // 270 degree arc

  const colorMap = {
    cyan: '#00D9FF',
    violet: '#9666FF',
    blue: '#386BFF',
    green: '#35D6A0',
    orange: '#FFB454',
    red: '#FF647C'
  };

  const strokeColor = colorMap[accent] || colorMap.cyan;

  let displayValue = '';
  if (displayFormat === 'percent') {
    displayValue = `${Math.round(percentage)}%`;
  } else if (displayFormat === 'decimal') {
    displayValue = value.toFixed(3);
  } else {
    displayValue = `${value.toFixed(1)} / ${max}`;
  }

  return (
    <div className="flex flex-col items-center justify-center relative" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-135"
      >
        {/* Track circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#17233A"
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference * 0.75} ${circumference * 0.25}`}
          strokeLinecap="round"
        />
        {/* Value circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-700 ease-out"
          style={{
            filter: `drop-shadow(0 0 6px ${strokeColor}40)`
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-lg font-bold font-mono text-[#EAF2FF] tracking-tight">
          {displayValue}
        </span>
        {label && (
          <span className="text-[10px] uppercase font-mono tracking-wider text-[#94A3B8]">
            {label}
          </span>
        )}
        {sublabel && (
          <span className="text-[9px] text-[#94A3B8]/80">
            {sublabel}
          </span>
        )}
      </div>
    </div>
  );
}

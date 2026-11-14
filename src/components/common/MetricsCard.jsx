import React from 'react';
import { TrendingUp, TrendingDown, Info } from 'lucide-react';

export default function MetricsCard({
  title,
  value,
  unit = '',
  trend,
  trendPositive = true,
  subtitle,
  icon: Icon,
  accent = 'cyan', // cyan, blue, violet, green, orange, red
  isMeasured = true,
  onClick
}) {
  const accentColors = {
    cyan: {
      border: 'hover:border-[#00D9FF]/40',
      iconBg: 'bg-[#00D9FF]/10 text-[#00D9FF]',
      glow: 'group-hover:shadow-[0_0_20px_-4px_rgba(0,217,255,0.25)]',
      bar: 'bg-[#00D9FF]'
    },
    blue: {
      border: 'hover:border-[#386BFF]/40',
      iconBg: 'bg-[#386BFF]/10 text-[#386BFF]',
      glow: 'group-hover:shadow-[0_0_20px_-4px_rgba(56,107,255,0.25)]',
      bar: 'bg-[#386BFF]'
    },
    violet: {
      border: 'hover:border-[#9666FF]/40',
      iconBg: 'bg-[#9666FF]/10 text-[#9666FF]',
      glow: 'group-hover:shadow-[0_0_20px_-4px_rgba(150,102,255,0.25)]',
      bar: 'bg-[#9666FF]'
    },
    green: {
      border: 'hover:border-[#35D6A0]/40',
      iconBg: 'bg-[#35D6A0]/10 text-[#35D6A0]',
      glow: 'group-hover:shadow-[0_0_20px_-4px_rgba(53,214,160,0.25)]',
      bar: 'bg-[#35D6A0]'
    },
    orange: {
      border: 'hover:border-[#FFB454]/40',
      iconBg: 'bg-[#FFB454]/10 text-[#FFB454]',
      glow: 'group-hover:shadow-[0_0_20px_-4px_rgba(255,180,84,0.25)]',
      bar: 'bg-[#FFB454]'
    },
    red: {
      border: 'hover:border-[#FF647C]/40',
      iconBg: 'bg-[#FF647C]/10 text-[#FF647C]',
      glow: 'group-hover:shadow-[0_0_20px_-4px_rgba(255,100,124,0.25)]',
      bar: 'bg-[#FF647C]'
    }
  };

  const style = accentColors[accent] || accentColors.cyan;

  return (
    <div
      onClick={onClick}
      className={`group relative bg-[#111A2E] border border-[#EAF2FF]/10 rounded-xl p-4 transition-all duration-300 ${style.border} ${style.glow} ${onClick ? 'cursor-pointer' : ''}`}
    >
      <div className="flex items-start justify-between mb-2">
        <span className="text-xs font-medium text-[#94A3B8] tracking-wider uppercase flex items-center gap-1.5">
          {title}
        </span>
        <div className="flex items-center gap-1.5">
          {isMeasured ? (
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#35D6A0]/10 text-[#35D6A0] border border-[#35D6A0]/20 font-semibold" title="Real-time measured system metric">
              MEASURED
            </span>
          ) : (
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#FFB454]/10 text-[#FFB454] border border-[#FFB454]/20 font-semibold" title="Demonstration baseline estimate">
              DEMO
            </span>
          )}
          {Icon && (
            <div className={`p-1.5 rounded-lg ${style.iconBg}`}>
              <Icon className="w-4 h-4" />
            </div>
          )}
        </div>
      </div>

      <div className="flex items-baseline gap-1.5 mt-1">
        <span className="text-2xl font-bold font-mono text-[#EAF2FF] tracking-tight">
          {value}
        </span>
        {unit && (
          <span className="text-xs font-mono text-[#94A3B8]">
            {unit}
          </span>
        )}
      </div>

      <div className="mt-2 flex items-center justify-between text-xs">
        {subtitle && (
          <span className="text-[#94A3B8] text-[11px] truncate max-w-[70%]">
            {subtitle}
          </span>
        )}
        {trend && (
          <div className={`flex items-center gap-0.5 font-mono text-[11px] font-medium ml-auto ${trendPositive ? 'text-[#35D6A0]' : 'text-[#FF647C]'}`}>
            {trendPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            <span>{trend}</span>
          </div>
        )}
      </div>

      <div className="mt-2.5 w-full bg-[#17233A] h-1 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${style.bar} opacity-75 group-hover:opacity-100 transition-opacity`} style={{ width: '85%' }} />
      </div>
    </div>
  );
}

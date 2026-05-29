import useCountUp from '../hooks/useCountUp';

// Each stat: n = numeric target, suffix = '+' or '', label
const STATS = [
  { target: 12,  suffix: '+', label: 'Years Experience',    delay: 0   },
  { target: 200, suffix: '+', label: 'Projects Completed',  delay: 150 },
  { target: 9,   suffix: '',  label: 'Industries Served',   delay: 300 },
  { target: 4,   suffix: '',  label: 'Continents',          delay: 450 },
];

// Individual animated stat item
function StatItem({ target, suffix, label, delay }) {
  const { count, ref } = useCountUp(target, 2000, delay);

  return (
    <div className="stat" ref={ref}>
      <span className="stat-n">
        {count}{suffix}
      </span>
      <span className="stat-l">{label}</span>
    </div>
  );
}

// Stats bar — drop-in replacement for the existing stats-bar div in HomePage
export default function StatsBar() {
  return (
    <div className="stats-bar">
      <div className="stats-row">
        {STATS.map(s => (
          <StatItem
            key={s.label}
            target={s.target}
            suffix={s.suffix}
            label={s.label}
            delay={s.delay}
          />
        ))}
      </div>
    </div>
  );
}
export default function Logo({ size = 52 }) {
  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '12px' 
    }}>
      <img
        src="/leona-icon.png"
        alt="Leona Shield"
        height={size}
        width="auto"
        style={{ objectFit: 'contain' }}
      />
      <img
        src="/leona-text.png"
        alt="Leona Tech & Geo Solutions Private Limited"
        height={size * 0.9}
        width="auto"
        style={{ objectFit: 'contain' }}
      />
    </div>
  );
}
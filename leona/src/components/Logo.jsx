export default function Logo({ size = 50 }) {
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
        height={size * 0.7}
        width="auto"
        style={{ objectFit: 'contain' }}
      />
    </div>
  );
}
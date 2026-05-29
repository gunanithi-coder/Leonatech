export default function Logo({ size = 44 }) {
  return (
    <img
      src="/leona-logo.svg"
      alt="Leona Logo"
      width={size}
      height={size}
      style={{ objectFit:'contain' }}
    />
  );
}
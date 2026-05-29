import { useState } from 'react';

// ── Replace with Leona's actual WhatsApp number (with country code, no +) ──
const WHATSAPP_NUMBER = '9198765432101';
const WHATSAPP_MESSAGE = "Hello! I'm interested in Leona's drone surveying and GIS services. Could you please share more details?";

export default function WhatsAppFloat() {
  const [hovered, setHovered] = useState(false);

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="wa-float"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label="Chat on WhatsApp"
    >
      {/* Tooltip */}
      <span className={`wa-tooltip${hovered ? ' show' : ''}`}>
        Chat on WhatsApp
      </span>

      {/* WhatsApp SVG icon */}
      <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="white">
        <path d="M16 2C8.268 2 2 8.268 2 16c0 2.47.668 4.784 1.832 6.772L2 30l7.42-1.944A13.93 13.93 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.5a11.42 11.42 0 01-5.82-1.594l-.416-.248-4.322 1.134 1.154-4.214-.272-.432A11.46 11.46 0 014.5 16C4.5 9.648 9.648 4.5 16 4.5S27.5 9.648 27.5 16 22.352 27.5 16 27.5z"/>
        <path d="M22.2 19.2c-.334-.168-1.974-.974-2.28-1.084-.306-.112-.528-.168-.75.168-.222.334-.862 1.084-1.056 1.306-.194.222-.39.25-.724.084-.334-.168-1.41-.52-2.686-1.658-.992-.888-1.662-1.984-1.856-2.318-.194-.334-.02-.514.146-.68.15-.148.334-.39.502-.584.168-.194.222-.334.334-.556.112-.222.056-.418-.028-.584-.084-.168-.75-1.806-1.028-2.472-.27-.65-.546-.562-.75-.572l-.64-.012c-.222 0-.584.084-.89.418-.306.334-1.168 1.14-1.168 2.78s1.196 3.224 1.362 3.446c.168.222 2.354 3.594 5.706 5.042.798.344 1.42.55 1.904.704.8.254 1.528.218 2.104.132.642-.094 1.974-.806 2.252-1.584.278-.778.278-1.444.194-1.584-.082-.14-.306-.222-.64-.39z"/>
      </svg>
    </a>
  );
}
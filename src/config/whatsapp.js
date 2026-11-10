// Centralized WhatsApp configuration for ReelXpress
// Official business number: +91 84319 12122 -> 918431912122
export const WHATSAPP_CONFIG = {
  // Click-to-chat sanitized number (digits only: country code + subscriber number)
  number: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '918431912122',
  displayNumber: '+91 84319 12122',
  companyName: 'ReelXpress',
  subtitle: 'Instant Content Creation',
  defaultMessage: "Hello ReelXpress! I'd like to know more about your services.",
};

/**
 * Builds the official WhatsApp click-to-chat URL with a URL-encoded message.
 * Format: https://wa.me/918431912122?text=ENCODED_MESSAGE
 *
 * @param {string} message - Optional user-provided message
 * @returns {string} Fully formatted and encoded WhatsApp URL
 */
export function getWhatsAppUrl(message) {
  const sanitizedNumber = (WHATSAPP_CONFIG.number || '918431912122').replace(/\D/g, '');
  const rawMessage = message && message.trim().length > 0
    ? message.trim()
    : WHATSAPP_CONFIG.defaultMessage;

  return `https://wa.me/${sanitizedNumber}?text=${encodeURIComponent(rawMessage)}`;
}

/**
 * Redirects the user to WhatsApp (WhatsApp Web on desktop / WhatsApp app on mobile)
 * using the official click-to-chat URL.
 *
 * Dispatches via a temporary target="_blank" anchor click to guarantee native universal link
 * handoff to the WhatsApp mobile app (iOS Safari / Android Chrome) without triggering popup blockers
 * or unloading the current website session.
 *
 * @param {string} message - Optional message to prefill
 */
export function openWhatsApp(message) {
  if (typeof window === 'undefined') return;
  const url = getWhatsAppUrl(message);

  try {
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      if (document.body.contains(link)) {
        document.body.removeChild(link);
      }
    }, 200);
  } catch {
    // Fallback direct window.open
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}

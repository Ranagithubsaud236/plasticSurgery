import { SocialIcon } from './ui'
import { whatsappLink } from '../data'

/**
 * Floating WhatsApp button: the official logo on the official green (#25D366), icon only.
 * - 56px on phones, 60px from tablet up (well above the 44px touch-target minimum)
 * - sits above the iPhone home indicator / Android gesture bar (safe-area insets)
 * - solid colours only; renders nothing until a WhatsApp number is set in data.js
 */
export default function WhatsAppButton() {
  const href = whatsappLink()
  if (!href) return null
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with the clinic on WhatsApp"
      title="Chat on WhatsApp"
      style={{
        right: 'max(1rem, env(safe-area-inset-right))',
        bottom: 'max(1rem, env(safe-area-inset-bottom))',
      }}
      className="fixed z-40 grid h-14 w-14 place-items-center rounded-full bg-whatsapp-brand text-white transition-colors duration-200 hover:bg-whatsapp-brand-hover active:bg-whatsapp-brand-hover sm:h-[60px] sm:w-[60px] md:!right-6 md:!bottom-6"
    >
      <SocialIcon name="whatsapp" className="h-7 w-7 sm:h-8 sm:w-8" />
    </a>
  )
}

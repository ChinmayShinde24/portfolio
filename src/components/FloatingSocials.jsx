import React from 'react'

const WHATSAPP = 'https://wa.me/918369025524'
const LINKEDIN = 'https://www.linkedin.com/in/chinmay-shinde-143157239'

const FloatingSocials = () => {
  return (
    <div className="fixed bottom-5 right-3 z-50 flex flex-col gap-3 sm:bottom-6 sm:right-5">
      <a
        href={WHATSAPP}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110 active:scale-95 sm:h-12 sm:w-12"
      >
        <i className="ri-whatsapp-fill text-xl sm:text-2xl" />
      </a>
      <a
        href={LINKEDIN}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0A66C2] text-white shadow-lg transition-transform hover:scale-110 active:scale-95 sm:h-12 sm:w-12"
      >
        <i className="ri-linkedin-fill text-xl sm:text-2xl" />
      </a>
    </div>
  )
}

export default FloatingSocials

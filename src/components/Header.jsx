// components/ContactHeader.jsx
import React from 'react';
import Link from 'next/link';
import { CallIcons, EmailIcons, FaceBookLogo, InstraGramLogo, WhatsApp } from '../../utils/svgImage';

const Header = () => {
  return (
    <div className="bg-[#1A373A] text-white py-1.5 md:py-2 px-3 md:px-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Contact Info - optimized mobile layout */}
        <div className="w-full md:w-auto grid grid-cols-2 md:flex md:flex-row md:space-x-6 gap-y-1 md:gap-y-0 mb-1 md:mb-0">
          <Link 
            href="tel:+2349122308240" 
            className="flex items-center justify-center gap-1.5 md:gap-2 text-white hover:text-amber-400 text-[11px] xs:text-xs sm:text-sm md:text-base"
          >
            <CallIcons className="w-3 h-3 min-w-[12px] md:w-5 md:h-5" />
            <span className="truncate">+234 912 230 8240</span>
          </Link>
          
          <Link 
            href="tel:+2348103484586" 
            className="flex items-center gap-1.5 md:gap-2 text-white hover:text-amber-400 text-[11px] xs:text-xs sm:text-sm md:text-base"
          >
            <WhatsApp className="w-3 h-3 min-w-[12px] md:w-5 md:h-5" />
            <span className="truncate">+234 810 348 4586</span>
          </Link>
          
          <Link 
            href="mailto:info@theluxauto.com" 
            className="col-span-2 flex items-center gap-1.5 md:gap-2 text-white hover:text-amber-400 text-[11px] xs:text-xs sm:text-sm md:text-base justify-center md:justify-start"
          >
            <EmailIcons className="w-3 h-3 min-w-[12px] md:w-5 md:h-5 flex-shrink-0" />
            <span className="truncate text-center md:text-left">info@theluxauto.com</span>
          </Link>
        </div>
        
        {/* Social Icons - better mobile alignment */}
        <div className="w-full md:w-auto flex justify-center md:justify-end mt-1 md:mt-0 space-x-3 md:space-x-1">
          <Link 
            href="https://facebook.com" 
            className="text-white hover:text-amber-400 flex items-center"
            aria-label="Facebook"
          >
            <div className="p-1 rounded-full">
              <FaceBookLogo className="w-3.5 h-3.5 md:w-5 md:h-5" />
            </div>
          </Link>
          
          <Link 
            href="https://instagram.com" 
            className="text-white hover:text-amber-400 flex items-center"
            aria-label="Instagram"
          >
            <div className="p-1 rounded-full">
              <InstraGramLogo className="w-3.5 h-3.5 md:w-5 md:h-5" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
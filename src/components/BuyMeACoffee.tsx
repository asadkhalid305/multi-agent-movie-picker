import React from "react";
import { Coffee } from "lucide-react";

interface BuyMeACoffeeProps {
  className?: string;
  username?: string;
  compact?: boolean;
}

export default function BuyMeACoffee({
  className = "",
  username = process.env.NEXT_PUBLIC_BUY_ME_A_COFFEE_USERNAME,
  compact = false,
}: BuyMeACoffeeProps) {
  // If no username is configured, don't render anything
  if (!username) return null;

  if (compact) {
    return (
      <a
        href={`https://www.buymeacoffee.com/${username}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`
          inline-flex items-center justify-center p-2
          bg-[#FFDD00] hover:bg-[#FFEA55] active:bg-[#E6C700]
          text-black rounded-lg
          transition-all duration-200 shadow-sm hover:shadow-md
          transform hover:-translate-y-0.5
          ${className}
        `}
        aria-label="Buy me a coffee"
        title="Buy me a coffee"
      >
        <Coffee size={20} className="stroke-2" />
      </a>
    );
  }

  return (
    <a
      href={`https://www.buymeacoffee.com/${username}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        inline-flex items-center gap-2 px-4 py-2 
        bg-[#FFDD00] hover:bg-[#FFEA55] active:bg-[#E6C700] 
        text-black font-semibold rounded-full 
        transition-all duration-200 shadow-sm hover:shadow-md 
        transform hover:-translate-y-0.5
        font-sans text-sm sm:text-base
        ${className}
      `}
      aria-label="Buy me a coffee"
    >
      <Coffee size={20} className="stroke-2" />
      <span>Buy me a coffee</span>
    </a>
  );
}

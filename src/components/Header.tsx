import React from "react";
import { RecommendResponse } from "@/types/api";
import BuyMeACoffee from "./BuyMeACoffee";
import ThemeToggle from "./ThemeToggle";
import { Key } from "lucide-react";

interface HeaderProps {
  metadata?: RecommendResponse["metadata"];
  onApiKeyClick: () => void;
  hasApiKey: boolean;
}

export default function Header({
  metadata,
  onApiKeyClick,
  hasApiKey,
}: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200 dark:border-[#3A3A3A] bg-white/80 dark:bg-[#202020]/80 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4 relative">
        {/* Left: Brand */}
        <div className="flex items-center gap-3 shrink-0">
          <img src="/logo.svg" alt="Logo" className="w-8 h-8" />
          <span className="font-bold text-lg text-gray-900 dark:text-gray-100 hidden xs:block">
            StreamWise AI
          </span>
        </div>

        {/* Center: Token Stats (Desktop/Tablet) - Absolutely Centered */}
        {metadata && (
          <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-[#1A1A1A] px-4 py-1.5 rounded-full border border-gray-200 dark:border-[#333]">
            <span className="font-medium text-gray-900 dark:text-gray-200 shrink-0">
              {metadata.model}
            </span>
            <div className="w-px h-3 bg-gray-300 dark:bg-gray-600" />
            <div className="flex items-center gap-3 whitespace-nowrap">
              <span>
                Total:{" "}
                <span className="font-semibold text-gray-900 dark:text-gray-200">
                  {metadata.tokensUsed.total.toLocaleString()}
                </span>
              </span>
              <span className="text-gray-400 dark:text-gray-500 text-[10px] sm:text-xs">
                (In: {metadata.tokensUsed.prompt.toLocaleString()} / Out:{" "}
                {metadata.tokensUsed.completion.toLocaleString()})
              </span>
            </div>
          </div>
        )}

        {/* Right: Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Buy Me A Coffee */}
          <BuyMeACoffee compact />

          {/* API Key Button */}
          {hasApiKey && (
            <button
              onClick={onApiKeyClick}
              className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-200 dark:hover:bg-emerald-900/50 transition-colors"
              title="Change API Key"
              aria-label="Change API Key"
            >
              <Key className="w-5 h-5" />
            </button>
          )}

          {/* Theme Toggle */}
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile Stats Row (Visible only when metadata exists on small screens) */}
      {metadata && (
        <div className="md:hidden border-t border-gray-100 dark:border-[#333] py-2 px-4 flex justify-center gap-4 text-xs bg-gray-50/50 dark:bg-[#1A1A1A]/50 backdrop-blur-sm">
          <span className="text-gray-500 dark:text-gray-400">
            Model:{" "}
            <span className="font-medium text-gray-900 dark:text-gray-200">
              {metadata.model}
            </span>
          </span>
          <span className="text-gray-500 dark:text-gray-400">
            Tokens:{" "}
            <span className="font-medium text-gray-900 dark:text-gray-200">
              {metadata.tokensUsed.total.toLocaleString()}
            </span>
          </span>
        </div>
      )}
    </header>
  );
}

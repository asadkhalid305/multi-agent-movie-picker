"use client";

import { useState, useEffect } from "react";
import { Key, X, Eye, EyeOff } from "lucide-react";

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (apiKey: string) => void;
  canClose?: boolean; // Whether user can close without providing key
  existingKey?: string; // Pre-fill with existing key when changing
}

export default function ApiKeyModal({
  isOpen,
  onClose,
  onSubmit,
  canClose = true,
  existingKey = "",
}: ApiKeyModalProps) {
  const [apiKey, setApiKey] = useState("");
  const [error, setError] = useState("");
  const [showKey, setShowKey] = useState(false);

  // Pre-fill with existing key when modal opens
  useEffect(() => {
    if (isOpen && existingKey) {
      setApiKey(existingKey);
    }
  }, [isOpen, existingKey]);

  // Helper function to partially mask the API key for privacy
  const getMaskedKey = (key: string) => {
    if (!key || key.length < 20) return key;
    // Show first 10 and last 4 characters: sk-proj-ab...xyz
    return `${key.substring(0, 10)}...${key.substring(key.length - 4)}`;
  };

  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!apiKey.trim()) {
      setError("Please enter your OpenAI API key");
      return;
    }

    if (!apiKey.startsWith("sk-")) {
      setError("Invalid API key format. OpenAI keys start with 'sk-'");
      return;
    }

    onSubmit(apiKey.trim());
    setApiKey("");
  };

  const handleClose = () => {
    if (!canClose) return; // Prevent closing if required
    setError("");
    setApiKey("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="relative bg-white dark:bg-[#2D2D2D] rounded-xl shadow-2xl max-w-md w-full border border-gray-200 dark:border-[#3A3A3A] transition-colors">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-[#3A3A3A]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-100 dark:bg-[#1A1A1A] rounded-lg">
              <Key className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              OpenAI API Key Required
            </h2>
          </div>
          {canClose && (
            <button
              onClick={handleClose}
              className="p-1 hover:bg-gray-100 dark:hover:bg-[#1A1A1A] rounded-lg transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>
          )}
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {!canClose && (
            <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
              <p className="text-sm text-amber-800 dark:text-amber-200 font-medium">
                ⚠️ This application cannot function without an OpenAI API key.
              </p>
            </div>
          )}
          <p className="text-sm text-gray-600 dark:text-gray-400">
            To use this application, you need to provide your OpenAI API key.
            Your key will be stored securely in your browser session and never
            sent to any server except OpenAI.
          </p>

          <div>
            <label
              htmlFor="apiKey"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              API Key
            </label>
            <div className="relative">
              <input
                type={showKey ? "text" : "password"}
                id="apiKey"
                value={showKey && apiKey ? getMaskedKey(apiKey) : apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk-proj-..."
                className="w-full px-4 py-3 pr-12 bg-gray-50 dark:bg-[#1A1A1A] border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800 dark:focus:ring-white focus:border-gray-800 dark:focus:border-white text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-colors font-mono text-sm"
                autoFocus
                readOnly={showKey && !!apiKey}
              />
              {apiKey && (
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 dark:hover:bg-[#2D2D2D] rounded transition-colors"
                  aria-label={showKey ? "Hide API key" : "Show API key"}
                >
                  {showKey ? (
                    <EyeOff className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  )}
                </button>
              )}
            </div>
            {error && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                {error}
              </p>
            )}
          </div>

          <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <strong>Don&apos;t have an API key?</strong> Get one from{" "}
              <a
                href="https://platform.openai.com/api-keys"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:no-underline"
              >
                OpenAI Platform
              </a>
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-gray-800 dark:bg-white text-white dark:text-black py-3 px-4 rounded-lg hover:bg-gray-900 dark:hover:bg-gray-100 transition-colors font-medium"
          >
            Save and Continue
          </button>
        </form>
      </div>
    </div>
  );
}

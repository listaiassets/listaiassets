"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { ChevronDown, Search, Check, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export interface SearchableOption {
  value: string;
  label: string;
  badge?: string;
  icon?: React.ReactNode;
  subtitle?: string;
}

export interface SearchableSelectProps {
  options: SearchableOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  labelPrefix?: string; // e.g. "Tool A:" or "Category:"
  className?: string;
  buttonClassName?: string;
  dropdownWidth?: string; // e.g. "w-72" or "w-full"
  disabled?: boolean;
}

export function SearchableSelect({
  options,
  value,
  onChange,
  placeholder = "Select an option...",
  searchPlaceholder = "Search...",
  labelPrefix,
  className = "",
  buttonClassName = "",
  dropdownWidth = "w-72 sm:w-80",
  disabled = false,
}: SearchableSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Current selected option
  const selectedOption = useMemo(
    () => options.find((opt) => opt.value === value),
    [options, value]
  );

  // Filtered options based on search query
  const filteredOptions = useMemo(() => {
    if (!searchTerm.trim()) return options;
    const term = searchTerm.toLowerCase();
    return options.filter(
      (opt) =>
        opt.label.toLowerCase().includes(term) ||
        opt.value.toLowerCase().includes(term) ||
        (opt.badge && opt.badge.toLowerCase().includes(term)) ||
        (opt.subtitle && opt.subtitle.toLowerCase().includes(term))
    );
  }, [options, searchTerm]);

  // Click outside listener to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchTerm("");
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Focus search input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  // Handle escape key
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
      setSearchTerm("");
    }
  };

  const handleSelect = (val: string) => {
    onChange(val);
    setIsOpen(false);
    setSearchTerm("");
  };

  return (
    <div
      ref={containerRef}
      onKeyDown={handleKeyDown}
      className={`relative inline-block text-left ${className}`}
    >
      {/* Trigger Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={`group flex items-center justify-between gap-2.5 rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] px-3 py-1.5 text-xs text-stone-800 dark:text-stone-200 shadow-xs transition-all hover:border-amber-500/50 hover:bg-stone-50 dark:hover:bg-stone-900/60 focus:outline-none focus:ring-1 focus:ring-amber-500/30 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${buttonClassName}`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2 truncate">
          {labelPrefix && (
            <span className="text-stone-400 dark:text-stone-500 text-[11px] font-mono shrink-0">
              {labelPrefix}
            </span>
          )}

          {selectedOption?.icon && (
            <div className="shrink-0 flex items-center">
              {selectedOption.icon}
            </div>
          )}

          <span className="font-semibold truncate text-stone-900 dark:text-stone-100">
            {selectedOption ? selectedOption.label : placeholder}
          </span>

          {selectedOption?.badge && (
            <span className="shrink-0 rounded px-1.5 py-0.5 text-[10px] font-mono font-medium bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
              {selectedOption.badge}
            </span>
          )}
        </div>

        <ChevronDown
          className={`h-3.5 w-3.5 shrink-0 text-stone-400 dark:text-stone-500 transition-transform duration-200 group-hover:text-stone-700 dark:group-hover:text-stone-300 ${
            isOpen ? "rotate-180 text-amber-600 dark:text-amber-400" : ""
          }`}
        />
      </button>

      {/* Popover Dropdown with Search */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 2, scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className={`absolute left-0 mt-1.5 z-50 ${dropdownWidth} max-w-[90vw] overflow-hidden rounded-xl border border-stone-200 dark:border-stone-800 bg-white/95 dark:bg-[#141210]/95 backdrop-blur-2xl shadow-2xl ring-1 ring-black/5 dark:ring-white/10`}
          >
            {/* Search Input Bar */}
            <div className="p-2 border-b border-stone-100 dark:border-stone-800/80 bg-stone-50/70 dark:bg-stone-900/50">
              <div className="relative flex items-center">
                <Search className="absolute left-2.5 h-3.5 w-3.5 text-stone-400 dark:text-stone-500 pointer-events-none" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={searchPlaceholder}
                  className="w-full rounded-md border border-stone-200 dark:border-stone-700/80 bg-white dark:bg-stone-900/90 pl-8 pr-7 py-1.5 text-xs text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/30"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-2 p-0.5 rounded text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
                  >
                    <X className="h-3 w-3" />
                  </button>
                )}
              </div>
            </div>

            {/* Options List */}
            <div
              role="listbox"
              className="max-h-60 overflow-y-auto p-1 divide-y divide-stone-100/50 dark:divide-stone-800/40"
            >
              {filteredOptions.length === 0 ? (
                <div className="py-6 text-center text-xs text-stone-400 dark:text-stone-500">
                  No matching options found
                </div>
              ) : (
                filteredOptions.map((opt) => {
                  const isSelected = opt.value === value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => handleSelect(opt.value)}
                      className={`group flex w-full items-center justify-between gap-3 px-3 py-2 text-xs rounded-lg transition-colors text-left cursor-pointer ${
                        isSelected
                          ? "bg-amber-50 dark:bg-amber-950/30 text-amber-900 dark:text-amber-200 font-semibold"
                          : "text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800/60 hover:text-stone-950 dark:hover:text-white"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        {opt.icon && (
                          <div className="shrink-0 flex items-center">
                            {opt.icon}
                          </div>
                        )}

                        <div className="truncate">
                          <div className="truncate flex items-center gap-2">
                            <span>{opt.label}</span>
                            {opt.badge && (
                              <span
                                className={`text-[9px] font-mono font-medium px-1.5 py-0.2 rounded border ${
                                  isSelected
                                    ? "bg-amber-500/20 text-amber-800 dark:text-amber-300 border-amber-500/30"
                                    : "bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400 border-stone-200 dark:border-stone-700"
                                }`}
                              >
                                {opt.badge}
                              </span>
                            )}
                          </div>
                          {opt.subtitle && (
                            <p className="text-[10px] text-stone-400 dark:text-stone-500 truncate mt-0.5">
                              {opt.subtitle}
                            </p>
                          )}
                        </div>
                      </div>

                      {isSelected && (
                        <Check className="h-3.5 w-3.5 shrink-0 text-amber-600 dark:text-amber-400" />
                      )}
                    </button>
                  );
                })
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

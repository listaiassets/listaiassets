"use client";

import React from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems?: number;
  itemName?: string;
  onPageChange?: (page: number) => void;
  getPageUrl?: (page: number) => string;
  className?: string;
}

/**
 * Generate pagination page items with smart ellipsis windowing
 */
export function getPaginationItems(current: number, total: number): (number | "...")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  if (current <= 3) {
    return [1, 2, 3, 4, "...", total];
  }
  if (current >= total - 2) {
    return [1, "...", total - 3, total - 2, total - 1, total];
  }
  return [1, "...", current - 1, current, current + 1, "...", total];
}

export function Pagination({
  currentPage,
  totalPages,
  totalItems,
  itemName = "items",
  onPageChange,
  getPageUrl,
  className = "",
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const paginationItems = getPaginationItems(currentPage, totalPages);

  const handlePageClick = (page: number, e?: React.MouseEvent) => {
    if (page < 1 || page > totalPages || page === currentPage) {
      if (e) e.preventDefault();
      return;
    }
    if (onPageChange) {
      if (e && !getPageUrl) e.preventDefault();
      onPageChange(page);
    }
  };

  const isPrevDisabled = currentPage <= 1;
  const isNextDisabled = currentPage >= totalPages;

  return (
    <div
      className={`mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-stone-200 dark:border-stone-800 ${className}`}
    >
      <div className="text-xs text-stone-500 dark:text-stone-400 font-mono">
        Page {currentPage} of {totalPages}
        {totalItems !== undefined && (
          <span> ({totalItems} total {itemName})</span>
        )}
      </div>

      <nav aria-label="Pagination" className="flex items-center gap-1.5">
        {/* Previous Button */}
        {getPageUrl ? (
          <Link
            href={isPrevDisabled ? "#" : getPageUrl(currentPage - 1)}
            aria-disabled={isPrevDisabled}
            tabIndex={isPrevDisabled ? -1 : undefined}
            onClick={(e) => isPrevDisabled && e.preventDefault()}
            className={`inline-flex h-9 items-center gap-1 rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] px-3 text-xs font-medium text-stone-700 dark:text-stone-300 transition-colors ${
              isPrevDisabled
                ? "pointer-events-none opacity-40 cursor-not-allowed"
                : "hover:border-amber-500/40 hover:text-stone-900 dark:hover:text-white cursor-pointer"
            }`}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Previous</span>
          </Link>
        ) : (
          <button
            type="button"
            disabled={isPrevDisabled}
            onClick={(e) => handlePageClick(currentPage - 1, e)}
            className={`inline-flex h-9 items-center gap-1 rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] px-3 text-xs font-medium text-stone-700 dark:text-stone-300 transition-colors ${
              isPrevDisabled
                ? "pointer-events-none opacity-40 cursor-not-allowed"
                : "hover:border-amber-500/40 hover:text-stone-900 dark:hover:text-white cursor-pointer"
            }`}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Previous</span>
          </button>
        )}

        {/* Page Number Buttons */}
        <div className="flex items-center gap-1">
          {paginationItems.map((item, idx) => {
            if (item === "...") {
              return (
                <span
                  key={`ellipsis-${idx}`}
                  className="flex h-9 w-9 items-center justify-center text-xs text-stone-400 dark:text-stone-600 font-mono select-none"
                >
                  …
                </span>
              );
            }

            const pageNum = item as number;
            const isActive = pageNum === currentPage;

            if (getPageUrl) {
              return (
                <Link
                  key={`page-${pageNum}`}
                  href={getPageUrl(pageNum)}
                  aria-current={isActive ? "page" : undefined}
                  onClick={(e) => onPageChange && onPageChange(pageNum)}
                  className={`flex h-9 w-9 items-center justify-center rounded-lg text-xs font-mono font-medium transition-all ${
                    isActive
                      ? "bg-amber-600 text-white shadow-xs font-semibold cursor-default"
                      : "border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] text-stone-700 dark:text-stone-300 hover:border-amber-500/40 hover:text-stone-900 dark:hover:text-white cursor-pointer"
                  }`}
                >
                  {pageNum}
                </Link>
              );
            }

            return (
              <button
                key={`page-${pageNum}`}
                type="button"
                onClick={(e) => handlePageClick(pageNum, e)}
                aria-current={isActive ? "page" : undefined}
                className={`flex h-9 w-9 items-center justify-center rounded-lg text-xs font-mono font-medium transition-all ${
                  isActive
                    ? "bg-amber-600 text-white shadow-xs font-semibold cursor-default"
                    : "border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] text-stone-700 dark:text-stone-300 hover:border-amber-500/40 hover:text-stone-900 dark:hover:text-white cursor-pointer"
                }`}
              >
                {pageNum}
              </button>
            );
          })}
        </div>

        {/* Next Button */}
        {getPageUrl ? (
          <Link
            href={isNextDisabled ? "#" : getPageUrl(currentPage + 1)}
            aria-disabled={isNextDisabled}
            tabIndex={isNextDisabled ? -1 : undefined}
            onClick={(e) => isNextDisabled && e.preventDefault()}
            className={`inline-flex h-9 items-center gap-1 rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] px-3 text-xs font-medium text-stone-700 dark:text-stone-300 transition-colors ${
              isNextDisabled
                ? "pointer-events-none opacity-40 cursor-not-allowed"
                : "hover:border-amber-500/40 hover:text-stone-900 dark:hover:text-white cursor-pointer"
            }`}
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        ) : (
          <button
            type="button"
            disabled={isNextDisabled}
            onClick={(e) => handlePageClick(currentPage + 1, e)}
            className={`inline-flex h-9 items-center gap-1 rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] px-3 text-xs font-medium text-stone-700 dark:text-stone-300 transition-colors ${
              isNextDisabled
                ? "pointer-events-none opacity-40 cursor-not-allowed"
                : "hover:border-amber-500/40 hover:text-stone-900 dark:hover:text-white cursor-pointer"
            }`}
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        )}
      </nav>
    </div>
  );
}


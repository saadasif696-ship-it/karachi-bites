import React from 'react';
import { Search, X, RotateCcw, Flame, Leaf } from 'lucide-react';
import { FilterState } from '../types';

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onResetFilters: () => void;
  resultCount: number;
  totalCount: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  resultCount,
  totalCount
}) => {
  const isFiltered =
    filters.search.trim() !== '' ||
    filters.vegOnly ||
    filters.spicyOnly ||
    filters.maxPrice < 2000;

  return (
    <div className="bg-[#FFFDF8] border-2 border-[#EFE2CD] rounded-3xl p-4 sm:p-5 shadow-xs mb-8">
      {/* Row 1: Search & Reset */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#C86314] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
            placeholder="Search Karachi menu (e.g. Malai Boti, Shinwari Karahi, Biryani, Rolls)..."
            className="w-full pl-10 pr-9 py-2.5 text-sm bg-[#FAF6ED] border border-[#EFE2CD] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0C0E14]/20 focus:border-[#0C0E14] text-[#241810] placeholder-[#8B776A] transition-all"
          />
          {filters.search && (
            <button
              onClick={() => onFilterChange({ ...filters, search: '' })}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-[#241810] p-1 cursor-pointer transition-colors"
              aria-label="Clear search query"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Counter and Reset */}
        <div className="flex items-center justify-between sm:justify-end gap-3 text-xs">
          <span className="text-[#766457] font-medium">
            Showing <strong className="text-[#241810] font-bold">{resultCount}</strong> of {totalCount} items
          </span>

          {isFiltered && (
            <button
              onClick={onResetFilters}
              className="inline-flex items-center gap-1.5 text-[#C86314] hover:text-[#B8550D] font-bold transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Row 2: Dietary Toggles and Max Price Range */}
      <div className="mt-4 pt-3.5 border-t border-[#EFE2CD] flex flex-wrap items-center justify-between gap-4">
        {/* Dietary Toggles */}
        <div className="flex items-center gap-2">
          {/* Veg Toggle */}
          <button
            onClick={() => onFilterChange({ ...filters, vegOnly: !filters.vegOnly })}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold border transition-all cursor-pointer min-h-[38px] active:scale-95 ${
              filters.vegOnly
                ? 'bg-[#2E7D32] text-white border-[#2E7D32] shadow-xs'
                : 'bg-[#FAF6ED] text-[#2E7D32] border-[#EFE2CD] hover:bg-white'
            }`}
          >
            <Leaf className="w-3.5 h-3.5" />
            Vegetarian Only
          </button>

          {/* Spicy Toggle */}
          <button
            onClick={() => onFilterChange({ ...filters, spicyOnly: !filters.spicyOnly })}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold border transition-all cursor-pointer min-h-[38px] active:scale-95 ${
              filters.spicyOnly
                ? 'bg-[#C86314] text-white border-[#C86314] shadow-xs'
                : 'bg-[#FAF6ED] text-[#C86314] border-[#EFE2CD] hover:bg-white'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            Spicy Only
          </button>
        </div>

        {/* Max Price Slider */}
        <div className="flex items-center gap-3 text-xs w-full sm:w-auto">
          <span className="text-[#766457] whitespace-nowrap">Max Price:</span>
          <input
            type="range"
            min="100"
            max="2000"
            step="50"
            value={filters.maxPrice}
            onChange={(e) => onFilterChange({ ...filters, maxPrice: Number(e.target.value) })}
            className="w-28 sm:w-36 accent-[#C86314] cursor-pointer"
          />
          <span className="font-bold text-[#241810] min-w-[55px] text-right font-mono">
            Rs. {filters.maxPrice}
          </span>
        </div>
      </div>
    </div>
  );
};

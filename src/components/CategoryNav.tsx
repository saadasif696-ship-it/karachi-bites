import React from 'react';

interface CategoryNavProps {
  categories: string[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  categoryCounts: { [key: string]: number };
}

export const CategoryNav: React.FC<CategoryNavProps> = ({
  categories,
  activeCategory,
  onSelectCategory,
  categoryCounts
}) => {
  return (
    <div className="sticky top-16 z-30 py-4 bg-[#FDF8F0]/95 backdrop-blur-md border-b border-[#D4A017]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
          <button
            onClick={() => onSelectCategory('all')}
            className={`px-6 py-3 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer min-h-[44px] active:scale-95 ${
              activeCategory === 'all'
                ? 'bg-[#D4A017] text-[#1A1A2E] shadow-lg shadow-[#D4A017]/30'
                : 'bg-white text-[#6B7280] hover:text-[#1A1A2E] border border-[#E5E7EB] hover:border-[#D4A017]'
            }`}
          >
            All ({categoryCounts['all'] || 0})
          </button>

          {categories.map((cat) => {
            const count = categoryCounts[cat] || 0;
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`px-6 py-3 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer min-h-[44px] active:scale-95 ${
                  isSelected
                    ? 'bg-[#D4A017] text-[#1A1A2E] shadow-lg shadow-[#D4A017]/30'
                    : 'bg-white text-[#6B7280] hover:text-[#1A1A2E] border border-[#E5E7EB] hover:border-[#D4A017]'
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

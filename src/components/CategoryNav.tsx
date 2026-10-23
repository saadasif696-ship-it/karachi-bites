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
    <div className="border-b-2 border-[#EFE2CD] bg-[#FAF6ED]/95 backdrop-blur-md sticky top-18 z-30 py-3 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none no-scrollbar">
          <button
            onClick={() => onSelectCategory('all')}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-black whitespace-nowrap transition-all cursor-pointer min-h-[40px] active:scale-95 ${
              activeCategory === 'all'
                ? 'bg-[#0C0E14] text-[#D4AF37] border-2 border-[#D4AF37] shadow-md ring-2 ring-[#D4AF37]/25'
                : 'bg-[#FFFDF8] text-[#766457] hover:text-[#0C0E14] hover:bg-white border-2 border-[#EFE2CD] shadow-2xs'
            }`}
          >
            All Items {categoryCounts['all'] ? `(${categoryCounts['all']})` : ''}
          </button>

          {categories.map((cat) => {
            const count = categoryCounts[cat] || 0;
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-black whitespace-nowrap transition-all cursor-pointer min-h-[40px] active:scale-95 ${
                  isSelected
                    ? 'bg-[#0C0E14] text-[#D4AF37] border-2 border-[#D4AF37] shadow-md ring-2 ring-[#D4AF37]/25'
                    : 'bg-[#FFFDF8] text-[#766457] hover:text-[#0C0E14] hover:bg-white border-2 border-[#EFE2CD] shadow-2xs'
                }`}
              >
                {cat} {count > 0 ? `(${count})` : ''}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

import React from "react";

const FilterSection = ({ filters, selectedFilter, onFilterSelect }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {filters.map((filter) => (
        <button
          key={filter.name}
          className={`px-4 py-2 rounded-full border ${
            selectedFilter === filter.name
              ? "bg-gray-800 text-white"
              : "bg-white text-gray-800 border-gray-300"
          }`}
          onClick={() => onFilterSelect(filter.name)}
        >
          {filter.name} ({filter.count})
        </button>
      ))}
    </div>
  );
};

export default FilterSection;

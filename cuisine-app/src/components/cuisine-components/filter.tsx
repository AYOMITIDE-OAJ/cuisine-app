import React from "react";

const FilterSection = ({ filters, selectedFilter, onFilterSelect }) => {
  const allFilter = {
    name: "All",
    number_of_orders: filters?.reduce(
      (acc, filter) => acc + filter.number_of_orders,
      0
    ),
  };

  let allFilters = [allFilter];
  if (filters) {
    allFilters = [allFilter, ...filters];
  }

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {allFilters && allFilters.map((filter) => (
        <button
          key={filter.name}
          className={`px-4 py-2 rounded-full border ${
            selectedFilter === filter.name
              ? "bg-gray-800 text-white"
              : "bg-white text-gray-800 border-gray-300"
          }`}
          onClick={() => onFilterSelect(filter.name)}
        >
          {filter.name} ({filter.number_of_orders})
        </button>
      ))}
    </div>
  );
};

export default FilterSection;

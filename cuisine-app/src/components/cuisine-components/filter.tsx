import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedSlug } from "../../redux/slices/cuisineSlice";
import { RootState } from "../../redux/store";

interface Filter {
  name: string;
  slug?: string | null;
  number_of_orders: number;
}

interface FilterSectionProps {
  filters: Filter[];
}

const FilterSection: React.FC<FilterSectionProps> = ({ filters }) => {
  const dispatch = useDispatch();
  const selectedSlug = useSelector(
    (state: RootState) => state.cuisine.selectedSlug
  );

  const uniqueFilters = useMemo(() => {
    const map = new Map<string | null, Filter>();
    filters.forEach((filter) => {
      if (!map.has(filter.slug)) {
        map.set(filter.slug, filter);
      }
    });
    return Array.from(map.values());
  }, [filters]);

  const allFilter = useMemo(() => {
    const totalOrders = uniqueFilters.reduce(
      (acc, filter) => acc + filter.number_of_orders,
      0
    );
    return {
      name: "All",
      number_of_orders: totalOrders,
      slug: null,
    };
  }, [uniqueFilters]);

  const allFilters = useMemo(
    () => [allFilter, ...uniqueFilters],
    [allFilter, uniqueFilters]
  );

  const handleFilterClick = (filter: Filter) => {
    dispatch(setSelectedSlug(filter.slug));
  };

  return (
    <>
      <p className="mt-5 mb-2 font-semibold">Filters:</p>
      <section className="flex flex-wrap gap-2 mb-6">
        {allFilters.map((filter) => (
          <button
            key={filter.name}
            className={`px-4 py-2 rounded-full border ${
              selectedSlug === filter.slug
                ? "bg-gray-800 text-white"
                : "bg-white text-gray-800 border-gray-300"
            }`}
            onClick={() => {
              handleFilterClick(filter);
            }}
          >
            {filter.name} ({filter.number_of_orders})
          </button>
        ))}
      </section>
    </>
  );
};

export default FilterSection;

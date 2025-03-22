import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedSlug } from "../../redux/slices/cuisineSlice";
import { RootState } from "../../redux/store";

interface Filter {
  name: string;
  slug?: string;
  number_of_orders: number;
  cuisines: any;
}

interface FilterSectionProps {
  filters: Filter[];
}

const FilterSection: React.FC<FilterSectionProps> = ({ filters }) => {
  const dispatch = useDispatch();
  const selectedSlug = useSelector(
    (state: RootState) => state.cuisine.selectedSlug
  );

  const allCuisines = filters.flatMap((filter) => filter.cuisines || []);

  const allFilter = useMemo(() => {
    const totalOrders = filters.reduce(
      (acc, filter) => acc + filter.number_of_orders,
      0
    );
    return {
      name: "All",
      number_of_orders: totalOrders,
      slug: null,
      cuisines: allCuisines, // Add all cuisines here
    };
  }, [filters]);

  const allFilters = useMemo(
    () => [allFilter, ...filters],
    [allFilter, filters]
  );

  const handleFilterClick = (filter) => {
    if (filter.name === "All") {
      dispatch(setSelectedSlug(null));
    } else {
      if (filter.cuisines && filter.cuisines.length > 0) {
        dispatch(setSelectedSlug(filter.cuisines[0].slug || null));
      } else {
        dispatch(setSelectedSlug(null));
      }
    }
  };

  return (
    <>
      <p className="mt-5 mb-2 font-semibold">Filters:</p>
      <section className="flex flex-wrap gap-2 mb-6">
        {allFilters.map((filter) => (
          <button
            key={filter.name}
            className={`px-4 py-2 rounded-full border ${
              // selectedSlug === (filter.cuisines && filter.cuisines[0]?.slug)
              selectedSlug === filter.slug
                ? "bg-gray-800 text-white"
                : "bg-white text-gray-800 border-gray-300"
            }`}
            onClick={() => {
              handleFilterClick(filter);
              console.log("Filter clicked:", filter);
              console.log("selectedSlug:", selectedSlug);
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

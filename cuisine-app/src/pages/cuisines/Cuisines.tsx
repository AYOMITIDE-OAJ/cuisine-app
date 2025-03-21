import { useState } from "react";
import LoadMoreButton from "../../components/cuisine-components/load-more-button";
import SetMenuGrid from "../../components/cuisine-components/set-menu-grid";
import FilterSection from "../../components/cuisine-components/filter";
import { useFetchCuisines } from "../../utils/api/dashboard-request";
import { handleError } from "../../utils/notify";

const Cuisines = () => {
  const [selectedFilter, setSelectedFilter] = useState("All");

  const { data: cuisines, isPending, isError } = useFetchCuisines();
  handleError(isError);
  console.log({ cuisines });

  const loadMoreMenus = () => {
    console.log("Load more menus...");
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Set Menus</h1>

      {/* Filters */}
      <FilterSection
        filters={cuisines}
        selectedFilter={selectedFilter}
        onFilterSelect={setSelectedFilter}
      />

      {/* Grid */}
      <SetMenuGrid menus={cuisines} />

      {/* Load More */}
      <LoadMoreButton onClick={loadMoreMenus} />

      {/* Footer */}
      <p className="text-center mt-4 text-gray-500">
        Showing {cuisines?.length} of 6 menus.
        {/* Showing {menus.length} of {filters[0].count} menus. */}
      </p>
    </div>
  );
};

export default Cuisines;

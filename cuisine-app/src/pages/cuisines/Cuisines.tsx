import { useState } from "react";
import LoadMoreButton from "../../components/cuisine-components/load-more-button";
import SetMenuGrid from "../../components/cuisine-components/set-menu-grid";
import FilterSection from "../../components/cuisine-components/filter";

const Cuisines = () => {
  const [loading, setLoading] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [menus, setMenus] = useState([
    // Example data; replace with API data.
    {
      id: 1,
      name: "Italiano Delight",
      cuisine: "Italian",
      description: "An italian selection",
      price: 430,
      image:
        "https://d3gko8938onrvn.cloudfront.net/setmenus/images/19GUjCTWf4SkbHtYJumOrYFLUJ5qmeCB13rhv9pa.jpg",
    },
    {
      id: 1,
      name: "Italiano Delight",
      cuisine: "Italian",
      description: "An italian selection",
      price: 430,
      image:
        "https://d3gko8938onrvn.cloudfront.net/setmenus/images/19GUjCTWf4SkbHtYJumOrYFLUJ5qmeCB13rhv9pa.jpg",
    },
    {
      id: 1,
      name: "Italiano Delight",
      cuisine: "Italian",
      description: "An italian selection",
      price: 430,
      image:
        "https://d3gko8938onrvn.cloudfront.net/setmenus/images/19GUjCTWf4SkbHtYJumOrYFLUJ5qmeCB13rhv9pa.jpg",
    },
    {
      id: 1,
      name: "Italiano Delight",
      cuisine: "Italian",
      description: "An italian selection",
      price: 430,
      image:
        "https://d3gko8938onrvn.cloudfront.net/setmenus/images/19GUjCTWf4SkbHtYJumOrYFLUJ5qmeCB13rhv9pa.jpg",
    },
    {
      id: 1,
      name: "Italiano Delight",
      cuisine: "Italian",
      description: "An italian selection",
      price: 430,
      image:
        "https://d3gko8938onrvn.cloudfront.net/setmenus/images/19GUjCTWf4SkbHtYJumOrYFLUJ5qmeCB13rhv9pa.jpg",
    },
    {
      id: 1,
      name: "Italiano Delight",
      cuisine: "Italian",
      description: "An italian selection",
      price: 430,
      image:
        "https://d3gko8938onrvn.cloudfront.net/setmenus/images/19GUjCTWf4SkbHtYJumOrYFLUJ5qmeCB13rhv9pa.jpg",
    },
  ]);

  const filters = [
    { name: "All", count: menus.length },
    { name: "Italian", count: 32 },
    { name: "Pan Asian", count: 17 },
    // Add more filters here...
  ];

  const loadMoreMenus = () => {
    // Logic to load more menus (e.g., fetch from API).
    console.log("Load more menus...");
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Set Menus</h1>

      {/* Filters */}
      <FilterSection
        filters={filters}
        selectedFilter={selectedFilter}
        onFilterSelect={setSelectedFilter}
      />

      {/* Grid */}
      <SetMenuGrid menus={menus} />

      {/* Load More */}
      <LoadMoreButton onClick={loadMoreMenus} />

      {/* Footer */}
      <p className="text-center mt-4 text-gray-500">
        Showing {menus.length} of {filters[0].count} menus.
      </p>
    </div>
  );
};

export default Cuisines;

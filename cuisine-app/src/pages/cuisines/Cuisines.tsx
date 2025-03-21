import { useCallback, useState } from "react";
import LoadMoreButton from "../../components/cuisine-components/load-more-button";
import SetMenuGrid from "../../components/cuisine-components/set-menu-grid";
import FilterSection from "../../components/cuisine-components/filter";
import { useFetchCuisines } from "../../utils/api/dashboard-request";
import { handleError } from "../../utils/notify";
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementGuestNumber,
  incrementGuestNumber,
} from "../../redux/slices/cuisineSlice";

const Cuisines = () => {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const dispatch = useDispatch();

  const { isPending, isError, handleLoadMore } = useFetchCuisines();

  const setMenus = useSelector((state: RootState) => state.cuisine.setMenus);
  const totalCount = useSelector(
    (state: RootState) => state.cuisine.totalCount
  );
  const guestNumber = useSelector(
    (state: RootState) => state.cuisine.guestNumber
  );

  // Memoize dispatch calls to avoid unnecessary re-renders
  const incrementGuest = useCallback(
    () => dispatch(incrementGuestNumber()),
    [dispatch]
  );
  const decrementGuest = useCallback(
    () => dispatch(decrementGuestNumber()),
    [dispatch]
  );

  handleError(isError);

  const Loader = () => (
    <div className="flex justify-center h-screen items-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Set Menus</h1>

      <div className="flex items-center mb-4">
        <button
          onClick={decrementGuest}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l-2xl rounded-r-none"
        >
          -
        </button>
        <input
          type="number"
          value={guestNumber}
          readOnly
          className="appearance-none border-0 w-20 py-2.5 px-1 bg-gray-300 text-gray-700 leading-tight focus:outline-none focus:shadow-none text-center"
        />
        <button
          onClick={incrementGuest}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r-2xl rounded-l-none"
        >
          +
        </button>
        <span className="ml-2">Guests</span>
      </div>

      {isPending ? (
        <Loader />
      ) : (
        <>
          <FilterSection
            filters={setMenus}
            selectedFilter={selectedFilter}
            onFilterSelect={setSelectedFilter}
          />
          <SetMenuGrid menus={setMenus} guestNumber={guestNumber} />
          <LoadMoreButton onClick={handleLoadMore} />

          <p className="text-center mt-4 text-gray-500">
            Showing {setMenus?.length || 0} of {totalCount} menus.
          </p>
        </>
      )}
    </div>
  );
};

export default Cuisines;

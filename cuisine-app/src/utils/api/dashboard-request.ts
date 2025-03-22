import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";

import useDashboardApi from "./dashboard.api";
import { queryKeys } from "../constants";
import { incrementPage, setCuisines } from "../../redux/slices/cuisineSlice";
import { RootState } from "../../redux/store";
import { ApiResponse } from "../../interfaces";

export const useFetchCuisines = () => {
  const { getCuisines } = useDashboardApi();
  const dispatch = useDispatch();
  const page = useSelector((state: RootState) => state.cuisine.page);
  const pageSize = useSelector((state: RootState) => state.cuisine.pageSize);
  const selectedSlug = useSelector(
    (state: RootState) => state.cuisine.selectedSlug
  );

  const query = useQuery({
    queryKey: [queryKeys.cuisines, page, pageSize, selectedSlug],
    queryFn: async () => {
      const res: ApiResponse = await getCuisines(page, pageSize, selectedSlug);
      dispatch(
        setCuisines({
          setMenus: res.data,
          totalCount: res.meta.itemCount,
        })
      );
      return res;
    },
  });

  const handleLoadMore = () => {
    dispatch(incrementPage());
  };

  return {
    ...query,
    page,
    handleLoadMore,
  };
};

export const useFetchCuisineSlugs = () => {
  const { getCuisineSlugs } = useDashboardApi();

  const query = useQuery({
    queryKey: [queryKeys.cuisineSlugs],
    queryFn: () => getCuisineSlugs(),
  });

  return { ...query };
};

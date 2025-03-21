import { useQuery } from "@tanstack/react-query";
import useDashboardApi from "./dashboard.api";
import { queryKeys } from "../constants";
import { useState } from "react";

export const useFetchCuisines = () => {
  const { getCuisines } = useDashboardApi();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const query = useQuery({
    queryKey: [queryKeys.users, page, pageSize],
    queryFn: () => getCuisines(),
  });

  return {
    ...query,
    setPage,
    setPageSize,
  };
};

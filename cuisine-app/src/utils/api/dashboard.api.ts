import useAxiosInstance from ".";
import { handleGenericError } from "../notify";

const useDashboardApi = () => {
  const axiosInstance = useAxiosInstance();

  const getCuisines = async (page?: number, limit?: number) => {
    try {
      const queryParams = new URLSearchParams();
      if (page) queryParams.append("page", page.toString());
      if (limit) queryParams.append("limit", limit.toString());

      const { data: res } = await axiosInstance.get(
        `/cuisines/set-menus?${queryParams.toString()}`
      );

      return res.data;
    } catch (error) {
      handleGenericError(error);
    }
  };

  return {
    getCuisines,
  };
};

export default useDashboardApi;

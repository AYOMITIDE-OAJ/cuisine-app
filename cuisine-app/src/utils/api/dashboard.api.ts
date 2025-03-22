import useAxiosInstance from ".";
import { handleGenericError } from "../notify";

const useDashboardApi = () => {
  const axiosInstance = useAxiosInstance();

  const getCuisines = async (page?: number, limit?: number, slug?: string) => {
    try {
      const queryParams = new URLSearchParams();
      if (page) queryParams.append("page", page.toString());
      if (limit) queryParams.append("limit", limit.toString());
      if (slug) queryParams.append("slug", slug);

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

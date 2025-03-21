import { handleGenericError } from "../notify";
import axios from "axios";

const useDashboardApi = () => {
  const getCuisines = async (page?: number, limit?: number) => {
    try {
      const queryParams = new URLSearchParams();
      if (page) queryParams.append("page", page.toString());
      if (limit) queryParams.append("limit", limit.toString());

      const { data: res } = await axios.get(
        `cuisines?${queryParams.toString()}`
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

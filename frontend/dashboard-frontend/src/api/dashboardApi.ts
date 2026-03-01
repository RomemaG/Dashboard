import axios from "axios";

export const fetchDashboard = async () => {
  const response = await axios.get(
    "http://localhost:4000/api/dashboard"
  );
  return response.data;
};
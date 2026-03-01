import { useEffect, useState } from "react";
import { fetchDashboard } from "../api/dashboardApi";

export const useDashboard = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetchDashboard().then(setData);
  }, []);

  return data;
};
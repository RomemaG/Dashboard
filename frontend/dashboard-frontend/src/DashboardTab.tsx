import { useDashboard } from "./hooks/useDashboard";

export const DashboardTab = () => {
  const data = useDashboard();

  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};
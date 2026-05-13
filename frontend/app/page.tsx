import Dashboard from "./components/Dashboard";

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
      <p className="text-gray-600 mb-8">Plan, prioritize and accomplish your task with ease</p>

      <Dashboard />
    </div>
  );
}

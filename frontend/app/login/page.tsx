import Login from "../components/Login";

export default function LoginPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Login</h1>
      <p className="text-gray-600 mb-8">Sign in to your account</p>
      <Login />
    </div>
  );
}

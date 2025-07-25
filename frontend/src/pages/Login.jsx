import AuthLayout from '../layouts/AuthLayout';
import LoginForm from '../components/Auth/LoginForm';

const Login = () => (
  <AuthLayout>
    <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">Admin Login</h2>
      <LoginForm />
    </div>
  </AuthLayout>
);
export default Login;
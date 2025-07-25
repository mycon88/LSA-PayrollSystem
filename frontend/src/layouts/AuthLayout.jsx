// src/layouts/AuthLayout.jsx
const AuthLayout = ({ children }) => {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      {children}
    </main>
  );
};

export default AuthLayout;

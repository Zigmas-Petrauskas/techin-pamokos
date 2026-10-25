import { useState } from 'react';

// Administratoriaus turinio komponentas.
const AdminPanel = () => {
  return <p>Welcome to the Admin Panel.</p>;
};

// Prisijungusio vartotojo turinio komponentas.
const UserDashboard = () => {
  return <p>Welcome to the User Dashboard.</p>;
};

// Svečio turinio komponentas.
const GuestPage = () => {
  return <p>Welcome to the Guest Page.</p>;
};

// Komponentų atvaizdavimas pagal pasirinktą rolę.
const RoleBasedRendering = () => {
  const [userRole, setUserRole] = useState('');

  // Pagal rolę parenkamas atitinkamas komponentas.
  const renderContent = () => {
    switch (userRole) {
      case 'admin':
        return <AdminPanel />;

      case 'user':
        return <UserDashboard />;

      default:
        return <GuestPage />;
    }
  };

  return (
    <section className="flex min-h-64 flex-col items-center rounded-lg border border-gray-300 bg-white p-6 text-center">
      <span className="text-sm text-gray-500">Exercise 4</span>

      <h2 className="mt-3 mb-5 text-xl font-semibold">Rendering Different Components</h2>

      <label htmlFor="user-role" className="mb-2 text-sm">
        Select user role:
      </label>

      <select
        id="user-role"
        value={userRole}
        onChange={(event) => setUserRole(event.target.value)}
        className="w-full max-w-64 rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm"
      >
        <option value="">Guest</option>
        <option value="admin">Admin</option>
        <option value="user">User</option>
      </select>

      <div className="mt-5 w-full rounded-md bg-gray-100 p-4">{renderContent()}</div>
    </section>
  );
};

export default RoleBasedRendering;

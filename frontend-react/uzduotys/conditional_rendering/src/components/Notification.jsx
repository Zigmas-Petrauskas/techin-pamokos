import { useState } from 'react';
import clsx from 'clsx';

// Pranešimo stiliai pagal jo tipą.
const notificationStyles = {
  success: 'bg-green-100 text-green-800 border-green-300',
  error: 'bg-red-100 text-red-800 border-red-300',
  warning: 'bg-yellow-100 text-yellow-800 border-yellow-300',
};

// Pranešimo komponentas.
const Notification = ({ type }) => {
  return (
    <div
      className={clsx(
        'mt-5 w-full rounded-md border px-4 py-3 text-center font-medium',
        notificationStyles[type],
      )}
    >
      {type === 'success' && 'Success notification'}
      {type === 'error' && 'Error notification'}
      {type === 'warning' && 'Warning notification'}
    </div>
  );
};

// Pranešimo tipo pasirinkimo komponentas.
const NotificationExample = () => {
  const [type, setType] = useState('success');

  return (
    <section className="flex min-h-64 flex-col items-center rounded-lg border border-gray-300 bg-white p-6 text-center">
      <span className="text-sm text-gray-500">Exercise 6</span>

      <h2 className="mt-3 mb-5 text-xl font-semibold">Styling Based on Conditions</h2>

      <label htmlFor="notification-type" className="mb-2 text-sm">
        Select notification type:
      </label>

      <select
        id="notification-type"
        value={type}
        onChange={(event) => setType(event.target.value)}
        className="w-full max-w-64 rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm"
      >
        <option value="success">Success</option>
        <option value="error">Error</option>
        <option value="warning">Warning</option>
      </select>

      <Notification type={type} />
    </section>
  );
};

export default NotificationExample;

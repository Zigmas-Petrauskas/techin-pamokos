import { useState } from 'react';

// Modalinis langas, rodomas pagal isOpen reikšmę.
const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="w-full max-w-md rounded-lg bg-white p-6 text-center shadow-xl"
      >
        <h3 id="modal-title" className="mb-4 text-xl font-semibold">
          Modal Window
        </h3>

        <p className="mb-5 text-gray-600">This is a conditional modal.</p>

        <button
          onClick={onClose}
          className="cursor-pointer rounded-md bg-blue-600 px-5 py-2.5 text-white hover:bg-blue-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

// Modalinio lango atidarymo komponentas.
const ModalExample = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="flex min-h-64 flex-col items-center rounded-lg border border-gray-300 bg-white p-6 text-center">
      <span className="text-sm text-gray-500">Exercise 8</span>

      <h2 className="mt-3 mb-5 text-xl font-semibold">Advanced Component Visibility</h2>

      <button
        onClick={() => setIsOpen(true)}
        className="cursor-pointer rounded-md bg-blue-600 px-5 py-2.5 text-white hover:bg-blue-700"
      >
        Open Modal
      </button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </section>
  );
};

export default ModalExample;

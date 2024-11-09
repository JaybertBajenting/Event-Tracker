// ConfirmModal.tsx

import React from 'react';

interface ConfirmModalProps {
  isOpen: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  message,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-10">
      <div className="bg-white p-4 rounded-md text-center">
        <p>{message}</p>
        <div className="mt-4">
          <button
            className="px-4 py-2 mx-2 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={onConfirm}
          >
            Yes
          </button>
          <button
            className="px-4 py-2 mx-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={onCancel}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;

import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
  cancelButtonText?: string;
  confirmButtonText?: string;
  isLoading?: boolean;
  cp_wa?: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  message,
  cancelButtonText = "Salah",
  confirmButtonText = "Konfirmasi",
  cp_wa,
  isLoading,
}) => {
  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="absolute w-full h-full bg-gray-900 opacity-50"></div>
          <div className="bg-white p-8 rounded shadow-md z-10">
            <p className="mb-6 font-bold text-3xl text-center w-full">
              Konfirmasi
            </p>
            <p className="mb-8">
              <span className="font-bold">{cp_wa}</span> {message}
            </p>
            <div className="flex justify-between gap-12">
              <button
                className="bg-white text-primary w-[50%] py-2 px-4 rounded border-2 border-primary"
                onClick={onClose}
              >
                {cancelButtonText}
              </button>
              <button
                type="submit"
                className="bg-primary text-white w-[50%] py-2 px-4 rounded border-2 border-primary"
                onClick={onConfirm}
              >
                {isLoading ? (
                  <ClipLoader color="#fff" size={10} />
                ) : (
                  confirmButtonText
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConfirmationModal;

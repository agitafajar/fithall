import ClipLoader from "react-spinners/ClipLoader";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  cp_wa: string;
  isLoading: boolean;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  cp_wa,
  isLoading,
}) => {
  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="absolute w-full h-full bg-gray-900 opacity-50"></div>
          <div className="bg-white p-8 rounded shadow-md z-10">
            <p className="mb-4 font-bold text-lg">Konfirmasi Nomor Whatsapp</p>
            <p className="mb-8">
              {cp_wa}, Apakah anda yakin nomor whatsapp anda sudah benar?
            </p>
            <div className="flex justify-between gap-12">
              <button
                className="bg-white text-primary w-[50%] py-2 px-4 rounded border-2 border-primary"
                onClick={onClose}
              >
                Salah
              </button>
              <button
                type="submit"
                className="bg-primary text-white w-[50%] py-2 px-4 rounded border-2 border-primary"
                onClick={onConfirm}
              >
                {isLoading ? "Loading..." : ""}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConfirmationModal;

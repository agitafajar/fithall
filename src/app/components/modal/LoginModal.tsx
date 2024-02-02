/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";

type LoginModalProps = {
  closeModal: () => void;
  registerModal: () => void;
};

const LoginModal: React.FC<LoginModalProps> = ({
  closeModal,
  registerModal,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-md w-[500px]">
        <div className="flex justify-end">
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={closeModal}
          >
            <img src="../assets/png/close-icon.png" />
          </button>
        </div>
        <h2 className="text-2xl font-bold mb-2 text-center">
          Login your accounts here
        </h2>
        <p className="text-sm text-gray-600 mb-6 text-center">
          Please fill in the following data correctly
        </p>
        <form>
          <label className="block mb-6 font-bold text-xs">
            Email:
            <input
              type="email"
              className="border border-gray-300 rounded-md p-3 mt-2 w-full"
              placeholder="Masukkan email anda"
            />
          </label>
          <label className="block mb-8 font-bold text-xs">
            Password:
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="border border-gray-300 rounded-md p-3 mt-2 w-full"
                placeholder="Password"
              />
              <button
                type="button"
                className="absolute top-0 right-0 mt-3 mr-3 cursor-pointer pt-1"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </label>
          <div className="flex flex-col gap-3 font-bold">
            <button
              type="submit"
              className="bg-primary text-white py-2 md:py-3 rounded-md text-sm border-2 border-primary"
            >
              Login
            </button>
            <button
              type="button"
              className="bg-white text-primary border-2 border-primary py-2 md:py-3 rounded-md text-sm"
              onClick={registerModal}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;

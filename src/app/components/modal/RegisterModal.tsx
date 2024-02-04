/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { usePostRegister } from "@/features/users/usePostRegister";
import { useFormik } from "formik";
import React, { useState } from "react";
import { toast } from "sonner";
import * as Yup from "yup";

type LoginModalProps = {
  closeModal: () => void;
  loginModal: () => void;
};

export default function RegisterModal(props: LoginModalProps) {
  const { closeModal, loginModal } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { mutate: postRegisterMutation } = usePostRegister({
    onSuccess: () => {
      closeModal();
      window.location.reload();
      toast.success("Congratulation !", {
        className: "my-classname",
        description: "Register success",
        duration: 3000,
      });
    },
    onError: () => {
      closeModal();
      toast.error("Register failed", {
        className: "my-classname",
        description: "User already exists !",
        duration: 3000,
      });
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevShowPassword) => !prevShowPassword);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Required"),
      name: Yup.string().required("Required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        resetForm();
        setIsLoading(true);
        postRegisterMutation(values);
      } catch (error) {
        alert("Register failed. Please check your credentials and try again.");
      }
    },
  });

  return (
    <>
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
            Create your accounts here
          </h2>
          <p className="text-sm text-gray-600 mb-6 text-center">
            Please fill in the following data correctly
          </p>
          <form onSubmit={formik.handleSubmit}>
            <label className="block mb-6 md:mb-4 font-bold text-xs">
              Full Name:
              {formik.touched.name && formik.errors.name ? (
                <div className="text-red-500 text-xs">{formik.errors.name}</div>
              ) : null}
              <input
                type="text"
                className="border border-gray-300 rounded-md p-3 mt-2 w-full"
                placeholder="Masukkan nama anda"
                {...formik.getFieldProps("name")}
              />
            </label>
            <label className="block mb-6 md:mb-4 font-bold text-xs">
              Email:
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500 text-xs">
                  {formik.errors.email}
                </div>
              ) : null}
              <input
                type="email"
                className="border border-gray-300 rounded-md p-3 mt-2 w-full"
                placeholder="Masukkan email anda"
                {...formik.getFieldProps("email")}
              />
            </label>
            <label className="block mb-8 md:mb-4 font-bold text-xs">
              Password:
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-500 text-xs">
                  {formik.errors.email}
                </div>
              ) : null}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="border border-gray-300 rounded-md p-3 mt-2 w-full"
                  placeholder="Password"
                  {...formik.getFieldProps("password")}
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
            <label className="block mb-8 font-bold text-xs">
              Confirm Password:
              {formik.touched.confirmPassword &&
              formik.errors.confirmPassword ? (
                <div className="text-red-500 text-xs">
                  {formik.errors.confirmPassword}
                </div>
              ) : null}
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="border border-gray-300 rounded-md p-3 mt-2 w-full"
                  placeholder="Confirm Password"
                  {...formik.getFieldProps("confirmPassword")}
                />
                <button
                  type="button"
                  className="absolute top-0 right-0 mt-3 mr-3 cursor-pointer pt-1"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
            </label>
            <div className="flex flex-col gap-3 font-bold">
              <button
                type="submit"
                className={`bg-primary text-white py-2 md:py-3 rounded-md text-sm border-2 border-primary ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isLoading}
              >
                {isLoading ? "Register in..." : "Register"}
              </button>
              <button
                type="button"
                className="bg-white text-primary border-2 border-primary py-2 md:py-3 rounded-md text-sm"
                onClick={loginModal}
              >
                Already have Account? Login here
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

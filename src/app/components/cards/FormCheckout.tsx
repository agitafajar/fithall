// FormComponent.js
"use client";

import useGetProfiles from "@/features/cabang/useGetProfiles";
import { useFormik } from "formik";
import * as Yup from "yup";

const FormCheckout = () => {
  const { data } = useGetProfiles();

  const validationSchema = Yup.object().shape({
    profile: Yup.object().shape({
      nama: Yup.string().required("Nama harus diisi"),
      instansi: Yup.string().required("Instansi harus diisi"),
      cp_wa: Yup.string().required("Nomor Telepon harus diisi"),
      cp_email: Yup.string()
        .email("Email tidak valid")
        .required("Email harus diisi"),
      jenis_kelamin: Yup.string().required("Jenis Kelamin harus diisi"),
    }),
    nama: Yup.string().required("Nama harus diisi"),
    instansi: Yup.string().required("Instansi harus diisi"),
    cp_wa: Yup.string().required("Nomor Telepon harus diisi"),
    cp_email: Yup.string()
      .email("Email tidak valid")
      .required("Email harus diisi"),
    jenis_kelamin: Yup.string().required("Jenis Kelamin harus diisi"),
  });

  const formik = useFormik({
    initialValues: {
      profile: {
        nama: "",
        instansi: "",
        cp_wa: "",
        cp_email: "",
        jenis_kelamin: "laki-laki",
      },
      nama: "",
      instansi: "",
      cp_wa: "",
      cp_email: "",
      jenis_kelamin: "laki-laki",
    },
    validationSchema,
    onSubmit: (values) => {},
  });

  const handleProfileChange = (selectedProfile: any) => {
    if (selectedProfile) {
      // Update formik values manually
      formik.setFieldValue("profile", selectedProfile);
      formik.setFieldValue("nama", selectedProfile.nama);
      formik.setFieldValue("instansi", selectedProfile.instansi || "");
      formik.setFieldValue("cp_wa", selectedProfile.cp_wa || "");
      formik.setFieldValue("cp_email", selectedProfile.cp_email || "");
      formik.setFieldValue(
        "jenis_kelamin",
        selectedProfile.jenis_kelamin || "laki-laki"
      );
    }
  };

  return (
    <form onSubmit={formik.handleSubmit} className="w-full">
      <div className="mb-4">
        <label
          htmlFor="profile"
          className="block text-sm font-medium text-gray-600"
        >
          Profile
        </label>
        <select
          id="profile"
          name="profile"
          onChange={(e) => {
            formik.handleChange(e);
            if (data?.data) {
              const selectedProfile = data.data.find(
                (profile: any) => profile.nama === e.target.value
              );
              handleProfileChange(selectedProfile);
            }
          }}
          onBlur={formik.handleBlur}
          value={formik.values.profile?.nama || ""}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="" disabled>
            Pilih Profile
          </option>
          {data?.data.map((profile: any) => (
            <option key={profile.id} value={profile.nama}>
              {profile.nama}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label
          htmlFor="nama"
          className="block text-sm font-medium text-gray-600"
        >
          Nama
        </label>
        {formik.touched.nama && formik.errors.nama && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.nama}</p>
        )}
        <input
          type="text"
          id="nama"
          name="nama"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.nama}
          className="mt-1 p-2 w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="instansi"
          className="block text-sm font-medium text-gray-600"
        >
          Instansi
        </label>
        {formik.touched.instansi && formik.errors.instansi && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.instansi}</p>
        )}
        <input
          type="text"
          id="instansi"
          name="instansi"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.instansi}
          className="mt-1 p-2 w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="cp_wa"
          className="block text-sm font-medium text-gray-600"
        >
          Nomor Telepon
        </label>
        {formik.touched.cp_wa && formik.errors.cp_wa && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.cp_wa}</p>
        )}
        <div className="mt-1 relative rounded-md shadow-sm">
          <span className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
            +62
          </span>
          <input
            type="text"
            id="cp_wa"
            name="cp_wa"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.cp_wa}
            className="pl-10 pr-2 py-2 w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      <div className="mb-4">
        <label
          htmlFor="cp_email"
          className="block text-sm font-medium text-gray-600"
        >
          Email
        </label>
        {formik.touched.cp_email && formik.errors.cp_email && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.cp_email}</p>
        )}
        <input
          type="email"
          id="cp_email"
          name="cp_email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.cp_email}
          className="mt-1 p-2 w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">
          Jenis Kelamin
        </label>
        {formik.touched.jenis_kelamin && formik.errors.jenis_kelamin && (
          <p className="text-red-500 text-sm mt-1">
            {formik.errors.jenis_kelamin}
          </p>
        )}
        <div className="mt-1 flex items-center space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="jenis_kelamin"
              value="laki-laki"
              checked={formik.values.jenis_kelamin === "Laki-Laki"}
              onChange={formik.handleChange}
              className="form-radio h-4 w-4 text-indigo-600"
            />
            <span className="ml-2">Laki-laki</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="jenis_kelamin"
              value="perempuan"
              checked={formik.values.jenis_kelamin === "Perempuan"}
              onChange={formik.handleChange}
              className="form-radio h-4 w-4 text-indigo-600"
            />
            <span className="ml-2">Perempuan</span>
          </label>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:border-indigo-300"
      >
        Submit
      </button>
    </form>
  );
};

export default FormCheckout;

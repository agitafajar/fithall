// FormComponent.js
import { useFormik } from "formik";

const FormCheckout = () => {
  const formik = useFormik({
    initialValues: {
      profile: "",
      nama: "",
      instansi: "",
      nomorTelepon: "",
      email: "",
      jenisKelamin: "laki-laki",
    },
    onSubmit: (values) => {
      // Handle submission logic here
      console.log(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
      {/* Profile */}
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
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.profile}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          {/* Populate options from API response */}
          {/* Example: <option value="1">Profile 1</option> */}
        </select>
      </div>

      {/* Nama */}
      <div className="mb-4">
        <label
          htmlFor="nama"
          className="block text-sm font-medium text-gray-600"
        >
          Nama
        </label>
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

      {/* Instansi */}
      <div className="mb-4">
        <label
          htmlFor="instansi"
          className="block text-sm font-medium text-gray-600"
        >
          Instansi
        </label>
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

      {/* Nomor Telepon */}
      <div className="mb-4">
        <label
          htmlFor="nomorTelepon"
          className="block text-sm font-medium text-gray-600"
        >
          Nomor Telepon
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <span className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
            +62
          </span>
          <input
            type="text"
            id="nomorTelepon"
            name="nomorTelepon"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.nomorTelepon}
            className="pl-10 pr-2 py-2 w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      {/* Email */}
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-600"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          className="mt-1 p-2 w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      {/* Jenis Kelamin */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">
          Jenis Kelamin
        </label>
        <div className="mt-1 flex items-center space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="jenisKelamin"
              value="laki-laki"
              checked={formik.values.jenisKelamin === "laki-laki"}
              onChange={formik.handleChange}
              className="form-radio h-4 w-4 text-indigo-600"
            />
            <span className="ml-2">Laki-laki</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="jenisKelamin"
              value="perempuan"
              checked={formik.values.jenisKelamin === "perempuan"}
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

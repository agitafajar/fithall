/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";

import useGetCart from "@/features/cabang/useGetCart";
import error from "next/error";
import ErrorPage from "../error";
import LoadingPage from "../loading";
import useGetRemoveCart from "@/features/cabang/useGetRemoveCart";
import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import BookingDetailCard from "../components/cards/BookingDetailCard";
import { formatToCurrency } from "@/lib/formatTimeCurrency";
import ProfileFormCard from "../components/cards/ProfileFormCard";
import EmptyStatePage from "../components/cards/EmptyStateCard";
import FormCheckout from "../components/cards/FormCheckout";
import useGetProfiles from "@/features/cabang/useGetProfiles";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function CheckoutPage() {
  const [isDeleteLoadingMap, setIsDeleteLoadingMap] = useState<{
    [id: string]: boolean;
  }>({});
  const [isGetId, setIsGetId] = useState<string>("");
  const [isAgreed, setIsAgreed] = useState(false);
  let totalSubTotal = 0;
  let totalPajak = 0;
  let totalSubTotalPembayaran = 0;
  const handleCheckboxChange = () => {
    setIsAgreed(!isAgreed);
  };
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
    onSubmit: (values) => {
      // Handle submission logic here
      console.log(values);
    },
  });
  const {
    data: dataCart,
    isLoading: isGetCart,
    error,
    refetch: refetchCart,
  } = useGetCart();
  const listData = dataCart?.data?.cart;

  const { refetch: refetchDataRemove, isLoading: isDeleteLoading } =
    useGetRemoveCart(isGetId);

  const isLoading = isGetCart || isDeleteLoading;

  const handleDeleteItem = async (id: string) => {
    setIsGetId(id);
    setIsDeleteLoadingMap((prevLoadingMap) => ({
      ...prevLoadingMap,
      [id]: true,
    }));

    try {
      await refetchDataRemove();
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsDeleteLoadingMap((prevLoadingMap) => ({
        ...prevLoadingMap,
        [id]: false,
      }));
      refetchCart();
    }
  };

  if (isLoading) {
    return (
      <div>
        <LoadingPage />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <ErrorPage />
      </div>
    );
  }

  console.log(data?.data);

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
      console.log("selectedProfile", selectedProfile);
    }
  };
  return (
    <>
      {listData.length > 0 ? (
        <form className="grid grid-cols-3 gap-3" onSubmit={formik.handleSubmit}>
          <div className="col-span-2 p-6 rounded-lg border-2">
            <p className="mb-4 border-b-2 font-bold text-4xl pb-4">Checkout</p>
            <p className="text-xl font-bold mb-2">Data Perwakilan Pemain</p>
            <div className="rounded-md">
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
                    console.log("Selected value:", e.target.value);
                    formik.handleChange(e);
                    if (data?.data) {
                      const selectedProfile = data.data.find(
                        (profile: any) => profile.nama === e.target.value
                      );
                      console.log("Selected Profile:", selectedProfile);
                      handleProfileChange(selectedProfile);
                    }
                  }}
                  onBlur={formik.handleBlur}
                  value={formik.values.profile?.nama || ""}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md bg-[#F0F1F5]"
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
                  className="block text-sm font-bold text-gray-700"
                >
                  Nama
                </label>
                {formik.touched.nama && formik.errors.nama && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.nama}
                  </p>
                )}
                <input
                  type="text"
                  id="nama"
                  name="nama"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.nama}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md bg-[#F0F1F5]"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="instansi"
                  className="block text-sm font-bold text-gray-700"
                >
                  Instansi
                </label>
                {formik.touched.instansi && formik.errors.instansi && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.instansi}
                  </p>
                )}
                <input
                  type="text"
                  id="instansi"
                  name="instansi"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.instansi}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md bg-[#F0F1F5]"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="cp_wa"
                  className="block text-sm font-bold text-gray-700"
                >
                  Nomor WA
                </label>
                {formik.touched.cp_wa && formik.errors.cp_wa && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.cp_wa}
                  </p>
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
                    className="pl-12 mt-1 p-2 block w-full border border-gray-300 rounded-md bg-[#F0F1F5]"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="cp_email"
                  className="block text-sm font-bold text-gray-700"
                >
                  Email
                </label>
                {formik.touched.cp_email && formik.errors.cp_email && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.cp_email}
                  </p>
                )}
                <input
                  type="email"
                  id="cp_email"
                  name="cp_email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.cp_email}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md bg-[#F0F1F5]"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-bold text-gray-700">
                  Jenis Kelamin
                </label>
                {formik.touched.jenis_kelamin &&
                  formik.errors.jenis_kelamin && (
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
            </div>
          </div>
          <div className="col-span-1 bg-[#F7F7FC] p-6">
            <p className="font-bold text-xl text-center mb-2">Detail Booking</p>
            <p className="text-{#7B8794] text-sm text-center pb-6 border-b-2">
              Pastikan booking yang anda lakukan sudah benar
            </p>
            <div className="my-6 border-b-2 pb-6">
              {listData.map((bookingItem: any) => {
                const full_name = bookingItem.booking.lapangan.full_name;
                const pretty_date = bookingItem.booking.pretty_date;
                const harga_visit = bookingItem.booking.harga_visit;
                const id = bookingItem.booking_id;
                const subTotal =
                  (harga_visit * listData.length) / listData.length;
                const pajak = (0.76 / 100) * subTotal;
                const subPembayaran = subTotal + pajak;

                totalSubTotal += subTotal;
                totalPajak += pajak;
                totalSubTotalPembayaran += subPembayaran;

                return (
                  <div
                    key={bookingItem.booking.id}
                    className="mb-4 flex justify-between items-center"
                  >
                    <BookingDetailCard
                      key={bookingItem.booking.id}
                      full_name={bookingItem.booking.lapangan.full_name}
                      pretty_date={bookingItem.booking.pretty_date}
                      harga_visit={bookingItem.booking.harga_visit}
                      id={bookingItem.booking_id}
                      isDeleteLoading={
                        isDeleteLoadingMap[bookingItem.booking_id]
                      }
                      onDelete={handleDeleteItem}
                    />
                  </div>
                );
              })}
            </div>
            <div className="my-6 border-b-2 pb-6">
              <div className="flex justify-between mb-4">
                <p>Sub Total</p>
                <p className="font-bold">{formatToCurrency(totalSubTotal)}</p>
              </div>

              <div className="flex justify-between">
                <p>Biaya QRIS + Pajak (0,76%)</p>
                <p className="font-bold">{formatToCurrency(totalPajak)}</p>
              </div>
            </div>
            <div className="flex justify-between">
              <p>Total Pembayaran</p>
              <p className="font-bold">
                {formatToCurrency(totalSubTotalPembayaran)}
              </p>
            </div>
            <div className="my-4 flex">
              <input
                type="checkbox"
                id="agreeCheckbox"
                checked={isAgreed}
                onChange={handleCheckboxChange}
                className="mr-2 w-6"
              />
              <label
                htmlFor="agreeCheckbox"
                className=" text-gray-700 flex flex-col"
              >
                Saya setuju dengan tata tertib yang berlaku
                <p className="text-xs text-[#7B8794]">Detail Tata Tertib</p>
              </label>
            </div>
            <div className="my-6 pb-2">
              <button
                type="submit"
                className={`bg-primary mb-4 text-white py-2 md:py-3 rounded-md text-sm border-2 border-primary w-full font-semibold ${
                  !isAgreed && "opacity-50 cursor-not-allowed"
                }`}
                disabled={!isAgreed}
              >
                {isLoading ? "Submitting..." : "Proses Pembayaran"}
              </button>
              <div className="flex gap-2 items-center mt-4 text-sm">
                <img src="../assets/png/info-checkout.png" />
                <p>
                  Ini halaman terakhir dari proses pembelianmu. Pastikan semua
                  sudah benar ya.
                </p>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <EmptyStatePage
          imageUrl="../assets/png/empty-state-cart.png"
          title="The cart is empty"
          text="Please make a reservation firsl"
          linkTo="/"
          linkText="Back to Home"
        />
      )}
    </>
  );
}

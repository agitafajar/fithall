/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";

import useGetCart from "@/features/cabang/useGetCart";
import ErrorPage from "../error";
import LoadingPage from "../loading";
import { useEffect, useState } from "react";
import BookingDetailCard from "../components/cards/BookingDetailCard";
import { formatToCurrency } from "@/lib/formatTimeCurrency";
import EmptyStatePage from "../components/cards/EmptyStateCard";
import useGetProfiles from "@/features/cabang/useGetProfiles";
import { useFormik } from "formik";
import * as Yup from "yup";
import ConfirmationModal from "../components/modal/ConfirmationModal";
import axiosInstance from "@/lib/axios";
import { useRouter } from "next/navigation";
import useGetUser from "@/features/users/useGetUser";
import Cookies from "js-cookie";
import MemberBookingDetailCard from "../components/cards/MemberBookingDetailCard";
import TncCheckoutModal from "../components/modal/TncCheckoutModal";

export default function CheckoutPage() {
  const [isDeleteLoadingMap, setIsDeleteLoadingMap] = useState<{
    [id: string]: boolean;
  }>({});
  const [isAgreed, setIsAgreed] = useState(false);
  let totalSubTotal = 0;
  let totalPajak = 0;
  let totalSubTotalPembayaran = 0;
  const handleCheckboxChange = () => {
    setIsAgreed(!isAgreed);
  };
  const { data } = useGetProfiles();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isTncModalOpen, setTncModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [namafield, setNamafield] = useState("");
  const [emailfield, setEmailfield] = useState("");
  const [jeniskelamin, setJeniskelamin] = useState("");
  const [instansifield, setInstansifield] = useState("");
  const [nomorwa, setNomorwa] = useState("");
  let prosesBayar = false;
  let cart: never[] = [];
  const router = useRouter();
  const { data: dataUser } = useGetUser();
  const isGuest = dataUser?.data.id === 2;

  const getCurrentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const validationSchema = Yup.object().shape({
    profile: Yup.object(),
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
      prosesBayar = true;
      setNamafield(values.nama);
      setEmailfield(values.cp_email);
      setJeniskelamin(values.jenis_kelamin);
      setInstansifield(values.instansi);

      axiosInstance.post("/booking/validate").then((response) => {
        if (!response.data.status) {
          if (response.data.status === false) {
            const formattedNumber = formik.values.cp_wa.replace(/^\+62/, "");
            setNomorwa(formattedNumber);
            setModalOpen(true);
          }
        }
      });
    },
  });
  const {
    data: dataCart,
    isLoading: isGetCart,
    refetch: refetchCart,
    error,
  } = useGetCart();
  const listData = dataCart?.data?.cart;

  useEffect(() => {
    refetchCart();
  }, [refetchCart]);

  const handleDeleteItem = async (id: string) => {
    setIsDeleteLoadingMap((prevLoadingMap) => ({
      ...prevLoadingMap,
      [id]: true,
    }));

    try {
      const token = Cookies.get("token");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      await axiosInstance.get(`/remove-cart/${id}`, {
        headers,
      });
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

  if (isGetCart) {
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

  const handleProfileChange = (selectedProfile: any) => {
    if (selectedProfile) {
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

  const closeModal = () => {
    setModalOpen(false);
  };

  const closeTncModal = () => {
    setTncModalOpen(false);
  };

  const confirmAction = () => {
    setIsLoading(true);
    const formattedNumber = formik.values.cp_wa.replace(/^\+62/, "");
    axiosInstance
      .post("/invoice/generate-payment", {
        member_id: "",
        profile: {
          cp_email: emailfield,
          cp_wa: `+62${formattedNumber}`,
          instansi: instansifield,
          jenis_kelamin: jeniskelamin,
          nama: namafield,
        },
        tanggal_invoice: getCurrentDateTime(),
      })
      .then((response) => {
        setIsLoading(true);
        cart = response.data || [];
        if (response.data) {
          let invoiceid = response.data.uuid;
          cart = response.data;
          router.push("/invoice/" + invoiceid);
        } else {
          alert(
            "Anda sudah terdaftar dalam waiting list, kami akan segera menghubungi whatsapp anda untuk kabar terbaru. Terima kasih Waiting List"
          );
          router.push(`/`);
        }
      })
      .catch((error: any) => {
        // Handle error if needed
        console.error("Error in postGeneratePaymentMutation:", error);
      });
  };

  return (
    <>
      {listData.length > 0 ? (
        <form
          className="gap-3 sm:flex md:grid lg:grid xl:grid sm:flex-col md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3"
          onSubmit={formik.handleSubmit}
        >
          <div className="col-span-2 p-6 rounded-lg border-2">
            <p className="mb-4 border-b-2 font-bold text-4xl pb-4">Checkout</p>
            <p className="text-xl font-bold mb-2">Data Perwakilan Pemain</p>
            <div className="rounded-md">
              {isGuest ? (
                ""
              ) : (
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
              )}

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
                      value="Laki-Laki"
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
                      value="Perempuan"
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
                const harga_visit = bookingItem.booking.harga_visit;
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
                    {!dataCart?.data?.member || isGuest ? (
                      <BookingDetailCard
                        key={bookingItem.booking.id}
                        full_name={bookingItem.booking.lapangan.full_name}
                        pretty_date={bookingItem.booking.pretty_date}
                        harga_visit={bookingItem.booking.harga_visit}
                        id={bookingItem.booking_id}
                        status={
                          bookingItem.booking.status === "ORDER"
                            ? "WAITING LIST"
                            : ""
                        }
                        isDeleteLoading={
                          isDeleteLoadingMap[bookingItem.booking_id]
                        }
                        onDelete={handleDeleteItem}
                      />
                    ) : (
                      <MemberBookingDetailCard
                        key={bookingItem.booking.id}
                        full_name={bookingItem.booking.lapangan.full_name}
                        pretty_date={bookingItem.booking.pretty_date}
                        harga_visit={bookingItem.booking.harga_visit}
                        harga_member={
                          bookingItem.booking.harga_member
                            ? bookingItem.booking.harga_member
                            : ""
                        }
                        id={bookingItem.booking_id}
                        status={
                          bookingItem.booking.status === "ORDER"
                            ? "WAITING LIST"
                            : ""
                        }
                        isDeleteLoading={
                          isDeleteLoadingMap[bookingItem.booking_id]
                        }
                        onDelete={handleDeleteItem}
                      />
                    )}
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
                <p
                  className="underline underline-offset-2 text-xs text-[#7B8794] cursor-pointer"
                  onClick={() => {
                    setTncModalOpen(true);
                  }}
                >
                  Lihat Tata Tertib
                </p>
              </label>
            </div>
            <div className="my-6 pb-2">
              {isGuest ? (
                <button
                  className={`bg-white mb-4 text-primary py-2 md:py-3 rounded-md text-sm border-2 border-primary w-full font-semibold `}
                  onClick={() => {
                    alert("Silahkan Login Dulu");
                  }}
                >
                  {isLoading ? "Submitting..." : "Login First"}
                </button>
              ) : (
                <button
                  type="submit"
                  className={`bg-primary mb-4 text-white py-2 md:py-3 rounded-md text-sm border-2 border-primary w-full font-semibold ${
                    (!formik.isValid || !isAgreed) &&
                    "opacity-50 cursor-not-allowed"
                  }`}
                  disabled={!formik.isValid || !isAgreed}
                >
                  {isLoading ? "Submitting..." : "Proses Pembayaran"}
                </button>
              )}

              <div className="flex gap-2 items-center mt-4 text-sm">
                <img src="../assets/svg/icon_info-checkout.svg" />
                <p>
                  Ini halaman terakhir dari proses pembelianmu. Pastikan semua
                  sudah benar ya.
                </p>
              </div>
            </div>
            <ConfirmationModal
              cp_wa={nomorwa}
              isOpen={isModalOpen}
              onClose={closeModal}
              onConfirm={confirmAction}
              isLoading={isLoading}
              cancelButtonText="Batalkan"
              confirmButtonText="Konfirmasi"
              message={"Apakah Anda yakin nomor Whatsapp Anda sudah benar"}
            />
            <TncCheckoutModal isOpen={isTncModalOpen} onClose={closeTncModal} />
          </div>
        </form>
      ) : (
        <div className="flex flex-col gap-12 md:gap-8 items-center">
              <div role="alert" className="relative flex px-4 py-4 text-base text-white bg-orange-500 rounded-lg font-regular">
                <div className="shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                    stroke="currentColor" className="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z">
                    </path>
                  </svg>
                </div>
                <div className="ml-3 mr-12">Item yang sudah Anda pesan, dapat dibuka lagi via Link Invoice yang dikirim ke WA Anda.</div>
              </div>
            <EmptyStatePage
              imageUrl="../assets/svg/img_empty-state-cart.svg"
              title="The cart is empty"
              text="Please make a reservation first"
              linkTo="/"
              linkText="Back to Home"
            />
        </div>
      )}
    </>
  );
}

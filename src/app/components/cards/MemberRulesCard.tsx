import React from "react";

export const MemberRulesCard = () => {
  return (
    <div className="max-w-3xl mb-12">
      <p className="text-2xl font-bold pb-4 border-b-2 mb-4">
        Peraturan Member
      </p>
      <div className="mb-4">
        <ol className="list-decimal pl-6">
          <li>
            Jadwal akan ter-book selama x bulan sesuai yang di inputkan pada
            form. Minimal 1 bulan maksimal 3 bulan setiap minggunya sesuai pada
            jadwal yang dipilihkan pada form.
          </li>
          <li>
            Apabila jadwal yang dipilih tidak available atau sudah terbook, maka
            member tetap tidak akan mendapatkan jadwal tersebut.
          </li>
          <li>
            Member diberi kesempatan maksimal 3 bulan untuk menjadi member
            aktif.
          </li>
          <li>
            Di bulan ke-4 akan dikenakan tarif progresif sebesar banyaknya
            waiting list yang booking di hari dan jam yang sama.
          </li>
          <h3 className="text-xl font-bold mt-4">
            Tarif Progresif (Bulan ke-4)
          </h3>
          <ul className="list-disc pl-6 mt-2">
            <li>Waiting list 1 - 5: Kenaikan 10%</li>
            <li>Waiting list 6 - 8: Kenaikan 15%</li>
            <li>Waiting list 9: Kenaikan 20%</li>
          </ul>
          <li>
            Apabila di bulan ke-4 tidak ada yang mengklik waiting, maka harga
            tetap normal sesuai dengan harga member.
          </li>
          <li>
            Harga progresif hanya berlaku jika di jadwal yang sama ada waiting
            list.
          </li>
        </ol>
      </div>
    </div>
  );
};

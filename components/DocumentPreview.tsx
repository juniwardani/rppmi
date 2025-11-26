
import React from 'react';
import { RPPData, GeneratedContent } from '../types';

interface DocumentPreviewProps {
  data: RPPData;
  content: GeneratedContent;
}

export const DocumentPreview: React.FC<DocumentPreviewProps> = ({ data, content }) => {
  // Format date for display
  const formattedDate = data.tanggal ? new Date(data.tanggal).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric'
  }) : '......................';

  return (
    <div className="bg-white mx-auto shadow-2xl print:shadow-none print:w-full">
      {/* 
        F4 Paper Simulation 
        Size: 215mm x 330mm
        Padding: 3cm (approx 30mm)
      */}
      <div className="w-[215mm] min-h-[330mm] bg-white p-[30mm] mx-auto text-black font-serif text-[12pt] leading-snug">
        
        {/* Header */}
        <div className="text-center font-bold mb-6">
          <p className="text-lg uppercase">Rencana Pelaksanaan Pembelajaran (RPP)</p>
          <p className="text-lg uppercase">MIS Al Muslimun</p>
        </div>

        {/* Meta Data Table - Using flex for alignment */}
        <div className="mb-4">
          <table className="w-full border-collapse border-none">
            <tbody>
              <tr>
                <td className="w-[220px] align-top py-0.5">Mata Pelajaran</td>
                <td className="w-[10px] align-top py-0.5">:</td>
                <td className="align-top py-0.5 font-bold">{data.mataPelajaran}</td>
              </tr>
              <tr>
                <td className="align-top py-0.5">Fase/Kelas</td>
                <td className="align-top py-0.5">:</td>
                <td className="align-top py-0.5">{data.faseKelas}</td>
              </tr>
              <tr>
                <td className="align-top py-0.5">Materi Pokok</td>
                <td className="align-top py-0.5">:</td>
                <td className="align-top py-0.5">{data.materiPokok}</td>
              </tr>
              <tr>
                <td className="align-top py-0.5">Tema Kurikulum Berbasis Cinta</td>
                <td className="align-top py-0.5">:</td>
                <td className="align-top py-0.5">
                  {data.temaKBC.length > 0 ? data.temaKBC.join(", ") : "-"}
                </td>
              </tr>
              <tr>
                <td className="align-top py-0.5">Materi Insersi</td>
                <td className="align-top py-0.5">:</td>
                <td className="align-top py-0.5">
                   <ul className="list-none m-0 p-0">
                    {content.materiInsersi.map((item, idx) => (
                      <li key={idx}>- {item}</li>
                    ))}
                   </ul>
                </td>
              </tr>
              <tr>
                <td className="align-top py-0.5">Alokasi Waktu</td>
                <td className="align-top py-0.5">:</td>
                <td className="align-top py-0.5">{data.alokasiWaktu}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Section A: Tujuan */}
        <div className="mb-4">
          <h3 className="font-bold mb-1">A. Tujuan Pembelajaran</h3>
          <ul className="list-disc pl-5 mb-2 space-y-1">
            {content.tujuanPembelajaran.map((item, idx) => (
              <li key={idx} className="text-justify pl-1">{item}</li>
            ))}
          </ul>
        </div>

        {/* Section B: IKTP (New) */}
        <div className="mb-4">
          <h3 className="font-bold mb-1">B. Indikator Ketercapaian Tujuan Pembelajaran (IKTP)</h3>
           <ul className="list-disc pl-5 mb-2 space-y-1">
            {content.iktp.map((item, idx) => (
              <li key={idx} className="text-justify pl-1">{item}</li>
            ))}
          </ul>
        </div>

        {/* Section C: Kegiatan (Was B) */}
        <div className="mb-4">
          <h3 className="font-bold mb-1">C. Kegiatan Pembelajaran</h3>
          <div className="mb-1"><span className="font-bold">Model :</span> {content.modelPembelajaran}</div>

          <div className="ml-0 mt-2">
            <h4 className="font-bold">1. Pendahuluan (10 menit)</h4>
            <ul className="list-disc pl-5 mb-2 space-y-1">
              {content.pendahuluan.map((item, idx) => (
                <li key={idx} className="text-justify pl-1">{item}</li>
              ))}
            </ul>

            <h4 className="font-bold mt-3">2. Kegiatan Inti (... menit)</h4>
            <div className="pl-0 space-y-2 mt-1">
               {/* Dynamic Steps rendering based on Model */}
               {content.kegiatanInti.map((step, idx) => (
                 <div key={idx} className="flex flex-col sm:flex-row">
                    <span className="font-bold w-[180px] flex-shrink-0 mb-1 sm:mb-0">{step.tahap} :</span>
                    <span className="text-justify">{step.kegiatan}</span>
                 </div>
               ))}
            </div>

            <h4 className="font-bold mt-3">3. Penutup (10 menit)</h4>
            <ul className="list-disc pl-5 mb-2 space-y-1">
              {content.penutup.map((item, idx) => (
                <li key={idx} className="text-justify pl-1">{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Section D: Asesmen (Was C) */}
        <div className="mb-8">
          <h3 className="font-bold mb-1">D. Asesmen dan Evaluasi</h3>
          
          <div className="ml-0">
             <h4 className="font-bold mt-2">1. Asesmen Formatif</h4>
             <ul className="list-disc pl-5 mb-1 space-y-1">
              {content.asesmenFormatif.map((item, idx) => (
                <li key={idx} className="text-justify pl-1">{item}</li>
              ))}
            </ul>

            <h4 className="font-bold mt-2">2. Asesmen Sumatif</h4>
             <ul className="list-disc pl-5 mb-1 space-y-1">
              {content.asesmenSumatif.map((item, idx) => (
                <li key={idx} className="text-justify pl-1">{item}</li>
              ))}
            </ul>

            <h4 className="font-bold mt-2">3. Asesmen Sikap</h4>
             <ul className="list-disc pl-5 mb-1 space-y-1">
              {content.asesmenSikap.map((item, idx) => (
                <li key={idx} className="text-justify pl-1">{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Signature */}
        <div className="flex justify-between mt-10 break-inside-avoid">
          <div className="text-center w-1/3">
             <p className="mb-20">Mengetahui,<br/>Kepala Madrasah</p>
             <p className="font-bold underline">AHMAD HUSSAINI, S.Pd.I</p>
          </div>
          <div className="text-center w-1/3">
             <p className="mb-20">Kotabaru, {formattedDate}<br/>Guru Mata Pelajaran</p>
             <p className="font-bold underline">{data.namaGuru || "................................"}</p>
          </div>
        </div>

      </div>
    </div>
  );
};

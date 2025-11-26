
import React from 'react';
import { RPPData, SubjectOptions, ClassOptions, ThemeKBCOptions, LearningModelOptions, TeacherNames, ClassToTeacherMap, ModelDescriptions } from '../types';

interface InputFormProps {
  data: RPPData;
  onChange: (field: keyof RPPData, value: any) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

export const InputForm: React.FC<InputFormProps> = ({ data, onChange, onGenerate, isGenerating }) => {
  const inputClass = "w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 font-sans text-sm";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1 font-sans";

  const handleThemeChange = (theme: string, isChecked: boolean) => {
    const currentThemes = [...data.temaKBC];
    if (isChecked) {
      currentThemes.push(theme);
    } else {
      const index = currentThemes.indexOf(theme);
      if (index > -1) {
        currentThemes.splice(index, 1);
      }
    }
    onChange('temaKBC', currentThemes);
  };

  const handleClassChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedClass = e.target.value;
    onChange('faseKelas', selectedClass);
    
    // Auto-select teacher based on class
    if (ClassToTeacherMap[selectedClass]) {
      onChange('namaGuru', ClassToTeacherMap[selectedClass]);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto print:hidden">
      <h2 className="text-xl font-bold text-green-800 mb-6 border-b pb-2">Input Data RPP</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className={labelClass}>Mata Pelajaran</label>
          <select 
            value={data.mataPelajaran} 
            onChange={(e) => onChange('mataPelajaran', e.target.value)}
            className={inputClass}
          >
            <option value="">Pilih Mata Pelajaran</option>
            {Object.values(SubjectOptions).map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass}>Fase / Kelas</label>
          <select 
            value={data.faseKelas} 
            onChange={handleClassChange}
            className={inputClass}
          >
            <option value="">Pilih Fase/Kelas</option>
            {Object.values(ClassOptions).map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-4">
        <label className={labelClass}>Materi Pokok</label>
        <input 
          type="text" 
          value={data.materiPokok} 
          onChange={(e) => onChange('materiPokok', e.target.value)}
          placeholder="Contoh: Penjumlahan Bilangan Cacah / Rukun Islam"
          className={inputClass}
        />
      </div>
      
      <div className="mb-4">
        <label className={labelClass}>Model Pembelajaran</label>
        <select 
          value={data.modelPembelajaran} 
          onChange={(e) => onChange('modelPembelajaran', e.target.value)}
          className={inputClass}
        >
          <option value="">Pilih Model Pembelajaran</option>
          {Object.values(LearningModelOptions).map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        {data.modelPembelajaran && ModelDescriptions[data.modelPembelajaran] && (
          <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded text-sm text-blue-800">
            <span className="font-semibold">Info Model:</span> {ModelDescriptions[data.modelPembelajaran]}
          </div>
        )}
      </div>

      <div className="mb-4">
        <label className={labelClass}>Tema Kurikulum Berbasis Cinta (Boleh pilih lebih dari satu)</label>
        <div className="bg-gray-50 p-3 rounded-md border border-gray-200 grid grid-cols-1 sm:grid-cols-2 gap-2">
          {Object.values(ThemeKBCOptions).map((opt) => (
            <label key={opt} className="flex items-center space-x-2 cursor-pointer">
              <input 
                type="checkbox" 
                checked={data.temaKBC.includes(opt)}
                onChange={(e) => handleThemeChange(opt, e.target.checked)}
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700">{opt}</span>
            </label>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-1">Pilih nilai cinta yang akan diintegrasikan.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className={labelClass}>Alokasi Waktu</label>
          <input 
            type="text" 
            value={data.alokasiWaktu} 
            onChange={(e) => onChange('alokasiWaktu', e.target.value)}
            placeholder="Contoh: 2 x 35 Menit"
            className={inputClass}
          />
        </div>
        <div>
           <label className={labelClass}>Nama Guru</label>
           <select
            value={data.namaGuru}
            onChange={(e) => onChange('namaGuru', e.target.value)}
            className={inputClass}
           >
             <option value="">Pilih Guru</option>
             {TeacherNames.map((name) => (
               <option key={name} value={name}>{name}</option>
             ))}
           </select>
           <p className="text-xs text-gray-500 mt-1">Otomatis menyesuaikan kelas, dapat diubah manual.</p>
        </div>
      </div>

       <div className="mb-6">
          <label className={labelClass}>Tanggal RPP</label>
          <input 
            type="date" 
            value={data.tanggal} 
            onChange={(e) => onChange('tanggal', e.target.value)}
            className={inputClass}
          />
        </div>

      <button
        onClick={onGenerate}
        disabled={isGenerating || !data.mataPelajaran || !data.materiPokok || data.temaKBC.length === 0}
        className={`w-full py-3 px-4 rounded-md text-white font-medium flex items-center justify-center gap-2
          ${isGenerating || !data.mataPelajaran || !data.materiPokok || data.temaKBC.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 shadow-lg transform active:scale-95 transition-all'}`}
      >
        {isGenerating ? (
          <>
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Sedang Membuat RPP...</span>
          </>
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
            </svg>
            <span>Buat RPP Otomatis</span>
          </>
        )}
      </button>
    </div>
  );
};
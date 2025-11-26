
import React, { useState } from 'react';
import { InputForm } from './components/InputForm';
import { DocumentPreview } from './components/DocumentPreview';
import { generateRPPContent } from './services/geminiService';
import { generateDocx } from './services/docxService';
import { RPPData, GeneratedContent, LearningModelOptions, SemesterOptions } from './types';

function App() {
  const [formData, setFormData] = useState<RPPData>({
    mataPelajaran: '',
    faseKelas: '',
    semester: SemesterOptions.GANJIL,
    materiPokok: '',
    temaKBC: [],
    modelPembelajaran: LearningModelOptions.PBL,
    alokasiWaktu: '2 x 35 Menit',
    namaGuru: '',
    tanggal: new Date().toISOString().split('T')[0]
  });

  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (field: keyof RPPData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError(null);
    try {
      const content = await generateRPPContent(formData);
      setGeneratedContent(content);
    } catch (err) {
      setError("Gagal membuat RPP. Silakan coba lagi atau periksa koneksi internet Anda.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadDocx = async () => {
    if (!generatedContent) return;
    
    try {
        const blob = await generateDocx(formData, generatedContent);
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `RPP_${formData.mataPelajaran.replace(/\s+/g, '_')}_${formData.faseKelas.replace(/[\/\s]+/g, '_')}.docx`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    } catch (e) {
        console.error("Error creating docx", e);
        setError("Gagal membuat file DOCX.");
    }
  };

  const handleReset = () => {
    setGeneratedContent(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col font-sans">
      
      {/* Navbar / Header - Hidden on Print */}
      <header className="bg-green-700 text-white shadow-lg print:hidden sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
             <div className="bg-white text-green-700 font-serif font-bold h-10 w-10 flex items-center justify-center rounded-full text-xl">M</div>
             <div>
               <h1 className="text-xl font-bold">RPP Generator</h1>
               <p className="text-xs text-green-200">MIS Al Muslimun - Kurikulum Berbasis Cinta</p>
             </div>
          </div>
          {generatedContent && (
             <div className="flex gap-2">
                <button 
                  onClick={handleReset}
                  className="px-4 py-2 bg-green-800 rounded hover:bg-green-900 transition-colors text-sm"
                >
                  Edit Data
                </button>
                <button 
                  onClick={handleDownloadDocx}
                  className="px-4 py-2 bg-white text-green-700 font-bold rounded hover:bg-gray-100 transition-colors flex items-center gap-2 shadow-sm"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Download .docx
                </button>
             </div>
          )}
        </div>
      </header>

      <main className="flex-grow p-4 md:p-8">
        {!generatedContent ? (
          <div className="max-w-4xl mx-auto">
            <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6 rounded shadow-sm print:hidden">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-green-700">
                    Masukkan detail pelajaran di bawah ini.
                  </p>
                </div>
              </div>
            </div>
            
            <InputForm 
              data={formData} 
              onChange={handleInputChange} 
              onGenerate={handleGenerate} 
              isGenerating={isGenerating} 
            />

            {error && (
               <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md border border-red-300 max-w-2xl mx-auto text-center">
                 {error}
               </div>
            )}
          </div>
        ) : (
          <div className="animate-fade-in">
             <div className="max-w-[230mm] mx-auto mb-6 print:hidden flex justify-between items-center">
               <h2 className="text-lg font-bold text-gray-700">Preview Dokumen</h2>
               <div className="text-sm text-gray-500 italic">
                 Silakan periksa preview di bawah sebelum mengunduh file Word.
               </div>
             </div>
             
             {/* The Actual Document */}
             <DocumentPreview data={formData} content={generatedContent} />
             
             <div className="max-w-[210mm] mx-auto mt-8 text-center print:hidden pb-10">
                <button 
                  onClick={handleDownloadDocx}
                  className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105 flex items-center justify-center gap-2 mx-auto"
                >
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Download File .docx
                </button>
             </div>
          </div>
        )}
      </main>
      
      <footer className="bg-gray-800 text-gray-300 py-6 text-center text-sm print:hidden">
        <p>&copy; {new Date().getFullYear()} MIS Al Muslimun. Sistem Pembuat RPP Otomatis.</p>
      </footer>
    </div>
  );
}

export default App;


import { GoogleGenAI, Type, Schema } from "@google/genai";
import { RPPData, GeneratedContent } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const rppSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    materiInsersi: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Generate 2-3 specific 'Materi Insersi' values that combine the Topic and the selected 'Tema KBC'.",
    },
    tujuanPembelajaran: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "List of 2-3 specific learning objectives, strictly appropriate for the selected Phase/Class and Topic.",
    },
    iktp: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "List of indicators for achieving the objectives (IKTP), using Operational Verbs appropriate for the Phase.",
    },
    modelPembelajaran: {
      type: Type.STRING,
      description: "The learning model used (matches the user selection).",
    },
    pendahuluan: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "List of activities in the introduction phase, setting a warm/loving atmosphere.",
    },
    kegiatanInti: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          tahap: { type: Type.STRING, description: "Nama tahapan/sintaks RESMI sesuai Model Pembelajaran yang dipilih." },
          kegiatan: { type: Type.STRING, description: "Deskripsi aktivitas mendetail yang menggabungkan Topik, Sintaks Model, dan Penerapan Nilai Cinta (Tema KBC)." }
        },
        required: ["tahap", "kegiatan"]
      },
      description: "Langkah-langkah kegiatan inti yang MENGIKUTI SINTAKS RESMI Model Pembelajaran yang dipilih.",
    },
    penutup: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "List of activities in the closing phase, including reflection on values.",
    },
    asesmenFormatif: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Specific formative assessment methods for this topic.",
    },
    asesmenSumatif: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Specific summative assessment methods for this topic.",
    },
    asesmenSikap: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Attitude assessments specifically observing the selected 'Tema KBC'.",
    },
  },
  required: ["materiInsersi", "tujuanPembelajaran", "iktp", "modelPembelajaran", "pendahuluan", "kegiatanInti", "penutup", "asesmenFormatif", "asesmenSumatif", "asesmenSikap"],
};

export const generateRPPContent = async (data: RPPData): Promise<GeneratedContent> => {
  const prompt = `
    Peran: Anda adalah pakar kurikulum di MIS Al Muslimun yang menyusun RPP Kurikulum Merdeka dengan pendekatan khas "Kurikulum Berbasis Cinta".

    Tugas: Susun konten RPP yang SANGAT SPESIFIK, KOHEREN (NYAMBUNG), dan TERINTEGRASI berdasarkan data berikut:
    
    === DATA UTAMA ===
    1. Mata Pelajaran: ${data.mataPelajaran}
    2. Fase/Kelas: ${data.faseKelas}
    3. Materi Pokok: ${data.materiPokok}
    4. Tema Kurikulum Berbasis Cinta (KBC): [${data.temaKBC.join(", ")}]
    5. Model Pembelajaran: ${data.modelPembelajaran}
    
    === INSTRUKSI PENYUSUNAN KONTEN PER BAGIAN ===

    A. TUJUAN PEMBELAJARAN & IKTP (Point A & B):
       - Rumuskan tujuan yang spesifik membahas Mata Pelajaran "${data.mataPelajaran}" pada materi "${data.materiPokok}" .
       - Sesuaikan kedalaman materi dan KKO (Kata Kerja Operasional) dengan Fase ${data.faseKelas}.
       - IKTP harus menurunkan tujuan tersebut menjadi indikator yang dapat diamati.

    B. KEGIATAN PEMBELAJARAN (Point C):
       - Pendahuluan: Ciptakan suasana kelas yang hangat (Greeting, Doa) sesuai kultur MIS Al Muslimun.
       - Kegiatan Inti (SANGAT PENTING): 
         1. WAJIB menggunakan langkah-langkah/sintaks resmi dari "${data.modelPembelajaran}". Jangan gunakan sintaks model lain.
         2. Isi kegiatan harus KONKRET membahas mata pelajaran "${data.mataPelajaran}" materi "${data.materiPokok}" untuk peserta didik pada fase "${data.faseKelas}" Jangan buat kalimat umum seperti "Guru menjelaskan materi". Ganti dengan "Guru menjelaskan tentang [konsep materi pokok]...".
         3. INTEGRASI TEMA KBC: Selipkan penerapan nilai [${data.temaKBC.join(", ")}] dalam interaksi.
            - Contoh integrasi "Cinta Ilmu": "Siswa didorong untuk bertanya dengan antusias..."
            - Contoh integrasi "Cinta Lingkungan": "Siswa menjaga kebersihan area belajar saat mengerjakan proyek..."
            - Contoh integrasi "Cinta Diri dan Sesama": "Siswa berdiskusi dengan saling menghargai pendapat..."
       - Penutup: Refleksi materi dan penguatan kembali nilai-nilai Cinta yang telah dipraktikkan.

    C. MATERI INSERSI:
       - Tuliskan 2-3 poin nilai sikap spesifik dari [${data.temaKBC.join(", ")}] yang sangat relevan dengan materi "${data.materiPokok}" untuk fase "${data.faseKelas}".

    D. ASESMEN DAN EVALUASI (Point D):
       - Asesmen Formatif & Sumatif: Harus mengukur pemahaman siswa terhadap "${data.materiPokok}".
       - Asesmen Sikap: Harus secara spesifik mengobservasi kemunculan perilaku terkait [${data.temaKBC.join(", ")}].

    Format output wajib JSON valid sesuai schema. Gunakan Bahasa Indonesia yang baku, operasional, namun bernuansa pendidikan yang ramah.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: rppSchema,
        temperature: 0.7,
      },
    });

    if (response.text) {
      return JSON.parse(response.text) as GeneratedContent;
    } else {
      throw new Error("No response text generated");
    }
  } catch (error) {
    console.error("Error generating RPP:", error);
    throw error;
  }
};

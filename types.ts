
export interface RPPData {
  mataPelajaran: string;
  faseKelas: string;
  materiPokok: string;
  temaKBC: string[];
  modelPembelajaran: string;
  alokasiWaktu: string;
  namaGuru: string;
  tanggal: string;
}

export interface GeneratedContent {
  materiInsersi: string[];
  tujuanPembelajaran: string[];
  iktp: string[];
  modelPembelajaran: string;
  pendahuluan: string[];
  // Changed from fixed keys to dynamic array to support different Model Syntaxes
  kegiatanInti: {
    tahap: string;
    kegiatan: string;
  }[];
  penutup: string[];
  asesmenFormatif: string[];
  asesmenSumatif: string[];
  asesmenSikap: string[];
}

export enum SubjectOptions {
  QURAN_HADITS = "Al-Qur'an Hadits",
  AKIDAH_AKHLAK = "Akidah Akhlak",
  FIKIH = "Fikih",
  SKI = "Sejarah Kebudayaan Islam",
  BAHASA_ARAB = "Bahasa Arab",
  TEMATIK_UMUM = "Tematik (Umum)",
  MATEMATIKA = "Matematika",
  PJOK = "PJOK",
  SENI_BUDAYA = "Seni Budaya",
  BAHASA_INGGRIS = "Bahasa Inggris"
}

export enum ClassOptions {
  FASE_A_1 = "Fase A / Kelas 1",
  FASE_A_2 = "Fase A / Kelas 2",
  FASE_B_3 = "Fase B / Kelas 3",
  FASE_B_4 = "Fase B / Kelas 4",
  FASE_C_5 = "Fase C / Kelas 5",
  FASE_C_6 = "Fase C / Kelas 6",
}

export enum ThemeKBCOptions {
  CINTA_ALLAH_RASUL = "Cinta Allah dan Rasul-Nya",
  CINTA_ILMU = "Cinta Ilmu",
  CINTA_LINGKUNGAN = "Cinta Lingkungan",
  CINTA_DIRI_SESAMA = "Cinta Diri dan Sesama",
  CINTA_TANAH_AIR = "Cinta Tanah Air"
}

export enum LearningModelOptions {
  PBL = "Problem Based Learning (PBL)",
  PJBL = "Project Based Learning (PjBL)",
  DISCOVERY = "Discovery Learning",
  INQUIRY = "Inquiry Learning",
  COOPERATIVE = "Cooperative Learning",
  CONTEXTUAL = "Contextual Teaching and Learning (CTL)",
  FLIPPED = "Flipped Classroom",
  BLENDED = "Blended Learning",
  STEM = "STEM/STEAM Learning",
  PROBLEM_SOLVING = "Problem Solving Learning",
  DIRECT = "Direct Instruction",
  DIFFERENTIATED = "Differentiated Instruction",
  SOCIOCULTURAL = "Sociocultural / Inquiry Sosial",
  EXPERIENTIAL = "Experiential Learning",
  HUMANISTIC = "Humanistic Learning",
  QUANTUM_LEARNING = "Quantum Learning",
  QUANTUM_TEACHING = "Quantum Teaching",
  SAINTIFIC = "Saintifik 5M",
  SCL = "Student Centered Learning (SCL)",
  PROBLEM_POSING = "Problem Posing",
  ROLE_PLAYING = "Role Playing / Simulation",
  MASTERY = "Mastery Learning",
  LITERACY = "Literacy-Based Learning",
  NUMERACY = "Numeracy-Based Learning",
  SERVICE = "Service Learning",
  GAME_BASED = "Game-Based Learning",
  ADAPTIVE = "Adaptive Learning",
  COLLABORATIVE = "Collaborative Learning",
  HOLISTIC = "Holistic Learning"
}


export const ModelDescriptions: Record<string, string> = {

  [LearningModelOptions.PBL]:
    "Model pembelajaran berbasis masalah nyata yang melatih kemampuan berpikir kritis dan pemecahan masalah.",

  [LearningModelOptions.PJBL]:
    "Pembelajaran berbasis proyek melalui proses eksplorasi, penilaian, sintesis, dan pembuatan produk.",

  [LearningModelOptions.DISCOVERY]:
    "Peserta didik menemukan sendiri konsep melalui observasi, analisis, dan proses ilmiah sederhana.",

  [LearningModelOptions.INQUIRY]:
    "Menekankan proses berpikir kritis dan analitis untuk menemukan jawaban atas suatu permasalahan.",

  [LearningModelOptions.COOPERATIVE]:
    "Belajar dalam kelompok kecil dengan kemampuan beragam untuk mencapai tujuan bersama.",

  [LearningModelOptions.CONTEXTUAL]:
    "Pembelajaran yang menghubungkan materi dengan konteks dunia nyata peserta didik.",

  [LearningModelOptions.FLIPPED]:
    "Model pembelajaran di mana materi dipelajari di rumah, sedangkan kegiatan praktik, diskusi, dan pendalaman dilakukan di kelas.",

  [LearningModelOptions.BLENDED]:
    "Perpaduan pembelajaran tatap muka dan online untuk meningkatkan fleksibilitas belajar.",

  [LearningModelOptions.STEM]:
    "Pembelajaran yang mengintegrasikan sains, teknologi, rekayasa, seni (opsional), dan matematika dalam pemecahan masalah nyata.",

  [LearningModelOptions.PROBLEM_SOLVING]:
    "Model yang berfokus pada keterampilan memecahkan masalah melalui tahapan identifikasi, analisis, dan evaluasi.",

  [LearningModelOptions.DIRECT]:
    "Pembelajaran langsung melalui penjelasan guru secara sistematis dan terstruktur.",

  [LearningModelOptions.DIFFERENTIATED]:
    "Pembelajaran yang disesuaikan dengan kebutuhan, kemampuan, minat, dan gaya belajar peserta didik.",

  [LearningModelOptions.SOCIOCULTURAL]:
    "Pembelajaran berbasis interaksi sosial dan kolaborasi, mengacu pada teori Vygotsky.",

  [LearningModelOptions.EXPERIENTIAL]:
    "Belajar melalui pengalaman langsung, refleksi, konsep, dan penerapan (Kolb).",

  [LearningModelOptions.HUMANISTIC]:
    "Model yang menekankan perkembangan kepribadian, motivasi internal, dan kebutuhan emosional peserta didik.",
  // Model lama (tidak ditampilkan lagi agar tidak panjang)

  [LearningModelOptions.QUANTUM_LEARNING]:
    "Model pembelajaran yang menggabungkan interaksi, strategi belajar menyenangkan, dan lingkungan positif untuk memaksimalkan proses belajar.",

  [LearningModelOptions.QUANTUM_TEACHING]:
    "Pendekatan mengajar yang menekankan orkestrasi lingkungan belajar, bahasa tubuh, dan strategi komunikasi untuk memudahkan pemahaman.",

  [LearningModelOptions.SAINTIFIC]:
    "Model Kurikulum 2013: Mengamati, Menanya, Mengumpulkan Informasi, Menalar, Mengomunikasikan (5M).",

  [LearningModelOptions.SCL]:
    "Pembelajaran yang berpusat pada peserta didik, menekankan aktivitas, kreativitas, dan kemandirian siswa.",

  [LearningModelOptions.PROBLEM_POSING]:
    "Model yang melibatkan peserta didik dalam membuat atau merumuskan soal sebelum menyelesaikannya.",

  [LearningModelOptions.ROLE_PLAYING]:
    "Peserta didik belajar melalui permainan peran untuk memahami situasi, konsep sosial, atau masalah tertentu.",

  [LearningModelOptions.MASTERY]:
    "Peserta didik harus mencapai tingkat penguasaan tertentu sebelum melanjutkan ke materi berikutnya.",

  [LearningModelOptions.LITERACY]:
    "Pembelajaran berbasis literasi yang menekankan kemampuan memahami teks, informasi, dan konteks secara kritis.",

  [LearningModelOptions.NUMERACY]:
    "Pembelajaran berbasis numerasi yang menekankan kemampuan menghitung, menganalisis angka, dan memecahkan masalah matematis.",

  [LearningModelOptions.SERVICE]:
    "Pembelajaran yang menggabungkan kegiatan sosial/layanan masyarakat dengan refleksi sebagai bagian dari proses belajar.",

  [LearningModelOptions.GAME_BASED]:
    "Pembelajaran yang menggunakan mekanisme permainan untuk meningkatkan motivasi, keterlibatan, dan pemahaman.",

  [LearningModelOptions.ADAPTIVE]:
    "Model pembelajaran yang menyesuaikan materi, kecepatan, dan strategi berdasarkan kemampuan masing-masing peserta didik.",

  [LearningModelOptions.COLLABORATIVE]:
    "Pembelajaran yang menekankan kerja sama kelompok dalam memecahkan masalah atau menghasilkan produk.",

  [LearningModelOptions.HOLISTIC]:
    "Pendekatan yang melihat peserta didik secara utuh: kognitif, emosional, sosial, fisik, dan spiritual."
};


export const TeacherNames = [
  "AHMAD HUSSAINI, S.Pd.I",
  "GUSTI RAHAYU, S.Pd.I",
  "HIKMATUN FITRIAH, S.Pd",
  "TAHMIDULLAH, S.Pd",
  "JUNI WARDANI, S.Pd",
  "TAZKIRATUN NUFUS, S.Pd",
  "FASHIHAH DIANAH, S.Pd",
  "GT. HAIRUNNISA, S.Pd",
  "NUR SAIDAH, S.Pd.I"
];

export const ClassToTeacherMap: Record<string, string> = {
  [ClassOptions.FASE_A_1]: "GUSTI RAHAYU, S.Pd.I",
  [ClassOptions.FASE_A_2]: "HIKMATUN FITRIAH, S.Pd",
  [ClassOptions.FASE_B_3]: "TAHMIDULLAH, S.Pd",
  [ClassOptions.FASE_B_4]: "JUNI WARDANI, S.Pd",
  [ClassOptions.FASE_C_5]: "TAZKIRATUN NUFUS, S.Pd",
  [ClassOptions.FASE_C_6]: "FASHIHAH DIANAH, S.Pd",
};


import { Document, Packer, Paragraph, TextRun, AlignmentType, Table, TableRow, TableCell, WidthType, BorderStyle } from "docx";
import { RPPData, GeneratedContent } from "../types";

export const generateDocx = async (data: RPPData, content: GeneratedContent): Promise<Blob> => {
  const formattedDate = data.tanggal ? new Date(data.tanggal).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric'
  }) : '......................';

  const font = "Times New Roman";
  const size = 24; // 12pt (docx size is half-points)

  const noBorder = {
    top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
    bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
    left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
    right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
  };

  const createMetaRow = (label: string, value: string | string[]) => {
    let cellChildren;
    if (Array.isArray(value)) {
        // Handle array for Materi Insersi (bulleted with dash)
        cellChildren = value.map(v => new Paragraph({
            children: [new TextRun({ text: "- " + v, font: font, size: size })]
        }));
    } else {
        cellChildren = [new Paragraph({
            children: [new TextRun({ text: value, font: font, size: size, bold: label === "Mata Pelajaran" })]
        })];
    }

    return new TableRow({
      children: [
        new TableCell({
          width: { size: 3500, type: WidthType.DXA },
          children: [new Paragraph({ children: [new TextRun({ text: label, font: font, size: size })] })],
          borders: noBorder,
        }),
        new TableCell({
          width: { size: 200, type: WidthType.DXA },
          children: [new Paragraph({ children: [new TextRun({ text: ":", font: font, size: size })] })],
          borders: noBorder,
        }),
        new TableCell({
          width: { size: 6000, type: WidthType.DXA },
          children: cellChildren,
          borders: noBorder,
        }),
      ],
    });
  };

  const doc = new Document({
    sections: [{
      properties: {
        page: {
          size: {
            width: "215mm",
            height: "330mm",
          },
          margin: {
            top: "3cm",
            right: "3cm",
            bottom: "3cm",
            left: "3cm",
          },
        },
      },
      children: [
        // Header
        new Paragraph({
          children: [
            new TextRun({ text: "Rencana Pelaksanaan Pembelajaran (RPP)", bold: true, font: font, size: 28 }), // 14pt
          ],
          alignment: AlignmentType.CENTER,
          spacing: { after: 100 },
        }),
        new Paragraph({
          children: [
            new TextRun({ text: "MIS Al Muslimun", bold: true, font: font, size: 28 }),
          ],
          alignment: AlignmentType.CENTER,
          spacing: { after: 100 },
        }),

        // Metadata Table
        new Table({
          rows: [
            createMetaRow("Mata Pelajaran", data.mataPelajaran),
            createMetaRow("Fase/Kelas", data.faseKelas),
            createMetaRow("Materi Pokok", data.materiPokok),
            createMetaRow("Tema Kurikulum Berbasis Cinta", data.temaKBC.join(", ")),
            createMetaRow("Materi Insersi", content.materiInsersi),
            createMetaRow("Alokasi Waktu", data.alokasiWaktu),
          ],
          width: { size: 100, type: WidthType.PERCENTAGE },
          borders: noBorder,
        }),

        new Paragraph({ text: "", spacing: { after: 300 } }), // Spacer

        // A. Tujuan
        new Paragraph({
          children: [new TextRun({ text: "A. Tujuan Pembelajaran", bold: true, font: font, size: size })],
          spacing: { after: 100 },
        }),
        ...content.tujuanPembelajaran.map(item => new Paragraph({
           children: [new TextRun({ text: item, font: font, size: size })],
           alignment: AlignmentType.JUSTIFIED,
           bullet: { level: 0 }, // Bullet format as requested
        })),

        // B. IKTP
        new Paragraph({
            children: [new TextRun({ text: "B. Indikator Ketercapaian Tujuan Pembelajaran (IKTP)", bold: true, font: font, size: size })],
            spacing: { before: 200, after: 100 },
        }),
        ...content.iktp.map(item => new Paragraph({
           children: [new TextRun({ text: item, font: font, size: size })],
           alignment: AlignmentType.JUSTIFIED,
           bullet: { level: 0 } // Consistent list format
        })),

        // C. Kegiatan
        new Paragraph({
            children: [new TextRun({ text: "C. Kegiatan Pembelajaran", bold: true, font: font, size: size })],
            spacing: { before: 300, after: 100 },
        }),
        new Paragraph({
            children: [
                new TextRun({ text: "Model: ", bold: true, font: font, size: size }),
                new TextRun({ text: content.modelPembelajaran, font: font, size: size }),
            ],
            spacing: { after: 200 },
            indent: { left: 360 }
        }),

        // 1. Pendahuluan
        new Paragraph({ 
            children: [new TextRun({ text: "1. Pendahuluan", bold: true, font: font, size: size })],
            indent: { left: 360 } 
        }),
        ...content.pendahuluan.map(item => new Paragraph({
            children: [new TextRun({ text: "- " + item, font: font, size: size })],
            alignment: AlignmentType.JUSTIFIED,
            indent: { left: 720 }
         })),

        // 2. Kegiatan Inti
        new Paragraph({ 
            children: [new TextRun({ text: "2. Kegiatan Inti", bold: true, font: font, size: size })],
            indent: { left: 360 }, 
            spacing: { before: 100 } 
        }),
        // Dynamic Steps Rendering
        ...content.kegiatanInti.map(step => new Paragraph({
             children: [
                 new TextRun({ text: step.tahap + " : ", bold: true, font: font, size: size }),
                 new TextRun({ text: step.kegiatan, font: font, size: size })
             ],
             alignment: AlignmentType.JUSTIFIED,
             indent: { left: 720 },
             spacing: { after: 50 }
        })),

        // 3. Penutup
        new Paragraph({ 
            children: [new TextRun({ text: "3. Penutup", bold: true, font: font, size: size })],
            indent: { left: 360 }, 
            spacing: { before: 100 } 
        }),
        ...content.penutup.map(item => new Paragraph({
            children: [new TextRun({ text: "- " + item, font: font, size: size })],
            alignment: AlignmentType.JUSTIFIED,
            indent: { left: 720 }
         })),

         // D. Asesmen
         new Paragraph({
            children: [new TextRun({ text: "D. Asesmen dan Evaluasi", bold: true, font: font, size: size })],
            spacing: { before: 300, after: 100 },
        }),
        
        // 1. Asesmen Formatif
        new Paragraph({ 
            children: [new TextRun({ text: "1. Asesmen Formatif", bold: true, font: font, size: size })],
            indent: { left: 360 } 
        }),
        ...content.asesmenFormatif.map(item => new Paragraph({
            children: [new TextRun({ text: "- " + item, font: font, size: size })],
            alignment: AlignmentType.JUSTIFIED,
            indent: { left: 720 }
         })),

        // 2. Asesmen Sumatif
        new Paragraph({ 
            children: [new TextRun({ text: "2. Asesmen Sumatif", bold: true, font: font, size: size })],
            indent: { left: 360 }, 
            spacing: { before: 100 } 
        }),
        ...content.asesmenSumatif.map(item => new Paragraph({
            children: [new TextRun({ text: "- " + item, font: font, size: size })],
            alignment: AlignmentType.JUSTIFIED,
            indent: { left: 720 }
         })),

         // 3. Asesmen Sikap
        new Paragraph({ 
            children: [new TextRun({ text: "3. Asesmen Sikap", bold: true, font: font, size: size })],
            indent: { left: 360 }, 
            spacing: { before: 100 } 
        }),
        ...content.asesmenSikap.map(item => new Paragraph({
            children: [new TextRun({ text: "- " + item, font: font, size: size })],
            alignment: AlignmentType.JUSTIFIED,
            indent: { left: 720 }
         })),


         // Signatures
         new Paragraph({ text: "", spacing: { after: 400 } }),
         new Table({
            rows: [
                new TableRow({
                    children: [
                        new TableCell({
                            children: [
                                new Paragraph({ 
                                    children: [new TextRun({ text: "Mengetahui,", font: font, size: size })], 
                                    alignment: AlignmentType.CENTER 
                                }),
                                new Paragraph({ 
                                    children: [new TextRun({ text: "Kepala Madrasah", font: font, size: size })], 
                                    alignment: AlignmentType.CENTER 
                                }),
                                new Paragraph({ text: "", spacing: { after: 1200 } }), // Space for sign
                                new Paragraph({ 
                                    children: [new TextRun({ text: "AHMAD HUSSAINI, S.Pd.I", bold: true, underline: { type: "single" }, font: font, size: size })], 
                                    alignment: AlignmentType.CENTER 
                                }),
                            ],
                            borders: noBorder,
                            width: { size: 50, type: WidthType.PERCENTAGE }
                        }),
                        new TableCell({
                            children: [
                                new Paragraph({ 
                                    children: [new TextRun({ text: `Kotabaru, ${formattedDate}`, font: font, size: size })], 
                                    alignment: AlignmentType.CENTER 
                                }),
                                new Paragraph({ 
                                    children: [new TextRun({ text: "Guru Mata Pelajaran", font: font, size: size })], 
                                    alignment: AlignmentType.CENTER 
                                }),
                                new Paragraph({ text: "", spacing: { after: 1200 } }), // Space for sign
                                new Paragraph({ 
                                    children: [new TextRun({ text: data.namaGuru || "................................", bold: true, underline: { type: "single" }, font: font, size: size })], 
                                    alignment: AlignmentType.CENTER 
                                }),
                            ],
                            borders: noBorder,
                            width: { size: 50, type: WidthType.PERCENTAGE }
                        })
                    ]
                })
            ],
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: noBorder,
         })

      ],
    }],
  });

  return await Packer.toBlob(doc);
};

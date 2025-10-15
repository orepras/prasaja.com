import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function TerminologiInklusif() {
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-8">
      <div className="mb-8">
        <Link 
          to="/" 
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Kembali ke beranda
        </Link>
        
        <h1 className="text-3xl font-bold font-mono tracking-tight mb-4">
          Terminologi Inklusif
        </h1>
        <p className="text-muted-foreground mb-6">
          Dibuat dalam bahasa Indonesia untuk membantu tim, media, dan publik menggunakan istilah yang lebih inklusif serta kontekstual saat membahas disabilitas. Versi terbaru: 10 October 2025.
        </p>
        <div className="p-4 bg-muted/20 rounded-lg mb-8">
          <p className="text-sm text-muted-foreground">
            <strong>Disclaimer:</strong> Panduan ini berdasarkan resource personal, riset pribadi, dan temuan di komunitas. 
            Bukan merupakan standar resmi atau panduan akademis yang telah divalidasi secara formal. 
            Setiap komunitas memiliki preferensi terminologi yang berbeda-beda, dan yang terpenting adalah 
            mendengarkan suara serta preferensi dari komunitas yang bersangkutan.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Feedback, koreksi, dan masukan sangat saya apresiasi, silakan kirim ke prasaja@hey.com.
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-muted">
          <thead>
            <tr className="bg-muted/50">
              <th className="border border-muted p-4 text-left font-semibold">Istilah Lama (Kurang Tepat / Patronizing)</th>
              <th className="border border-muted p-4 text-left font-semibold">Istilah yang Disarankan</th>
              <th className="border border-muted p-4 text-left font-semibold">Konteks & Catatan Penggunaan</th>
            </tr>
          </thead>
          <tbody>
            {/* Terminologi yang paling sering digunakan */}
            <tr>
              <td className="border border-muted p-4">Orang cacat</td>
              <td className="border border-muted p-4 font-medium">Individu dengan disabilitas</td>
              <td className="border border-muted p-4 text-sm text-muted-foreground">Hindari label yang menstigma (seolah "rusak"). Gunakan istilah netral yang diakui luas dan diatur dalam UU.</td>
            </tr>
            <tr>
              <td className="border border-muted p-4">Penderita disabilitas</td>
              <td className="border border-muted p-4 font-medium">Individu dengan disabilitas</td>
              <td className="border border-muted p-4 text-sm text-muted-foreground">"Penderita" mengesankan derita permanen. "Dengan" bersifat deskriptif, tidak mengasihani.</td>
            </tr>
            <tr>
              <td className="border border-muted p-4">Difabel</td>
              <td className="border border-muted p-4 font-medium">Individu dengan disabilitas</td>
              <td className="border border-muted p-4 text-sm text-muted-foreground">Meski populer, kadang terlalu eufemistis/ambigu. "Disabilitas" lebih konsisten di ranah kebijakan dan layanan.</td>
            </tr>
            <tr>
              <td className="border border-muted p-4">Anak berkebutuhan khusus (ABK)</td>
              <td className="border border-muted p-4 font-medium">Anak dengan disabilitas</td>
              <td className="border border-muted p-4 text-sm text-muted-foreground">"Berkebutuhan khusus" terlalu luas dan sering menutupi konteks disabilitas. Gunakan istilah "anak dengan disabilitas" bila memang merujuk pada kondisi disabilitas yang diakui dalam konteks pendidikan inklusif.</td>
            </tr>
            <tr>
              <td className="border border-muted p-4">Normal / Tidak normal</td>
              <td className="border border-muted p-4 font-medium">Non-disabilitas / Dengan disabilitas</td>
              <td className="border border-muted p-4 text-sm text-muted-foreground">Jangan gunakan "normal" sebagai pembanding. Pilih istilah deskriptif yang tidak menghakimi.</td>
            </tr>
            <tr>
              <td className="border border-muted p-4">Tuna netra / Tuna rungu / Tuna daksa</td>
              <td className="border border-muted p-4 font-medium">Netra, Tuli, disabilitas fisik</td>
              <td className="border border-muted p-4 text-sm text-muted-foreground">Banyak komunitas lebih nyaman dengan bentuk ini; terasa setara dan humanis. Cocok di komunikasi publik dan komunitas.</td>
            </tr>
            <tr>
              <td className="border border-muted p-4">Ramah difabel</td>
              <td className="border border-muted p-4 font-medium">Aksesibel</td>
              <td className="border border-muted p-4 text-sm text-muted-foreground">"Ramah" = niat; "aksesibel" = dapat diuji/diukur (gedung aksesibel, situs aksesibel, proses rekrutmen aksesibel).</td>
            </tr>
            <tr>
              <td className="border border-muted p-4">Lumpuh dengan kursi roda</td>
              <td className="border border-muted p-4 font-medium">Pengguna kursi roda</td>
              <td className="border border-muted p-4 text-sm text-muted-foreground">Kursi roda adalah alat mobilitas/kemerdekaan; jangan bingkai sebagai kelemahan.</td>
            </tr>
            <tr>
              <td className="border border-muted p-4">Kaum minoritas</td>
              <td className="border border-muted p-4 font-medium">Kelompok minoritas / kelompok rentan</td>
              <td className="border border-muted p-4 text-sm text-muted-foreground">Hindari "kaum" yang memberi jarak. "Kelompok" terasa lebih inklusif dan netral.</td>
            </tr>
            <tr>
              <td className="border border-muted p-4">Kaum marjinal / Kaum terpinggirkan</td>
              <td className="border border-muted p-4 font-medium">Kelompok masyarakat dengan akses terbatas / Bagian masyarakat yang belum terakomodasi</td>
              <td className="border border-muted p-4 text-sm text-muted-foreground">Geser fokus dari "kesalahan individu" ke hambatan sistemik (lingkungan, kebijakan, layanan).</td>
            </tr>
            <tr>
              <td className="border border-muted p-4">Kaum lemah / Golongan tidak berdaya</td>
              <td className="border border-muted p-4 font-medium">Masyarakat dengan kebutuhan aksesibilitas</td>
              <td className="border border-muted p-4 text-sm text-muted-foreground">Hindari diksi yang melemahkan. Fokus pada kebutuhan akses, dukungan, dan akomodasi yang layak.</td>
            </tr>
            <tr>
              <td className="border border-muted p-4">Kaum istimewa</td>
              <td className="border border-muted p-4 font-medium">Penyandang disabilitas</td>
              <td className="border border-muted p-4 text-sm text-muted-foreground">"Istimewa" bisa jadi toxic positivity yang memisahkan. Pilih istilah yang menyertakan, bukan mengistimewakan.</td>
            </tr>
            <tr>
              <td className="border border-muted p-4">Korban disabilitas</td>
              <td className="border border-muted p-4 font-medium">Penyandang disabilitas akibat … (mis. kecelakaan kerja)</td>
              <td className="border border-muted p-4 text-sm text-muted-foreground">Gunakan "korban" hanya bila merujuk pada kejadian spesifik. Untuk identitas sehari-hari, pakai istilah netral.</td>
            </tr>
            <tr>
              <td className="border border-muted p-4">Pejuang disabilitas</td>
              <td className="border border-muted p-4 font-medium">Aktivis disabilitas / Advokat inklusi</td>
              <td className="border border-muted p-4 text-sm text-muted-foreground">Hindari glorifikasi berlebihan. Tekankan peran, kompetensi, dan kontribusi profesional.</td>
            </tr>
            <tr>
              <td className="border border-muted p-4">Keterbatasan pribadi</td>
              <td className="border border-muted p-4 font-medium">Hambatan lingkungan/sistem</td>
              <td className="border border-muted p-4 text-sm text-muted-foreground">Dalam framing kebijakan/produk, sorot barrier eksternal (akses fisik, informasi, sikap, teknologi) daripada "kekurangan" individu.</td>
            </tr>
            <tr>
              <td className="border border-muted p-4">Kelainan</td>
              <td className="border border-muted p-4 font-medium">Variasi fungsi / kondisi (sesuai konteks medis)</td>
              <td className="border border-muted p-4 text-sm text-muted-foreground">Di ranah medis tetap presisi, namun di ranah publik pilih bahasa non-stigmatis yang menghormati identitas.</td>
            </tr>
            <tr>
              <td className="border border-muted p-4">Idiot / Bodoh</td>
              <td className="border border-muted p-4 font-medium">Kesulitan belajar / Keterbatasan kognitif</td>
              <td className="border border-muted p-4 text-sm text-muted-foreground">Istilah "idiot" dan "bodoh" sangat menstigma. Fokus pada deskripsi fungsional yang tidak menghakimi kemampuan intelektual seseorang.</td>
            </tr>
            <tr>
              <td className="border border-muted p-4">Gila / Tidak waras</td>
              <td className="border border-muted p-4 font-medium">Orang dengan kondisi kesehatan mental</td>
              <td className="border border-muted p-4 text-sm text-muted-foreground">Istilah "gila" dan "tidak waras" sangat merendahkan. Gunakan bahasa yang menghormati dan mengakui bahwa kesehatan mental adalah bagian dari kesehatan secara keseluruhan.</td>
            </tr>
            <tr>
              <td className="border border-muted p-4">Autis (sebagai kata sifat negatif)</td>
              <td className="border border-muted p-4 font-medium">Neurodivergen / Orang dengan autisme</td>
              <td className="border border-muted p-4 text-sm text-muted-foreground">Autisme bukanlah kata sifat untuk menggambarkan perilaku yang dianggap aneh. Gunakan istilah yang menghormati identitas dan pengalaman neurodivergen.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-12 p-6 bg-muted/30 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Catatan Pemakaian:</h2>
        <ol className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start">
            <span className="font-semibold mr-2">1.</span>
            <span>Utamakan istilah yang digunakan/diinginkan oleh komunitas.</span>
          </li>
          <li className="flex items-start">
            <span className="font-semibold mr-2">2.</span>
            <span>Saat ragu, tanya dulu dan dengarkan preferensi penyebutan.</span>
          </li>
          <li className="flex items-start">
            <span className="font-semibold mr-2">3.</span>
            <span>Fokus pada akses setara, bukan belas kasihan.</span>
          </li>
          <li className="flex items-start">
            <span className="font-semibold mr-2">4.</span>
            <span>Konsisten di semua kanal (kebijakan, produk, layanan, konten).</span>
          </li>
        </ol>
      </div>
    </div>
  );
}

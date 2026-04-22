export default function Syarat() {
  return (
    <div className="min-h-screen bg-navy py-32 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-slate-400/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-sage/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto bg-white p-8 md:p-14 rounded-3xl shadow-xl border border-slate-200 relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-full text-xs text-slate-600 font-bold mb-6 border border-slate-200">
          Aturan &amp; Ketentuan
        </div>
        <h1 className="text-3xl md:text-5xl font-poppins font-bold text-navy mb-4">Syarat Penggunaan</h1>
        <p className="text-slate-500 font-medium mb-10 pb-6 border-b border-slate-200">
          Terakhir diperbarui: {new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <div className="prose prose-slate max-w-none text-slate-600 space-y-6 leading-relaxed text-sm md:text-base">
          <p>
            Dengan mengakses dan menggunakan platform <strong>SocioZone</strong>, Anda menyatakan telah membaca, memahami, dan menyetujui seluruh Syarat dan Ketentuan yang tercantum di bawah ini. Jika Anda tidak menyetujui syarat-syarat ini, Anda dipersilakan untuk tidak menggunakan platform ini.
          </p>

          <h2 className="text-xl font-bold text-navy mt-10 mb-4 flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-700 text-sm">1</span>
            Tujuan Akademik & Edukasi
          </h2>
          <p>
            SocioZone adalah platform edukasi nirlaba yang ditujukan untuk memfasilitasi pembelajaran Sosiologi bagi mahasiswa, peneliti, dan masyarakat umum, khususnya dalam lingkup Universitas Negeri Surabaya (UNESA). Seluruh teori, artikel, tokoh, dan literatur yang disajikan bertujuan sebagai referensi akademik, namun tidak menggantikan literatur akademik resmi (jurnal peer-reviewed, buku referensi cetak).
          </p>

          <h2 className="text-xl font-bold text-navy mt-10 mb-4 flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-700 text-sm">2</span>
            Kekayaan Intelektual (Hak Cipta)
          </h2>
          <p>
            Kecuali dinyatakan lain, seluruh konten (termasuk teks ringkasan, kode sumber perangkat lunak, dan infografis antarmuka) yang ada pada SocioZone merupakan hak cipta milik pengembang atau institusi UNESA.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Penggunaan yang Diizinkan:</strong> Anda diperbolehkan menggunakan, mengutip, atau membagikan materi dari situs ini untuk keperluan tugas harian, riset makalah, atau penelitian akademik dengan memberikan sitasi/kredit kepada platform.</li>
            <li><strong>Penggunaan Terlarang:</strong> Anda tidak diperkenankan untuk menyalin secara massal (scraping), mendistribusikan ulang, memodifikasi, atau memonetisasi materi apa pun dari SocioZone untuk tujuan komersial tanpa izin tertulis.</li>
          </ul>

          <h2 className="text-xl font-bold text-navy mt-10 mb-4 flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-700 text-sm">3</span>
            Akurasi Chatbot SociZ (AI Virtual Assistant)
          </h2>
          <p>
            Platform kami menyediakan Chatbot SociZ yang merupakan asisten virtual kecerdasan buatan untuk membantu memahami konsep-konsep Sosiologi. Perlu dicatat bahwa saran dan analisis yang dihasilkan oleh SociZ:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Bukan merupakan kebenaran mutlak dan bisa jadi mengandung generalisasi atau halusinasi algoritma.</li>
            <li>Tidak dapat dijadikan referensi rujukan utama untuk bab landasan teori pada penulisan skripsi/tesis akademik formal. Anda tetap harus merujuk pada literatur aslinya.</li>
          </ul>

          <h2 className="text-xl font-bold text-navy mt-10 mb-4 flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-700 text-sm">4</span>
            Tautan ke Situs Pihak Ketiga
          </h2>
          <p>
            Platform ini mungkin berisi tautan eksternal (hyperlink) menuju situs pihak ketiga, seperti laman repositori jurnal eksternal, profil LinkedIn Alumni, portal Berita Resmi UNESA, atau akun Instagram Komunitas HMP. Kami tidak bertanggung jawab atas syarat, kebijakan, keamanan privasi, atau isi konten dari situs pihak ketiga tersebut.
          </p>

          <h2 className="text-xl font-bold text-navy mt-10 mb-4 flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-700 text-sm">5</span>
            Perubahan pada Layanan
          </h2>
          <p>
            Pengembang SocioZone berhak kapan saja dan tanpa pemberitahuan sebelumnya, untuk mengubah, menangguhkan, atau menghentikan sebagian atau seluruh fitur dan database platform ini demi alasan teknis, pemeliharaan server, maupun pembaharuan kurikulum.
          </p>

          <div className="mt-12 p-6 bg-sage/5 border border-sage/20 rounded-2xl">
            <h3 className="font-bold text-navy mb-2">Bantuan & Laporan</h3>
            <p className="text-sm text-slate-500 mb-0">
              Jika Anda menemukan kekeliruan dalam materi sosiologi yang disajikan di situs ini, menemukan tautan yang mati, atau memiliki saran pengembangan platform, Anda dipersilakan melaporkannya ke tim kurator kami di <strong>hello@sociozone.id</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
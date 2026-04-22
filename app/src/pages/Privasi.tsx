export default function Privasi() {
  return (
    <div className="min-h-screen bg-navy py-32 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sage/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto bg-white p-8 md:p-14 rounded-3xl shadow-xl border border-slate-200 relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-sage/10 rounded-full text-xs text-sage-dark font-bold mb-6 border border-sage/20">
          Shield &amp; Security
        </div>
        <h1 className="text-3xl md:text-5xl font-poppins font-bold text-navy mb-4">Kebijakan Privasi</h1>
        <p className="text-slate-500 font-medium mb-10 pb-6 border-b border-slate-200">
          Terakhir diperbarui: {new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <div className="prose prose-slate max-w-none text-slate-600 space-y-6 leading-relaxed text-sm md:text-base">
          <p>
            Selamat datang di <strong>SocioZone</strong> (Platform Edukasi Sosiologi). Kami menyadari bahwa privasi Anda sangat penting. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, melindungi, dan membagikan informasi Anda ketika Anda menggunakan situs web dan layanan platform pendidikan kami.
          </p>

          <h2 className="text-xl font-bold text-navy mt-10 mb-4 flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-amber/10 text-amber-dark text-sm">1</span>
            Data yang Kami Kumpulkan
          </h2>
          <p>Kami mengumpulkan beberapa jenis informasi untuk memberikan pengalaman yang lebih baik, di antaranya:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Informasi yang Anda berikan:</strong> Nama, alamat email, atau asalan institusi saat Anda mendaftar atau memberikan masukan kepada platform.</li>
            <li><strong>Data Penggunaan:</strong> Interaksi Anda dengan modul Teori, Kacamata Sosiologi, tes interaktif, dan kueri yang Anda sampaikan kepada asisten virtual (Chatbot SociZ).</li>
            <li><strong>Data Analitik:</strong> Alamat IP anonim, jenis peramban (browser), halaman yang dikunjungi, dan waktu yang dihabiskan di platform untuk keperluan statistik pengunjung melalui pihak ketiga (seperti Supabase atau Google Analytics).</li>
          </ul>

          <h2 className="text-xl font-bold text-navy mt-10 mb-4 flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-amber/10 text-amber-dark text-sm">2</span>
            Bagaimana Kami Menggunakan Data Anda
          </h2>
          <p>Informasi yang terkumpul digunakan untuk tujuan-tujuan berikut:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Meningkatkan Kualitas Edukasi:</strong> Menyesuaikan rekomendasi teori sosial dan konten artikel yang paling relevan dengan kebutuhan pengguna.</li>
            <li><strong>Pengembangan Asisten Virtual (SociZ):</strong> Riwayat obrolan (tanpa identitas pelacak) diawasi secara algoritmis semata-mata untuk melatih pemahaman dan akurasi bot sosiologi kami.</li>
            <li><strong>Pemeliharaan Teknis:</strong> Mendeteksi bug, menjaga keamanan, dan melacak penyalahgunaan platform.</li>
          </ul>

          <h2 className="text-xl font-bold text-navy mt-10 mb-4 flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-amber/10 text-amber-dark text-sm">3</span>
            Keamanan Data
          </h2>
          <p>
            Kami menerapkan tindakan keamanan yang wajar secara teknis—termasuk enkripsi dan praktik isolasi database dengan bantuan pihak ketiga tepercaya (seperti Supabase)—untuk mencegah hilangnya, penyalahgunaan, atau perubahan data pribadi Anda. Namun, tidak ada pengiriman data melalui internet yang 100% aman; oleh karena itu, kami tidak dapat menjamin keamanan mutlak secara absolut.
          </p>

          <h2 className="text-xl font-bold text-navy mt-10 mb-4 flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-amber/10 text-amber-dark text-sm">4</span>
            Pembagian Informasi kepada Pihak Ketiga
          </h2>
          <p>
            SocioZone tidak akan pernah menjual, menyewakan, atau memperdagangkan data pribadi Anda kepada pihak ketiga komersial. Kami hanya membagikan informasi dalam keadaan:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Keperluan hukum atau permintaan sah dari aparat penegak hukum Indonesia.</li>
            <li>Penyedia layanan infrastruktur teknologi yang membantu operasional sistem kami, di bawah perjanjian kerahasiaan yang ketat.</li>
          </ul>

          <h2 className="text-xl font-bold text-navy mt-10 mb-4 flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-amber/10 text-amber-dark text-sm">5</span>
            Perubahan pada Kebijakan
          </h2>
          <p>
            SocioZone berhak untuk memperbarui Kebijakan Privasi ini kapan saja demi menyesuaikan dengan regulasi terbaru atau perubahan fitur. Tanggal "Terakhir Diperbarui" di atas akan menunjukkan kapan perubahan terakhir terjadi. Membuka dan menggunakan platform ini setelah ada perubahan pada dokumen berarti Anda menyetujui kebijakan baru tersebut.
          </p>

          <div className="mt-12 p-6 bg-slate-50 border border-slate-200 rounded-2xl">
            <h3 className="font-bold text-navy mb-2">Punya pertanyaan soal privasi?</h3>
            <p className="text-sm text-slate-500 mb-0">
              Jika Anda memiliki pertanyaan mendalam terkait pengumpulan data di platform SocioZone, Anda bisa menghubungi kami langsung di email resmi <strong>hello@sociozone.id</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
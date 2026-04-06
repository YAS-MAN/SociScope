export default function Syarat() {
  return (
    <div className="min-h-screen bg-slate-50 py-32 px-4">
      <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-200">
        <h1 className="text-3xl font-poppins font-bold text-navy mb-6">Syarat Penggunaan</h1>
        <div className="prose prose-slate text-slate-600 space-y-4 leading-relaxed">
          <p>Terakhir diperbarui: {new Date().toLocaleDateString('id-ID')}</p>
          <p>Dengan mengakses dan menggunakan platform SociScope, Anda setuju untuk terikat oleh Syarat dan Ketentuan berikut. Harap baca dengan saksama sebelum menggunakan layanan kami.</p>
          <h2 className="text-xl font-bold text-navy mt-8 mb-4">1. Penggunaan Platform</h2>
          <p>Konten di platform ini disediakan semata-mata untuk tujuan edukasi. Anda tidak diperkenankan untuk menyalin, mendistribusikan, atau menggunakan materi kami untuk tujuan komersial tanpa izin tertulis.</p>
          {/* Tambahkan tulisan lorem ipsum atau teks asli klien di sini */}
        </div>
      </div>
    </div>
  );
}
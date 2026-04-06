export default function Privasi() {
  return (
    <div className="min-h-screen bg-slate-50 py-32 px-4">
      <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-200">
        <h1 className="text-3xl font-poppins font-bold text-navy mb-6">Kebijakan Privasi</h1>
        <div className="prose prose-slate text-slate-600 space-y-4 leading-relaxed">
          <p>Terakhir diperbarui: {new Date().toLocaleDateString('id-ID')}</p>
          <p>Selamat datang di SociScope. Kami menghargai privasi Anda dan berkomitmen untuk melindungi data pribadi Anda. Kebijakan ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan menjaga informasi Anda saat menggunakan platform kami.</p>
          <h2 className="text-xl font-bold text-navy mt-8 mb-4">1. Informasi yang Kami Kumpulkan</h2>
          <p>Kami mungkin mengumpulkan informasi yang Anda berikan secara langsung kepada kami saat mendaftar, mengisi survei, atau menggunakan fitur interaktif seperti Chatbot Teo.</p>
          {/* Tambahkan tulisan lorem ipsum atau teks asli klien di sini */}
        </div>
      </div>
    </div>
  );
}
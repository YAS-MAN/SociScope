import { Users, GraduationCap, Building, Newspaper, Instagram, MessageCircle, ExternalLink, Trophy, User } from "lucide-react";
import { useAdminStore } from "@/store/useAdminStore";
import BeritaUnesa from "@/components/BeritaUnesa";

// Data komunitas HMP dengan placeholder link
const komunitasData = [
  {
    id: 1,
    name: "HMP Sosiologi UNESA",
    university: "Universitas Negeri Surabaya",
    members: "120+ anggota",
    description: "Himpunan Mahasiswa Sosiologi UNESA — pusat kegiatan akademik dan pengabdian masyarakat.",
    avatar: "H",
    color: "from-sage to-sage-light",
    instagram: "https://instagram.com/hmpsosiologiunesa",
    whatsapp: "https://wa.me/6281234567890",
    category: "Himpunan Resmi",
  }
];

export default function Jejaring() {
  const alumniData = useAdminStore((state) => state.alumniData);

  return (
    <div className="min-h-screen bg-white relative overflow-hidden py-24">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-sage/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fadeIn">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-sage/10 border border-sage/20 rounded-full text-sm text-sage-dark font-bold mb-4">
            <Users className="w-4 h-4" />
            Kolaborasi & Relasi
          </div>
          <h2 className="font-poppins font-bold text-4xl md:text-5xl text-navy mb-6">Jejaring Sosiologi</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Bangun koneksi dengan sesama mahasiswa, kenali profil alumni sukses, baca artikel terbaru, dan temukan komunitas sosiologi terdekat.
          </p>
        </div>

        {/* ========== SECTION 1: ALUMNI SUKSES ========== */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <GraduationCap className="w-8 h-8 text-amber-dark" />
            <h3 className="font-poppins font-bold text-2xl text-navy">Alumni Sukses Sosiologi</h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {alumniData.map((alumni) => (
              <div key={alumni.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:border-amber/40 hover:shadow-lg hover:-translate-y-1 transition-all group">
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${alumni.imgColor.startsWith('http') || alumni.imgColor.startsWith('data:') ? 'bg-slate-200' : alumni.imgColor} flex items-center justify-center text-white mb-4 shadow-md group-hover:scale-110 transition-transform overflow-hidden`}>
                  {alumni.imgColor.startsWith('http') || alumni.imgColor.startsWith('data:') ? (
                    <img src={alumni.imgColor} alt={alumni.name} className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-8 h-8" />
                  )}
                </div>
                <h4 className="font-poppins font-bold text-navy text-lg">{alumni.name}</h4>
                <p className="text-sm font-bold text-amber-dark mt-1 mb-2">{alumni.role}</p>
                <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg w-max border border-slate-200">
                  <Building className="w-3 h-3" />
                  {alumni.agency}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ========== SECTION 2: ARTIKEL & BERITA ========== */}
        <div id="artikel" className="mb-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-sage/10 rounded-full text-xs text-sage-dark font-bold mb-3 border border-sage/20">
                <Newspaper className="w-3.5 h-3.5" />
                Kabar Sosiologi UNESA
              </div>
              <h3 className="text-3xl font-poppins font-bold text-navy">
                Berita & Agenda Terbaru
              </h3>
              <p className="text-slate-600 mt-2 max-w-xl">
                Ikuti perkembangan, berita terbaru, dan kegiatan dari program studi Sosiologi Universitas Negeri Surabaya.
              </p>
            </div>
            <a
              href="https://sosiologi.fisipol.unesa.ac.id/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-bold text-slate-500 hover:text-amber-dark transition-colors flex items-center gap-2 group w-max border border-slate-200 px-4 py-2 rounded-xl hover:border-amber/40 hover:bg-amber/5"
            >
              Kunjungi Web Resmi Prodi
              <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
          <BeritaUnesa />
        </div>

        {/* ========== SECTION 3: KOMUNITAS STUDI ========== */}
        <div id="komunitas" className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <Trophy className="w-8 h-8 text-sage" />
            <h3 className="font-poppins font-bold text-2xl text-navy">Komunitas & Himpunan Sosiologi</h3>
          </div>
          <p className="text-slate-600 mb-10 max-w-2xl">
            Temukan komunitas mahasiswa sosiologi dari berbagai kampus. Bergabung, berkolaborasi, dan bangun jejaring akademik yang kuat.
          </p>

          <div className="max-w-4xl mx-auto">
            {komunitasData.map((komunitas, idx) => (
              <div
                key={komunitas.id}
                className="group relative bg-white border border-slate-200 rounded-3xl p-8 hover:border-amber/40 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden animate-fadeIn flex flex-col md:flex-row items-center gap-8 text-center md:text-left"
                style={{ animationDelay: `${idx * 80}ms` }}
              >
                {/* Category badge */}
                <div className="absolute top-6 right-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-md">
                    {komunitas.category}
                  </span>
                </div>

                {/* Avatar */}
                <div className={`w-28 h-28 md:w-32 md:h-32 rounded-3xl bg-gradient-to-br ${komunitas.color} flex items-center justify-center text-5xl font-black text-white shadow-xl shrink-0`}>
                  {komunitas.avatar}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h4 className="font-poppins font-bold text-navy text-2xl md:text-3xl leading-tight group-hover:text-amber-dark transition-colors">{komunitas.name}</h4>
                  <p className="text-sm text-slate-500 mt-1 mb-3">{komunitas.university}</p>

                  {/* Members badge */}
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-sage-dark bg-sage/10 border border-sage/20 px-3 py-1.5 rounded-full mb-4">
                    <Users className="w-4 h-4" />
                    {komunitas.members}
                  </div>

                  {/* Description */}
                  <p className="text-base text-slate-600 leading-relaxed mb-6">
                    {komunitas.description}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                    <a
                      href={komunitas.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-pink-600/80 to-purple-600/80 hover:from-pink-500 hover:to-purple-500 text-white text-sm font-bold transition-all shadow-md hover:shadow-pink-500/30 hover:-translate-y-0.5"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Instagram className="w-4 h-4" />
                      Instagram
                    </a>
                    <a
                      href={komunitas.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-green-600/80 hover:bg-green-500 text-white text-sm font-bold transition-all shadow-md hover:shadow-green-500/30 hover:-translate-y-0.5"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MessageCircle className="w-4 h-4" />
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

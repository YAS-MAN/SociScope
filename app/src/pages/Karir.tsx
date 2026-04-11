import { useState } from 'react';
import {
  Briefcase,
  CheckCircle,
  Microscope,
  Landmark,
  Users,
  RefreshCw,
  Megaphone,
  Smartphone,
  BarChart3,
  MessageCircle,
  ChevronRight,
  Target,
  Trophy,
  Calendar,
  ArrowRight
} from 'lucide-react';
import CareerMap from '@/components/CareerMap';
import { careers } from '@/data/sociologyData';

// --- DATA DUMMY UNTUK ARTIKEL PRESTASI ---
const achievements = [
  {
    id: 1,
    title: "Kembangkan Inovasi Pemetaan Sosial Desa, Tim Alumni Sosiologi UNESA Raih Penghargaan Nasional",
    category: "Pemberdayaan Masyarakat",
    date: "12 Maret 2026",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800",
    snippet: "Berbekal teori pemberdayaan dan metode riset aksi, kolaborasi apik antara sosiologi dan teknologi berhasil memetakan daerah rawan stunting dengan presisi tinggi..."
  },
  {
    id: 2,
    title: "Dari Kelas ke Kebijakan: Mahasiswa Loloskan Rekomendasi RUU Kesejahteraan Ibu dan Anak",
    category: "Advokasi Kebijakan",
    date: "28 Februari 2026",
    image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800",
    snippet: "Menggunakan kacamata interseksionalitas, kajian mendalam mengenai beban ganda pekerja perempuan sukses menjadi naskah akademik yang diterima di DPR RI..."
  },
  {
    id: 3,
    title: "Tembus Jurnal Internasional Q1 Lewat Riset Fenomena Gentrifikasi Perkotaan",
    category: "Publikasi Ilmiah",
    date: "15 Januari 2026",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800",
    snippet: "Penelitian yang membedah pergeseran struktur kelas dan ruang di kota metropolitan menarik perhatian akademisi global dan membuka peluang beasiswa S2..."
  }
];

export default function Karir() {
  const [selectedCareer, setSelectedCareer] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden py-24">
      {/* Efek Latar Belakang */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-amber/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-navy/10 rounded-full blur-[100px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* HEADER */}
        <div className="text-center mb-16 animate-fadeIn">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-navy/10 border border-navy/20 rounded-full text-sm text-navy font-bold mb-4">
            <Target className="w-4 h-4" />
            Prospek Masa Depan
          </div>
          <h2 className="font-poppins font-bold text-4xl md:text-5xl lg:text-6xl text-navy mb-6">
            Karir Lulusan Sosiologi
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Sosiologi membuka berbagai peluang karir yang menarik dan berdampak luas. Temukan profesi yang sesuai dengan minat dan keahlianmu.
          </p>
        </div>

        {/* CAREER CARDS GRID */}
        <div id="profesi" className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {careers.map((career, index) => {
            const IconComponent = {
              Microscope, Landmark, Users, RefreshCw,
              Megaphone, Smartphone, BarChart3, MessageCircle
            }[career.icon] || Briefcase;

            const isActive = selectedCareer === career.id;

            return (
              <div
                key={career.id}
                className={`group p-6 rounded-3xl border transition-all duration-500 cursor-pointer animate-fadeIn bg-white ${isActive
                    ? 'border-navy shadow-xl ring-4 ring-navy/10'
                    : 'border-slate-200 hover:border-navy/50 hover:shadow-lg shadow-sm'
                  }`}
                style={{ animationDelay: `${index * 50}ms` }}
                onClick={() => setSelectedCareer(isActive ? null : career.id)}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-all duration-500 ${isActive
                    ? 'bg-navy text-white rotate-12 scale-110 shadow-lg shadow-navy/30'
                    : 'bg-navy/10 text-navy group-hover:scale-110 group-hover:bg-navy/20'
                  }`}>
                  <IconComponent className="w-7 h-7" />
                </div>

                <h3 className="font-poppins font-bold text-xl text-navy mb-2 group-hover:text-navy-light transition-colors">
                  {career.title}
                </h3>
                <p className="text-amber-dark font-bold text-sm mb-3">
                  {career.salaryRange}
                </p>
                <p className={`text-slate-600 text-sm leading-relaxed ${isActive ? '' : 'line-clamp-2'}`}>
                  {career.description}
                </p>

                <div
                  className={`grid transition-all duration-500 ease-in-out ${isActive
                      ? "grid-rows-[1fr] opacity-100 mt-6 pt-6 border-t border-slate-100"
                      : "grid-rows-[0fr] opacity-0 mt-0 pt-0 border-t-0 border-transparent"
                    }`}
                >
                  <div className="overflow-hidden space-y-5">
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[2px] block mb-2">Skill Utama</span>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {career.skills.map((skill, i) => (
                          <span key={i} className="text-[10px] px-2 py-1 bg-navy/10 text-navy rounded-md border border-navy/20 font-medium">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[2px]">Persyaratan</span>
                      <ul className="mt-2 space-y-2">
                        {career.requirements.map((req, i) => (
                          <li key={i} className="text-xs text-slate-600 flex items-start gap-2">
                            <CheckCircle className="w-3.5 h-3.5 text-sage shrink-0 mt-0.5" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className={`mt-6 flex items-center gap-2 text-xs font-bold transition-all ${isActive ? 'text-navy' : 'text-slate-400 group-hover:text-navy'
                  }`}>
                  <span>{isActive ? 'Tutup Detail' : 'Lihat Detail'}</span>
                  <ChevronRight className={`w-3 h-3 transition-transform duration-300 ${isActive ? 'rotate-90' : 'group-hover:translate-x-1'}`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* SECTION CAREER MAP */}
        <div id="peta" className="relative group mb-24">
          <div className="absolute inset-0 bg-navy/5 rounded-[40px] blur-3xl -z-10 transition-colors" />
          <div className="bg-white rounded-[40px] p-2 sm:p-8 border border-slate-200 shadow-xl">
            <CareerMap selectedCareerId={selectedCareer} />
          </div>
        </div>

        {/* SECTION BARU: ARTIKEL CAPAIAN PRESTASI */}
        <div id="capaian" className="mb-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-sage/10 rounded-full text-xs text-sage-dark font-bold mb-3 border border-sage/20">
                <Trophy className="w-3.5 h-3.5" />
                Jejak Keberhasilan
              </div>
              <h3 className="text-3xl font-poppins font-bold text-navy">
                Kisah Sukses & Capaian
              </h3>
              <p className="text-slate-600 mt-2 max-w-xl">
                Bukti nyata bagaimana ilmu sosiologi diimplementasikan untuk menciptakan dampak positif di masyarakat luas.
              </p>
            </div>
            <button className="text-sm font-bold text-navy hover:text-sage transition-colors flex items-center gap-2 group w-max">
              Lihat Semua Artikel
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {achievements.map((item) => (
              <article key={item.id} className="bg-white rounded-3xl border border-slate-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                {/* Gambar Thumbnail */}
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <div className="absolute inset-0 bg-navy/20 group-hover:bg-transparent transition-colors z-10" />
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-bold text-navy">
                    {item.category}
                  </div>
                </div>

                {/* Konten Artikel */}
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-3 font-medium">
                    <Calendar className="w-3.5 h-3.5" />
                    {item.date}
                  </div>
                  <h4 className="font-poppins font-bold text-navy text-lg mb-3 line-clamp-3 group-hover:text-sage transition-colors leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-slate-600 text-sm leading-relaxed mb-5 line-clamp-3">
                    {item.snippet}
                  </p>
                  <button className="text-sm font-bold text-sage flex items-center gap-2 group/btn">
                    Baca Selengkapnya
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
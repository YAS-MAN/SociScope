import { useState, useEffect } from "react";
import {
  GraduationCap,
  Briefcase,
  TrendingUp,
  Award,
  CheckCircle2,
} from "lucide-react";
import { careers } from "@/data/sociologyData";

// Menerima ID karir yang sedang diklik user di halaman utama
interface CareerMapProps {
  selectedCareerId: string | null;
}

const careerPaths = [
  {
    id: "academia",
    title: "Jalur Akademik",
    icon: GraduationCap,
    color: "from-navy to-navy-light",
    textColor: "text-navy",
    stages: [
      "Asisten Peneliti",
      "Dosen Muda",
      "Lektor",
      "Lektor Kepala",
      "Guru Besar (Profesor)",
    ],
  },
  {
    id: "corporate",
    title: "Jalur Korporasi (HR/CSR)",
    icon: Briefcase,
    color: "from-amber to-amber-light",
    textColor: "text-amber",
    stages: [
      "Officer/Staff",
      "Supervisor",
      "Asst. Manager",
      "Manager",
      "Director / VP",
    ],
  },
  {
    id: "development",
    title: "Jalur NGO / Development",
    icon: TrendingUp,
    color: "from-sage to-sage-light",
    textColor: "text-sage",
    stages: [
      "Project Officer",
      "Program Manager",
      "Country Director",
      "Regional Director",
      "Global Lead",
    ],
  },
  {
    id: "consultant",
    title: "Jalur Riset & Konsultan",
    icon: Award,
    color: "from-slate-600 to-slate-400",
    textColor: "text-slate-600",
    stages: [
      "Junior Researcher",
      "Research Associate",
      "Senior Consultant",
      "Principal",
      "Partner",
    ],
  },
];

export default function CareerMap({ selectedCareerId }: CareerMapProps) {
  const [activeStage, setActiveStage] = useState<string>("year1_2");
  const [activePath, setActivePath] = useState<string | null>(null);

  // Jika tidak ada karir yang dipilih, gunakan default "Peneliti Sosial" sebagai contoh
  const activeCareerData =
    careers.find((c) => c.id === selectedCareerId) || careers[0];

  // Efek untuk reset tab ke tahun 1 jika user mengganti pilihan karir
  useEffect(() => {
    setActiveStage("year1_2");
  }, [selectedCareerId]);

  // Data struktur tampilan timeline
  const timelineStructure = [
    {
      id: "year1_2",
      title: "Tahun 1-2: Eksplorasi",
      duration: "Semester 1-4",
      data: activeCareerData.roadmap.year1_2,
    },
    {
      id: "year3",
      title: "Tahun 3: Spesialisasi",
      duration: "Semester 5-6",
      data: activeCareerData.roadmap.year3,
    },
    {
      id: "year4",
      title: "Tahun 4: Aplikasi",
      duration: "Semester 7-8",
      data: activeCareerData.roadmap.year4,
    },
    {
      id: "freshgrad",
      title: "Lulusan Baru",
      duration: "0-2 Tahun",
      data: activeCareerData.roadmap.freshgrad,
    },
  ];

  return (
    <div className="space-y-12">
      {/* 1. Timeline Perkuliahan (Sekarang Dinamis!) */}
      <div>
        <div className="mb-8">
          <h3 className="text-2xl font-poppins font-bold text-navy flex items-center gap-3">
            <GraduationCap className="w-8 h-8 text-amber p-1.5 bg-amber/10 rounded-lg shrink-0" />
            Peta Perjalanan Mahasiswa
          </h3>
          <p className="text-slate-500 text-sm mt-2 ml-11">
            Menampilkan roadmap untuk fokus profesi:{" "}
            <span className="font-bold text-navy">
              {activeCareerData.title}
            </span>
          </p>
        </div>

        {/* Timeline Interaktif */}
        <div className="relative mb-10">
          {/* Garis Timeline */}
          <div className="absolute top-5 md:top-6 left-0 right-0 h-1.5 bg-slate-200 rounded-full z-0" />

          <div className="relative flex justify-between z-10">
            {timelineStructure.map((stage, index) => {
              const isActive = activeStage === stage.id;
              return (
                <button
                  key={stage.id}
                  onClick={() => setActiveStage(stage.id)}
                  className="relative flex flex-col items-center group w-1/4"
                >
                  <div
                    className={`w-10 h-10 md:w-12 md:h-12 rounded-2xl flex items-center justify-center font-bold transition-all duration-300 z-10 ${isActive
                      ? "bg-navy text-white scale-110 shadow-[0_0_15px_rgba(26,35,65,0.3)] rotate-3"
                      : "bg-white border-2 border-slate-200 text-slate-400 group-hover:border-navy/50 group-hover:text-navy"
                      }`}
                  >
                    {index + 1}
                  </div>
                  <span
                    className={`mt-4 text-[10px] md:text-sm font-semibold text-center transition-colors bg-white px-2 ${isActive
                      ? "text-navy"
                      : "text-slate-400 group-hover:text-navy"
                      }`}
                  >
                    {stage.title.split(":")[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Stage Detail (Isinya berubah sesuai profesi yang diklik) */}
        <div className="bg-slate-50 rounded-3xl p-6 md:p-8 border border-slate-100 relative overflow-hidden min-h-[250px]">
          {timelineStructure.map(
            (stage) =>
              activeStage === stage.id && (
                <div key={stage.id} className="animate-fadeIn">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                    <h4 className="text-xl font-poppins font-bold text-navy">
                      {stage.title}
                    </h4>
                    <span className="text-xs font-bold px-3 py-1 bg-white border border-slate-200 rounded-full text-slate-500 shadow-sm inline-block w-max">
                      ⏳ {stage.duration}
                    </span>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 md:gap-10">
                    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                      <h5 className="text-sm font-bold text-navy mb-4 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-sage" /> Fokus
                        Skill Sosiologi
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {stage.data.skills.map((skill, i) => (
                          <span
                            key={i}
                            className="text-xs font-medium px-3 py-1.5 bg-sage/10 text-sage-dark rounded-lg border border-sage/20"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                      <h5 className="text-sm font-bold text-navy mb-4 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-amber" /> Peluang /
                        Aktivitas
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {stage.data.opps.map((opp, i) => (
                          <span
                            key={i}
                            className="text-xs font-medium px-3 py-1.5 bg-amber/10 text-amber-dark rounded-lg border border-amber/20"
                          >
                            {opp}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ),
          )}
        </div>
      </div>

      {/* 2. Jalur Karir Profesional */}
      <div className="pt-8 border-t border-slate-200">
        <h3 className="text-2xl font-poppins font-bold text-navy mb-8 flex items-center gap-3">
          <Briefcase className="w-8 h-8 text-navy p-1.5 bg-navy/10 rounded-lg shrink-0" />
          Proyeksi Jalur Karir Lanjutan
        </h3>

        {/* Kotak dibikin items-start agar tidak ngambang */}
        <div className="grid md:grid-cols-2 gap-5 items-start">
          {careerPaths.map((path) => {
            const isActive = activePath === path.id;
            return (
              <div
                key={path.id}
                className={`w-full rounded-2xl border-2 transition-all duration-300 overflow-hidden bg-white ${isActive
                  ? "border-navy shadow-lg shadow-navy/5"
                  : "border-slate-100 hover:border-navy/40 hover:shadow-md"
                  }`}
              >
                {/* AREA KLIK DIPERBESAR FULL 1 KOTAK HEADER */}
                <button
                  onClick={() => setActivePath(isActive ? null : path.id)}
                  className="w-full p-6 flex items-center gap-5 text-left focus:outline-none cursor-pointer"
                >
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${path.color} flex items-center justify-center shrink-0 shadow-inner`}
                  >
                    <path.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-poppins font-bold text-navy text-xl">
                      {path.title}
                    </h4>
                    <p
                      className={`text-sm mt-1 transition-colors ${isActive ? "text-slate-500 font-bold" : "text-slate-400 font-medium"}`}
                    >
                      {isActive ? "Tutup Detail" : "Klik untuk melihat tahapan"}
                    </p>
                  </div>
                </button>

                {/* ANIMASI DROPDOWN DENGAN OVERFLOW HIDDEN YANG BENAR */}
                <div
                  className={`grid transition-all duration-500 ease-in-out px-6 ${isActive
                    ? "grid-rows-[1fr] opacity-100 pb-6 border-t border-slate-100 pt-6"
                    : "grid-rows-[0fr] opacity-0 pb-0 border-t-0 border-transparent pt-0"
                    }`}
                >
                  {/* PENAMBAHAN OVERFLOW-HIDDEN DI SINI AGAR PADDING TERTUTUP SEMPURNA */}
                  <div className="overflow-hidden">
                    <div className="pb-16 pt-16">
                      {/* DESAIN BARU: TIMELINE HORIZONTAL SELANG-SELING FULL WIDTH */}
                      <div className="relative w-full flex items-center justify-between px-6 sm:px-12">
                        {/* Garis horizontal */}
                        <div className="absolute left-6 sm:left-12 right-6 sm:right-12 top-1/2 -translate-y-1/2 h-0.5 bg-slate-200 z-0"></div>

                        {path.stages.map((stage, i) => {
                          const isLast = i === path.stages.length - 1;
                          const isTop = i % 2 === 0;

                          return (
                            <div
                              key={i}
                              className="relative flex flex-col items-center group w-20 shrink-0"
                            >
                              {/* Label Text (Selang-seling) */}
                              <div className={`absolute whitespace-nowrap font-medium text-[10px] sm:text-xs transition-colors ${isLast ? "text-navy font-bold" : "text-slate-600"
                                } ${isTop ? '-top-12' : 'top-8'}`}>
                                <span className="bg-white px-2 py-0.5 rounded-lg inline-block text-center border-slate-100 border shadow-sm">
                                  {stage} {isLast && "🎯"}
                                </span>
                              </div>

                              {/* Garis Penghubung Dot ke Garis Tengah */}
                              <div className={`absolute w-px bg-slate-200 z-0 ${isTop ? '-top-6 h-6' : 'top-3 h-6'}`}></div>

                              {/* Dot Tengah */}
                              <div
                                className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 border-4 border-white transition-transform duration-300 relative z-10 ${isLast
                                  ? "bg-amber text-navy scale-125 shadow-md shadow-amber/20"
                                  : "bg-slate-200 text-slate-500 group-hover:bg-navy group-hover:text-white"
                                  }`}
                              >
                                {i + 1}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Tips Sukses */}
      <div id="tips" className="bg-navy rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        <h3 className="text-xl font-poppins font-bold mb-8 relative z-10">
          Tips Cepat Adaptasi Karir
        </h3>
        <div className="grid md:grid-cols-3 gap-6 relative z-10">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/10 hover:bg-white/20 transition-colors">
            <div className="w-10 h-10 bg-amber rounded-xl flex items-center justify-center mb-4 text-navy font-bold shadow-lg">
              1
            </div>
            <h4 className="font-bold mb-2">Kuasai Tools Teknis</h4>
            <p className="text-xs text-white/70 leading-relaxed">
              Sosiolog modern butuh alat. Pelajari Excel/SPSS/R untuk data
              kuantitatif, dan NVivo/ATLAS.ti untuk kualitatif.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/10 hover:bg-white/20 transition-colors">
            <div className="w-10 h-10 bg-sage rounded-xl flex items-center justify-center mb-4 text-navy font-bold shadow-lg">
              2
            </div>
            <h4 className="font-bold mb-2">Bikin Portofolio Riset</h4>
            <p className="text-xs text-white/70 leading-relaxed">
              Jangan cuma di kepala. Kumpulkan hasil observasi, esai, dan riset
              kuliahmu jadi dokumen rapi (Blog/LinkedIn).
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/10 hover:bg-white/20 transition-colors">
            <div className="w-10 h-10 bg-slate-300 rounded-xl flex items-center justify-center mb-4 text-navy font-bold shadow-lg">
              3
            </div>
            <h4 className="font-bold mb-2">Perluas Jangkauan</h4>
            <p className="text-xs text-white/70 leading-relaxed">
              Ikut konferensi, gabung NGO volunteer, dan ngobrol sama senior.
              Relasi adalah kunci di ilmu sosial.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
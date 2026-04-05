import { useState } from 'react';
import { GraduationCap, Briefcase, TrendingUp, Award, ArrowRight } from 'lucide-react';

interface CareerStage {
  id: string;
  title: string;
  description: string;
  duration: string;
  skills: string[];
  opportunities: string[];
}

const careerStages: CareerStage[] = [
  {
    id: 'freshman',
    title: 'Tahun 1-2: Eksplorasi',
    description: 'Membangun fondasi pemahaman sosiologi dan mengeksplorasi minat',
    duration: 'Semester 1-4',
    skills: ['Membaca teks akademik', 'Menulis esai', 'Dasar statistik', 'Observasi sosial'],
    opportunities: ['Organisasi kampus', 'Volunteer komunitas', 'Diskusi ilmiah']
  },
  {
    id: 'sophomore',
    title: 'Tahun 3: Spesialisasi',
    description: 'Memilih fokus dan membangun keahlian spesifik',
    duration: 'Semester 5-6',
    skills: ['Metode penelitian', 'Analisis data', 'Software statistik', 'Wawancara'],
    opportunities: ['Asisten riset dosen', 'Magang NGO', 'Lomba karya tulis']
  },
  {
    id: 'junior',
    title: 'Tahun 4: Aplikasi',
    description: 'Menerapkan pengetahuan dalam praktik dan membangun portofolio',
    duration: 'Semester 7-8',
    skills: ['Penelitian mandiri', 'Analisis kebijakan', 'Presentasi', 'Networking'],
    opportunities: ['Skripsi/TA', 'Magang korporasi', 'Konferensi']
  },
  {
    id: 'graduate',
    title: 'Lulusan: Transisi',
    description: 'Memasuki dunia kerja atau melanjutkan studi',
    duration: '0-2 tahun',
    skills: ['Job hunting', 'Wawancara kerja', 'Adaptasi profesional'],
    opportunities: ['Entry level positions', 'Beasiswa S2', 'Startup sosial']
  },
  {
    id: 'professional',
    title: 'Profesional: Pengembangan',
    description: 'Membangun karir dan keahlian lanjutan',
    duration: '2-5 tahun',
    skills: ['Kepemimpinan', 'Manajemen proyek', 'Spesialisasi domain', 'Mentoring'],
    opportunities: ['Promosi jabatan', 'Sertifikasi profesional', 'Jaringan industri']
  },
  {
    id: 'expert',
    title: 'Expert: Kepemimpinan',
    description: 'Menjadi pemimpin pemikiran dan mengubah sistem',
    duration: '5+ tahun',
    skills: ['Strategic thinking', 'Pengaruh kebijakan', 'Inovasi sosial', 'Publikasi'],
    opportunities: ['Kepala divisi', 'Dosen/Peneliti senior', 'Konsultan senior', 'Pengusaha sosial']
  }
];

const careerPaths = [
  {
    id: 'academia',
    title: 'Jalur Akademik',
    icon: GraduationCap,
    color: 'from-navy to-navy-light',
    stages: ['Dosen Asisten', 'Dosen', 'Lektor Kepala', 'Profesor', 'Guru Besar']
  },
  {
    id: 'corporate',
    title: 'Jalur Korporat',
    icon: Briefcase,
    color: 'from-sage to-sage-light',
    stages: ['Analis/Staff', 'Supervisor', 'Manager', 'Senior Manager', 'Director']
  },
  {
    id: 'development',
    title: 'Jalur Development',
    icon: TrendingUp,
    color: 'from-amber to-amber-light',
    stages: ['Program Officer', 'Project Manager', 'Country Director', 'Regional Director', 'Global Lead']
  },
  {
    id: 'consultant',
    title: 'Jalur Konsultan',
    icon: Award,
    color: 'from-purple-600 to-purple-400',
    stages: ['Junior Consultant', 'Consultant', 'Senior Consultant', 'Principal', 'Partner']
  }
];

export default function CareerMap() {
  const [activeStage, setActiveStage] = useState<string>('freshman');
  const [activePath, setActivePath] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      {/* Timeline Perkuliahan */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-poppins font-bold text-navy mb-6 flex items-center gap-2">
          <GraduationCap className="w-6 h-6 text-sage" />
          Perjalanan Perkuliahan
        </h3>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute top-6 left-0 right-0 h-1 bg-slate-200 rounded-full" />
          
          {/* Timeline points */}
          <div className="relative flex justify-between">
            {careerStages.slice(0, 4).map((stage, index) => (
              <button
                key={stage.id}
                onClick={() => setActiveStage(stage.id)}
                className={`relative flex flex-col items-center group ${
                  activeStage === stage.id ? 'z-10' : ''
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                    activeStage === stage.id
                      ? 'bg-gradient-to-br from-navy to-sage text-white scale-110 shadow-lg'
                      : 'bg-white border-2 border-slate-300 text-slate-500 group-hover:border-sage'
                  }`}
                >
                  {index + 1}
                </div>
                <span
                  className={`mt-2 text-xs font-medium text-center max-w-[80px] ${
                    activeStage === stage.id ? 'text-navy' : 'text-slate-500'
                  }`}
                >
                  {stage.title.split(':')[0]}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Stage Detail */}
        <div className="mt-8 p-6 bg-slate-50 rounded-xl">
          {careerStages.slice(0, 4).map(stage => (
            activeStage === stage.id && (
              <div key={stage.id} className="animate-fadeIn">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-navy">{stage.title}</h4>
                  <span className="text-sm text-sage font-medium">{stage.duration}</span>
                </div>
                <p className="text-slate-600 mb-4">{stage.description}</p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-sm font-medium text-navy mb-2">Skill yang Dibangun</h5>
                    <div className="flex flex-wrap gap-2">
                      {stage.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="text-xs px-3 py-1 bg-navy/10 text-navy rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-navy mb-2">Peluang</h5>
                    <div className="flex flex-wrap gap-2">
                      {stage.opportunities.map((opp, i) => (
                        <span
                          key={i}
                          className="text-xs px-3 py-1 bg-sage/10 text-sage rounded-full"
                        >
                          {opp}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )
          ))}
        </div>
      </div>

      {/* Jalur Karir Profesional */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-poppins font-bold text-navy mb-6 flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-sage" />
          Jalur Karir Profesional
        </h3>

        <div className="grid md:grid-cols-2 gap-4">
          {careerPaths.map(path => (
            <button
              key={path.id}
              onClick={() => setActivePath(activePath === path.id ? null : path.id)}
              className={`p-4 rounded-xl border-2 text-left transition-all ${
                activePath === path.id
                  ? 'border-amber bg-amber/5'
                  : 'border-slate-200 hover:border-sage/50'
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${path.color} flex items-center justify-center`}>
                  <path.icon className="w-5 h-5 text-white" />
                </div>
                <h4 className="font-semibold text-navy">{path.title}</h4>
              </div>

              {activePath === path.id && (
                <div className="mt-4 pt-4 border-t border-slate-200 animate-fadeIn">
                  <div className="space-y-3">
                    {path.stages.map((stage, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-sage/20 text-sage flex items-center justify-center text-xs font-bold">
                          {i + 1}
                        </div>
                        <span className="text-sm text-slate-700">{stage}</span>
                        {i < path.stages.length - 1 && (
                          <ArrowRight className="w-4 h-4 text-slate-300 ml-auto" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activePath !== path.id && (
                <p className="text-sm text-slate-500">
                  Klik untuk melihat jenjang karir
                </p>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tips Sukses */}
      <div className="bg-gradient-to-r from-navy to-navy-light rounded-2xl p-6 text-white">
        <h3 className="text-xl font-poppins font-bold mb-4">Tips Sukses Lulusan Sosiologi</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white/10 rounded-xl p-4">
            <div className="w-10 h-10 bg-amber rounded-lg flex items-center justify-center mb-3">
              <span className="text-lg font-bold">1</span>
            </div>
            <h4 className="font-semibold mb-2">Bangun Skill Teknis</h4>
            <p className="text-sm text-white/80">
              Pelajari tools: SPSS/R/Python untuk data, Canva/Figma untuk desain, dan platform digital marketing.
            </p>
          </div>
          <div className="bg-white/10 rounded-xl p-4">
            <div className="w-10 h-10 bg-amber rounded-lg flex items-center justify-center mb-3">
              <span className="text-lg font-bold">2</span>
            </div>
            <h4 className="font-semibold mb-2">Ciptakan Portofolio</h4>
            <p className="text-sm text-white/80">
              Dokumentasikan setiap proyek, riset, dan magang. Buat blog atau LinkedIn aktif.
            </p>
          </div>
          <div className="bg-white/10 rounded-xl p-4">
            <div className="w-10 h-10 bg-amber rounded-lg flex items-center justify-center mb-3">
              <span className="text-lg font-bold">3</span>
            </div>
            <h4 className="font-semibold mb-2">Jaringan & Komunitas</h4>
            <p className="text-sm text-white/80">
              Bergabung dengan asosiasi sosiologi, ikuti webinar, dan bangun relasi dengan praktisi.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

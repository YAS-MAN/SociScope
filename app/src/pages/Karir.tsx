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
  ExternalLink,
  Newspaper
}

  from 'lucide-react';
import CareerMap from '@/components/CareerMap';
import { useAdminStore } from '@/store/useAdminStore';

export default function Karir() {
  const careers = useAdminStore((state) => state.careers);
  const [selectedCareer, setSelectedCareer] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white relative overflow-hidden py-24">

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
            const isImageUrl = career.icon?.startsWith('http') || career.icon?.startsWith('/');
            const IconComponent = {
              Microscope, Landmark, Users, RefreshCw,
              Megaphone, Smartphone, BarChart3, MessageCircle, Briefcase
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
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-all duration-500 overflow-hidden ${isActive
                  ? 'bg-navy text-white rotate-12 scale-110 shadow-lg shadow-navy/30'
                  : 'bg-navy/10 text-navy group-hover:scale-110 group-hover:bg-navy/20'
                  }`}>
                  {isImageUrl ? (
                    <img src={career.icon} alt={career.title} className="w-full h-full object-cover" />
                  ) : (
                    <IconComponent className="w-7 h-7" />
                  )}
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
      </div>
    </div>
  );
}
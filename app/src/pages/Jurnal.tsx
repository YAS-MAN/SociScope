import { ExternalLink, BookOpen } from "lucide-react";
import { useAdminStore } from '@/store/useAdminStore';

export default function Jurnal() {
  const jurnals = useAdminStore((state) => state.jurnals);

  return (
    <div className="min-h-screen bg-slate-50 py-32 px-4">
      <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-200">
        <h1 className="text-3xl font-poppins font-bold text-navy mb-6 flex items-center gap-3">
          <BookOpen className="w-8 h-8 text-sage" /> Referensi Jurnal
        </h1>
        <div className="prose prose-slate text-slate-600 space-y-4 leading-relaxed">
          <p>Kumpulan referensi jurnal akademik untuk membantu penelitian dan pemahaman sosiologi Anda:</p>
          <ul className="space-y-4 list-none pl-0 mt-8">
            {jurnals.length > 0 ? jurnals.map((jurnal) => (
              <li key={jurnal.id} className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-start gap-4 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-full bg-sage/10 flex items-center justify-center shrink-0 mt-1">
                  <ExternalLink className="w-5 h-5 text-sage" />
                </div>
                <div>
                  <a href={jurnal.link} target="_blank" rel="noopener noreferrer" className="text-lg font-bold text-navy hover:text-sage transition-colors">
                    {jurnal.title}
                  </a>
                  <p className="text-sm text-slate-500 mt-1">{jurnal.description}</p>
                </div>
              </li>
            )) : (
              <p className="text-slate-500 italic text-center py-6">Belum ada daftar jurnal yang ditambahkan via panel admin.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

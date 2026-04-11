import { useState } from 'react';
import { useAdminStore } from '@/store/useAdminStore';
import { Edit2, Plus, Search, Info } from 'lucide-react';
import { toast } from 'sonner';

export default function CareerManager() {
  const { careers, role } = useAdminStore();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCareers = careers.filter(c => 
    c.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAction = (action: string) => {
    if (role === 'Editor Prodi') {
      toast.error('Akses Ditolak: Kewenangan Anda hanya untuk membalas pesan.');
      return;
    }
    toast.info(`Fitur Edit/Tambah Karir: ${action} sedang dalam pengembangan.`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative w-full sm:w-96">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Cari profesi karir..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-amber focus:ring-1 focus:ring-amber shadow-sm"
          />
        </div>
        
        <button 
          onClick={() => handleAction('Tambah Karir')}
          className="bg-navy hover:bg-navy-light text-white font-bold px-4 py-2.5 rounded-xl shadow-md transition-colors flex items-center gap-2 text-sm whitespace-nowrap"
        >
          <Plus className="w-4 h-4" /> Tambah Roadmap
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredCareers.map((career) => (
          <div key={career.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-bold text-navy text-lg leading-tight">{career.title}</h3>
              <button 
                onClick={() => handleAction(career.id)}
                className="p-2 bg-slate-50 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors border border-slate-100"
                title="Edit Karir"
              >
                <Edit2 className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm text-slate-500 mb-4 line-clamp-2 flex-1">{career.description}</p>
            
            <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-100 space-y-3 mt-auto">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Kisaran Gaji</span>
                <span className="text-sm font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md inline-block">{career.salaryRange}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Top Skillset</span>
                <div className="flex flex-wrap gap-1">
                  {career.skills.slice(0, 3).map((skill, idx) => (
                    <span key={idx} className="text-[10px] font-medium bg-white border border-slate-200 px-2 py-1 rounded-md text-slate-600">
                      {skill}
                    </span>
                  ))}
                  {career.skills.length > 3 && (
                    <span className="text-[10px] font-medium bg-slate-100 text-slate-500 px-2 py-1 rounded-md">+{career.skills.length - 3}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredCareers.length === 0 && (
          <div className="col-span-full p-12 text-center text-slate-400 border-2 border-dashed border-slate-200 rounded-2xl">
            <Info className="w-12 h-12 mx-auto mb-3 opacity-20" />
            <p>Pencarian profesi tidak ditemukan.</p>
          </div>
        )}
      </div>
    </div>
  );
}

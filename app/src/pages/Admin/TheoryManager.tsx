import { useState } from 'react';
import { useAdminStore } from '@/store/useAdminStore';
import type { Theory } from '@/data/sociologyData';
import { Edit2, Plus, Search, Info } from 'lucide-react';
import { toast } from 'sonner';

export default function TheoryManager() {
  const { theories, role } = useAdminStore();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTheories = theories.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.founder.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAction = (action: string) => {
    if (role === 'Editor Prodi') {
      toast.error('Akses Ditolak: Kewenangan Anda hanya untuk membalas pesan.');
      return;
    }
    // Implementasi sebenarnya jika Super Admin
    toast.info(`Mode Edit/Tambah ${action} diklik. (Fungsi Simulasi)`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative w-full sm:w-96">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Cari teori atau tokoh..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-amber focus:ring-1 focus:ring-amber shadow-sm"
          />
        </div>
        
        <button 
          onClick={() => handleAction('Tambah Teori')}
          className="bg-navy hover:bg-navy-light text-white font-bold px-4 py-2.5 rounded-xl shadow-md transition-colors flex items-center gap-2 text-sm whitespace-nowrap"
        >
          <Plus className="w-4 h-4" /> Tambah Teori Baru
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-bold">
                <th className="p-4">Nama Teori</th>
                <th className="p-4">Tokoh</th>
                <th className="p-4">Tahun</th>
                <th className="p-4">Skala & Fokus</th>
                <th className="p-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTheories.map((theory) => (
                <tr key={theory.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="p-4">
                    <div className="font-bold text-navy text-sm mb-1">{theory.name}</div>
                    <div className="text-xs text-slate-500 line-clamp-1 max-w-xs">{theory.description}</div>
                  </td>
                  <td className="p-4 font-medium text-slate-600 text-sm whitespace-nowrap">{theory.founder}</td>
                  <td className="p-4 text-slate-500 text-sm font-mono">{theory.year}</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                       <span className="px-2 py-1 bg-sage/10 text-sage-dark border border-sage/20 rounded-md text-[10px] font-bold uppercase">{theory.scale}</span>
                       <span className="px-2 py-1 bg-amber/10 text-amber-700 border border-amber/20 rounded-md text-[10px] font-bold uppercase">{theory.focus}</span>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <button 
                      onClick={() => handleAction(theory.id)}
                      className="inline-flex items-center justify-center p-2 rounded-lg bg-slate-100 text-slate-500 hover:bg-amber/20 hover:text-amber-700 transition-colors"
                      title="Edit Data"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredTheories.length === 0 && (
          <div className="p-12 text-center text-slate-400">
            <Info className="w-12 h-12 mx-auto mb-3 opacity-20" />
            <p>Pencarian tidak ditemukan.</p>
          </div>
        )}
      </div>
    </div>
  );
}

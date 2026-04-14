import { useState } from 'react';
import { useAdminStore } from '@/store/useAdminStore';
import type { Theory } from '@/data/sociologyData';
import { Edit2, Plus, Search, Info, Trash2, X } from 'lucide-react';
import { toast } from 'sonner';

export default function TheoryManager() {
  const { theories, role, addTheory, updateTheory, deleteTheory } = useAdminStore();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Extend Partial<Theory> to hold raw text for array fields
  type FormData = Partial<Theory> & {
    objectsText?: string;
    keyConceptsText?: string;
  };

  const [formData, setFormData] = useState<FormData>({
    name: '',
    founder: '',
    year: '',
    scale: 'makro',
    focus: 'konflik',
    difficulty: 'sedang',
    description: '',
    objects: [],
    keyConcepts: [],
    objectsText: '',
    keyConceptsText: '',
    exampleCase: { title: '', description: '', analysis: '' }
  });

  const filteredTheories = theories.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.founder.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const checkRole = () => {
    if (role === 'Editor Prodi') {
      toast.error('Akses Ditolak: Kewenangan Anda hanya untuk membalas pesan.');
      return false;
    }
    return true;
  };

  const handleOpenAdd = () => {
    if (!checkRole()) return;
    setEditingId(null);
    setFormData({
      name: '', founder: '', year: '', scale: 'makro', focus: 'konflik', difficulty: 'sedang',
      description: '', objects: [], keyConcepts: [],
      objectsText: '', keyConceptsText: '',
      exampleCase: { title: '', description: '', analysis: '' }
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (theory: Theory) => {
    if (!checkRole()) return;
    setEditingId(theory.id);
    setFormData({
      ...theory,
      objectsText: theory.objects?.join(', '),
      keyConceptsText: theory.keyConcepts?.join(', ')
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string, name: string) => {
    if (!checkRole()) return;
    if (window.confirm(`Yakin ingin menghapus teori "${name}"?`)) {
      deleteTheory(id);
      toast.success('Teori berhasil dihapus!');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.founder) {
      toast.error('Nama dan Tokoh wajib diisi!');
      return;
    }

    const finalData = {
      ...formData,
      objects: formData.objectsText !== undefined ? formData.objectsText.split(',').map(s=>s.trim()).filter(Boolean) : formData.objects,
      keyConcepts: formData.keyConceptsText !== undefined ? formData.keyConceptsText.split(',').map(s=>s.trim()).filter(Boolean) : formData.keyConcepts
    };
    
    // clean up temp strings
    delete finalData.objectsText;
    delete finalData.keyConceptsText;

    if (editingId) {
      updateTheory(editingId, finalData);
      toast.success('Teori berhasil diperbarui!');
    } else {
      const newTheory = {
        ...finalData,
        id: `teori-${Date.now()}`
      } as Theory;
      addTheory(newTheory);
      toast.success('Teori baru berhasil ditambahkan!');
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* HEADER BAR */}
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
          onClick={handleOpenAdd}
          className="bg-navy hover:bg-navy-light text-white font-bold px-4 py-2.5 rounded-xl shadow-md transition-colors flex items-center gap-2 text-sm whitespace-nowrap"
        >
          <Plus className="w-4 h-4" /> Tambah Teori Baru
        </button>
      </div>

      {/* TABLE */}
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
                    <div className="flex items-center justify-center gap-2">
                      <button 
                        onClick={() => handleOpenEdit(theory)}
                        className="p-2 rounded-lg bg-slate-100 text-slate-500 hover:bg-amber/20 hover:text-amber-700 transition-colors"
                        title="Edit Data"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(theory.id, theory.name)}
                        className="p-2 rounded-lg bg-slate-100 text-slate-500 hover:bg-red-500/20 hover:text-red-600 transition-colors"
                        title="Hapus Data"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
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

      {/* MODAL FORM */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-navy/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl relative custom-scrollbar">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 p-2 bg-slate-100 text-slate-500 hover:bg-slate-200 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="p-8 border-b border-slate-100">
              <h3 className="font-poppins font-bold text-2xl text-navy">
                {editingId ? 'Edit Teori Sosiologi' : 'Tambah Teori Baru'}
              </h3>
              <p className="text-slate-500 text-sm mt-1">Lengkapi data teori untuk ditampilkan di halaman depan.</p>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-navy mb-2">Nama Teori</label>
                  <input required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber text-sm" placeholder="Contoh: Teori Alienasi" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-navy mb-2">Tokoh / Founder</label>
                  <input required value={formData.founder} onChange={(e) => setFormData({...formData, founder: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber text-sm" placeholder="Contoh: Karl Marx" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-navy mb-2">Tahun Perkiraan</label>
                  <input value={formData.year} onChange={(e) => setFormData({...formData, year: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber text-sm" placeholder="Contoh: 1844" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-navy mb-2">Tingkat Kesulitan</label>
                  <select value={formData.difficulty} onChange={(e) => setFormData({...formData, difficulty: e.target.value as "mudah" | "sedang" | "lanjut"})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber text-sm">
                    <option value="mudah">Mudah</option>
                    <option value="sedang">Sedang</option>
                    <option value="lanjut">Lanjut</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-navy mb-2">Skala</label>
                  <select value={formData.scale} onChange={(e) => setFormData({...formData, scale: e.target.value as "makro" | "meso" | "mikro"})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber text-sm">
                    <option value="makro">Makro</option>
                    <option value="meso">Meso</option>
                    <option value="mikro">Mikro</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-navy mb-2">Fokus</label>
                  <select value={formData.focus} onChange={(e) => setFormData({...formData, focus: e.target.value as "konflik" | "konsensus" | "makna" | "perubahan"})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber text-sm">
                    <option value="konflik">Konflik</option>
                    <option value="konsensus">Konsensus</option>
                    <option value="makna">Makna</option>
                    <option value="perubahan">Perubahan</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-navy mb-2">Deskripsi Utama</label>
                <textarea required value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl min-h-24 focus:outline-none focus:border-amber text-sm" placeholder="Jelaskan argumen utama teori ini..."></textarea>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-navy mb-2">Konsep Kunci (Pisahkan koma)</label>
                  <textarea value={formData.keyConceptsText ?? ''} onChange={(e) => setFormData({...formData, keyConceptsText: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl h-24 focus:outline-none focus:border-amber text-sm" placeholder="Eksploitasi, Kapitalisme, Borjuis..."></textarea>
                </div>
                <div>
                  <label className="block text-sm font-bold text-navy mb-2">Objek Kajian (Pisahkan koma)</label>
                  <textarea value={formData.objectsText ?? ''} onChange={(e) => setFormData({...formData, objectsText: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl h-24 focus:outline-none focus:border-amber text-sm" placeholder="Ekonomi, Kelas Sosial..."></textarea>
                </div>
              </div>

              <div className="bg-sage/5 p-6 rounded-xl border border-sage/20 space-y-4">
                <h4 className="font-bold text-navy text-sm">Studi Kasus Indonesia (Contoh Kasus)</h4>
                <input required value={formData.exampleCase?.title} onChange={(e) => setFormData({...formData, exampleCase: {...formData.exampleCase!, title: e.target.value}})} className="w-full p-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-sage text-sm" placeholder="Judul Kasus (Cth: Ketimpangan Upah di Industri)" />
                <textarea required value={formData.exampleCase?.description} onChange={(e) => setFormData({...formData, exampleCase: {...formData.exampleCase!, description: e.target.value}})} className="w-full p-3 bg-white border border-slate-200 rounded-xl h-20 focus:outline-none focus:border-sage text-sm" placeholder="Kronologi/Deskripsi Kasus..."></textarea>
                <textarea required value={formData.exampleCase?.analysis} onChange={(e) => setFormData({...formData, exampleCase: {...formData.exampleCase!, analysis: e.target.value}})} className="w-full p-3 bg-white border border-slate-200 rounded-xl h-20 focus:outline-none focus:border-sage text-sm" placeholder="Analisis menggunakan teori ini..."></textarea>
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3 font-bold text-slate-500 hover:bg-slate-100 rounded-xl transition-colors">
                  Batal
                </button>
                <button type="submit" className="px-6 py-3 font-bold text-white bg-amber hover:bg-amber-600 rounded-xl shadow-lg shadow-amber/20 transition-all">
                  Simpan Teori
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

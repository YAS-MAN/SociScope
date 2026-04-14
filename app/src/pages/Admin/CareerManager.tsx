import { useState } from 'react';
import { useAdminStore } from '@/store/useAdminStore';
import type { Career } from '@/data/sociologyData';
import { Edit2, Plus, Search, Info, Trash2, X } from 'lucide-react';
import { toast } from 'sonner';

export default function CareerManager() {
  const { careers, role, updateCareer } = useAdminStore();
  // We need addCareer & deleteCareer in useAdminStore, but wait! Are they there?
  // Let me add them locally to the code or assume they will be added?
  // I will just use supabase directly if they aren't, or I should update useAdminStore.
  // Wait, I didn't add addCareer/deleteCareer to useAdminStore in the previous step? Let's check.
  // Actually I did not. I only had updateCareer! I must add addCareer and deleteCareer to store, or just implement them here.
  // To keep it clean, I will just call supabase from here and then initFetch, OR I can quickly update the store.
  
  // The simplest is to use useAdminStore actions. I will assume I'll add addCareer / deleteCareer to store immediately after.
  
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  type CareerFormData = Partial<Career> & {
    skillsText?: string;
    requirementsText?: string;
  };

  const [formData, setFormData] = useState<CareerFormData>({
    title: '',
    icon: '',
    description: '',
    salaryRange: '',
    skills: [],
    requirements: [],
    skillsText: '',
    requirementsText: ''
  });

  const filteredCareers = careers.filter(c => 
    c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.description.toLowerCase().includes(searchTerm.toLowerCase())
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
      title: '', icon: '', description: '', salaryRange: '', skills: [], requirements: [],
      skillsText: '', requirementsText: ''
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (career: Career) => {
    if (!checkRole()) return;
    setEditingId(career.id);
    setFormData({
      ...career,
      skillsText: career.skills?.join(', '),
      requirementsText: career.requirements?.join(', ')
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string, title: string) => {
    if (!checkRole()) return;
    if (window.confirm(`Yakin ingin menghapus profesi "${title}"?`)) {
      // Direct supabase call since I forgot to add deleteCareer to store
      import('@/lib/supabase').then(async ({ supabase }) => {
        try {
          const { error } = await supabase.from('careers').delete().eq('id', id);
          if (error) throw error;
          toast.success('Karir berhasil dihapus!');
          useAdminStore.getState().initFetch();
        } catch {
          toast.error('Gagal menghapus karir');
        }
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      toast.error('Judul dan Deskripsi wajib diisi!');
      return;
    }

    const finalData = {
      ...formData,
      skills: formData.skillsText !== undefined ? formData.skillsText.split(',').map(s=>s.trim()).filter(Boolean) : formData.skills,
      requirements: formData.requirementsText !== undefined ? formData.requirementsText.split(',').map(s=>s.trim()).filter(Boolean) : formData.requirements
    };

    delete finalData.skillsText;
    delete finalData.requirementsText;

    if (editingId) {
      updateCareer(editingId, finalData);
      toast.success('Karir berhasil diperbarui!');
    } else {
      const newCareer = {
        ...finalData,
        id: `career-${Date.now()}`
      } as Career;
      
      import('@/lib/supabase').then(async ({ supabase }) => {
        try {
          const { error } = await supabase.from('careers').insert([newCareer]);
          if (error) throw error;
          toast.success('Karir baru berhasil ditambahkan!');
          useAdminStore.getState().initFetch();
        } catch {
          toast.error('Gagal menambah karir');
        }
      });
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
            placeholder="Cari profesi karir..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-amber focus:ring-1 focus:ring-amber shadow-sm"
          />
        </div>
        
        <button 
          onClick={handleOpenAdd}
          className="bg-navy hover:bg-navy-light text-white font-bold px-4 py-2.5 rounded-xl shadow-md transition-colors flex items-center gap-2 text-sm whitespace-nowrap"
        >
          <Plus className="w-4 h-4" /> Tambah Roadmap
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredCareers.map((career) => (
          <div key={career.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col relative group">
            
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-bold text-navy text-lg leading-tight w-4/5">{career.title}</h3>
              <div className="flex flex-col gap-1">
                <button 
                  onClick={() => handleOpenEdit(career)}
                  className="p-1.5 bg-slate-50 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-md transition-colors border border-slate-100"
                  title="Edit Karir"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button 
                  onClick={() => handleDelete(career.id, career.title)}
                  className="p-1.5 bg-slate-50 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors border border-slate-100"
                  title="Hapus Karir"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            
            <p className="text-sm text-slate-500 mb-4 line-clamp-3">{career.description}</p>
            
            <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-100 space-y-3 mt-auto">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Kisaran Gaji</span>
                <span className="text-sm font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md inline-block">{career.salaryRange || 'Belum diisi'}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Top Skillset</span>
                <div className="flex flex-wrap gap-1">
                  {career.skills?.slice(0, 3).map((skill, idx) => (
                    <span key={idx} className="text-[10px] font-medium bg-white border border-slate-200 px-2 py-1 rounded-md text-slate-600">
                      {skill}
                    </span>
                  ))}
                  {career.skills && career.skills.length > 3 && (
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

       {/* MODAL FORM */}
       {isModalOpen && (
        <div className="fixed inset-0 bg-navy/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative custom-scrollbar">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 p-2 bg-slate-100 text-slate-500 hover:bg-slate-200 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="p-8 border-b border-slate-100">
              <h3 className="font-poppins font-bold text-2xl text-navy">
                {editingId ? 'Edit Karir Roadmap' : 'Tambah Karir Roadmap'}
              </h3>
              <p className="text-slate-500 text-sm mt-1">Kelola data prospek karir untuk lulusan Sosiologi.</p>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-navy mb-2">Pekerjaan / Posisi</label>
                  <input required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber text-sm" placeholder="Contoh: Ahli Data Sosiologi" />
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-navy mb-2">URL Gambar / Ikon Profesi</label>
                    <input value={formData.icon} onChange={(e) => setFormData({...formData, icon: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber text-sm" placeholder="Contoh: https://example.com/image.png" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-navy mb-2">Kisaran Gaji</label>
                    <input value={formData.salaryRange} onChange={(e) => setFormData({...formData, salaryRange: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber text-sm" placeholder="Contoh: Rp 6.000.000 - Rp 15.000.000" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-navy mb-2">Deskripsi Deskriptif</label>
                  <textarea required value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl h-24 focus:outline-none focus:border-amber text-sm" placeholder="Jelaskan peran karir ini..."></textarea>
                </div>

                <div>
                  <label className="block text-sm font-bold text-navy mb-2">Keahlian (Skills) - Pisahkan Koma</label>
                  <textarea value={formData.skillsText ?? ''} onChange={(e) => setFormData({...formData, skillsText: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl h-20 focus:outline-none focus:border-amber text-sm" placeholder="Analisis Data, Penelitian, SPPS, R..."></textarea>
                </div>

                <div>
                  <label className="block text-sm font-bold text-navy mb-2">Persyaratan - Pisahkan Koma</label>
                  <textarea value={formData.requirementsText ?? ''} onChange={(e) => setFormData({...formData, requirementsText: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl h-20 focus:outline-none focus:border-amber text-sm" placeholder="S1 Sosiologi, Berpengalaman Survei..."></textarea>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3 font-bold text-slate-500 hover:bg-slate-100 rounded-xl transition-colors">
                  Batal
                </button>
                <button type="submit" className="px-6 py-3 font-bold text-white bg-amber hover:bg-amber-600 rounded-xl shadow-lg shadow-amber/20 transition-all">
                  Simpan Karir
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

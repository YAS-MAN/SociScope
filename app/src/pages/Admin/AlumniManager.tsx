import { useState } from 'react';
import { useAdminStore } from '@/store/useAdminStore';
import type { AlumniItem } from '@/store/useAdminStore';
import { Plus, Edit2, Trash2, X, Search, GraduationCap } from 'lucide-react';
import { toast } from 'sonner';

export default function AlumniManager() {
  const { alumniData, addAlumni, updateAlumni, deleteAlumni, role } = useAdminStore();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  const [formData, setFormData] = useState<Partial<AlumniItem>>({
    name: '',
    role: '',
    agency: '',
    imgColor: 'bg-blue-500'
  });

  const checkRole = () => {
    if (role !== 'Super Admin') {
      toast.error('Hanya Super Admin yang dapat mengubah data!');
      return false;
    }
    return true;
  };

  const handleOpenAdd = () => {
    if (!checkRole()) return;
    setEditingId(null);
    setFormData({
      name: '', role: '', agency: '', imgColor: 'bg-blue-500'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (alumni: AlumniItem) => {
    if (!checkRole()) return;
    setEditingId(alumni.id);
    setFormData(alumni);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (!checkRole()) return;
    if (confirm('Yakin ingin menghapus alumni ini?')) {
      deleteAlumni(id);
      toast.success('Alumni berhasil dihapus');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.role || !formData.agency) {
      toast.error('Semua kolom wajib diisi!');
      return;
    }

    if (editingId) {
      updateAlumni(editingId, formData);
      toast.success('Data alumni berhasil diperbarui!');
    } else {
      const newAlumni = {
        ...formData
      } as AlumniItem;
      addAlumni(newAlumni);
      toast.success('Alumni baru berhasil ditambahkan!');
    }
    setIsModalOpen(false);
  };

  const filteredAlumni = alumniData.filter(a => 
    a.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    a.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-poppins font-bold text-navy">Manajemen Alumni</h2>
          <p className="text-slate-500 mt-2">Sistem Informasi Alumni Sosiologi</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-6 py-3 bg-amber hover:bg-amber-dark text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-amber/20"
        >
          <Plus className="w-5 h-5" />
          <span>Tambah Alumni</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200">
          <div className="flex items-center gap-3 bg-slate-50 px-4 py-3 rounded-lg border border-slate-200 w-96">
            <Search className="w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Cari nama alumni..."
              className="bg-transparent border-none outline-none text-sm w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-sm">
                <th className="p-4 font-bold">Nama Alumni</th>
                <th className="p-4 font-bold">Role / Pekerjaan</th>
                <th className="p-4 font-bold">Instansi</th>
                <th className="p-4 font-bold">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredAlumni.map((alumni) => (
                <tr key={alumni.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold bg-cover bg-center overflow-hidden ${!alumni.imgColor.startsWith('http') && !alumni.imgColor.startsWith('data:') ? alumni.imgColor : 'bg-slate-200'}`}>
                        {alumni.imgColor.startsWith('http') || alumni.imgColor.startsWith('data:') ? (
                           <img src={alumni.imgColor} alt={alumni.name} className="w-full h-full object-cover" />
                        ) : (
                           alumni.name.charAt(0)
                        )}
                      </div>
                      <span className="font-bold text-navy">{alumni.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-slate-600">{alumni.role}</td>
                  <td className="p-4 text-slate-600">
                    <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-medium">
                      {alumni.agency}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleOpenEdit(alumni)}
                        className="p-2 text-amber hover:bg-amber/10 rounded-lg transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(alumni.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              
              {filteredAlumni.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center">
                      <GraduationCap className="w-12 h-12 text-slate-300 mb-3" />
                      <p>Belum ada data alumni.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-navy/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="bg-white rounded-3xl w-full max-w-xl relative hidden-scrollbar overflow-y-auto max-h-[90vh] shadow-2xl animate-scaleIn">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white/90 backdrop-blur-md z-10">
              <div>
                <h3 className="font-poppins font-bold text-2xl text-navy">
                  {editingId ? 'Edit Alumni' : 'Tambah Alumni'}
                </h3>
                <p className="text-sm text-slate-500 mt-1">Lengkapi informasi biodata karir alumni.</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div>
                <label className="block text-sm font-bold text-navy mb-2">Nama Lengkap</label>
                <input required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber text-sm" placeholder="Contoh: Budi Santoso, S.Sos..." />
              </div>

              <div>
                <label className="block text-sm font-bold text-navy mb-2">Jabatan / Peran Saat Ini</label>
                <input required value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber text-sm" placeholder="Contoh: HR Manager" />
              </div>

              <div>
                <label className="block text-sm font-bold text-navy mb-2">Instansi / Perusahaan</label>
                <input required value={formData.agency} onChange={(e) => setFormData({...formData, agency: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber text-sm" placeholder="Contoh: Telkom Indonesia" />
              </div>

              <div>
                <label className="block text-sm font-bold text-navy mb-2">Tautan Foto Profil (Opsional)</label>
                <input type="url" value={formData.imgColor !== 'bg-blue-500' && (formData.imgColor?.startsWith('http') || formData.imgColor?.startsWith('data:')) ? formData.imgColor : ''} onChange={(e) => setFormData({...formData, imgColor: e.target.value || 'bg-blue-500'})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber text-sm" placeholder="https://..." />
                <p className="text-xs text-slate-500 mt-2">Masukkan URL gambar valid. Biarkan kosong jika ingin avatar berupa inisial warna.</p>
              </div>

              <div className="pt-6 border-t border-slate-100 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3 font-bold text-slate-500 hover:text-navy transition-colors">
                  Batal
                </button>
                <button type="submit" className="px-8 py-3 bg-navy hover:bg-navy-dark text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-navy/20">
                  Simpan Alumni
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

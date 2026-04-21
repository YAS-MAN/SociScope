import { useState, useEffect } from 'react';
import { useAdminStore } from '@/store/useAdminStore';
import { Eye, EyeOff, Tag, ExternalLink, RefreshCw, Plus, Edit2, Trash2, X, Save, FileText } from 'lucide-react';
import { toast } from 'sonner';

export default function ArticleCMS() {
  const { hiddenRssLinks, toggleRssVisibility, role, articles: dbArticles, addArticle, updateArticle, deleteArticle } = useAdminStore();
  const [rssArticles, setRssArticles] = useState<any[]>([]);
  const [loadingConfig, setLoadingConfig] = useState(true);

  // State for Internal Articles Form
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({
    title: '',
    link: '',
    thumbnail: '',
    description: '',
    date: '',
    author: ''
  });

  const [activeTab, setActiveTab] = useState<'internal' | 'rss'>('internal');

  const formatIsoDate = (dateStr: string): string => {
    if (!dateStr) return 'Tanpa Tanggal';
    if (!/^\d{4}-\d{2}-\d{2}/.test(dateStr)) return dateStr;
    try {
      const [y, m, d] = dateStr.split('-').map(Number);
      const dt = new Date(y, m - 1, d);
      return dt.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    } catch { return dateStr; }
  };

  useEffect(() => {
    fetchRSS();
  }, []);

  const fetchRSS = async () => {
    setLoadingConfig(true);
    try {
      const rssUrl = 'https://sosiologi.fisipol.unesa.ac.id/rss';
      const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.status === 'ok') {
        const sortedItems = data.items.sort((a: any, b: any) => {
          const tsA = new Date(a.pubDate || 0).getTime() || 0;
          const tsB = new Date(b.pubDate || 0).getTime() || 0;
          return tsB - tsA;
        });
        setRssArticles(sortedItems); 
      }
    } catch (err) {
      toast.error('Gagal mengambil data RSS UNESA');
    } finally {
      setLoadingConfig(false);
    }
  };

  const handleToggleRSS = (link: string) => {
    if (role === 'Editor Prodi') {
      toast.error('Akses Ditolak: Kewenangan Anda terbatas.');
      return;
    }
    toggleRssVisibility(link);
  };

  const handleSubmitInternal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.link || !form.date) {
      toast.error('Kolom wajib (Judul, Link, Tanggal) harus diisi!');
      return;
    }

    if (editingId) {
      updateArticle(editingId, form);
      toast.success('Artikel internal diperbarui!');
    } else {
      addArticle({ ...form, id: Date.now() });
      toast.success('Artikel internal ditambahkan!');
    }

    setShowForm(false);
    setForm({ title: '', link: '', thumbnail: '', description: '', date: '', author: '' });
    setEditingId(null);
  };

  const handleEditInternal = (article: any) => {
    setForm({
      title: article.title,
      link: article.link,
      thumbnail: article.thumbnail || '',
      description: article.description || '',
      date: article.date || '',
      author: article.author || ''
    });
    setEditingId(article.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteInternal = (id: number) => {
    if (window.confirm('Hapus artikel internal ini?')) {
      deleteArticle(id);
      toast.success('Artikel dihapus!');
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto mb-20 animate-fadeIn space-y-6">

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy flex items-center gap-2">
            <FileText className="w-6 h-6 text-amber" />
            Manajemen Artikel & Berita
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Kelola publikasi artikel internal dan visibilitas sinkronisasi feed RSS UNESA.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('internal')}
          className={`px-6 py-3 font-semibold text-sm transition-all border-b-2 ${activeTab === 'internal' ? 'border-amber text-navy bg-amber/5' : 'border-transparent text-slate-500 hover:text-navy hover:bg-slate-50'}`}
        >
          Artikel Database Internal
        </button>
        <button
          onClick={() => setActiveTab('rss')}
          className={`px-6 py-3 font-semibold text-sm transition-all border-b-2 gap-2 flex items-center ${activeTab === 'rss' ? 'border-amber text-navy bg-amber/5' : 'border-transparent text-slate-500 hover:text-navy hover:bg-slate-50'}`}
        >
          Visibilitas RSS Website UNESA
        </button>
      </div>

      {/* INTERNAL ARTICLES TAB */}
      {activeTab === 'internal' && (
        <div className="space-y-6 animate-slideDown">
          {/* Add Article Header */}
          <div className="flex justify-end">
            {!showForm && (
              <button
                onClick={() => {
                  setForm({ title: '', link: '', thumbnail: '', description: '', date: '', author: '' });
                  setEditingId(null);
                  setShowForm(true);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-amber hover:bg-amber-dark text-white rounded-lg transition-colors shadow-sm font-medium"
              >
                <Plus className="w-5 h-5" />
                Tambah Artikel Baru
              </button>
            )}
          </div>

          {/* Form */}
          {showForm && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-8 animate-fadeIn">
              <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
                <h2 className="font-semibold text-navy flex items-center gap-2">
                  {editingId ? <Edit2 className="w-4 h-4 text-amber" /> : <Plus className="w-4 h-4 text-amber" />}
                  {editingId ? 'Edit Artikel Internal' : 'Publikasi Artikel Internal Baru'}
                </h2>
                <button
                  onClick={() => setShowForm(false)}
                  className="text-slate-400 hover:text-red-500 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmitInternal} className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Judul Artikel <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      required
                      value={form.title}
                      onChange={e => setForm({ ...form, title: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber/20 outline-none transition-all"
                      placeholder="Contoh: Diskusi Panel Sosiologi Kebencanaan 2026"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Tautan Baca (URL Eksternal / PDF) <span className="text-red-500">*</span></label>
                    <input
                      type="url"
                      required
                      value={form.link}
                      onChange={e => setForm({ ...form, link: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber/20 outline-none transition-all"
                      placeholder="https://"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Tautan Thumbnail (Opsional)</label>
                    <input
                      type="url"
                      value={form.thumbnail}
                      onChange={e => setForm({ ...form, thumbnail: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber/20 outline-none transition-all"
                      placeholder="https://..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Tanggal Publikasi <span className="text-red-500">*</span></label>
                    <input
                      type="date"
                      required
                      value={form.date}
                      onChange={e => setForm({ ...form, date: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber/20 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Penulis (Opsional)</label>
                    <input
                      type="text"
                      value={form.author}
                      onChange={e => setForm({ ...form, author: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber/20 outline-none transition-all"
                      placeholder="Nama Penulis/Kontributor"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Deskripsi Singkat (Cuplikan)</label>
                    <textarea
                      rows={3}
                      value={form.description}
                      onChange={e => setForm({ ...form, description: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber/20 outline-none transition-all"
                      placeholder="Ringkasan singkat isi artikel..."
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-6 py-2 border border-slate-300 text-slate-700 hover:bg-slate-50 rounded-lg transition-colors font-medium"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-navy hover:bg-navy-light text-white rounded-lg transition-colors flex items-center gap-2 font-medium"
                  >
                    <Save className="w-4 h-4" />
                    {editingId ? 'Simpan Perubahan' : 'Terbitkan Artikel'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* List Internal Articles */}
          <div className="space-y-4">
            {dbArticles.length === 0 ? (
              <div className="text-center py-12 text-slate-400 bg-white rounded-xl border border-slate-200">
                <FileText className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                Belum ada artikel yang ditambahkan.<br />Silakan tambah artikel untuk mempublikasikan berita secara mandiri.
              </div>
            ) : (
              dbArticles.map((article) => (
                <div key={article.id} className="p-4 rounded-xl border bg-white border-slate-200 shadow-sm flex gap-4 transition-all hover:border-amber/50">
                  <div className="w-24 h-24 rounded-lg bg-slate-200 shrink-0 overflow-hidden">
                    <img
                      src={article.thumbnail || "/logo_unesa_raw.png"}
                      onError={(e) => { 
                        (e.target as any).src = "/logo_unesa_raw.png";
                        (e.target as any).className = "w-full h-full object-contain p-2 opacity-50 grayscale";
                      }}
                      alt="thumb"
                      className={`w-full h-full ${!article.thumbnail ? 'object-contain p-2 opacity-50 grayscale' : 'object-cover'}`}
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <h4 className="font-bold text-navy text-sm md:text-base line-clamp-2">{article.title}</h4>
                    <div className="text-xs text-slate-500 mt-1 flex gap-3">
                      <span>📅 {formatIsoDate(article.date)}</span>
                      {article.author && <span>✍️ {article.author}</span>}
                    </div>
                    <a href={article.link} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-500 hover:underline flex items-center gap-1 mt-2 font-medium w-max">
                      Buka Tautan <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-2">
                    <button
                      onClick={() => handleEditInternal(article)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-transparent hover:border-blue-200"
                      title="Edit Artikel"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteInternal(article.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-200"
                      title="Hapus Artikel"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* RSS VISIBILITY TAB */}
      {activeTab === 'rss' && (
        <div className="space-y-6 animate-slideDown">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <h2 className="font-bold text-navy text-lg flex items-center gap-2">
                <Tag className="w-5 h-5 text-amber" /> Sinkronisasi RSS UNESA
              </h2>
              <p className="text-sm text-slate-500 mt-1">Mengatur kemunculan berita UNESA otomatis yang ditarik via RSS feed Sosiologi.</p>
            </div>
            <button
              onClick={fetchRSS}
              className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg transition-colors font-medium text-sm"
            >
              <RefreshCw className={`w-4 h-4 ${loadingConfig ? 'animate-spin' : ''}`} />
              Sinkronisasi Ulang
            </button>
          </div>

          <div className="space-y-4">
            {loadingConfig ? (
              <div className="text-center py-12 text-slate-400 bg-white rounded-xl border border-slate-200">Loading live feeds...</div>
            ) : (
              rssArticles.map((item, index) => {
                const normalize = (l: string) => l.split('?')[0].split('#')[0].trim().replace(/\/$/, '').toLowerCase();
                const isHidden = hiddenRssLinks.some(h => normalize(h) === normalize(item.link || ''));

                return (
                  <div key={index} className={`p-4 rounded-xl border flex gap-4 transition-all ${isHidden ? 'bg-slate-50 border-slate-200 opacity-60 grayscale' : 'bg-white border-slate-200 shadow-sm hover:border-amber/40'
                    }`}>
                    <div className="w-24 h-24 rounded-lg bg-slate-200 shrink-0 overflow-hidden">
                      <img
                        src={item.thumbnail || item.enclosure?.link || "/logo_unesa_raw.png"}
                        onError={(e) => { (e.target as any).src = "/logo_unesa_raw.png"; (e.target as any).className = "w-full h-full object-contain p-2 opacity-50 grayscale"; }}
                        alt="thumb"
                        className={`w-full h-full ${(!item.thumbnail && !item.enclosure?.link) ? 'object-contain p-2 opacity-50 grayscale' : 'object-cover'}`}
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <h4 className="font-bold text-navy text-sm md:text-base line-clamp-2">{item.title}</h4>
                      <div className="text-xs text-slate-500 mt-1 flex items-center gap-2">
                         <span>📅 {item.pubDate ? new Date(item.pubDate.replace(' ', 'T')).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Tanpa Tanggal'}</span>
                      </div>
                      <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-500 hover:underline flex items-center gap-1 mt-1 font-medium w-max">
                        Cek Tautan Asli <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    <div className="flex items-center">
                      <button
                        onClick={() => handleToggleRSS(item.link)}
                        className={`px-4 py-2 rounded-lg text-xs font-bold w-36 flex items-center justify-center gap-2 transition-colors ${isHidden
                            ? 'bg-red-100 text-red-600 hover:bg-red-200 border border-red-200'
                            : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border border-emerald-200'
                          }`}
                      >
                        {isHidden ? (
                          <><EyeOff className="w-4 h-4" /> Disembunyikan</>
                        ) : (
                          <><Eye className="w-4 h-4" /> Ditampilkan</>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}

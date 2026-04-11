import { useState, useEffect } from 'react';
import { useAdminStore } from '@/store/useAdminStore';
import { Eye, EyeOff, Tag, ExternalLink, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

export default function ArticleCMS() {
  const { hiddenRssLinks, toggleRssVisibility, role } = useAdminStore();
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRSS();
  }, []);

  const fetchRSS = async () => {
    setLoading(true);
    try {
      const rssUrl = 'https://sosiologi.fisipol.unesa.ac.id/rss';
      const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      
      if (data.status === 'ok') {
        setArticles(data.items.slice(0, 10)); // Ambil 10 terbaru
      }
    } catch (err) {
      toast.error('Gagal mengambil data RSS UNESA');
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = (link: string) => {
    if (role === 'Editor Prodi') {
      toast.error('Akses Ditolak: Kewenangan Anda hanya untuk membalas pesan.');
      return;
    }
    toggleRssVisibility(link);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mb-6 flex items-center justify-between">
        <div>
          <h2 className="font-bold text-navy text-lg flex items-center gap-2">
            <Tag className="w-5 h-5 text-amber" /> CMS Visibilitas Artikel
          </h2>
          <p className="text-sm text-slate-500 mt-1">Mengatur kemunculan berita UNESA yang ditarik via RSS feed.</p>
        </div>
        <button 
          onClick={fetchRSS}
          className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg transition-colors font-medium text-sm"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Sinkronisasi
        </button>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-12 text-slate-400">Loading feeds...</div>
        ) : (
          articles.map((item, index) => {
            const isHidden = hiddenRssLinks.includes(item.link);
            
            return (
              <div key={index} className={`p-4 rounded-xl border flex gap-4 transition-all ${
                isHidden ? 'bg-slate-50 border-slate-200 opacity-60 grayscale' : 'bg-white border-slate-200 shadow-sm'
              }`}>
                <div className="w-24 h-24 rounded-lg bg-slate-200 shrink-0 overflow-hidden">
                  <img 
                    src={item.thumbnail || item.enclosure?.link} 
                    onError={(e) => { (e.target as any).src = "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=200" }}
                    alt="thumb"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <h4 className="font-bold text-navy text-sm md:text-base line-clamp-2">{item.title}</h4>
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-500 hover:underline flex items-center gap-1 mt-1 font-medium w-max">
                    Cek Tautan Asli <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <div className="flex items-center">
                  <button 
                    onClick={() => handleToggle(item.link)}
                    className={`px-4 py-2 rounded-lg text-xs font-bold w-36 flex items-center justify-center gap-2 transition-colors ${
                      isHidden 
                        ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                        : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
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
  );
}

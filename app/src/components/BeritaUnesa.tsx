import { useState, useEffect } from 'react';
import { Calendar, ArrowRight, ExternalLink, RefreshCw } from 'lucide-react';

interface UnesaArticle {
    title: string;
    link: string;
    thumbnail: string;
    description: string;
    date: string;
    timestamp: number; // Tambahan untuk memastikan urutan akurat
}

export default function BeritaUnesa() {
    const [articles, setArticles] = useState<UnesaArticle[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchLiveRss();
    }, []);

    const fetchLiveRss = async () => {
        setLoading(true);
        setError(null);
        try {
            const rssUrl = 'https://sosiologi.fisipol.unesa.ac.id/rss';
            const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;

            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data.status !== 'ok') {
                throw new Error('Akses ke server UNESA ditolak atau data tidak tersedia.');
            }

            const parsedArticles: UnesaArticle[] = [];

            // 1. KUMPULKAN DAN BERSIHKAN SEMUA ARTIKEL DULU
            for (let i = 0; i < data.items.length; i++) {
                const item = data.items[i];

                const title = item.title || 'Berita Sosiologi UNESA';
                const link = item.link || 'https://sosiologi.fisipol.unesa.ac.id/';

                let thumbnail = item.image || item.thumbnail || item.enclosure?.link;
                if (!thumbnail || typeof thumbnail !== 'string') {
                    thumbnail = 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800';
                }

                // PEMBERSIH HTML
                let cleanDesc = "";
                if (item.description) {
                    const txtArea = document.createElement("textarea");
                    txtArea.innerHTML = item.description;
                    let decoded = txtArea.value;
                    decoded = decoded.replace(/<[^>]*>?/gm, ''); // Hapus semua tag HTML
                    decoded = decoded.replace(/&[a-zA-Z0-9#]+;/g, ' '); // Hapus entitas
                    cleanDesc = decoded.replace(/\s+/g, ' ').trim();
                }
                const description = cleanDesc.length > 120 ? cleanDesc.substring(0, 120) + '...' : cleanDesc;

                // PEMBEDAH WAKTU MANUAL (Anti-Gagal di semua Browser)
                let timestamp = 0;
                let formattedDate = 'Baru saja';

                if (item.pubDate) {
                    // Ekstrak angka dari format "2026-04-10 08:27:00"
                    const match = item.pubDate.match(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/);
                    if (match) {
                        const d = new Date(parseInt(match[1]), parseInt(match[2]) - 1, parseInt(match[3]), parseInt(match[4]), parseInt(match[5]), parseInt(match[6]));
                        timestamp = d.getTime();
                        formattedDate = d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
                    } else {
                        // Fallback
                        timestamp = new Date(item.pubDate.replace(' ', 'T')).getTime() || 0;
                        formattedDate = item.pubDate.split(' ')[0];
                    }
                }

                parsedArticles.push({ title, link, thumbnail, description, date: formattedDate, timestamp });
            }

            // 2. URUTKAN BERDASARKAN TIMESTAMP TERBESAR (Paling Baru)
            parsedArticles.sort((a, b) => b.timestamp - a.timestamp);

            // 3. AMBIL 3 TERATAS SAJA SETELAH DIURUTKAN
            if (parsedArticles.length > 0) {
                setArticles(parsedArticles.slice(0, 3));
            } else {
                throw new Error('Tidak ada artikel yang valid di dalam RSS.');
            }

        } catch (err: any) {
            console.error("Fetch Live RSS Error:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // --- RENDER TAMPILAN ---
    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-64 bg-slate-50 rounded-3xl border border-slate-200">
                <RefreshCw className="w-8 h-8 text-sage animate-spin mb-4" />
                <p className="text-slate-500 font-medium animate-pulse">Menarik berita terbaru dari UNESA...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-64 bg-red-50 rounded-3xl border border-red-100 p-6 text-center">
                <p className="text-red-500 font-bold mb-2">Gagal Sinkronisasi Live Update</p>
                <p className="text-sm text-red-400 mb-4">{error}</p>
                <button onClick={fetchLiveRss} className="px-4 py-2 bg-red-100 text-red-600 rounded-lg text-sm font-bold hover:bg-red-200 transition-colors">
                    Coba Muat Ulang
                </button>
            </div>
        );
    }

    return (
        <div className="grid md:grid-cols-3 gap-8">
            {articles.map((item, index) => (
                <a
                    key={index}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white rounded-3xl border border-slate-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group block flex flex-col"
                >
                    <div className="relative h-48 overflow-hidden bg-slate-100 shrink-0 border-b border-slate-100">
                        <div className="absolute inset-0 bg-navy/10 group-hover:bg-transparent transition-colors z-10" />
                        <img
                            src={item.thumbnail}
                            alt={item.title}
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800";
                            }}
                        />
                        <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-[10px] font-bold text-navy flex items-center gap-1.5 shadow-sm">
                            <ExternalLink className="w-3 h-3" /> LIVE UPDATE
                        </div>
                    </div>

                    <div className="p-6 flex flex-col flex-1">
                        <div className="flex items-center gap-2 text-xs text-slate-500 mb-3 font-medium">
                            <Calendar className="w-3.5 h-3.5 text-sage" />
                            {item.date}
                        </div>
                        <h4 className="font-poppins font-bold text-navy text-lg mb-3 line-clamp-3 group-hover:text-sage transition-colors leading-snug">
                            {item.title}
                        </h4>
                        <p className="text-slate-600 text-sm leading-relaxed mb-5 line-clamp-3 flex-1">
                            {item.description}
                        </p>
                        <div className="text-sm font-bold text-sage flex items-center gap-2 group/btn mt-auto">
                            Baca Selengkapnya
                            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </div>
                    </div>
                </a>
            ))}
        </div>
    );
}
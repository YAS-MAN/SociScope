import { useState, useEffect } from 'react';
import { Calendar, ArrowRight, ExternalLink, RefreshCw, ChevronLeft, ChevronRight, PenTool } from 'lucide-react';
import { useAdminStore } from '@/store/useAdminStore';
import useEmblaCarousel from 'embla-carousel-react';

interface UnifiedArticle {
    id: string;
    title: string;
    link: string;
    thumbnail: string;
    description: string;
    date: string;
    timestamp: number;
    source: 'RSS' | 'Internal';
    author?: string;
}

const FALLBACK_IMG = "/logo_unesa_raw.png";

export default function BeritaUnesa({ isDark = false }: { isDark?: boolean }) {
    const hiddenRssLinks = useAdminStore((state) => state.hiddenRssLinks);
    const dbArticles = useAdminStore((state) => state.articles);

    const [rssArticles, setRssArticles] = useState<UnifiedArticle[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Embla Configuration
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: 'start',
        dragFree: true,
    });

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

            const parsedRss: UnifiedArticle[] = [];

            for (let i = 0; i < data.items.length; i++) {
                const item = data.items[i];

                const title = item.title || 'Berita Sosiologi UNESA';
                const link = item.link || 'https://sosiologi.fisipol.unesa.ac.id/';

                let thumbnail = item.image || item.thumbnail || item.enclosure?.link;
                if (!thumbnail || typeof thumbnail !== 'string') {
                    thumbnail = FALLBACK_IMG;
                }

                // PEMBERSIH HTML
                let cleanDesc = "";
                if (item.description) {
                    const txtArea = document.createElement("textarea");
                    txtArea.innerHTML = item.description;
                    let decoded = txtArea.value;
                    decoded = decoded.replace(/<[^>]*>?/gm, '');
                    decoded = decoded.replace(/&[a-zA-Z0-9#]+;/g, ' ');
                    cleanDesc = decoded.replace(/\s+/g, ' ').trim();
                }
                const description = cleanDesc.length > 120 ? cleanDesc.substring(0, 120) + '...' : cleanDesc;

                // PEMBEDAH WAKTU MANUAL
                let timestamp = 0;
                let formattedDate = 'Baru saja';

                if (item.pubDate) {
                    const match = item.pubDate.match(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/);
                    if (match) {
                        const d = new Date(parseInt(match[1]), parseInt(match[2]) - 1, parseInt(match[3]), parseInt(match[4]), parseInt(match[5]), parseInt(match[6]));
                        timestamp = d.getTime();
                        formattedDate = d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
                    } else {
                        timestamp = new Date(item.pubDate.replace(' ', 'T')).getTime() || 0;
                        formattedDate = item.pubDate.split(' ')[0];
                    }
                }

                parsedRss.push({
                    id: `rss-${i}`,
                    title,
                    link,
                    thumbnail,
                    description,
                    date: formattedDate,
                    timestamp,
                    source: 'RSS'
                });
            }

            setRssArticles(parsedRss);
        } catch (err: any) {
            console.error("Fetch Live RSS Error:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const goPrev = () => emblaApi && emblaApi.scrollPrev();
    const goNext = () => emblaApi && emblaApi.scrollNext();

    // --- MERGE DB ARTICLES & RSS ARTICLES ---
    const formatIsoDate = (dateStr: string): string => {
        if (!dateStr) return 'Tanpa Tanggal';
        // If already human-readable (e.g. from RSS), return as-is
        if (!/^\d{4}-\d{2}-\d{2}/.test(dateStr)) return dateStr;
        try {
            // Parse as local date to avoid UTC offset issues
            const [y, m, d] = dateStr.split('-').map(Number);
            const dt = new Date(y, m - 1, d);
            return dt.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
        } catch { return dateStr; }
    };

    const mappedDbArticles: UnifiedArticle[] = dbArticles.map(dbA => {
        let ts = Date.now();
        if (dbA.date) {
            const [y, m, d] = dbA.date.split('-').map(Number);
            ts = new Date(y, m - 1, d).getTime() || Date.now();
        }

        return {
            id: `db-${dbA.id}`,
            title: dbA.title,
            link: dbA.link,
            thumbnail: dbA.thumbnail || FALLBACK_IMG,
            description: dbA.description,
            date: formatIsoDate(dbA.date),
            timestamp: ts,
            source: 'Internal',
            author: dbA.author
        };
    });

    // Normalize links for reliable hidden comparison
    const normalize = (l: string) => {
        if (!l) return '';
        return l.split('?')[0].split('#')[0].trim().replace(/\/$/, '').toLowerCase();
    };
    const visibleRss = rssArticles.filter(a => {
        const target = normalize(a.link);
        return !hiddenRssLinks.some(h => normalize(h) === target);
    });

    // Gabungkan, lalu sort Descending (terbaru di awal)
    const combinedFeed = [...mappedDbArticles, ...visibleRss].sort((a, b) => b.timestamp - a.timestamp);

    // --- RENDER TAMPILAN ---
    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-64 bg-slate-50 rounded-3xl border border-slate-200">
                <RefreshCw className="w-8 h-8 text-sage animate-spin mb-4" />
                <p className="text-slate-500 font-medium animate-pulse">Memuat Berita & Artikel...</p>
            </div>
        );
    }

    if (error && combinedFeed.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-64 bg-red-50 rounded-3xl border border-red-100 p-6 text-center">
                <p className="text-red-500 font-bold mb-2">Gagal Memuat Berita</p>
                <p className="text-sm text-red-400 mb-4">{error}</p>
                <button onClick={fetchLiveRss} className="px-4 py-2 bg-red-100 text-red-600 rounded-lg text-sm font-bold hover:bg-red-200 transition-colors">
                    Coba Muat Ulang
                </button>
            </div>
        );
    }

    return (
        <div className="relative group/carousel animate-fadeIn">
            {/* Navigasi Kiri */}
            <button
                onClick={goPrev}
                className="absolute -left-5 z-20 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full lg:flex hidden bg-white shadow-lg border border-slate-100/50 hover:bg-slate-50 items-center justify-center text-navy transition-all hover:scale-110 opacity-0 group-hover/carousel:opacity-100"
            >
                <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Navigasi Kanan */}
            <button
                onClick={goNext}
                className="absolute -right-5 z-20 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full lg:flex hidden bg-white shadow-lg border border-slate-100/50 hover:bg-slate-50 items-center justify-center text-navy transition-all hover:scale-110 opacity-0 group-hover/carousel:opacity-100"
            >
                <ChevronRight className="w-6 h-6" />
            </button>

            {/* Viewport Embla */}
            <div className="overflow-hidden relative rounded-3xl -mx-4 px-4 py-2" ref={emblaRef}>
                <div className="flex select-none touch-pan-y -ml-6 border-b border-transparent">
                    {combinedFeed.map((item) => (
                        <div
                            key={item.id}
                            className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.33%] min-w-0 pl-6"
                        >
                            <a
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`h-full rounded-3xl border overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group block flex flex-col ${isDark
                                        ? 'bg-white/5 border-white/10 hover:border-white/25 hover:bg-white/10'
                                        : 'bg-white border-slate-200 hover:border-slate-300'
                                    }`}
                            >
                                <div className="relative h-48 overflow-hidden bg-slate-100 shrink-0 border-b border-slate-100/50 flex items-center justify-center group-hover:bg-amber/10 transition-colors">
                                    <div className="absolute inset-0 bg-navy/5 group-hover:bg-transparent transition-colors z-10" />
                                    <img
                                        src={item.thumbnail}
                                        alt={item.title}
                                        className={`w-full h-full transform group-hover:scale-105 transition-transform duration-500 ${item.thumbnail === FALLBACK_IMG ? 'object-contain p-8 opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-100' : 'object-cover'}`}
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = FALLBACK_IMG;
                                            (e.target as HTMLImageElement).className = "w-full h-full object-contain p-8 opacity-40 grayscale";
                                        }}
                                    />
                                    <div className={`absolute top-4 left-4 z-20 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1.5 shadow-sm ${item.source === 'RSS' ? 'bg-white/90 text-navy' : 'bg-amber/90 text-navy-dark'}`}>
                                        {item.source === 'RSS' ? (
                                            <><ExternalLink className="w-3 h-3" /> LIVE UPDATE</>
                                        ) : (
                                            <><PenTool className="w-3 h-3" /> ARTIKEL PRODI</>
                                        )}
                                    </div>
                                </div>

                                <div className="p-6 flex flex-col flex-1">
                                    <div className={`flex items-center gap-2 text-xs mb-3 font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                                        <Calendar className="w-3.5 h-3.5 text-sage" />
                                        {item.date} {item.author && ` | ${item.author}`}
                                    </div>
                                    <h4 className={`font-poppins font-bold text-lg mb-3 line-clamp-3 group-hover:text-sage transition-colors leading-snug ${isDark ? 'text-white' : 'text-navy'}`} title={item.title}>
                                        {item.title}
                                    </h4>
                                    <p className={`text-sm leading-relaxed mb-5 line-clamp-3 flex-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                                        {item.description}
                                    </p>
                                    <div className="text-sm font-bold text-sage flex items-center gap-2 group/btn mt-auto">
                                        Baca Selengkapnya
                                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </a>
                        </div>
                    ))}
                </div>
            </div>

            {combinedFeed.length === 0 && !error && (
                <div className="text-center py-12 text-slate-400 border border-dashed border-slate-200 rounded-2xl">
                    Belum ada artikel.
                </div>
            )}
        </div>
    );
}
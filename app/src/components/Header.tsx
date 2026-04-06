import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Glasses, BookOpen, Briefcase, Home } from "lucide-react";

const navItems = [
  { id: "/", label: "Beranda", icon: Home },
  { id: "/kacamata", label: "Kacamata", icon: Glasses },
  { id: "/teori", label: "Teori", icon: BookOpen },
  { id: "/karir", label: "Karir", icon: Briefcase },
  // Kita tambahkan menu ini ke navbar utama sesuai permintaan klien
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  
  // 1. Deteksi apakah kita sedang di halaman dengan background terang
  // Klien ingin halaman Kebijakan/Syarat juga dianggap 'terang' agar teksnya gelap.
  const isLightPage = 
    location.pathname === '/kacamata' || 
    location.pathname === '/karir' ||
    location.pathname === '/privasi' ||
    location.pathname === '/syarat';
  
  // 2. Tentukan kapan harus pakai teks warna gelap (navy)
  // Pakai teks gelap JIKA di-scroll ATAU di halaman terang
  const useDarkText = isScrolled || isLightPage;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-200 h-16' // Saat scroll (Putih Blur)
          : 'bg-transparent h-20 border-b border-transparent' // Saat di atas
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg transition-all ${
              useDarkText ? 'bg-navy text-white' : 'bg-gradient-to-br from-navy to-sage border border-white/10'
            }`}>
              <Glasses className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <h1 className={`font-poppins font-bold text-lg leading-tight transition-colors ${
                useDarkText ? 'text-navy' : 'text-white'
              }`}>
                SociScope
              </h1>
            </div>
          </Link>

          {/* Navigasi Desktop */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map(item => {
              const isActive = location.pathname === item.id;
              
              return (
                <Link
                  key={item.id}
                  to={item.id}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                    isActive
                      ? useDarkText 
                        ? 'bg-navy text-white shadow-md' // Aktif di tema terang/scroll
                        : 'bg-white/20 text-white backdrop-blur-sm' // Aktif di tema gelap
                      : useDarkText 
                        ? 'text-slate-600 hover:text-navy hover:bg-slate-100' // Inaktif di tema terang/scroll
                        : 'text-white/70 hover:text-white hover:bg-white/10' // Inaktif di tema gelap
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
             <Menu className={useDarkText ? "text-navy" : "text-white"} />
          </div>
        </div>
      </div>
    </header>
  );
}
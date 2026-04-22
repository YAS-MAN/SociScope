import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, BookOpen, Briefcase, Home, Users, Glasses } from "lucide-react";

const navItems = [
  { id: "/", label: "Beranda", icon: Home },
  { id: "/kacamata", label: "Kacamata", icon: Glasses },
  { id: "/teori", label: "Teori", icon: BookOpen },
  { id: "/karir", label: "Karir", icon: Briefcase },
  { id: "/jejaring", label: "Jejaring", icon: Users },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isLightPage =
    location.pathname === '/kacamata' ||
    location.pathname === '/jejaring' ||
    location.pathname === '/teori' ||
    location.pathname === '/karir' ||
    location.pathname === '/buku' ||
    location.pathname === '/jurnal';

  const useDarkText = isScrolled || isLightPage;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);



  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-200 h-16'
          : 'bg-transparent h-20 border-b border-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full">

            {/* LOGO */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center shadow-lg bg-white shrink-0 border border-amber-light/30 shadow-white/10">
                <img src="/logo_sociozone_raw.png" alt="SocioZone Logo" className="w-full h-full object-contain p-0.5" />
              </div>
              <div className="text-left">
                <h1 className={`font-poppins font-bold text-lg leading-tight transition-colors ${useDarkText ? 'text-navy' : 'text-white'
                  }`}>
                  SocioZone
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
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${isActive
                      ? useDarkText
                        ? 'bg-navy text-white shadow-md'
                        : 'bg-white/20 text-white backdrop-blur-sm'
                      : useDarkText
                        ? 'text-slate-600 hover:text-navy hover:bg-slate-100'
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                      }`}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 -mr-2 relative z-[60]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-navy" />
              ) : (
                <Menu className={`w-6 h-6 ${useDarkText ? "text-navy" : "text-white"}`} />
              )}
            </button>
          </div>
        </div>

      </header>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 bg-navy z-[100] transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          } md:hidden flex flex-col pt-24 px-6 pb-8`}
      >
        <button
          className="absolute top-6 right-6 p-2 bg-white/10 rounded-full"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <X className="w-6 h-6 text-white" />
        </button>

        <div className="flex-1 overflow-y-auto">
          <nav className="flex flex-col gap-2">
            {navItems.map(item => {
              const isActive = location.pathname === item.id;
              return (
                <Link
                  key={item.id}
                  to={item.id}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-4 py-4 rounded-xl text-base font-semibold flex items-center gap-4 transition-all ${isActive
                    ? 'bg-amber text-navy shadow-md'
                    : 'bg-white/5 text-white hover:bg-white/10'
                    }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer branding in mobile menu */}
        <div className="text-center mt-6 pt-6 border-t border-white/10">
          <p className="text-white/40 text-xs">SocioZone — Platform Edukasi Sosiologi</p>
        </div>
      </div>
    </>
  );
}
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Glasses,
  Mail,
  MapPin,
  ExternalLink,
  Instagram,
  Phone,
} from "lucide-react";

export default function Footer() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  type FooterLink = { label: string; to: string; isExternal?: boolean }
  const footerLinks: Record<string, FooterLink[]> = {
    "Belajar Sosiologi": [
      { label: "Kacamata Sosiologi", to: "/kacamata" },
      { label: "Teori Sosiologi", to: "/teori" },
      { label: "Teori Recommender", to: "/teori#recommender" },
      { label: "Uji Analisis", to: "/kacamata#uji-analisis" },
    ],
    Karir: [
      { label: "Profesi Lulusan", to: "/karir#profesi" },
      { label: "Peta Karir", to: "/karir#peta" },
      { label: "Karir & Berita", to: "/karir#capaian" },
    ],
    Jejaring: [
      { label: "Alumni Sukses", to: "/jejaring" },
      { label: "Artikel & Berita", to: "/jejaring#artikel" },
      { label: "Komunitas Prodi", to: "/jejaring#komunitas" },
    ],
    Referensi: [
      { label: "Referensi Jurnal", to: "/jurnal" },
      { label: "Referensi Buku", to: "/buku" },
      { label: "Artikel Sosiologi", to: "https://sosiologi.fisipol.unesa.ac.id/", isExternal: true },
    ],
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, to: string, isExternal?: boolean) => {
    if (isExternal) return; // biarkan browser membuka link eksternal

    const [targetPath, targetHash] = to.split('#');

    if (pathname === targetPath || (pathname === '/' && targetPath === '')) {
      e.preventDefault();
      if (targetHash) {
        const el = document.getElementById(targetHash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else {
          navigate(to);
        }
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-navy text-white relative z-10">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-10">
          {/* Brand & Kontak */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6 group w-max">
              <div className="w-12 h-12 bg-gradient-to-br from-sage to-sage-light rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 shadow-lg shadow-sage/20">
                <Glasses className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="font-poppins font-bold text-2xl">SociZone</h2>
                <p className="text-xs text-sage-light font-medium uppercase tracking-widest">
                  Platform Edukasi
                </p>
              </div>
            </Link>
            <p className="text-slate-300 text-sm leading-relaxed mb-8 max-w-sm">
              Membantu mahasiswa dan masyarakat memahami kompleksitas dunia
              sosial melalui perspektif yang jernih dan wawasan karir.
            </p>

            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
              <a
                href="mailto:hello@socizone.id"
                className="flex items-center gap-3 text-sm text-slate-300 hover:text-white transition-colors group w-max"
              >
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-sage/20 transition-colors">
                  <Mail className="w-4 h-4 text-sage" />
                </div>
                <span>hello@socizone.id</span>
              </a>
              <a
                href="tel:+6281234567890"
                className="flex items-center gap-3 text-sm text-slate-300 hover:text-white transition-colors group w-max"
              >
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-sage/20 transition-colors">
                  <Phone className="w-4 h-4 text-sage" />
                </div>
                <span>+62 812 3456 7890</span>
              </a>
              <a
                href="https://instagram.com/socizone.id"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-slate-300 hover:text-white transition-colors group w-max"
              >
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-sage/20 transition-colors">
                  <Instagram className="w-4 h-4 text-sage" />
                </div>
                <span>@socizone.id</span>
              </a>
              <div className="flex items-center gap-3 text-sm text-slate-300 cursor-default">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-sage" />
                </div>
                <span>Surabaya, Indonesia</span>
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-poppins font-bold text-white mb-6 uppercase tracking-wider text-sm">
                {title}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    {link.isExternal ? (
                      <a
                        href={link.to}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-slate-400 hover:text-sage-light transition-all flex items-center gap-2 group w-max"
                      >
                        <span className="relative">
                          {link.label}
                          <span className="absolute -bottom-1 left-0 w-0 h-px bg-sage transition-all group-hover:w-full" />
                        </span>
                        <ExternalLink className="w-3 h-3 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all text-sage-light" />
                      </a>
                    ) : (
                      <Link
                        to={link.to}
                        onClick={(e) => handleLinkClick(e, link.to, link.isExternal as any)}
                        className="text-sm text-slate-400 hover:text-sage-light transition-all flex items-center gap-2 group w-max"
                      >
                        <span className="relative">
                          {link.label}
                          <span className="absolute -bottom-1 left-0 w-0 h-px bg-sage transition-all group-hover:w-full" />
                        </span>
                        <ExternalLink className="w-3 h-3 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all text-sage-light" />
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center relative gap-4 md:gap-0">
            <div className="hidden md:block flex-1"></div>

            <p className="text-sm text-slate-400 flex items-center justify-center flex-1">
              © {currentYear} SociZone.
            </p>

            <div className="flex items-center justify-center md:justify-end gap-6 flex-1">
              <Link
                to="/privasi"
                className="text-sm text-slate-400 hover:text-white transition-colors"
              >
                Kebijakan Privasi
              </Link>
              <span className="text-slate-600">•</span>
              <Link
                to="/syarat"
                className="text-sm text-slate-400 hover:text-white transition-colors"
              >
                Syarat Penggunaan
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

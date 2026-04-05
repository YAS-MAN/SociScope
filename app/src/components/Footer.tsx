import { Link } from 'react-router-dom';
import { Glasses, Mail, MapPin, ExternalLink, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    'Belajar Sosiologi': [
      { label: 'Kacamata Sosiologi', to: '/kacamata' },
      { label: 'Teori Sosiologi', to: '/teori' },
      { label: 'Teori Recommender', to: '/teori' },
      { label: 'Kasus Interaktif', to: '/kacamata' }
    ],
    'Karir': [
      { label: 'Profesi Lulusan', to: '/karir' },
      { label: 'Peta Karir', to: '/karir' },
      { label: 'Skill yang Dibutuhkan', to: '/karir' },
      { label: 'Tips Sukses', to: '/karir' }
    ],
    'Referensi': [
      { label: 'Buku Sosiologi', to: '/' },
      { label: 'Jurnal Ilmiah', to: '/' },
      { label: 'Konferensi', to: '/' },
      { label: 'Komunitas', to: '/' }
    ]
  };

  return (
    <footer className="bg-navy text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-4 group">
              <div className="w-12 h-12 bg-gradient-to-br from-sage to-sage-light rounded-xl flex items-center justify-center transition-transform group-hover:scale-105">
                <Glasses className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="font-poppins font-bold text-xl">SociScope</h2>
                <p className="text-sm text-white/60">Lihat Dunia dengan Lensa Sosiologi</p>
              </div>
            </Link>
            <p className="text-white/70 text-sm leading-relaxed mb-6 max-w-sm">
              SociScope adalah platform edukasi sosiologi yang membantu mahasiswa dan masyarakat 
              memahami dunia sosial melalui perspektif, teori, dan wawasan karir.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-white/70">
                <Mail className="w-4 h-4 text-sage" />
                <span>hello@sociscope.id</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/70">
                <MapPin className="w-4 h-4 text-sage" />
                <span>Indonesia</span>
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-semibold text-white mb-4">{title}</h3>
              <ul className="space-y-2">
                {links.map(link => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-white/70 hover:text-amber transition-colors flex items-center gap-1 group"
                    >
                      {link.label}
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-white/60 text-center md:text-left">
              {currentYear} SociScope. Dibuat dengan{' '}
              <Heart className="w-4 h-4 inline text-red-400 fill-red-400" /> untuk pembelajar sosiologi.
            </p>
            <div className="flex items-center gap-6">
              <Link to="/" className="text-sm text-white/60 hover:text-white transition-colors">
                Kebijakan Privasi
              </Link>
              <Link to="/" className="text-sm text-white/60 hover:text-white transition-colors">
                Syarat Penggunaan
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
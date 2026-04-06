import { Routes, Route, useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatbotTeo from "@/components/ChatbotTeo";
import Home from "@/pages/Home";
import Kacamata from "@/pages/Kacamata";
import Teori from "@/pages/Teori";
import Karir from "@/pages/Karir";
import Privasi from "@/pages/Privasi";
import Syarat from "@/pages/Syarat";

function App() {
  // Ambil lokasi rute saat ini
  const location = useLocation();

  // Logika untuk menentukan warna background utama per halaman
  // Kebijakan Privasi: Biru Navy
  // Syarat Penggunaan: Putih
  // Halaman lain: Abu-abu Terang (Slate-50) atau default
  const pageBgClass = 
    location.pathname === '/privasi' ? 'bg-navy' :
    location.pathname === '/syarat' ? 'bg-white' : 
    'bg-slate-50';

  return (
    // Secara dinamis mengubah warna background utama aplikasi.
    <div className={`min-h-screen ${pageBgClass} font-inter selection:bg-sage/30`}>
      <Header />

      <main className="relative z-10">
        {/* TRIK NINJA: Key berubah = Elemen di-render ulang = Animasi jalan lagi */}
        {/* Animasi 'animate-pageTransition' sudah dipasang di sini, 
            sehingga otomatis berlaku untuk semua halaman, termasuk Privasi dan Syarat. */}
        <div key={location.pathname} className="animate-pageTransition">
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/kacamata" element={<Kacamata />} />
            <Route path="/teori" element={<Teori />} />
            <Route path="/karir" element={<Karir />} />
            <Route path="/privasi" element={<Privasi />} />
            <Route path="/syarat" element={<Syarat />} />
          </Routes>
        </div>
      </main>

      <Footer />
      <ChatbotTeo />
    </div>
  );
}

export default App;
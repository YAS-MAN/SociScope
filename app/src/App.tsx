import { useEffect } from "react"; // <-- Tambahkan import useEffect
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
import Jejaring from "@/pages/Jejaring";
import AdminRoutes from "@/pages/Admin/AdminRoutes";
import { Toaster } from "sonner";
function App() {
  // Ambil lokasi rute saat ini
  const location = useLocation();

  // --- TAMBAHAN BARU: LOGIKA SCROLL OTOMATIS ---
  useEffect(() => {
    if (location.hash) {
      // Jika URL memiliki hash (contoh: /karir#peta dari Footer)
      // Kita beri jeda 100ms agar React selesai me-render komponen halamannya dulu
      setTimeout(() => {
        const element = document.getElementById(location.hash.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      // Jika perpindahan halaman biasa (tanpa hash), scroll instan ke paling atas
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]); // Efek ini akan berjalan setiap kali path atau hash URL berubah
  // ---------------------------------------------

  // Deteksi apakah kita di halaman Admin (punya Layout sendiri)
  const isAdminPage = location.pathname.startsWith('/admin');

  // Logika untuk menentukan warna background utama per halaman
  // Kebijakan Privasi: Biru Navy
  // Syarat Penggunaan: Putih
  const pageBgClass =
    isAdminPage ? 'bg-slate-50' :
    location.pathname === '/privasi' ? 'bg-navy' :
      location.pathname === '/syarat' ? 'bg-white' :
        location.pathname === '/jejaring' ? 'bg-navy' :
          'bg-slate-50';

  return (
    // Secara dinamis mengubah warna background utama aplikasi.
    <div className={`min-h-screen ${pageBgClass} font-inter selection:bg-sage/30`}>
      {!isAdminPage && <Header />}

      <main className="relative z-10">
        {/* TRIK NINJA: Key berubah = Elemen di-render ulang = Animasi jalan lagi */}
        {/* Animasi 'animate-pageTransition' sudah dipasang di sini, 
            sehingga otomatis berlaku untuk semua halaman, termasuk Privasi dan Syarat. */}
        <div key={location.pathname} className={isAdminPage ? '' : 'animate-pageTransition'}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/kacamata" element={<Kacamata />} />
            <Route path="/teori" element={<Teori />} />
            <Route path="/karir" element={<Karir />} />
            <Route path="/jejaring" element={<Jejaring />} />
            <Route path="/privasi" element={<Privasi />} />
            <Route path="/syarat" element={<Syarat />} />
            <Route path="/admin/*" element={<AdminRoutes />} />
          </Routes>
        </div>
      </main>

      {!isAdminPage && <Footer />}
      {!isAdminPage && <ChatbotTeo />}
      <Toaster position="top-right" theme="dark" richColors />
    </div>
  );
}

export default App;
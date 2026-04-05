import { Routes, Route, useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatbotTeo from "@/components/ChatbotTeo";
import Home from "@/pages/Home";
import Kacamata from "@/pages/Kacamata";
import Teori from "@/pages/Teori";
import Karir from "@/pages/Karir";

function App() {
  // Ambil lokasi rute saat ini
  const location = useLocation();

  return (
    <div className="min-h-screen bg-slate-50 font-inter">
      <Header />

      <main className="relative z-10">
        {/* TRIK NINJA: Key berubah = Elemen di-render ulang = Animasi jalan lagi */}
        <div key={location.pathname} className="animate-pageTransition">
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/kacamata" element={<Kacamata />} />
            <Ro
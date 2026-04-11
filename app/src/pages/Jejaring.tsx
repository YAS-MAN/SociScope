import { Users, GraduationCap, Building, Search, Send, User } from "lucide-react";
import { useState } from "react";
import { alumniData, hmpData } from "@/data/sociologyData";

export default function Jejaring() {
  const [activeChat, setActiveChat] = useState("HMP Sosiologi UNESA");
  const [messages, setMessages] = useState([
    { id: 1, sender: "Ketua HMP", text: "Halo teman-teman sosiologi se-Indonesia! Ada info webinar terbaru nih.", time: "10:00 AM", isMe: false },
    { id: 2, sender: "Saya", text: "Wah menarik! Boleh minta link daftarnya?", time: "10:15 AM", isMe: true },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setMessages([...messages, {
      id: Date.now(),
      sender: "Saya",
      text: newMessage.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true
    }]);
    setNewMessage("");
  };

  return (
    <div className="min-h-screen bg-navy relative overflow-hidden py-24">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-sage rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 animate-fadeIn">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full text-sm text-white font-bold mb-4">
            <Users className="w-4 h-4" />
            Kolaborasi & Relasi
          </div>
          <h2 className="font-poppins font-bold text-4xl md:text-5xl text-white mb-6">Jejaring Sosiologi</h2>
          <p className="text-slate-300 max-w-2xl mx-auto text-lg leading-relaxed">
            Bangun koneksi dengan sesama mahasiswa, kenali profil alumni sukses, dan temukan program studi sosiologi dari berbagai kampus.
          </p>
        </div>

        {/* Section 1: Alumni Sukses */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <GraduationCap className="w-8 h-8 text-amber" />
            <h3 className="font-poppins font-bold text-2xl text-white">Alumni Sukses Sosiologi</h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {alumniData.map((alumni) => (
              <div key={alumni.id} className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-sm hover:border-amber/50 hover:shadow-[0_0_20px_rgba(232,167,53,0.15)] transition-all group">
                <div className={`w-16 h-16 rounded-full ${alumni.imgColor} flex items-center justify-center text-white mb-4 shadow-md group-hover:scale-110 transition-transform`}>
                  <User className="w-8 h-8" />
                </div>
                <h4 className="font-poppins font-bold text-white text-lg">{alumni.name}</h4>
                <p className="text-sm font-bold text-amber-light mt-1 mb-2">{alumni.role}</p>
                <div className="flex items-center gap-2 text-xs text-slate-300 bg-black/20 px-3 py-1.5 rounded-lg w-max border border-white/5">
                  <Building className="w-3 h-3" />
                  {alumni.agency}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Chat Komunitas HMP */}
        <div className="grid lg:grid-cols-3 gap-8 h-[600px] mb-10">
          {/* Sidebar HMP List */}
          <div className="bg-navy-dark/50 border border-white/10 rounded-3xl overflow-hidden flex flex-col shadow-lg backdrop-blur-sm">
            <div className="p-6 bg-navy-light text-white text-center">
              <h3 className="font-poppins font-bold text-xl uppercase tracking-wider">Komunitas Studi</h3>
            </div>
            <div className="p-4 border-b border-white/5 flex items-center gap-2 bg-black/20">
              <Search className="w-4 h-4 text-slate-400" />
              <input type="text" placeholder="Cari prodi / kampus..." className="bg-transparent border-none text-sm w-full focus:outline-none text-white placeholder-slate-500" />
            </div>
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              {hmpData.map((hmp, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveChat(hmp)}
                  className={`w-full text-left p-4 border-b border-white/5 transition-colors flex items-center gap-4 ${activeChat === hmp ? 'bg-sage/20 border-l-4 border-l-sage' : 'hover:bg-white/5'}`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold shrink-0 ${activeChat === hmp ? 'bg-sage text-white shadow-lg shadow-sage/30' : 'bg-white/10 text-slate-300'}`}>
                    {hmp.charAt(0)}
                  </div>
                  <div>
                    <h4 className={`font-poppins font-bold text-sm ${activeChat === hmp ? 'text-sage-light' : 'text-white'}`}>{hmp}</h4>
                    <p className="text-xs text-slate-400 truncate w-32">Pilih untuk mengobrol...</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Chat Room */}
          <div className="lg:col-span-2 bg-navy-dark/50 border border-white/10 rounded-3xl overflow-hidden flex flex-col shadow-lg backdrop-blur-sm">
            <div className="p-6 bg-navy-light border-b border-white/10 flex items-center gap-4">
              <div className="w-12 h-12 bg-sage text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg shadow-sage/30">
                {activeChat.charAt(0)}
              </div>
              <div>
                <h3 className="font-poppins font-bold text-white text-lg">{activeChat}</h3>
                <p className="text-xs text-sage-light font-medium flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-sage-light inline-block animate-pulse"></span> Online
                </p>
              </div>
            </div>

            <div className="flex-1 bg-black/20 p-6 overflow-y-auto flex flex-col gap-4 custom-scrollbar">
              <div className="text-center text-xs text-slate-400 bg-white/5 border border-white/10 py-1 rounded-full w-max mx-auto px-4">Hari ini</div>
              {messages.map((msg) => (
                <div key={msg.id} className={`flex max-w-[80%] ${msg.isMe ? 'ml-auto flex-row-reverse' : ''} gap-3`}>
                  {!msg.isMe && (
                    <div className="w-8 h-8 rounded-full bg-white/10 text-white shrink-0 flex items-center justify-center border border-white/20">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                  <div>
                    {!msg.isMe && <span className="text-xs font-bold text-slate-400 ml-1 mb-1 block">{msg.sender}</span>}
                    <div className={`p-4 rounded-2xl ${msg.isMe ? 'bg-sage text-white rounded-tr-none shadow-md shadow-sage/20' : 'bg-white/10 border border-white/20 text-white rounded-tl-none shadow-sm'}`}>
                      <p className="text-sm">{msg.text}</p>
                    </div>
                    <span className={`text-[10px] text-slate-400 mt-1 block ${msg.isMe ? 'text-right mr-1' : 'ml-1'}`}>{msg.time}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-navy-light border-t border-white/10">
              <form onSubmit={handleSendMessage} className="flex gap-2 relative">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder={`Kirim pesan ke forum ${activeChat}...`}
                  className="flex-1 bg-black/20 border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sage/50 text-sm text-white placeholder-slate-400"
                />
                <button type="submit" disabled={!newMessage.trim()} className="w-12 h-12 bg-sage hover:bg-sage-light text-navy rounded-xl flex items-center justify-center transition-colors shrink-0 shadow-md disabled:bg-slate-600 disabled:text-slate-400">
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { useAdminStore } from '@/store/useAdminStore';
import { Mail, CheckCircle, Clock } from 'lucide-react';
import { toast } from 'sonner';

export default function MessageManager() {
  const { messages, replyMessage, role } = useAdminStore();
  const [replyText, setReplyText] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);

  const activeMsg = messages.find(m => m.id === selectedMessage);

  const handleReply = () => {
    if (!selectedMessage) return;
    if (!replyText.trim()) {
      toast.error('Pesan balasan tidak boleh kosong');
      return;
    }
    
    replyMessage(selectedMessage);
    toast.success('Pesan balasan berhasil dikirim');
    setReplyText('');
    setSelectedMessage(null);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* List Pesan */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col h-[600px] overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <h3 className="font-bold text-navy flex items-center gap-2">
            <Mail className="w-5 h-5 text-amber" />
            Kotak Masuk
          </h3>
          <span className="bg-amber/20 text-amber-700 text-xs font-bold px-2 py-1 rounded-full">
            {messages.filter(m => m.status === 'Unread').length} Baru
          </span>
        </div>
        
        <div className="flex-1 overflow-y-auto p-2">
          {messages.map((msg) => (
            <div 
              key={msg.id}
              onClick={() => setSelectedMessage(msg.id)}
              className={`p-4 rounded-xl cursor-pointer mb-2 border transition-all ${
                selectedMessage === msg.id 
                  ? 'bg-sage/10 border-sage/30 shadow-sm' 
                  : 'bg-white border-transparent hover:bg-slate-50'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <span className="font-bold text-sm text-navy">{msg.sender}</span>
                {msg.status === 'Unread' ? (
                  <span className="flex items-center gap-1 text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                    <Clock className="w-3 h-3" /> Baru
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    <CheckCircle className="w-3 h-3" /> Dibalas
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 font-medium mb-1">{msg.topic}</p>
              <p className="text-xs text-slate-400 line-clamp-1">{msg.content}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Editor Balasan */}
      {selectedMessage && activeMsg ? (
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col h-[600px]">
          <div className="p-6 border-b border-slate-100 bg-slate-50">
            <h3 className="font-bold text-navy text-lg">{activeMsg.topic}</h3>
            <div className="flex items-center gap-4 mt-2">
              <span className="text-sm font-medium text-slate-500">Dari: <strong className="text-slate-700">{activeMsg.sender}</strong></span>
              <span className="text-sm font-medium text-slate-500">Tanggal: {activeMsg.date}</span>
            </div>
          </div>
          
          <div className="p-6 bg-slate-50 flex-1 border-b border-slate-100 overflow-y-auto">
            <div className="bg-white p-4 rounded-xl border border-slate-200 text-sm text-slate-600 leading-relaxed shadow-sm">
              {activeMsg.content}
            </div>
          </div>

          <div className="p-6 bg-white shrink-0">
            {activeMsg.status === 'Replied' ? (
              <div className="bg-sage/10 text-sage-dark p-4 rounded-xl flex items-center justify-center gap-2 font-bold text-sm border border-sage/20">
                <CheckCircle className="w-5 h-5" />
                Pesan ini sudah dibalas.
              </div>
            ) : (
              <div className="space-y-4">
                <label className="block text-sm font-bold text-navy">Tulis Balasan:</label>
                <textarea 
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm focus:outline-none focus:border-amber focus:ring-1 focus:ring-amber h-32 resize-none"
                  placeholder="Ketik balasan Anda di sini..."
                ></textarea>
                <button 
                  onClick={handleReply}
                  className="bg-navy hover:bg-navy-light text-white font-bold py-3 px-6 rounded-xl transition-colors shadow-mdflex items-center gap-2 float-right"
                >
                  Kirim Balasan
                </button>
                <div className="clear-both"></div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="lg:col-span-2 bg-slate-100/50 rounded-2xl border border-slate-200 flex flex-col items-center justify-center text-slate-400 h-[600px] border-dashed">
          <Mail className="w-16 h-16 mb-4 text-slate-300" />
          <p className="font-medium">Pilih pesan di sebelah kiri untuk membaca dan membalas.</p>
        </div>
      )}
    </div>
  );
}

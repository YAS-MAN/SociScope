import { useAdminStore } from '@/store/useAdminStore';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, BookOpen, Briefcase, Activity } from 'lucide-react';
import DataMigrator from '@/components/DataMigrator';

const visitData = [
  { name: 'Sen', visits: 400 },
  { name: 'Sel', visits: 300 },
  { name: 'Rab', visits: 550 },
  { name: 'Kam', visits: 480 },
  { name: 'Jum', visits: 700 },
  { name: 'Sab', visits: 850 },
  { name: 'Min', visits: 600 },
];

const topicData = [
  { name: 'Imajinasi', score: 85 },
  { name: 'Struktur/Agen', score: 70 },
  { name: 'Interseksi', score: 90 },
  { name: 'Konstruksi', score: 65 },
];

export default function DashboardAdmin() {
  const { theories, careers, auditLogs } = useAdminStore();

  const stats = [
    { title: 'Total Teori', value: theories.length, icon: BookOpen, color: 'bg-blue-500' },
    { title: 'Roadmap Karir', value: careers.length, icon: Briefcase, color: 'bg-emerald-500' },
    { title: 'User Terdaftar', value: 1.248, icon: Users, color: 'bg-amber-500' },
    { title: 'Aktivitas Harian', value: '45+', icon: Activity, color: 'bg-purple-500' },
  ];

  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <DataMigrator />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">{stat.title}</p>
              <h3 className="font-poppins font-bold text-2xl text-navy">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Charts Container - Left 2 Columns */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-navy mb-6">Kunjungan Platform (Minggu Ini)</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={visitData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Line type="monotone" dataKey="visits" stroke="#10b981" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-navy mb-6">Topik Kacamata Terpopuler</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topicData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                  <Tooltip cursor={{ fill: '#f1f5f9' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Bar dataKey="score" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Audit Logs - Right Column */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col h-full">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-navy">Audit Logs</h3>
            <span className="text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded-full font-medium">Live</span>
          </div>

          <div className="flex-1 overflow-y-auto pl-4 pr-2 custom-scrollbar space-y-4 max-h-[600px]">
            {auditLogs.map((log) => (
              <div key={log.id} className="relative pl-6 pb-4 border-l-2 border-slate-100 last:border-transparent last:pb-0">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-2 border-amber" />
                <div className="text-xs font-bold text-slate-400 mb-1">
                  {log.timestamp.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                </div>
                <div className="text-sm font-medium text-navy bg-slate-50 p-3 rounded-xl border border-slate-100 shadow-sm">
                  {log.action}
                  <div className="mt-2 text-[10px] uppercase font-bold text-sage">
                    {log.user}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

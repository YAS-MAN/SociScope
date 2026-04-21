import { useEffect, useState } from 'react';
import { useAdminStore } from '@/store/useAdminStore';
import { supabase } from '@/lib/supabase';
import {
  LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts';
import {
  Users, BookOpen, Briefcase, Activity,
  MessageSquare, Eye, TrendingUp, Award, Loader2
} from 'lucide-react';
import DataMigrator from '@/components/DataMigrator';

// ─── Types ────────────────────────────────────────────────────────────────────

interface DailyVisit { name: string; visits: number; }
interface CasePopularity { id: string; name: string; count: number; }
interface PopularItem { name: string; count: number; }

// ─── Helpers ─────────────────────────────────────────────────────────────────

const DAY_LABELS = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

/** Hasilkan array 7 hari terakhir (dimulai dari hari ini - 6) */
function getLast7Days(): { label: string; dateStr: string }[] {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push({
      label: DAY_LABELS[d.getDay()],
      dateStr: d.toISOString().split('T')[0], // 'YYYY-MM-DD'
    });
  }
  return days;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function DashboardAdmin() {
  const { theories, careers, auditLogs, kacamataCases } = useAdminStore();

  // Chart & metric state
  const [visitData, setVisitData] = useState<DailyVisit[]>([]);
  const [casePopularity, setCasePopularity] = useState<CasePopularity[]>([]);
  const [popularTokoh, setPopularTokoh] = useState<PopularItem[]>([]);
  const [popularTheory, setPopularTheory] = useState<PopularItem[]>([]);
  const [totalWeeklyVisits, setTotalWeeklyVisits] = useState(0);
  const [todayActivity, setTodayActivity] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [loadingCharts, setLoadingCharts] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      setLoadingCharts(true);
      try {
        const days = getLast7Days();
        const weekStart = days[0].dateStr + 'T00:00:00';
        const todayStr = days[6].dateStr;

        // ── 1. Weekly page views ─────────────────────────────────────────────
        const { data: viewsData } = await supabase
          .from('page_views')
          .select('visited_at')
          .gte('visited_at', weekStart);

        const countByDay: Record<string, number> = {};
        days.forEach(d => { countByDay[d.dateStr] = 0; });

        (viewsData || []).forEach((row: { visited_at: string }) => {
          const dateKey = row.visited_at.split('T')[0];
          if (countByDay[dateKey] !== undefined) countByDay[dateKey]++;
        });

        const weekly = days.map(d => ({ name: d.label, visits: countByDay[d.dateStr] }));
        const total = weekly.reduce((s, d) => s + d.visits, 0);
        const todayCount = countByDay[todayStr] ?? 0;

        setVisitData(weekly);
        setTotalWeeklyVisits(total);
        setTodayActivity(todayCount);

        // ── 2. Case comments popularity ──────────────────────────────────────
        const { data: commentsData } = await supabase
          .from('case_comments')
          .select('case_id');

        const commentMap: Record<string, number> = {};
        (commentsData || []).forEach((row: { case_id: string }) => {
          commentMap[row.case_id] = (commentMap[row.case_id] || 0) + 1;
        });

        setTotalComments((commentsData || []).length);

        // Gabungkan dengan kacamataCases untuk label nama
        const popularity: CasePopularity[] = kacamataCases
          .map(k => ({
            id: k.id,
            name: k.title.length > 22 ? k.title.slice(0, 22) + '…' : k.title,
            count: commentMap[k.id] || 0,
          }))
          .sort((a, b) => b.count - a.count);

        setCasePopularity(popularity);

        // ── 3. Click events — popular tokoh & theory ─────────────────────────
        const { data: clickData } = await supabase
          .from('click_events')
          .select('type, item_name');

        const tokohCount: Record<string, number> = {};
        const theoryCount: Record<string, number> = {};

        (clickData || []).forEach((row: { type: string; item_name: string }) => {
          if (row.type === 'tokoh') {
            tokohCount[row.item_name] = (tokohCount[row.item_name] || 0) + 1;
          } else if (row.type === 'theory') {
            theoryCount[row.item_name] = (theoryCount[row.item_name] || 0) + 1;
          }
        });

        setPopularTokoh(
          Object.entries(tokohCount)
            .map(([name, count]) => ({ name: name.length > 20 ? name.slice(0, 20) + '…' : name, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 5)
        );

        setPopularTheory(
          Object.entries(theoryCount)
            .map(([name, count]) => ({ name: name.length > 22 ? name.slice(0, 22) + '…' : name, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 5)
        );
      } catch (e) {
        console.error('Gagal memuat data dashboard:', e);
      } finally {
        setLoadingCharts(false);
      }
    }

    fetchDashboardData();
  }, [kacamataCases]);

  // ── Stat cards ──────────────────────────────────────────────────────────────
  const stats = [
    {
      title: 'Total Teori',
      value: theories.length,
      sub: 'entri data',
      icon: BookOpen,
      color: 'bg-blue-500',
      glow: 'shadow-blue-100',
    },
    {
      title: 'Roadmap Karir',
      value: careers.length,
      sub: 'jalur karir',
      icon: Briefcase,
      color: 'bg-emerald-500',
      glow: 'shadow-emerald-100',
    },
    {
      title: 'Kunjungan Minggu Ini',
      value: totalWeeklyVisits,
      sub: 'halaman dibuka',
      icon: Users,
      color: 'bg-amber-500',
      glow: 'shadow-amber-100',
    },
    {
      title: 'Aktivitas Hari Ini',
      value: todayActivity,
      sub: 'kunjungan hari ini',
      icon: Activity,
      color: 'bg-purple-500',
      glow: 'shadow-purple-100',
    },
  ];

  const topCases = casePopularity.slice(0, 5);

  // ── Chart colors ─────────────────────────────────────────────────────────
  const BAR_COLORS = ['#10b981', '#f59e0b', '#6366f1', '#ef4444', '#8b5cf6'];

  return (
    <div className="space-y-6">

      {/* ═══════════ STAT CARDS ═══════════ */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div
            key={i}
            className={`bg-white p-6 rounded-2xl border border-slate-200 shadow-sm ${stat.glow} flex items-center gap-4`}
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">{stat.title}</p>
              {loadingCharts && (stat.title === 'Kunjungan Minggu Ini' || stat.title === 'Aktivitas Hari Ini') ? (
                <div className="h-8 flex items-center">
                  <Loader2 className="w-5 h-5 animate-spin text-slate-300" />
                </div>
              ) : (
                <h3 className="font-poppins font-bold text-2xl text-navy">{stat.value.toLocaleString('id-ID')}</h3>
              )}
              <p className="text-[10px] text-slate-400 font-medium mt-0.5">{stat.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ═══════════ EXTRA METRICS ═══════════ */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-sage/10 flex items-center justify-center">
            <Eye className="w-5 h-5 text-sage" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Uji Analisis</p>
            <p className="font-poppins font-bold text-xl text-navy">{kacamataCases.length} kasus</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber/10 flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-amber-500" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Total Argumen Mimbar</p>
            {loadingCharts
              ? <Loader2 className="w-5 h-5 animate-spin text-slate-300 mt-1" />
              : <p className="font-poppins font-bold text-xl text-navy">{totalComments.toLocaleString('id-ID')}</p>
            }
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-purple-500" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Audit Log Tercatat</p>
            <p className="font-poppins font-bold text-xl text-navy">{auditLogs.length}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ═══════════ CHARTS LEFT COL ═══════════ */}
        <div className="lg:col-span-2 space-y-6">

          {/* Weekly visits line chart */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-navy">Kunjungan Platform (Minggu Ini)</h3>
              {loadingCharts && <Loader2 className="w-4 h-4 animate-spin text-slate-400" />}
            </div>
            <div className="h-64 w-full">
              {visitData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={visitData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} allowDecimals={false} />
                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} formatter={(v: number) => [v, 'Kunjungan']} />
                    <Line type="monotone" dataKey="visits" stroke="#10b981" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-slate-300 gap-2">
                  <TrendingUp className="w-10 h-10" />
                  <p className="text-sm text-slate-400">Belum ada data kunjungan minggu ini</p>
                </div>
              )}
            </div>
          </div>

          {/* Case popularity bar chart */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-navy">Uji Analisis Terpopuler</h3>
              <span className="text-xs text-slate-400 font-medium">berdasarkan argumen Mimbar Bebas</span>
            </div>
            <div className="h-64 w-full">
              {loadingCharts ? (
                <div className="h-full flex items-center justify-center">
                  <Loader2 className="w-6 h-6 animate-spin text-slate-300" />
                </div>
              ) : casePopularity.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={casePopularity} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                    <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} allowDecimals={false} />
                    <YAxis
                      type="category"
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#64748b', fontSize: 11 }}
                      width={130}
                    />
                    <Tooltip
                      cursor={{ fill: '#f1f5f9' }}
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      formatter={(v: number) => [v, 'Argumen']}
                    />
                    <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                      {casePopularity.map((_, idx) => (
                        <Cell key={idx} fill={BAR_COLORS[idx % BAR_COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-slate-300 gap-2">
                  <Award className="w-10 h-10" />
                  <p className="text-sm text-slate-400">Belum ada data popularitas kasus</p>
                </div>
              )}
            </div>
          </div>

          {/* Top 5 Uji Analisis cards */}
          {topCases.length > 0 && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-navy mb-5 flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-500" />
                Top 5 Uji Analisis Terpopuler
              </h3>
              <div className="space-y-3">
                {topCases.map((c, idx) => (
                  <div key={c.id} className="flex items-center gap-4">
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0"
                      style={{ backgroundColor: BAR_COLORS[idx % BAR_COLORS.length] }}
                    >
                      {idx + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-navy truncate">{c.name}</p>
                      <div className="mt-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: topCases[0].count > 0 ? `${(c.count / topCases[0].count) * 100}%` : '0%',
                            backgroundColor: BAR_COLORS[idx % BAR_COLORS.length],
                          }}
                        />
                      </div>
                    </div>
                    <span className="text-sm font-bold text-slate-600 shrink-0">
                      {c.count} <span className="text-xs text-slate-400 font-normal">argumen</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Popular Tokoh + Teori side by side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Tokoh Terpopuler */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-navy mb-4 flex items-center gap-2 text-sm">
                <span className="w-5 h-5 rounded-lg bg-amber/10 flex items-center justify-center text-amber-500 text-xs">👤</span>
                Tokoh Terpopuler
              </h3>
              {loadingCharts ? (
                <div className="flex justify-center py-4"><Loader2 className="w-5 h-5 animate-spin text-slate-300" /></div>
              ) : popularTokoh.length > 0 ? (
                <div className="space-y-3">
                  {popularTokoh.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-lg bg-amber/10 text-amber-600 text-xs font-bold flex items-center justify-center shrink-0">{idx + 1}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-navy truncate">{item.name}</p>
                        <div className="mt-1 h-1 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-amber rounded-full" style={{ width: popularTokoh[0].count > 0 ? `${(item.count / popularTokoh[0].count) * 100}%` : '0%' }} />
                        </div>
                      </div>
                      <span className="text-xs font-bold text-slate-500 shrink-0">{item.count}×</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400 text-center py-4">Belum ada data klik tokoh</p>
              )}
            </div>

            {/* Teori Terpopuler */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-navy mb-4 flex items-center gap-2 text-sm">
                <span className="w-5 h-5 rounded-lg bg-sage/10 flex items-center justify-center text-sage text-xs">📖</span>
                Teori Terpopuler
              </h3>
              {loadingCharts ? (
                <div className="flex justify-center py-4"><Loader2 className="w-5 h-5 animate-spin text-slate-300" /></div>
              ) : popularTheory.length > 0 ? (
                <div className="space-y-3">
                  {popularTheory.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-lg bg-sage/10 text-sage text-xs font-bold flex items-center justify-center shrink-0">{idx + 1}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-navy truncate">{item.name}</p>
                        <div className="mt-1 h-1 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-sage rounded-full" style={{ width: popularTheory[0].count > 0 ? `${(item.count / popularTheory[0].count) * 100}%` : '0%' }} />
                        </div>
                      </div>
                      <span className="text-xs font-bold text-slate-500 shrink-0">{item.count}×</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400 text-center py-4">Belum ada data klik teori</p>
              )}
            </div>
          </div>
        </div>

        {/* ═══════════ AUDIT LOGS RIGHT COL ═══════════ */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-navy">Audit Logs</h3>
            <span className="text-xs bg-emerald-50 text-emerald-600 px-2 py-1 rounded-full font-bold border border-emerald-100">Live</span>
          </div>

          <div className="flex-1 overflow-y-auto pl-4 pr-2 custom-scrollbar space-y-4 max-h-[600px]">
            {auditLogs.map((log) => (
              <div key={log.id} className="relative pl-6 pb-4 border-l-2 border-slate-100 last:border-transparent last:pb-0">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-2 border-amber" />
                <div className="text-xs font-bold text-slate-400 mb-1">
                  {log.timestamp instanceof Date
                    ? log.timestamp.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
                    : new Date(log.timestamp).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
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

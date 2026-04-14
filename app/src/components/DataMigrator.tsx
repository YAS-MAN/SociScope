import { useState } from 'react';
import { supabase } from '../lib/supabase'; // Sesuaikan lokasi file supabase.ts kamu
import {
    theories,
    concepts,
    careers,
    alumniData,
    interactiveCases,
    teoResponses
} from '../data/sociologyData'; // Sesuaikan lokasi file data kamu

export default function DataMigrator() {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<string>('Siap migrasi data...');

    const handleMigrateAll = async () => {
        setLoading(true);
        setStatus('Sedang memindahkan data, tunggu sebentar 🚀...');

        try {
            // 1. Migrasi Theories
            const { error: errTheories } = await supabase.from('theories').insert(theories);
            if (errTheories) throw new Error(`Gagal Theories: ${errTheories.message}`);

            // 2. Migrasi Concepts
            const { error: errConcepts } = await supabase.from('concepts').insert(concepts);
            if (errConcepts) throw new Error(`Gagal Concepts: ${errConcepts.message}`);

            // 3. Migrasi Careers
            const { error: errCareers } = await supabase.from('careers').insert(careers);
            if (errCareers) throw new Error(`Gagal Careers: ${errCareers.message}`);

            // 4. Migrasi Alumni (Kita buang ID-nya agar Supabase yang buat otomatis pakai SERIAL)
            const alumniTanpaId = alumniData.map(({ id, ...rest }) => rest);
            const { error: errAlumni } = await supabase.from('alumni').insert(alumniTanpaId);
            if (errAlumni) throw new Error(`Gagal Alumni: ${errAlumni.message}`);

            // 5. Migrasi Interactive Cases
            const { error: errCases } = await supabase.from('interactive_cases').insert(interactiveCases);
            if (errCases) throw new Error(`Gagal Cases: ${errCases.message}`);

            // 6. Migrasi Teo Responses
            // Format Teo Responses tidak punya ID bawaan di TypeScript, jadi aman langsung insert
            const { error: errTeo } = await supabase.from('teo_responses').insert(teoResponses);
            if (errTeo) throw new Error(`Gagal Teo: ${errTeo.message}`);

            setStatus('✅ BERHASIL! Semua data sudah pindah ke Supabase!');
            alert('MIGRASI BERHASIL! Silakan cek dashboard Supabase kamu.');

        } catch (error: any) {
            console.error(error);
            setStatus(`❌ ERROR: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm mb-8">
            <h3 className="text-lg font-bold text-navy mb-2">Alat Migrasi Database</h3>
            <p className="text-sm text-slate-500 mb-4">Klik tombol di bawah HANYA SEKALI untuk memindahkan semua data dummy ke Supabase.</p>

            <button
                onClick={handleMigrateAll}
                disabled={loading}
                className={`px-6 py-3 font-bold rounded-xl text-white transition-all ${loading ? 'bg-slate-400 cursor-not-allowed' : 'bg-amber hover:bg-amber-600'
                    }`}
            >
                {loading ? 'Memproses...' : '🚀 Pindahkan Semua Data ke Supabase!'}
            </button>

            <p className="mt-4 text-sm font-bold text-navy">{status}</p>
        </div>
    );
}
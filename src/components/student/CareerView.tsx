import React, { useState, useEffect } from 'react';
import { CareerContent, CareerPlan, User } from '../../types';
import { api } from '../../api';
import { ASSETS } from '../../data/initialData';
import {
  Compass,
  Briefcase,
  GraduationCap,
  Store,
  FileText,
  Users2,
  Building2,
  Sparkles,
  Save,
  CheckCircle2,
  ExternalLink,
  Target,
  ArrowRight,
} from 'lucide-react';

interface CareerViewProps {
  user?: User | null;
}

export const CareerView: React.FC<CareerViewProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<'articles' | 'my_plan'>('articles');
  const [careerCategory, setCareerCategory] = useState<string>('Semua');
  const [articles, setArticles] = useState<CareerContent[]>([]);
  const [plan, setPlan] = useState<CareerPlan | null>(null);
  const [loading, setLoading] = useState(false);
  const [savingPlan, setSavingPlan] = useState(false);
  const [planSuccessMsg, setPlanSuccessMsg] = useState<string | null>(null);

  // Form Fields for My Plan
  const [mainChoice, setMainChoice] = useState<CareerPlan['main_choice']>('Bekerja');
  const [targetAfterGrad, setTargetAfterGrad] = useState('');
  const [target1Year, setTarget1Year] = useState('');
  const [target3Years, setTarget3Years] = useState('');
  const [skillsNeeded, setSkillsNeeded] = useState('');
  const [actionSteps, setActionSteps] = useState('');

  const categories = [
    'Semua',
    'Dunia Kerja',
    'Pendidikan Lanjut',
    'Wirausaha',
    'PKL',
    'Persiapan CV',
  ];

  const loadData = async () => {
    setLoading(true);
    try {
      const [artList, userPlan] = await Promise.all([
        api.getCareerContents(),
        api.getCareerPlan(),
      ]);
      setArticles(artList);
      if (userPlan) {
        setPlan(userPlan);
        setMainChoice(userPlan.main_choice);
        setTargetAfterGrad(userPlan.target_after_grad);
        setTarget1Year(userPlan.target_1_year);
        setTarget3Years(userPlan.target_3_years);
        setSkillsNeeded(userPlan.skills_needed);
        setActionSteps(userPlan.action_steps);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSavePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingPlan(true);
    setPlanSuccessMsg(null);
    try {
      const saved = await api.saveCareerPlan({
        main_choice: mainChoice,
        target_after_grad: targetAfterGrad,
        target_1_year: target1Year,
        target_3_years: target3Years,
        skills_needed: skillsNeeded,
        action_steps: actionSteps,
      });
      setPlan(saved);
      setPlanSuccessMsg('Rencana masa depanmu berhasil disimpan dan diperbarui.');
      setTimeout(() => setPlanSuccessMsg(null), 3000);
    } catch (err: any) {
      alert(err.message || 'Gagal menyimpan rencana karier.');
    } finally {
      setSavingPlan(false);
    }
  };

  const filteredArticles = articles.filter(
    (a) => careerCategory === 'Semua' || a.category === careerCategory
  );

  return (
    <div className="space-y-6">
      {/* Featured Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-md">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between z-10">
            <div>
              <div className="inline-flex items-center gap-2 text-xs text-teal-300 font-semibold mb-2">
                <Compass className="w-4 h-4 text-teal-400" />
                <span>Bursa Kerja Khusus (BKK) & Pusat Karier Vokasi</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Karier & Masa Depan Vokasi
              </h1>

              <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
                Prinsip BMW: Bekerja di industri mitra DUDI, Melanjutkan studi sarjana/diploma terapan dengan beasiswa KIP Kuliah, atau Merintis Wirausaha mandiri berbasis keahlian kejuruan SMKN 2 Godean.
              </p>
            </div>

            {/* Quick Navigation Tabs */}
            <div className="mt-6 pt-4 border-t border-slate-800 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setActiveTab('articles')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                  activeTab === 'articles'
                    ? 'bg-teal-500 text-slate-950 font-bold'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Informasi & Panduan Karier
              </button>
              <button
                onClick={() => setActiveTab('my_plan')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'my_plan'
                    ? 'bg-teal-500 text-slate-950 font-bold'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <Target className="w-3.5 h-3.5" />
                <span>Rencana Masa Depanku (Roadmap)</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative min-h-[180px] lg:min-h-full overflow-hidden bg-slate-800">
            <img
              src={ASSETS.careerPath}
              alt="Perencanaan Karier SMK"
              className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent lg:bg-gradient-to-r lg:from-slate-900 lg:to-transparent" />
          </div>
        </div>
      </div>

      {/* Filter categories if on articles tab */}
      {activeTab === 'articles' && (
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCareerCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                careerCategory === cat
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Tab 1: Articles / Info */}
      {activeTab === 'articles' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredArticles.map((art) => (
            <div
              key={art.id}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:border-slate-400 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                  <span>{art.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{new Date(art.created_at).toLocaleDateString('id-ID', { dateStyle: 'medium' })}</span>
                </div>

                <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                  {art.title}
                </h3>

                <p className="mt-2 text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {art.summary}
                </p>

                <div className="mt-3 flex flex-wrap gap-1">
                  {art.tags.map((t, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                {art.source_url ? (
                  <a
                    href={art.source_url}
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-teal-700 hover:text-teal-900 flex items-center gap-1"
                  >
                    <span>Buka Panduan Resmi</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <span className="text-slate-500 text-xs">BKK SMKN 2 Godean</span>
                )}
              </div>
            </div>
          ))}

          {filteredArticles.length === 0 && (
            <div className="col-span-3 bg-white rounded-3xl p-12 text-center border border-slate-200">
              <Compass className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-sm font-bold text-slate-700">Belum ada artikel pada kategori ini</p>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: "Rencana Masa Depanku" Interactive Planner */}
      {activeTab === 'my_plan' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <span className="text-xs font-semibold text-teal-700">
                Peta Perjalanan Karier & Cita-Cita Siswa
              </span>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-0.5">
                Rencana Masa Depanku (Roadmap BMW)
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Rancang cita-cita dan target terukurmu setelah menyelesaikan pendidikan di SMKN 2 Godean.
              </p>
            </div>
            {plan?.updated_at && (
              <span className="text-xs text-slate-400 hidden sm:inline tabular-nums">
                Tersimpan: {new Date(plan.updated_at).toLocaleDateString('id-ID')}
              </span>
            )}
          </div>

          {planSuccessMsg && (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{planSuccessMsg}</span>
            </div>
          )}

          <form onSubmit={handleSavePlan} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-2">
                1. Pilihan Fokus Utama Pasca-Lulus:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { value: 'Bekerja', label: 'Bekerja di Industri', icon: Briefcase },
                  { value: 'Kuliah', label: 'Melanjutkan Kuliah', icon: GraduationCap },
                  { value: 'Wirausaha', label: 'Wirausaha Mandiri', icon: Store },
                  { value: 'Bekerja sambil kuliah', label: 'Kerja + Kuliah', icon: Building2 },
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = mainChoice === item.value;
                  return (
                    <button
                      type="button"
                      key={item.value}
                      onClick={() => setMainChoice(item.value as any)}
                      className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-slate-900 border-slate-900 text-white shadow-xs'
                          : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <Icon className={`w-5 h-5 mb-2 ${isSelected ? 'text-teal-400' : 'text-slate-400'}`} />
                      <span className="text-xs font-bold leading-tight">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1">
                  Target Spesifik Setelah Lulus (Bulan 1-6):
                </label>
                <textarea
                  rows={3}
                  value={targetAfterGrad}
                  onChange={(e) => setTargetAfterGrad(e.target.value)}
                  placeholder="Contoh: Diterima magang/bekerja di industri kuliner ternama atau lolos seleksi SNBP Politeknik Negeri."
                  className="w-full p-3 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1">
                  Target 1 Tahun ke Depan:
                </label>
                <textarea
                  rows={3}
                  value={target1Year}
                  onChange={(e) => setTarget1Year(e.target.value)}
                  placeholder="Contoh: Menyelesaikan sertifikasi BNSP tambahan, memiliki tabungan modal mandiri, atau IPK kuliah konsisten."
                  className="w-full p-3 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1">
                  Keahlian (Hard/Soft Skills) yang Perlu Ditingkatkan:
                </label>
                <textarea
                  rows={3}
                  value={skillsNeeded}
                  onChange={(e) => setSkillsNeeded(e.target.value)}
                  placeholder="Contoh: Bahasa Inggris percakapan industri, ketelitian pola jahitan, manajemen waktu kerja tim."
                  className="w-full p-3 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1">
                  Langkah Aksi Nyata yang Dilakukan Sekarang:
                </label>
                <textarea
                  rows={3}
                  value={actionSteps}
                  onChange={(e) => setActionSteps(e.target.value)}
                  placeholder="Contoh: Merapikan portofolio karya digital, aktif bertanya ke guru pembimbing, latihan wawancara STAR."
                  className="w-full p-3 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900"
                />
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-100">
              <button
                type="submit"
                disabled={savingPlan}
                className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{savingPlan ? 'Menyimpan...' : 'Simpan Roadmap Masa Depan'}</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

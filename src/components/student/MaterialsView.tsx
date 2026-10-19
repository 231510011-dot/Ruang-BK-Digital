import React, { useState } from 'react';
import { Material, MaterialCategory, User } from '../../types';
import { api } from '../../api';
import { ASSETS } from '../../data/initialData';
import {
  BookOpen,
  Search,
  CheckCircle,
  Clock,
  Sparkles,
  PlayCircle,
  HelpCircle,
  PenTool,
  CheckCircle2,
  X,
  Share2,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

interface MaterialsViewProps {
  materials: Material[];
  user?: User | null;
  onRefreshMaterials: () => void;
  onOpenJournalWithPrompt?: (prompt: string, title: string) => void;
}

export const MaterialsView: React.FC<MaterialsViewProps> = ({
  materials,
  user,
  onRefreshMaterials,
  onOpenJournalWithPrompt,
}) => {
  const categories: ('Semua' | MaterialCategory)[] = [
    'Semua',
    'BK Pribadi',
    'BK Sosial',
    'BK Belajar',
    'BK Karier',
  ];

  const [activeCategory, setActiveCategory] = useState<'Semua' | MaterialCategory>('Semua');
  const [search, setSearch] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);

  // Modal Interactive States
  const [activeModalTab, setActiveModalTab] = useState<'baca' | 'kuis' | 'refleksi'>('baca');
  const [hasMarkedRead, setHasMarkedRead] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [reflectionText, setReflectionText] = useState('');
  const [reflectionSaved, setReflectionSaved] = useState(false);

  const filteredMaterials = materials.filter((m) => {
    const matchCategory = activeCategory === 'Semua' || m.category === activeCategory;
    const matchSearch =
      !search.trim() ||
      m.title.toLowerCase().includes(search.toLowerCase()) ||
      m.description.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  const handleOpenMaterial = (mat: Material) => {
    setSelectedMaterial(mat);
    setActiveModalTab('baca');
    setHasMarkedRead(false);
    setQuizAnswers({});
    setQuizSubmitted(false);
    setReflectionText('');
    setReflectionSaved(false);
  };

  const handleMarkAsRead = async () => {
    if (!selectedMaterial || hasMarkedRead) return;
    try {
      await api.markMaterialRead(selectedMaterial.id);
      setHasMarkedRead(true);
      onRefreshMaterials();
    } catch (e) {
      console.error(e);
    }
  };

  const handleSaveReflection = async () => {
    if (!selectedMaterial || !reflectionText.trim()) return;
    try {
      await api.createJournal({
        mood: 'Senang',
        title: `Refleksi Materi: ${selectedMaterial.title}`,
        feeling: reflectionText.trim(),
        problems: 'Tantangan dalam mempraktikkan materi di sekolah',
        actions_taken: 'Membaca dan menuntaskan materi di Ruang BK SMKN 2 Godean',
        improvements: 'Terus mempraktikkan wawasan positif secara rutin',
        next_goals: 'Menerapkan kiat ini saat jam sekolah dan praktik kejuruan',
        is_shared_with_counselor: true,
      });
      setReflectionSaved(true);
      if (onOpenJournalWithPrompt) {
        onRefreshMaterials();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6">
      {/* Featured Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-md">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between z-10">
            <div>
              <div className="inline-flex items-center gap-2 text-xs text-blue-300 font-semibold mb-2">
                <BookOpen className="w-4 h-4 text-blue-400" />
                <span>Pusat Literasi & Bimbingan Belajar SMKN 2 Godean</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Materi Bimbingan & Konseling
              </h1>

              <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
                Koleksi modul komprehensif 4 bidang bimbingan: pengembangan kepribadian mandiri, kecakapan sosial bebas perundungan, strategi belajar efisien, dan arah karier BMW (Bekerja, Melanjutkan, Wirausaha).
              </p>
            </div>

            {/* Quick Stats bar */}
            <div className="mt-6 pt-4 border-t border-slate-800 flex flex-wrap items-center gap-6 text-xs text-slate-400">
              <div>
                <span className="text-slate-200 font-bold tabular-nums text-sm">{materials.length}</span> Modul Tersedia
              </div>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <div>
                <span className="text-slate-200 font-bold text-sm">4</span> Bidang Layanan
              </div>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <div>
                Dilengkapi Kuis & Lembar Refleksi Diri
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative min-h-[180px] lg:min-h-full overflow-hidden bg-slate-800">
            <img
              src={ASSETS.materialsHero}
              alt="Materi Bimbingan Konseling"
              className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent lg:bg-gradient-to-r lg:from-slate-900 lg:to-transparent" />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                activeCategory === cat
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari materi atau topik..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-colors"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Materials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredMaterials.map((mat) => (
          <div
            key={mat.id}
            onClick={() => handleOpenMaterial(mat)}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-slate-400 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div className="h-44 bg-slate-100 relative overflow-hidden">
              {mat.image ? (
                <img
                  src={mat.image}
                  alt={mat.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    // Fallback container
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              ) : null}
              {/* Fallback pattern container if image fails or missing */}
              <div className="absolute inset-0 -z-10 flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 text-slate-400 text-xs font-semibold">
                Ruang BK SMKN 2 Godean
              </div>

              {/* Unboxed category tag over scrim */}
              <div className="absolute bottom-3 left-3 bg-slate-900/85 backdrop-blur-xs px-2.5 py-1 rounded text-[11px] font-medium text-white">
                {mat.category}
              </div>

              {mat.quiz_data && mat.quiz_data.length > 0 && (
                <div className="absolute top-3 right-3 bg-purple-700/90 backdrop-blur-xs px-2 py-0.5 rounded text-[10px] font-semibold text-white">
                  Kuis Interaktif
                </div>
              )}
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-2 leading-snug">
                  {mat.title}
                </h3>
                <p className="mt-2 text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {mat.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1.5 tabular-nums">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Dibaca {mat.read_count || 0} kali</span>
                </span>
                <span className="font-semibold text-slate-900 group-hover:text-blue-600 flex items-center gap-1">
                  <span>Pelajari</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredMaterials.length === 0 && (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 text-slate-500">
          <BookOpen className="w-10 h-10 mx-auto text-slate-300 mb-2" />
          <p className="font-bold text-slate-700">Tidak ada materi yang cocok</p>
          <p className="text-xs mt-1">Coba gunakan kata kunci pencarian lain atau pilih kategori Semua.</p>
        </div>
      )}

      {/* Reader Modal */}
      {selectedMaterial && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8 max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-slate-100 flex items-start justify-between bg-slate-50/80">
              <div className="pr-4">
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                  <span>{selectedMaterial.category}</span>
                  <span aria-hidden="true">·</span>
                  <span className="tabular-nums">Dibaca {selectedMaterial.read_count} kali</span>
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                  {selectedMaterial.title}
                </h2>
              </div>
              <button
                onClick={() => setSelectedMaterial(null)}
                className="p-1.5 rounded-xl hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Navigation Tabs */}
            <div className="flex items-center gap-1 px-5 sm:px-6 pt-3 border-b border-slate-100 bg-white">
              <button
                onClick={() => setActiveModalTab('baca')}
                className={`px-4 py-2 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
                  activeModalTab === 'baca'
                    ? 'border-slate-900 text-slate-900'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Uraian Materi
              </button>
              {selectedMaterial.quiz_data && selectedMaterial.quiz_data.length > 0 && (
                <button
                  onClick={() => setActiveModalTab('kuis')}
                  className={`px-4 py-2 text-xs font-semibold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeModalTab === 'kuis'
                      ? 'border-purple-600 text-purple-700'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Kuis Pemahaman ({selectedMaterial.quiz_data.length})</span>
                </button>
              )}
              <button
                onClick={() => setActiveModalTab('refleksi')}
                className={`px-4 py-2 text-xs font-semibold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeModalTab === 'refleksi'
                    ? 'border-emerald-600 text-emerald-700'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <PenTool className="w-3.5 h-3.5" />
                <span>Lembar Refleksi</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1">
              {activeModalTab === 'baca' && (
                <div className="space-y-4">
                  {selectedMaterial.image && (
                    <div className="w-full h-56 rounded-2xl overflow-hidden bg-slate-100">
                      <img
                        src={selectedMaterial.image}
                        alt={selectedMaterial.title}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}

                  <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                    {selectedMaterial.content}
                  </div>

                  {selectedMaterial.video_url && (
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <PlayCircle className="w-6 h-6 text-rose-600" />
                        <div>
                          <p className="text-xs font-bold text-slate-800">Tonton Video Pembelajaran Terkait</p>
                          <p className="text-[11px] text-slate-500">Materi pengayaan audio-visual untuk pemahaman mendalam.</p>
                        </div>
                      </div>
                      <a
                        href={selectedMaterial.video_url}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold flex items-center gap-1"
                      >
                        <span>Putar</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )}
                </div>
              )}

              {activeModalTab === 'kuis' && selectedMaterial.quiz_data && (
                <div className="space-y-6">
                  {selectedMaterial.quiz_data.map((q, qIndex) => {
                    const answered = quizAnswers[qIndex];
                    return (
                      <div key={qIndex} className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                        <p className="text-xs sm:text-sm font-bold text-slate-800">
                          {qIndex + 1}. {q.question}
                        </p>

                        <div className="space-y-2">
                          {q.options.map((opt, optIndex) => {
                            let btnStyle = 'bg-white border-slate-200 hover:bg-slate-100 text-slate-800';

                            if (answered !== undefined) {
                              if (optIndex === q.correctIndex) {
                                btnStyle = 'bg-emerald-50 border-emerald-400 text-emerald-900 font-semibold ring-1 ring-emerald-400';
                              } else if (answered === optIndex) {
                                btnStyle = 'bg-rose-50 border-rose-400 text-rose-900 font-semibold';
                              } else {
                                btnStyle = 'bg-white opacity-40 border-slate-200 text-slate-400';
                              }
                            }

                            return (
                              <button
                                key={optIndex}
                                onClick={() => {
                                  if (answered === undefined) {
                                    setQuizAnswers({ ...quizAnswers, [qIndex]: optIndex });
                                  }
                                }}
                                disabled={answered !== undefined}
                                className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-start gap-2.5 cursor-pointer ${btnStyle}`}
                              >
                                <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                                  {String.fromCharCode(65 + optIndex)}
                                </span>
                                <span>{opt}</span>
                              </button>
                            );
                          })}
                        </div>

                        {answered !== undefined && (
                          <div className={`p-3 rounded-xl text-xs ${answered === q.correctIndex ? 'bg-emerald-50 text-emerald-900 border border-emerald-200' : 'bg-rose-50 text-rose-900 border border-rose-200'}`}>
                            <p className="font-bold mb-0.5">
                              {answered === q.correctIndex ? 'Jawaban Benar!' : 'Kurang Tepat:'}
                            </p>
                            <p>{q.explanation}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {activeModalTab === 'refleksi' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900">
                    <p className="font-bold mb-1">Panduan Refleksi Mandiri:</p>
                    <p>{selectedMaterial.reflection_prompt || 'Tuliskan apa wawasan terpenting yang kamu peroleh dari materi ini dan bagaimana kamu akan mempraktikkannya di sekolah.'}</p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Catatan Refleksimu (Tersimpan ke Jurnal BK):
                    </label>
                    <textarea
                      rows={5}
                      value={reflectionText}
                      onChange={(e) => setReflectionText(e.target.value)}
                      placeholder="Tuliskan refleksi, tantangan, atau resolusi belajarmu di sini..."
                      className="w-full p-3.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-[11px] text-slate-400">
                      Refleksi ini dibagikan secara privat kepada Guru BK.
                    </span>
                    <button
                      onClick={handleSaveReflection}
                      disabled={!reflectionText.trim() || reflectionSaved}
                      className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white font-semibold text-xs transition-colors cursor-pointer"
                    >
                      {reflectionSaved ? 'Refleksi Tersimpan ✓' : 'Simpan ke Jurnal'}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
              <button
                onClick={handleMarkAsRead}
                disabled={hasMarkedRead}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
                  hasMarkedRead
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{hasMarkedRead ? 'Sudah Ditandai Dibaca' : 'Tandai Selesai Dibaca'}</span>
              </button>

              <button
                onClick={() => setSelectedMaterial(null)}
                className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors cursor-pointer"
              >
                Tutup Modul
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

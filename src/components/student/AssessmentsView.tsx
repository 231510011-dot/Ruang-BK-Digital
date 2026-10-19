import React, { useState, useEffect } from 'react';
import { Assessment, AssessmentResult, User } from '../../types';
import { api } from '../../api';
import { ASSETS } from '../../data/initialData';
import {
  BrainCircuit,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  MessageSquareHeart,
  BookOpen,
  RotateCcw,
  Sparkles,
  Award,
  Clock,
  ChevronRight,
} from 'lucide-react';

interface AssessmentsViewProps {
  user?: User | null;
  onNavigateToConsultation: (topic?: string) => void;
  onNavigateToMaterials: () => void;
}

export const AssessmentsView: React.FC<AssessmentsViewProps> = ({
  user,
  onNavigateToConsultation,
  onNavigateToMaterials,
}) => {
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [historyResults, setHistoryResults] = useState<AssessmentResult[]>([]);
  const [selectedAssessment, setSelectedAssessment] = useState<Assessment | null>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [currentResult, setCurrentResult] = useState<AssessmentResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const scaleOptions = [
    { value: 1, label: 'Sangat Kurang Sesuai', short: '1' },
    { value: 2, label: 'Kurang Sesuai', short: '2' },
    { value: 3, label: 'Cukup Sesuai', short: '3' },
    { value: 4, label: 'Sesuai', short: '4' },
    { value: 5, label: 'Sangat Sesuai', short: '5' },
  ];

  const loadData = async () => {
    setLoading(true);
    try {
      const [assList, resList] = await Promise.all([
        api.getAssessments(),
        api.getAssessmentResults(),
      ]);
      setAssessments(assList);
      setHistoryResults(resList);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSelectAssessment = (ass: Assessment) => {
    setSelectedAssessment(ass);
    setCurrentResult(null);
    const initAns: Record<number, number> = {};
    ass.questions.forEach((q) => {
      initAns[q.id] = 3;
    });
    setAnswers(initAns);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const handleAnswerChange = (questionId: number, val: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: val }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAssessment) return;

    setSubmitting(true);
    try {
      const res = await api.submitAssessment(selectedAssessment.id, answers, {
        student_name: user?.name,
        student_class: user?.class,
      });
      setCurrentResult(res);
      setHistoryResults((prev) => [res, ...prev.filter((item) => item.id !== res.id)]);
      window.scrollTo({ top: 300, behavior: 'smooth' });
    } catch (err: any) {
      alert(err.message || 'Gagal menyimpan hasil assessment.');
    } finally {
      setSubmitting(false);
    }
  };

  // Calculate answered count
  const answeredCount = selectedAssessment
    ? selectedAssessment.questions.filter((q) => answers[q.id] !== undefined).length
    : 0;
  const progressPercent = selectedAssessment
    ? Math.round((answeredCount / selectedAssessment.questions.length) * 100)
    : 0;

  return (
    <div className="space-y-6">
      {/* Visual Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-md">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between z-10">
            <div>
              <div className="inline-flex items-center gap-2 text-xs text-purple-300 font-semibold mb-2">
                <BrainCircuit className="w-4 h-4 text-purple-400" />
                <span>Instrumen Pemetaan Potensi & Kesiapan Siswa</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Self-Assessment Mandiri
              </h1>

              <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
                Evaluasi kebiasaan belajar kejuruan, pengendalian prokrastinasi, efikasi diri, kenyamanan emosional, dan kematangan pilihan karier BMW melalui kuesioner reflektif skala 1-5.
              </p>
            </div>

            {/* Quick Metrics Bar */}
            <div className="mt-6 pt-4 border-t border-slate-800 flex flex-wrap items-center gap-6 text-xs text-slate-400">
              <div>
                <span className="text-slate-200 font-bold tabular-nums text-sm">{assessments.length}</span> Instrumen Asesmen
              </div>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <div>
                <span className="text-slate-200 font-bold tabular-nums text-sm">{historyResults.length}</span> Riwayat Terisi
              </div>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <div>
                Umpan Balik & Rekomendasi Instan
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative min-h-[180px] lg:min-h-full overflow-hidden bg-slate-800">
            <img
              src={ASSETS.assessmentMind}
              alt="Self Assessment BK SMKN 2 Godean"
              className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent lg:bg-gradient-to-r lg:from-slate-900 lg:to-transparent" />
          </div>
        </div>
      </div>

      {/* Ethical Guidance Callout */}
      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-slate-900 mb-0.5">Pemberitahuan Etis Bimbingan & Konseling:</p>
          <p className="leading-relaxed">
            Instrumen self-assessment mandiri ini berfungsi sebagai refleksi awal dan pemetaan potensi pribadi siswa, bukan sebagai alat vonis atau diagnosis klinis psikologis formal. Hasil dapat dikonsultasikan secara aman dengan Guru BK.
          </p>
        </div>
      </div>

      {/* Active Form Mode */}
      {selectedAssessment && !currentResult && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-200 shadow-lg space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                <span>{selectedAssessment.category}</span>
                <span aria-hidden="true">·</span>
                <span>{selectedAssessment.questions.length} Butir Pertanyaan</span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                {selectedAssessment.title}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                {selectedAssessment.description}
              </p>
            </div>
            <button
              onClick={() => setSelectedAssessment(null)}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 cursor-pointer self-start sm:self-auto"
            >
              Batal
            </button>
          </div>

          {/* Progress Bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs text-slate-500 font-medium">
              <span>Kelengkapan Jawaban</span>
              <span className="tabular-nums font-semibold text-purple-700">{progressPercent}%</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-purple-600 transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              {selectedAssessment.questions.map((q, idx) => (
                <div
                  key={q.id}
                  className="p-4 sm:p-5 rounded-2xl bg-slate-50/70 border border-slate-200 space-y-3"
                >
                  <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-snug">
                    {idx + 1}. {q.text}
                  </p>

                  <div className="grid grid-cols-5 gap-1.5 sm:gap-3">
                    {scaleOptions.map((opt) => {
                      const isSelected = answers[q.id] === opt.value;
                      return (
                        <button
                          type="button"
                          key={opt.value}
                          onClick={() => handleAnswerChange(q.id, opt.value)}
                          className={`p-2.5 sm:p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
                            isSelected
                              ? 'bg-purple-600 border-purple-600 text-white shadow-xs font-bold'
                              : 'bg-white border-slate-200 hover:bg-slate-100 text-slate-700'
                          }`}
                        >
                          <span className="text-sm sm:text-base font-extrabold tabular-nums">
                            {opt.short}
                          </span>
                          <span className="text-[10px] hidden sm:block mt-1 font-medium truncate max-w-full">
                            {opt.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setSelectedAssessment(null)}
                className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 cursor-pointer"
              >
                Kembali
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 active:scale-98 text-white text-xs font-semibold shadow-md shadow-purple-600/20 transition-all cursor-pointer"
              >
                {submitting ? 'Menghitung Hasil...' : 'Lihat Hasil & Interpretasi'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Result Display Card */}
      {currentResult && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-300 shadow-lg space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-semibold text-emerald-700">
                  Hasil Analisis Self-Assessment:
                </span>
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
                  {currentResult.assessment_title}
                </h3>
              </div>
            </div>
            <button
              onClick={() => {
                setCurrentResult(null);
                setSelectedAssessment(null);
              }}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 cursor-pointer"
            >
              Tutup Hasil
            </button>
          </div>

          {/* Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
              <span className="text-xs font-semibold text-emerald-800">Skor Diperoleh</span>
              <p className="text-2xl sm:text-3xl font-extrabold text-emerald-700 mt-1 tabular-nums">
                {currentResult.score}{' '}
                <span className="text-sm font-normal text-emerald-600">/ {currentResult.max_score}</span>
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-center">
              <span className="text-xs font-semibold text-blue-800">Persentase Capaian</span>
              <p className="text-2xl sm:text-3xl font-extrabold text-blue-700 mt-1 tabular-nums">
                {currentResult.percentage}%
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 text-center flex flex-col justify-center">
              <span className="text-xs font-semibold text-purple-800">Status Refleksi</span>
              <p className="text-base font-extrabold text-purple-700 mt-1">
                {currentResult.percentage >= 80
                  ? 'Sangat Optimal'
                  : currentResult.percentage >= 60
                  ? 'Berkembang Baik'
                  : 'Perlu Penguatan'}
              </p>
            </div>
          </div>

          {/* Interpretation */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
            <h4 className="text-xs sm:text-sm font-bold text-slate-900">
              Interpretasi Hasil Refleksi:
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {currentResult.interpretation}
            </p>
          </div>

          {/* Recommendations */}
          <div className="p-5 rounded-2xl bg-indigo-50/70 border border-indigo-200 space-y-2.5">
            <h4 className="text-xs sm:text-sm font-bold text-indigo-950 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>Rekomendasi Tindak Lanjut Guru BK:</span>
            </h4>
            <ul className="space-y-1.5 text-xs text-indigo-900">
              {currentResult.recommendations.map((rec, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-indigo-600 font-bold">•</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              onClick={() => onNavigateToConsultation(`Tindak Lanjut Hasil ${currentResult.assessment_title}`)}
              className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageSquareHeart className="w-4 h-4" />
              <span>Konsultasikan Hasil Ini dengan Guru BK</span>
            </button>

            <button
              onClick={onNavigateToMaterials}
              className="w-full sm:w-auto py-3 px-4 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs border border-slate-300 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              <span>Baca Modul Materi Terkait</span>
            </button>
          </div>
        </div>
      )}

      {/* Available Assessments Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-slate-900">
            Daftar Instrumen Self-Assessment
          </h3>
          <span className="text-xs text-slate-500 tabular-nums">
            {assessments.length} Instrumen Tersedia
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {assessments.map((ass) => (
            <div
              key={ass.id}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:border-slate-400 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="text-xs text-slate-500 font-medium mb-1">
                  {ass.category} · {ass.questions.length} Butir
                </div>

                <h4 className="text-sm font-bold text-slate-900 mt-1 group-hover:text-purple-700 transition-colors">
                  {ass.title}
                </h4>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed line-clamp-3">
                  {ass.description}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">Skala 1 - 5</span>
                <button
                  onClick={() => handleSelectAssessment(ass)}
                  className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Mulai Pengisian</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Assessment History */}
      {historyResults.length > 0 && (
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
          <h3 className="text-sm font-bold text-slate-900 mb-3">
            Riwayat Self-Assessment Kamu ({historyResults.length})
          </h3>
          <div className="space-y-2.5">
            {historyResults.slice(0, 5).map((h) => (
              <div
                key={h.id}
                className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-slate-900">
                    {h.assessment_title}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Tanggal: {new Date(h.created_at).toLocaleDateString('id-ID', { dateStyle: 'medium' })}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-purple-700 tabular-nums">
                    Skor: {h.score}/{h.max_score} ({h.percentage}%)
                  </span>
                  <button
                    onClick={() => {
                      setCurrentResult(h);
                      setSelectedAssessment(null);
                      window.scrollTo({ top: 300, behavior: 'smooth' });
                    }}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-800 cursor-pointer"
                  >
                    Lihat Hasil
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

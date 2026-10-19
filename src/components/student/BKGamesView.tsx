import React, { useState, useEffect } from 'react';
import { User } from '../../types';
import { ASSETS } from '../../data/initialData';
import {
  Gamepad2,
  Brain,
  Smile,
  Users,
  Compass,
  Trophy,
  Play,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Sparkles,
  ArrowRight,
  Award,
  Zap,
  Heart,
  ShieldCheck,
  Clock,
  HelpCircle,
  Lightbulb,
  Briefcase,
  Check,
} from 'lucide-react';

interface BKGamesViewProps {
  user?: User | null;
  onNavigate: (view: string) => void;
}

type GameCategory = 'all' | 'pribadi' | 'sosial' | 'belajar' | 'karier';

export const BKGamesView: React.FC<BKGamesViewProps> = ({ user, onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<GameCategory>('all');
  const [activeGameId, setActiveGameId] = useState<string | null>(null);

  // Gamification state
  const [totalScore, setTotalScore] = useState<number>(() => {
    const saved = localStorage.getItem('bk_games_score');
    return saved ? parseInt(saved, 10) : 150;
  });
  const [badges, setBadges] = useState<string[]>(() => {
    const saved = localStorage.getItem('bk_games_badges');
    return saved ? JSON.parse(saved) : ['Siswa Reflektif', 'Pejuang Vokasi'];
  });

  const addScore = (points: number, badgeName?: string) => {
    const newScore = totalScore + points;
    setTotalScore(newScore);
    localStorage.setItem('bk_games_score', newScore.toString());

    if (badgeName && !badges.includes(badgeName)) {
      const newBadges = [...badges, badgeName];
      setBadges(newBadges);
      localStorage.setItem('bk_games_badges', JSON.stringify(newBadges));
    }
  };

  // --- GAME 1: BK Pribadi - Roda Emosi & Mindful Breathing ---
  const [emotionSelected, setEmotionSelected] = useState<string | null>(null);
  const [breathPhase, setBreathPhase] = useState<'tarik' | 'tahan' | 'hembuskan' | 'siap'>('siap');
  const [breathSeconds, setBreathSeconds] = useState(4);
  const [breathCycles, setBreathCycles] = useState(0);
  const [isBreathingActive, setIsBreathingActive] = useState(false);
  const [pribadiFeedback, setPribadiFeedback] = useState<string | null>(null);

  useEffect(() => {
    let timer: any;
    if (isBreathingActive) {
      timer = setInterval(() => {
        setBreathSeconds((prev) => {
          if (prev <= 1) {
            if (breathPhase === 'tarik') {
              setBreathPhase('tahan');
              return 4;
            } else if (breathPhase === 'tahan') {
              setBreathPhase('hembuskan');
              return 4;
            } else if (breathPhase === 'hembuskan') {
              setBreathPhase('tarik');
              setBreathCycles((c) => {
                const nextC = c + 1;
                if (nextC >= 3) {
                  addScore(40, 'Ketenangan Diri');
                  setPribadiFeedback('Hebat! Kamu telah menyelesaikan 3 siklus pernapasan relaksasi. Detak jantungmu kini lebih teratur.');
                }
                return nextC;
              });
              return 4;
            } else {
              setBreathPhase('tarik');
              return 4;
            }
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isBreathingActive, breathPhase]);

  const startBreathing = () => {
    setIsBreathingActive(true);
    setBreathPhase('tarik');
    setBreathSeconds(4);
    setBreathCycles(0);
    setPribadiFeedback(null);
  };

  const stopBreathing = () => {
    setIsBreathingActive(false);
    setBreathPhase('siap');
  };

  const emotionsList = [
    {
      name: 'Cemas / Takut Ujian',
      color: 'bg-amber-50 text-amber-900 border-amber-300',
      tips: 'Perasaan cemas adalah sinyal tubuhmu sedang bersiap. Ambil napas dalam 4 hitungan, dan fokuslah pada 1 langkah konkret yang bisa kamu kendalikan hari ini.',
    },
    {
      name: 'Kewalahan / Lelah Praktik',
      color: 'bg-blue-50 text-blue-900 border-blue-300',
      tips: 'Istirahat bukan tanda menyerah, melainkan strategi bertahan. Izinkan dirimu rehat sejenak sebelum memulai kembali dengan tugas terkecil.',
    },
    {
      name: 'Kurang Percaya Diri',
      color: 'bg-purple-50 text-purple-900 border-purple-300',
      tips: 'Setiap siswa SMK berproses dengan kecepatan berbeda. Ingat satu keahlian praktik yang sudah berhasil kamu kuasai minggu ini.',
    },
    {
      name: 'Bersemangat & Lega',
      color: 'bg-emerald-50 text-emerald-900 border-emerald-300',
      tips: 'Energi positif ini sangat baik! Bagikan senyum kepada teman atau manfaatkan untuk menyelesaikan job sheet praktik yang menantang.',
    },
  ];

  // --- GAME 2: BK Sosial - Detektif Empati & Anti-Bullying ---
  const socialScenarios = [
    {
      id: 1,
      title: 'Kasus 1: Olokan di Grup Chat WhatsApp Kelas',
      story: 'Di grup WA kelas, seorang teman mengunggah foto candid siswa lain yang tertidur di lab praktik dengan stiker mengejek. Teman-teman lain mengirimkan emoji tertawa.',
      options: [
        {
          text: 'Ikut menertawakan agar dianggap asyik dan tidak dikucilkan teman-teman.',
          correct: false,
          feedback: 'Ikut menertawakan memperparah cyberbullying dan melukai perasaan korban.',
        },
        {
          text: 'Diam saja dan pura-pura tidak membaca obrolan grup.',
          correct: false,
          feedback: 'Sikap pasif (bystander) membuat pelaku merasa tindakannya wajar dan dibiarkan.',
        },
        {
          text: 'Secara asertif menulis di grup: "Teman-teman, yuk hargai privasi dan jangan jadikan foto tidur sebagai bahan tertawaan."',
          correct: true,
          feedback: 'Tepat sekali! Sikap asertif membela teman tanpa kekerasan adalah ciri siswa berkarakter kuat dan berempati tinggi.',
        },
      ],
    },
    {
      id: 2,
      title: 'Kasus 2: Penolakan Rekan Kelompok Praktik',
      story: 'Saat pembagian kelompok tugas praktik kejuruan, seorang teman yang pendiam tidak diajak oleh kelompok manapun karena dinilai kurang aktif.',
      options: [
        {
          text: 'Mengajaknya bergabung ke kelompokmu dan membagi tugas sesuai kelebihan masing-masing.',
          correct: true,
          feedback: 'Pilihan luar biasa! Setiap orang memiliki potensi jika diberi ruang kerja sama yang saling mendukung.',
        },
        {
          text: 'Menghindarinya karena takut nilai praktik kelompokmu menurun.',
          correct: false,
          feedback: 'Mengabaikan teman mempersempit kesempatan saling belajar dan menumbuhkan kepedulian sosial.',
        },
        {
          text: 'Menunggu instruksi guru saja tanpa mengambil inisiatif sosial.',
          correct: false,
          feedback: 'Inisiatif empati mandiri jauh lebih dihargai daripada pasif menunggu teguran.',
        },
      ],
    },
    {
      id: 3,
      title: 'Kasus 3: Membedakan Guyonan vs Perundungan',
      story: 'Temanmu sering disembunyikan helm motornya setiap pulang sekolah dan dia tampak tersenyum canggung tapi tertekan.',
      options: [
        {
          text: 'Menilai itu hanya bercanda biasa karena korban ikut tersenyum.',
          correct: false,
          feedback: 'Senyum canggung sering kali adalah respon proteksi diri korban yang takut melawan.',
        },
        {
          text: 'Mendatangi teman tersebut secara empatik di waktu privat dan menanyakan apakah ia merasa terganggu atau butuh bantuan.',
          correct: true,
          feedback: 'Sangat bijak! Memastikan kenyamanan korban secara privat menciptakan ruang aman untuk bercerita.',
        },
        {
          text: 'Membalas menyembunyikan helm si pelaku agar dia kapok.',
          correct: false,
          feedback: 'Membalas dengan tindakan serupa hanya akan menciptakan lingkaran konflik baru.',
        },
      ],
    },
    {
      id: 4,
      title: 'Kasus 4: Pengucilan Saat Istirahat di Kantin',
      story: 'Siswa pindahan baru duduk sendirian di sudut kantin sekolah dan terlihat canggung mengajak bicara siswa lain.',
      options: [
        {
          text: 'Menghampirinya dengan ramah, menyapa, dan mengajaknya duduk bersama teman-teman mejamu.',
          correct: true,
          feedback: 'Sikap inklusif yang mulia! Keramahan kecil ini bisa mengubah hari seseorang menjadi jauh lebih berarti.',
        },
        {
          text: 'Memperhatikan dari kejauhan sambil membicarakannya dengan teman semeja.',
          correct: false,
          feedback: 'Membicarakan di belakang justru membuat siswa baru merasa semakin terisolasi dan tidak nyaman.',
        },
        {
          text: 'Acuh tak acuh karena bukan urusan atau teman akrabmu.',
          correct: false,
          feedback: 'Menutup diri dari orang baru membatasi jaringan pertemanan dan empati sosial.',
        },
      ],
    },
  ];
  const [currentSocialIndex, setCurrentSocialIndex] = useState(0);
  const [socialAnswered, setSocialAnswered] = useState<number | null>(null);
  const [socialScore, setSocialScore] = useState(0);

  const handleSelectSocialOption = (index: number) => {
    if (socialAnswered !== null) return;
    setSocialAnswered(index);
    const isCorrect = socialScenarios[currentSocialIndex].options[index].correct;
    if (isCorrect) {
      setSocialScore((s) => s + 35);
      addScore(35, 'Duta Empati');
    }
  };

  const nextSocialScenario = () => {
    setSocialAnswered(null);
    if (currentSocialIndex < socialScenarios.length - 1) {
      setCurrentSocialIndex((prev) => prev + 1);
    } else {
      addScore(50, 'Master Hubungan Sosial');
    }
  };

  const resetSocialGame = () => {
    setCurrentSocialIndex(0);
    setSocialAnswered(null);
    setSocialScore(0);
  };

  // --- GAME 3: BK Belajar - Matriks Skala Prioritas Eisenhower ---
  const taskItems = [
    {
      id: 1,
      title: 'Laporan Job Sheet Praktik Kejuruan deadline besok jam 07.30',
      correctQuadrant: 1,
      explanation: 'Deadline sangat dekat dan memiliki konsekuensi nilai langsung. Lakukan segera (Do it now)!',
    },
    {
      id: 2,
      title: 'Mempersiapkan materi Uji Sertifikasi Kompetensi BNSP (2 bulan lagi)',
      correctQuadrant: 2,
      explanation: 'Kunci kesuksesan SMK adalah mencicil latihan kejuruan sebelum mepet ujian. Jadwalkan secara teratur (Plan it)!',
    },
    {
      id: 3,
      title: 'Notifikasi chat grup game online yang sedang ramai mengajak mabar',
      correctQuadrant: 4,
      explanation: 'Distraksi waktu terbesar. Batasi dan singkirkan saat jam belajar fokus (Eliminate)!',
    },
    {
      id: 4,
      title: 'Diajak teman membeli jajan saat kamu sedang menyelesaikan job sheet penting',
      correctQuadrant: 3,
      explanation: 'Sampaikan secara asertif untuk menyusul nanti setelah tugasmu selesai (Delegate/Limit).',
    },
    {
      id: 5,
      title: 'Menjaga kesehatan fisik dengan tidur teratur 7-8 jam per hari',
      correctQuadrant: 2,
      explanation: 'Fondasi konsentrasi otak di bengkel/lab praktik adalah istirahat berkualitas. Investasi jangka panjang penting!',
    },
    {
      id: 6,
      title: 'Scroll feed video media sosial tanpa tujuan selama 2 jam berturut-turut',
      correctQuadrant: 4,
      explanation: 'Pemboros energi mental dan waktu paling fatal. Kurangi dan ganti dengan membaca referensi kejuruan.',
    },
  ];

  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [taskFeedback, setTaskFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);
  const [belajarScore, setBelajarScore] = useState(0);

  const handleClassifyTask = (quadrantNumber: number) => {
    if (taskFeedback) return;
    const task = taskItems[currentTaskIndex];
    const isCorrect = task.correctQuadrant === quadrantNumber;

    if (isCorrect) {
      setBelajarScore((s) => s + 25);
      addScore(25, 'Jawara Skala Prioritas');
      setTaskFeedback({
        isCorrect: true,
        text: `Tepat sekali! ${task.explanation}`,
      });
    } else {
      setTaskFeedback({
        isCorrect: false,
        text: `Kurang tepat. ${task.explanation}`,
      });
    }
  };

  const nextBelajarTask = () => {
    setTaskFeedback(null);
    if (currentTaskIndex < taskItems.length - 1) {
      setCurrentTaskIndex((prev) => prev + 1);
    } else {
      addScore(50, 'Master Manajemen Waktu');
    }
  };

  const resetBelajarGame = () => {
    setCurrentTaskIndex(0);
    setTaskFeedback(null);
    setBelajarScore(0);
  };

  // --- GAME 4: BK Karier - Holland RIASEC SMK Career Quest ---
  const riasecQuestions = [
    {
      id: 1,
      question: 'Aktivitas praktik mana yang paling membuatmu betah berjam-jam?',
      options: [
        { text: 'Memperbaiki mesin, menyetel peralatan teknik, atau mengolah bahan nyata dengan tangan.', type: 'R' },
        { text: 'Merancang pola busana, menata plating makanan estetis, atau mendesain grafis visual.', type: 'A' },
        { text: 'Menghitung estimasi biaya bahan (costing), menyusun laporan stok barang yang rapi.', type: 'C' },
        { text: 'Melayani pelanggan di front office, mengajari teman, atau merawat kebugaran orang lain.', type: 'S' },
      ],
    },
    {
      id: 2,
      question: 'Jika kamu diberi modal awal di SMK, proyek mana yang ingin kamu pimpin?',
      options: [
        { text: 'Mendirikan bengkel servis modern atau unit fabrikasi komponen presisi.', type: 'R' },
        { text: 'Menciptakan brand busana apparel atau studio desain interior mandiri.', type: 'A' },
        { text: 'Membuka agensi pemasaran online dan mengelola strategi penjualan produk kejuruan.', type: 'E' },
        { text: 'Mendirikan lembaga kursus kejuruan dan pusat pemberdayaan keahlian adik kelas.', type: 'S' },
      ],
    },
    {
      id: 3,
      question: 'Keahlian non-teknis apa yang paling ingin kamu asah untuk masa depan?',
      options: [
        { text: 'Ketelitian dalam menganalisis gambar teknik atau konstruksi detail.', type: 'I' },
        { text: 'Kreativitas menciptakan tren visual yang belum pernah ada sebelumnya.', type: 'A' },
        { text: 'Kemampuan negosiasi, memimpin tim, dan mengambil risiko wirausaha berani.', type: 'E' },
        { text: 'Kerapian dokumentasi kerja, disiplin SOP industri, dan ketepatan administrasi.', type: 'C' },
      ],
    },
    {
      id: 4,
      question: 'Bagaimana lingkungan kerja impianmu setelah lulus dari SMKN 2 Godean?',
      options: [
        { text: 'Industri manufaktur modern berteknologi tinggi dengan alat canggih.', type: 'R' },
        { text: 'Studio kreatif atau dapur bakery hotel bintang 5 dengan kebebasan berinovasi.', type: 'A' },
        { text: 'Kantor korporasi mapan dengan jenjang karier manajemen yang jelas.', type: 'E' },
        { text: 'Rumah sakit, salon kecantikan medis, atau industri jasa yang langsung membahagiakan orang.', type: 'S' },
      ],
    },
  ];

  const [careerAnswers, setCareerAnswers] = useState<string[]>([]);
  const [careerResult, setCareerResult] = useState<{
    code: string;
    title: string;
    description: string;
    bmwPath: { bekerja: string; kuliah: string; wirausaha: string };
  } | null>(null);

  const handleAnswerCareer = (type: string) => {
    const updated = [...careerAnswers, type];
    setCareerAnswers(updated);

    if (updated.length === riasecQuestions.length) {
      const counts: Record<string, number> = {};
      updated.forEach((t) => (counts[t] = (counts[t] || 0) + 1));
      const sorted = Object.keys(counts).sort((a, b) => counts[b] - counts[a]);
      const dominant = sorted[0] || 'R';

      let res = {
        code: `${dominant} - Realistic & Problem Solver`,
        title: 'Praktisi Tangguh & Berorientasi Solusi Nyata',
        description: 'Kamu memiliki kecenderungan menyukai tindakan konkret, pemecahan masalah fisik terapan, dan ketelitian kerja khas siswa kejuruan handal.',
        bmwPath: {
          bekerja: 'Teknisi profesional, Drafter CAD/BIM, Pattern Maker Busana, Mekanik Ahli, Quality Control.',
          kuliah: 'D4/S1 Teknik Mesin, Pendidikan Vokasi, Desain Produk Terapan.',
          wirausaha: 'Membuka bengkel servis modern, biro jasa gambar 3D, atau unit fabrikasi mandiri.',
        },
      };

      if (dominant === 'A') {
        res = {
          code: 'A - Artistic & Creative Innovator',
          title: 'Kreator & Desainer Estetis Vokasi',
          description: 'Kamu memiliki kepekaan visual tinggi, rasa estetika tajam, dan senang bereksperimen dengan orisinalitas karya seni terapan.',
          bmwPath: {
            bekerja: 'Fashion Designer, Pastry Plating Specialist, Desainer Grafis/Interior, Stylist.',
            kuliah: 'S1/D4 Desain Mode & Busana, Desain Komunikasi Visual, Seni Rupa Terapan.',
            wirausaha: 'Brand busana independen, studio custom apparel, toko kue artisan premium.',
          },
        };
      } else if (dominant === 'E') {
        res = {
          code: 'E - Enterprising & Leader',
          title: 'Technopreneur & Penggerak Industri SMK',
          description: 'Kamu memiliki jiwa kepemimpinan, berani berkomunikasi, dan pintar melihat peluang ekonomi dari keahlian teknis.',
          bmwPath: {
            bekerja: 'Supervisor Operasional, Sales Engineer, Marketing Executive, Koordinator Produksi.',
            kuliah: 'S1 Manajemen Bisnis, Kewirausahaan, Teknik Industri Terapan.',
            wirausaha: 'Merintis usaha jasa katering skala besar, distributor perlengkapan salon, agen kargo.',
          },
        };
      } else if (dominant === 'S') {
        res = {
          code: 'S - Social & Service Specialist',
          title: 'Pelayan Prima & Komunikator Empatis',
          description: 'Kamu sangat senang berinteraksi, mendengarkan, dan memberikan pelayanan yang menghangatkan orang lain.',
          bmwPath: {
            bekerja: 'Front Office Hotel, Konsultan Kecantikan/TKKR, Customer Relation Officer.',
            kuliah: 'S1 Bimbingan Konseling, Manajemen Perhotelan, Psikologi, Keperawatan.',
            wirausaha: 'Klinik perawatan kecantikan, wedding organizer, biro pelatihan keterampilan anak muda.',
          },
        };
      }

      setCareerResult(res);
      addScore(60, 'Eksplorator Karier SMK');
    }
  };

  const resetCareerGame = () => {
    setCareerAnswers([]);
    setCareerResult(null);
  };

  // --- GAME 5: Cerdas Cermat Mitos vs Fakta BK ---
  const mythBusterQuestions = [
    {
      id: 1,
      statement: 'Ruang BK di sekolah hanya diperuntukkan bagi siswa yang melakukan pelanggaran tata tertib atau nakal.',
      isFact: false,
      explanation: 'MITOS BESAR! Ruang BK adalah sahabat semua siswa untuk pengembangan bakat, konsultasi karier BMW, teknik belajar, dan kenyamanan mental tanpa ada penghakiman.',
    },
    {
      id: 2,
      statement: 'Semua rahasia masalah pribadi yang diceritakan siswa di ruang konseling dilindungi oleh Kode Etik Kerahasiaan BK.',
      isFact: true,
      explanation: 'FAKTA! Asas Kerahasiaan adalah pilar utama profesi Bimbingan & Konseling. Guru BK tidak boleh membocorkan rahasia konseli tanpa izin.',
    },
    {
      id: 3,
      statement: 'Siswa lulusan SMK tidak bisa mendaftar beasiswa kuliah sarjana (S1) seperti KIP Kuliah.',
      isFact: false,
      explanation: 'MITOS! Siswa SMK berhak mendaftar seluruh jalur SNBP, SNBT, dan beasiswa KIP Kuliah baik di Politeknik Negeri maupun Universitas.',
    },
    {
      id: 4,
      statement: 'Menjadi orang asertif berarti berani menyampaikan pendapat dan batasan diri secara sopan tanpa perlu menggunakan nada marah.',
      isFact: true,
      explanation: 'FAKTA! Asertivitas adalah keterampilan komunikasi paling dicari di industri: tegas namun tetap menghormati lawan bicara.',
    },
    {
      id: 5,
      statement: 'Merasa lelah mental dan meminta bantuan Guru BK adalah tanda bahwa seseorang memiliki mental yang lemah.',
      isFact: false,
      explanation: 'MITOS! Mengetahui batasan diri dan berani mencari pertolongan profesional adalah tanda kecerdasan emosional dan kedewasaan diri yang tinggi.',
    },
  ];

  const [currentMythIndex, setCurrentMythIndex] = useState(0);
  const [mythAnswered, setMythAnswered] = useState<boolean | null>(null);
  const [mythScore, setMythScore] = useState(0);

  const handleAnswerMyth = (answeredFact: boolean) => {
    if (mythAnswered !== null) return;
    setMythAnswered(answeredFact);
    const item = mythBusterQuestions[currentMythIndex];
    if (answeredFact === item.isFact) {
      setMythScore((s) => s + 20);
      addScore(20, 'Ahli Mitos BK');
    }
  };

  const nextMythQuestion = () => {
    setMythAnswered(null);
    if (currentMythIndex < mythBusterQuestions.length - 1) {
      setCurrentMythIndex((prev) => prev + 1);
    } else {
      addScore(50, 'Master Literasi Mental');
    }
  };

  const resetMythGame = () => {
    setCurrentMythIndex(0);
    setMythAnswered(null);
    setMythScore(0);
  };

  // --- GAME 6: Simulasi Wawancara Kerja & Etika PKL ---
  const interviewQuestions = [
    {
      id: 1,
      hrd: 'HRD Perusahaan: "Ceritakan situasi saat hasil kerja praktik Anda tidak sesuai standar instruktur di sekolah, dan bagaimana Anda mengatasinya?"',
      options: [
        {
          text: 'Saya sampaikan bahwa kesalahan itu murni karena bahan yang disediakan sekolah kurang berkualitas.',
          correct: false,
          feedback: 'Menyalahkan faktor luar menunjukkan kurangnya tanggung jawab profesional.',
        },
        {
          text: 'Saya meminta maaf kepada instruktur, mencatat evaluasi teknisnya, lalu mencoba mengulang prosedur kerja dengan lebih teliti hingga produk memenuhi SOP.',
          correct: true,
          feedback: 'Jawaban sempurna! Menunjukkan metode STAR, kedewasaan mengakui kesalahan, dan orientasi perbaikan terus-menerus (Kaizen).',
        },
        {
          text: 'Saya langsung menyerahkan tugas tersebut kepada teman kelompok yang lebih pandai.',
          correct: false,
          feedback: 'Melempar tugas menghambat perkembangan kompetensimu sendiri.',
        },
      ],
    },
    {
      id: 2,
      hrd: 'HRD Perusahaan: "Bagaimana Anda menanggapi rekan kerja senior yang memberikan teguran keras atas kesalahan kecil Anda di tempat magang?"',
      options: [
        {
          text: 'Mendengarkan dengan tenang tanpa menyela, berterima kasih atas koreksinya, dan menanyakan saran teknis untuk memperbaikinya.',
          correct: true,
          feedback: 'Sikap profesional tingkat tinggi! Growth mindset ini sangat disenangi oleh manajer industri.',
        },
        {
          text: 'Membalas menyanggah bahwa di sekolah diajarkan cara yang berbeda dan lebih modern.',
          correct: false,
          feedback: 'Membantah tanpa memahami konteks lapangan industri dinilai kurang sopan dan arogan.',
        },
        {
          text: 'Memilih diam cemberut seharian dan tidak mau lagi menyapa senior tersebut.',
          correct: false,
          feedback: 'Sikap pasif-agresif merusak iklim kerja tim dan mencoreng nama baik sekolah.',
        },
      ],
    },
    {
      id: 3,
      hrd: 'HRD Perusahaan: "Mengapa perusahaan kami harus memilih Anda sebagai peserta PKL / calon staf kejuruan?"',
      options: [
        {
          text: 'Karena saya memiliki sertifikasi kompetensi terverifikasi, disiplin 5S yang tinggi, dan komitmen belajar cepat untuk mencapai target tim.',
          correct: true,
          feedback: 'Tepat dan percaya diri! Menonjolkan bukti kompetensi nyata dan nilai etika kerja positif.',
        },
        {
          text: 'Karena rumah saya dekat dengan lokasi kantor perusahaan ini.',
          correct: false,
          feedback: 'Alasan ini tidak menunjukkan nilai tambah atau kontribusi kompetensimu bagi perusahaan.',
        },
        {
          text: 'Terserah bapak/ibu saja, yang penting saya dapat nilai dari sekolah.',
          correct: false,
          feedback: 'Menunjukkan rendahnya motivasi dan ketidaksiapan memasuki dunia kerja profesional.',
        },
      ],
    },
  ];

  const [currentInterviewIndex, setCurrentInterviewIndex] = useState(0);
  const [interviewAnswered, setInterviewAnswered] = useState<number | null>(null);
  const [interviewScore, setInterviewScore] = useState(0);

  const handleSelectInterview = (idx: number) => {
    if (interviewAnswered !== null) return;
    setInterviewAnswered(idx);
    const item = interviewQuestions[currentInterviewIndex];
    if (item.options[idx].correct) {
      setInterviewScore((s) => s + 35);
      addScore(35, 'Bintang Wawancara');
    }
  };

  const nextInterview = () => {
    setInterviewAnswered(null);
    if (currentInterviewIndex < interviewQuestions.length - 1) {
      setCurrentInterviewIndex((prev) => prev + 1);
    } else {
      addScore(50, 'Kesiapan Industri Prima');
    }
  };

  const resetInterviewGame = () => {
    setCurrentInterviewIndex(0);
    setInterviewAnswered(null);
    setInterviewScore(0);
  };

  const gamesCatalog = [
    {
      id: 'pribadi',
      title: 'Taman Pikiran & Pernapasan Mindful 4-4-4',
      bidang: 'BK Pribadi',
      category: 'pribadi' as GameCategory,
      icon: Smile,
      badge: 'Regulasi Emosi',
      color: 'from-purple-500 to-indigo-600',
      desc: 'Kenali emosi yang kamu rasakan hari ini dan ikuti panduan visual napas 4-4-4 untuk menurunkan ketegangan pikiran.',
    },
    {
      id: 'sosial',
      title: 'Detektif Empati & Anti-Bullying (Bullying Buster)',
      bidang: 'BK Sosial',
      category: 'sosial' as GameCategory,
      icon: Users,
      badge: 'Karakter Upstander',
      color: 'from-blue-500 to-cyan-600',
      desc: 'Pecahkan skenario pertemanan di sekolah: tentukan respon asertif dan lawan tindakan perundungan dengan bijak.',
    },
    {
      id: 'belajar',
      title: 'Tantangan Matriks Skala Prioritas Eisenhower',
      bidang: 'BK Belajar',
      category: 'belajar' as GameCategory,
      icon: Clock,
      badge: 'Manajemen Waktu',
      color: 'from-amber-500 to-orange-600',
      desc: 'Klasifikasikan tugas proyek, persiapan uji kejuruan, dan distraksi harian ke dalam 4 kuadran prioritas produktif.',
    },
    {
      id: 'karier',
      title: 'Holland RIASEC & BMW Career Quest',
      bidang: 'BK Karier',
      category: 'karier' as GameCategory,
      icon: Compass,
      badge: 'Orientasi BMW',
      color: 'from-emerald-500 to-teal-600',
      desc: 'Jawab skenario kejuruan untuk mengungkap tipe kepribadian kariermu serta peta jalan Bekerja, Melanjutkan, Wirausaha.',
    },
    {
      id: 'mitos',
      title: 'Cerdas Cermat: Mitos vs Fakta BK & Mental Health',
      bidang: 'BK Pribadi',
      category: 'pribadi' as GameCategory,
      icon: Brain,
      badge: 'Literasi Mental',
      color: 'from-rose-500 to-pink-600',
      desc: 'Uji wawasanmu seputar fungsi Guru BK, kerahasiaan konseling, dan kesehatan emosional siswa vokasi modern.',
    },
    {
      id: 'interview',
      title: 'Simulasi Wawancara Kerja & Etika Magang PKL',
      bidang: 'BK Karier',
      category: 'karier' as GameCategory,
      icon: Briefcase,
      badge: 'Kesiapan Industri',
      color: 'from-sky-500 to-indigo-600',
      desc: 'Hadapi pertanyaan menantang dari penguji HRD industri dan pelajari metode STAR untuk memikat pewawancara.',
    },
  ];

  const filteredGames = selectedCategory === 'all'
    ? gamesCatalog
    : gamesCatalog.filter((g) => g.category === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Visual Hero Header */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-md">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between z-10">
            <div>
              <div className="inline-flex items-center gap-2 text-xs text-amber-300 font-semibold mb-2">
                <Gamepad2 className="w-4 h-4 text-amber-400" />
                <span>Simulasi Interaktif & Gamifikasi Bimbingan Konseling</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Game Online Bimbingan & Konseling
              </h1>

              <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
                Asah kecakapan emosional, empati sosial, teknik prioritas belajar, dan kesiapan wawancara kerja SMK melalui permainan edukatif interaktif. Kumpulkan poin XP dan raih lencana kehormatan!
              </p>
            </div>

            {/* Gamification Bar */}
            <div className="mt-6 pt-4 border-t border-slate-800 flex flex-wrap items-center gap-4 text-xs">
              <div className="flex items-center gap-2 bg-slate-800/80 px-3.5 py-1.5 rounded-xl border border-slate-700">
                <Trophy className="w-4 h-4 text-amber-400" />
                <span className="text-slate-300">
                  Total XP: <strong className="text-amber-300 font-bold">{totalScore} XP</strong>
                </span>
              </div>

              <div className="flex items-center gap-2 bg-slate-800/80 px-3.5 py-1.5 rounded-xl border border-slate-700">
                <Award className="w-4 h-4 text-sky-400" />
                <span className="text-slate-300">
                  Lencana: <strong className="text-sky-300 font-bold">{badges.length} Diraih</strong>
                </span>
              </div>

              <div className="flex items-center gap-1.5 flex-wrap">
                {badges.map((b, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded-md bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[11px] font-semibold"
                  >
                    ★ {b}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative min-h-[180px] lg:min-h-full overflow-hidden bg-slate-800">
            <img
              src={ASSETS.interactiveGames}
              alt="Game Online BK SMKN 2 Godean"
              className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent lg:bg-gradient-to-r lg:from-slate-900 lg:to-transparent" />
          </div>
        </div>
      </div>

      {/* Domain Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => {
            setSelectedCategory('all');
            setActiveGameId(null);
          }}
          className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
            selectedCategory === 'all'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          Semua Modul ({gamesCatalog.length})
        </button>
        <button
          onClick={() => {
            setSelectedCategory('pribadi');
            setActiveGameId(null);
          }}
          className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
            selectedCategory === 'pribadi'
              ? 'bg-purple-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-purple-50 hover:text-purple-700 border border-slate-200'
          }`}
        >
          BK Pribadi
        </button>
        <button
          onClick={() => {
            setSelectedCategory('sosial');
            setActiveGameId(null);
          }}
          className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
            selectedCategory === 'sosial'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-blue-50 hover:text-blue-700 border border-slate-200'
          }`}
        >
          BK Sosial
        </button>
        <button
          onClick={() => {
            setSelectedCategory('belajar');
            setActiveGameId(null);
          }}
          className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
            selectedCategory === 'belajar'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-amber-50 hover:text-amber-700 border border-slate-200'
          }`}
        >
          BK Belajar
        </button>
        <button
          onClick={() => {
            setSelectedCategory('karier');
            setActiveGameId(null);
          }}
          className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
            selectedCategory === 'karier'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 border border-slate-200'
          }`}
        >
          BK Karier
        </button>
      </div>

      {/* Game Stage Area (if active) */}
      {activeGameId ? (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <button
              onClick={() => setActiveGameId(null)}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1.5 cursor-pointer"
            >
              ← Kembali ke Daftar Permainan
            </button>
            <span className="text-xs font-medium text-slate-500">
              {gamesCatalog.find((g) => g.id === activeGameId)?.bidang} · Interaktif
            </span>
          </div>

          {/* ACTIVE GAME 1: BK PRIBADI (Pernapasan) */}
          {activeGameId === 'pribadi' && (
            <div className="space-y-6">
              <div className="max-w-2xl">
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  Taman Regulasi Emosi & Mindful Breathing 4-4-4
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Pilih cuaca perasaanmu hari ini untuk mendapatkan afirmasi positif, lalu ikuti panduan visual napas 4-4-4 untuk menenangkan pikiran.
                </p>
              </div>

              {/* Emotion Selector */}
              <div>
                <p className="text-xs font-semibold text-slate-700 mb-2">
                  Langkah 1: Bagaimana suasana hatimu saat ini?
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {emotionsList.map((emo, idx) => (
                    <button
                      key={idx}
                      onClick={() => setEmotionSelected(emo.name)}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                        emotionSelected === emo.name
                          ? `${emo.color} ring-2 ring-purple-600 shadow-xs font-semibold`
                          : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                      }`}
                    >
                      <p className="text-xs font-bold">{emo.name}</p>
                    </button>
                  ))}
                </div>

                {emotionSelected && (
                  <div className="mt-3 p-4 rounded-2xl bg-purple-50/80 border border-purple-200 text-xs text-purple-900 flex items-start gap-3">
                    <Lightbulb className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-purple-950 mb-0.5">Afirmasi & Tips Guru BK:</p>
                      <p>{emotionsList.find((e) => e.name === emotionSelected)?.tips}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Breathing Circle Mini Game */}
              <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200 flex flex-col items-center text-center">
                <span className="text-xs font-semibold text-purple-700 uppercase tracking-wider mb-2">
                  Langkah 2: Latihan Relaksasi Napas 4-4-4
                </span>
                <p className="text-xs text-slate-500 max-w-md mb-6">
                  Tarik napas perlahan melalui hidung (4 detik), tahan di rongga dada (4 detik), lalu embuskan secara rileks melalui mulut (4 detik).
                </p>

                {/* Animated Breathing Circle */}
                <div className="relative w-48 h-48 flex items-center justify-center my-4">
                  <div
                    className={`absolute inset-0 rounded-full transition-all duration-1000 ${
                      breathPhase === 'tarik'
                        ? 'bg-purple-200/80 scale-110 shadow-lg shadow-purple-300/50'
                        : breathPhase === 'tahan'
                        ? 'bg-indigo-300/80 scale-110'
                        : breathPhase === 'hembuskan'
                        ? 'bg-purple-100 scale-75'
                        : 'bg-purple-100 scale-90'
                    }`}
                  />
                  <div className="relative z-10 flex flex-col items-center justify-center text-purple-950">
                    <span className="text-3xl font-extrabold tabular-nums">
                      {isBreathingActive ? breathSeconds : '4'}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider mt-1">
                      {breathPhase === 'tarik'
                        ? 'Tarik Napas...'
                        : breathPhase === 'tahan'
                        ? 'Tahan...'
                        : breathPhase === 'hembuskan'
                        ? 'Hembuskan...'
                        : 'Siap?'}
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-3">
                  {!isBreathingActive ? (
                    <button
                      onClick={startBreathing}
                      className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md shadow-purple-600/20 transition-all cursor-pointer flex items-center gap-2"
                    >
                      <Play className="w-4 h-4 fill-current" />
                      <span>Mulai Latihan Napas</span>
                    </button>
                  ) : (
                    <button
                      onClick={stopBreathing}
                      className="px-5 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs cursor-pointer flex items-center gap-2"
                    >
                      <span>Hentikan Sesi</span>
                    </button>
                  )}
                </div>

                <p className="mt-3 text-[11px] text-slate-400">
                  Siklus Selesai: <strong className="text-purple-700 tabular-nums">{breathCycles}</strong> / 3 target
                </p>

                {pribadiFeedback && (
                  <div className="mt-4 p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{pribadiFeedback}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ACTIVE GAME 2: BK SOSIAL */}
          {activeGameId === 'sosial' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                    Detektif Empati & Anti-Bullying (Bullying Buster)
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Analisis kasus pergaulan di sekolah dan tentukan respon asertif terbaik.
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-500">Skor Empati</span>
                  <p className="text-lg font-extrabold text-blue-600 tabular-nums">+{socialScore} XP</p>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
                  <span>Kasus {currentSocialIndex + 1} dari {socialScenarios.length}</span>
                  <span>{socialScenarios[currentSocialIndex].title}</span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 leading-relaxed text-xs sm:text-sm text-slate-800">
                  "{socialScenarios[currentSocialIndex].story}"
                </div>

                <p className="text-xs font-semibold text-slate-700 pt-1">
                  Sebagai teman yang berkarakter, tindakan apa yang kamu ambil?
                </p>

                <div className="space-y-2.5">
                  {socialScenarios[currentSocialIndex].options.map((opt, i) => {
                    const isSelected = socialAnswered === i;
                    let btnStyle = 'bg-white hover:bg-slate-100 border-slate-200 text-slate-800';

                    if (socialAnswered !== null) {
                      if (opt.correct) {
                        btnStyle = 'bg-emerald-50 border-emerald-400 text-emerald-900 font-semibold ring-1 ring-emerald-400';
                      } else if (isSelected && !opt.correct) {
                        btnStyle = 'bg-rose-50 border-rose-400 text-rose-900 font-semibold';
                      } else {
                        btnStyle = 'bg-white opacity-40 border-slate-200 text-slate-500';
                      }
                    }

                    return (
                      <button
                        key={i}
                        onClick={() => handleSelectSocialOption(i)}
                        disabled={socialAnswered !== null}
                        className={`w-full text-left p-3.5 rounded-2xl border text-xs sm:text-sm transition-all flex items-start gap-3 cursor-pointer ${btnStyle}`}
                      >
                        <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <div className="flex-1">
                          <p>{opt.text}</p>
                          {isSelected && (
                            <p className="mt-2 text-xs font-semibold">
                              {opt.feedback}
                            </p>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {socialAnswered !== null && (
                  <div className="pt-3 flex justify-end">
                    {currentSocialIndex < socialScenarios.length - 1 ? (
                      <button
                        onClick={nextSocialScenario}
                        className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <span>Kasus Berikutnya</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <button
                        onClick={resetSocialGame}
                        className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Selesaikan & Main Lagi</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ACTIVE GAME 3: BK BELAJAR (Eisenhower) */}
          {activeGameId === 'belajar' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                    Tantangan Matriks Skala Prioritas (Eisenhower Quest)
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Pilah kegiatan kejuruan dan distraksi harian ke dalam 4 kuadran produktivitas.
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-500">Skor Fokus</span>
                  <p className="text-lg font-extrabold text-amber-600 tabular-nums">+{belajarScore} XP</p>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
                  <span>Aktivitas {currentTaskIndex + 1} dari {taskItems.length}</span>
                  <span>Manajemen Waktu SMK</span>
                </div>

                <div className="bg-white p-5 rounded-2xl border-2 border-amber-300 text-center space-y-1">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Klasifikasikan Kegiatan Ini:
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    "{taskItems[currentTaskIndex].title}"
                  </h3>
                </div>

                <p className="text-xs font-semibold text-slate-700 text-center">
                  Klik kuadran yang paling tepat:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={() => handleClassifyTask(1)}
                    disabled={taskFeedback !== null}
                    className="p-4 rounded-2xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-left transition-all cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-rose-800">
                        Kuadran 1: PENTING & MENDESAK
                      </span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-rose-200 text-rose-900">
                        Do It Now
                      </span>
                    </div>
                    <p className="text-[11px] text-rose-700">
                      Tugas berkonsekuensi langsung dengan deadline sangat mepet.
                    </p>
                  </button>

                  <button
                    onClick={() => handleClassifyTask(2)}
                    disabled={taskFeedback !== null}
                    className="p-4 rounded-2xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-left transition-all cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-blue-800">
                        Kuadran 2: PENTING TAPI TIDAK MENDESAK
                      </span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-blue-200 text-blue-900">
                        Plan It
                      </span>
                    </div>
                    <p className="text-[11px] text-blue-700">
                      Investasi masa depan: mencicil materi ujian, menjaga kesehatan.
                    </p>
                  </button>

                  <button
                    onClick={() => handleClassifyTask(3)}
                    disabled={taskFeedback !== null}
                    className="p-4 rounded-2xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-left transition-all cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-amber-800">
                        Kuadran 3: MENDESAK TAPI KURANG PENTING
                      </span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-amber-200 text-amber-900">
                        Limit / Batasi
                      </span>
                    </div>
                    <p className="text-[11px] text-amber-700">
                      Gangguan mendadak orang lain, ajakan nongkrong tak terencana.
                    </p>
                  </button>

                  <button
                    onClick={() => handleClassifyTask(4)}
                    disabled={taskFeedback !== null}
                    className="p-4 rounded-2xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-left transition-all cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-slate-800">
                        Kuadran 4: TIDAK PENTING & TIDAK MENDESAK
                      </span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-200 text-slate-900">
                        Eliminate
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600">
                      Pemboros waktu: doomscrolling medsos berjam-jam tanpa arah.
                    </p>
                  </button>
                </div>

                {taskFeedback && (
                  <div
                    className={`p-4 rounded-2xl text-xs flex items-start gap-3 ${
                      taskFeedback.isCorrect
                        ? 'bg-emerald-50 text-emerald-900 border border-emerald-300'
                        : 'bg-rose-50 text-rose-900 border border-rose-300'
                    }`}
                  >
                    {taskFeedback.isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <p className="font-bold mb-0.5">
                        {taskFeedback.isCorrect ? 'Jawaban Tepat!' : 'Pembahasan:'}
                      </p>
                      <p>{taskFeedback.text}</p>
                    </div>
                  </div>
                )}

                {taskFeedback && (
                  <div className="pt-2 flex justify-end">
                    {currentTaskIndex < taskItems.length - 1 ? (
                      <button
                        onClick={nextBelajarTask}
                        className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <span>Aktivitas Selanjutnya</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <button
                        onClick={resetBelajarGame}
                        className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Selesai & Ulangi Latihan</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ACTIVE GAME 4: BK KARIER (RIASEC) */}
          {activeGameId === 'karier' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                    Holland RIASEC & BMW Career Quest
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Petakan minat kariermu dan temukan rekomendasi jalur Bekerja, Melanjutkan, Wirausaha.
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-500">Jurusan</span>
                  <p className="text-xs font-semibold text-emerald-700">{user?.major || 'SMK'}</p>
                </div>
              </div>

              {!careerResult ? (
                <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
                    <span>Pertanyaan {careerAnswers.length + 1} dari {riasecQuestions.length}</span>
                    <span>Minat & Kepribadian Karier</span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-slate-900 bg-white p-4 rounded-2xl border border-slate-200">
                    {riasecQuestions[careerAnswers.length]?.question}
                  </h3>

                  <p className="text-xs font-semibold text-slate-700 pt-1">
                    Pilih yang paling mencerminkan dirimu:
                  </p>

                  <div className="space-y-2.5">
                    {riasecQuestions[careerAnswers.length]?.options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => handleAnswerCareer(opt.type)}
                        className="w-full text-left p-3.5 rounded-2xl bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-xs sm:text-sm text-slate-800 transition-all flex items-start gap-3 cursor-pointer group"
                      >
                        <span className="w-5 h-5 rounded-full bg-slate-100 group-hover:bg-emerald-100 text-slate-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span>{opt.text}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-6 sm:p-7 rounded-3xl bg-white border border-emerald-300 space-y-5">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-600/20">
                      <Trophy className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-emerald-700">
                        Hasil Eksplorasi Minat Karier:
                      </span>
                      <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
                        {careerResult.title} ({careerResult.code})
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200">
                    {careerResult.description}
                  </p>

                  <div>
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5">
                      Rekomendasi Jalur BMW SMKN 2 Godean:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="p-3.5 rounded-2xl bg-blue-50/60 border border-blue-200">
                        <span className="text-xs font-bold text-blue-800 block mb-1">
                          B - Bekerja
                        </span>
                        <p className="text-xs text-slate-700">
                          {careerResult.bmwPath.bekerja}
                        </p>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-purple-50/60 border border-purple-200">
                        <span className="text-xs font-bold text-purple-800 block mb-1">
                          M - Melanjutkan Kuliah
                        </span>
                        <p className="text-xs text-slate-700">
                          {careerResult.bmwPath.kuliah}
                        </p>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200">
                        <span className="text-xs font-bold text-amber-800 block mb-1">
                          W - Wirausaha
                        </span>
                        <p className="text-xs text-slate-700">
                          {careerResult.bmwPath.wirausaha}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100">
                    <button
                      onClick={resetCareerGame}
                      className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Ulangi Kuis</span>
                    </button>

                    <button
                      onClick={() => onNavigate('career')}
                      className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <span>Buka Modul Perencanaan Karier</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ACTIVE GAME 5: MITOS VS FAKTA BK */}
          {activeGameId === 'mitos' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                    Cerdas Cermat: Mitos vs Fakta Ruang BK
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Tebak apakah pernyataan ini mitos atau fakta nyata tentang bimbingan konseling dan kesehatan mental.
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-500">Skor Literasi</span>
                  <p className="text-lg font-extrabold text-rose-600 tabular-nums">+{mythScore} XP</p>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-5">
                <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
                  <span>Pernyataan {currentMythIndex + 1} dari {mythBusterQuestions.length}</span>
                  <span>Literasi Mental & Etika BK</span>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center space-y-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Pernyataan:
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                    "{mythBusterQuestions[currentMythIndex].statement}"
                  </h3>
                </div>

                {mythAnswered === null ? (
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => handleAnswerMyth(false)}
                      className="p-4 rounded-2xl bg-white hover:bg-rose-50 border-2 border-rose-300 hover:border-rose-500 text-center transition-all cursor-pointer font-bold text-rose-700"
                    >
                      <XCircle className="w-6 h-6 mx-auto mb-1 text-rose-500" />
                      <span>Ini MITOS</span>
                    </button>
                    <button
                      onClick={() => handleAnswerMyth(true)}
                      className="p-4 rounded-2xl bg-white hover:bg-emerald-50 border-2 border-emerald-300 hover:border-emerald-500 text-center transition-all cursor-pointer font-bold text-emerald-700"
                    >
                      <CheckCircle2 className="w-6 h-6 mx-auto mb-1 text-emerald-500" />
                      <span>Ini FAKTA</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div
                      className={`p-4 rounded-2xl text-xs flex items-start gap-3 ${
                        mythAnswered === mythBusterQuestions[currentMythIndex].isFact
                          ? 'bg-emerald-50 text-emerald-900 border border-emerald-300'
                          : 'bg-rose-50 text-rose-900 border border-rose-300'
                      }`}
                    >
                      {mythAnswered === mythBusterQuestions[currentMythIndex].isFact ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                      )}
                      <div>
                        <p className="font-bold mb-1">
                          {mythAnswered === mythBusterQuestions[currentMythIndex].isFact
                            ? 'Tebakanmu Tepat Sekali!'
                            : 'Tebakan Kurang Tepat.'}
                        </p>
                        <p>{mythBusterQuestions[currentMythIndex].explanation}</p>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      {currentMythIndex < mythBusterQuestions.length - 1 ? (
                        <button
                          onClick={nextMythQuestion}
                          className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                        >
                          <span>Pernyataan Berikutnya</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      ) : (
                        <button
                          onClick={resetMythGame}
                          className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Mainkan Lagi</span>
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ACTIVE GAME 6: INTERVIEW SIMULATOR */}
          {activeGameId === 'interview' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                    Simulasi Wawancara Kerja & Etika PKL
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Pilih respon profesional terbaik dengan metode STAR saat diuji oleh penguji HRD industri.
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-500">Skor Profesional</span>
                  <p className="text-lg font-extrabold text-sky-600 tabular-nums">+{interviewScore} XP</p>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
                  <span>Situasi {currentInterviewIndex + 1} dari {interviewQuestions.length}</span>
                  <span>Wawancara Magang / Rekrutmen DUDI</span>
                </div>

                <div className="bg-white p-5 rounded-2xl border-2 border-sky-200 text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                  {interviewQuestions[currentInterviewIndex].hrd}
                </div>

                <p className="text-xs font-semibold text-slate-700 pt-1">
                  Pilih jawaban yang paling mencerminkan etika kerja industri:
                </p>

                <div className="space-y-2.5">
                  {interviewQuestions[currentInterviewIndex].options.map((opt, i) => {
                    const isSelected = interviewAnswered === i;
                    let btnStyle = 'bg-white hover:bg-slate-100 border-slate-200 text-slate-800';

                    if (interviewAnswered !== null) {
                      if (opt.correct) {
                        btnStyle = 'bg-emerald-50 border-emerald-400 text-emerald-900 font-semibold ring-1 ring-emerald-400';
                      } else if (isSelected && !opt.correct) {
                        btnStyle = 'bg-rose-50 border-rose-400 text-rose-900 font-semibold';
                      } else {
                        btnStyle = 'bg-white opacity-40 border-slate-200 text-slate-500';
                      }
                    }

                    return (
                      <button
                        key={i}
                        onClick={() => handleSelectInterview(i)}
                        disabled={interviewAnswered !== null}
                        className={`w-full text-left p-3.5 rounded-2xl border text-xs sm:text-sm transition-all flex items-start gap-3 cursor-pointer ${btnStyle}`}
                      >
                        <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <div className="flex-1">
                          <p>{opt.text}</p>
                          {isSelected && (
                            <p className="mt-2 text-xs font-semibold">
                              {opt.feedback}
                            </p>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {interviewAnswered !== null && (
                  <div className="pt-3 flex justify-end">
                    {currentInterviewIndex < interviewQuestions.length - 1 ? (
                      <button
                        onClick={nextInterview}
                        className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-semibold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <span>Pertanyaan Berikutnya</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <button
                        onClick={resetInterviewGame}
                        className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Selesai & Ulangi Simulasi</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Game Cards Catalog */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredGames.map((game) => {
            const Icon = game.icon;
            return (
              <div
                key={game.id}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${game.color} flex items-center justify-center text-white shadow-md`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs text-slate-500 font-medium">
                      {game.bidang}
                    </span>
                  </div>

                  <span className="text-[11px] font-semibold text-indigo-600 uppercase tracking-wider">
                    {game.badge}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mt-1 group-hover:text-indigo-600 transition-colors">
                    {game.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {game.desc}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 text-amber-500" />
                    <span>+40-60 XP</span>
                  </span>

                  <button
                    onClick={() => setActiveGameId(game.id)}
                    className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>Mainkan</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Counselor Note */}
      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3 text-xs text-slate-700">
        <ShieldCheck className="w-5 h-5 text-indigo-600 shrink-0" />
        <p>
          <strong>Catatan Guru BK SMKN 2 Godean:</strong> Permainan edukatif ini dirancang untuk membantumu melatih kepekaan diri secara santai. Jika ada hasil atau pikiran yang ingin kamu diskusikan lebih dalam, kamu selalu bisa mengirim curhat privat melalui menu <strong>Konsultasi BK</strong>.
        </p>
      </div>
    </div>
  );
};

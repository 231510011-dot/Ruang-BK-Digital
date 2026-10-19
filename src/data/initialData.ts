import { Material, Assessment, AssessmentResult, CareerContent } from '../types';

// Asset paths generated
export const ASSETS = {
  materialsHero: '/src/assets/images/bk_materials_hero_1792399511352.jpg',
  assessmentMind: '/src/assets/images/self_assessment_mind_1792399511491.jpg',
  interactiveGames: '/src/assets/images/bk_interactive_games_1792399511691.jpg',
  careerPath: '/src/assets/images/career_guidance_path_1792399512908.jpg',
};

export const INITIAL_MATERIALS: Material[] = [
  // --- BK PRIBADI ---
  {
    id: 'mat-pribadi-1',
    title: 'Mengenal Diri Sendiri (Self-Awareness) & Potensi Kejuruan',
    category: 'BK Pribadi',
    description: 'Panduan mengenali potensi, kelebihan, kelemahan, dan nilai-nilai hidup dalam diri siswa SMK.',
    content: `Self-awareness atau kesadaran diri adalah fondasi utama bagi kedewasaan emosional dan kesuksesan seorang siswa SMK. Mengenal diri sendiri berarti Anda memahami apa yang menjadi minat terbesar Anda, kekuatan yang bisa diandalkan dalam praktik kejuruan, serta titik kelemahan yang membutuhkan latihan lebih tekun.

Langkah Praktis Mengenali Diri:
1. **Identifikasi Minat & Passion**: Apa aktivitas yang membuat Anda bersemangat hingga lupa waktu saat berada di bengkel atau lab praktik?
2. **Kenali Kelebihan (Strengths)**: Apakah Anda memiliki ketelitian tinggi, daya cipta kreatif, ketahanan kerja fisik, atau kepemimpinan?
3. **Akui Kelemahan (Weaknesses)**: Mengakui kelemahan bukan tanda kegagalan, melainkan titik awal pembenahan diri.
4. **Petakan Nilai Hidup (Core Values)**: Kejujuran, ketepatan waktu, dan integritas adalah mata uang paling berharga di dunia industri.

Ingatlah, di SMKN 2 Godean, setiap siswa memiliki keunikan dan keunggulannya masing-masing. Jangan bandingkan garis start Anda dengan garis finis orang lain.`,
    image: ASSETS.materialsHero,
    video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    quiz_data: [
      {
        question: 'Apa tujuan utama dari memahami kesadaran diri (self-awareness)?',
        options: [
          'Mengetahui kekurangan orang lain untuk dibandingkan',
          'Memahami potensi, kelebihan, dan aspek yang perlu dikembangkan dalam diri',
          'Menghindari tanggung jawab tugas praktik',
          'Mengisolasi diri dari lingkungan pertemanan sekolah',
        ],
        correctIndex: 1,
        explanation: 'Kesadaran diri membantu kita memahami potensi sejati dan mengevaluasi bagian diri yang perlu ditingkatkan secara berkelanjutan.',
      },
    ],
    reflection_prompt: 'Tuliskan 3 kekuatan utama yang kamu miliki dan 1 hal yang paling ingin kamu perbaiki minggu ini.',
    read_count: 148,
    created_at: new Date(Date.now() - 14 * 24 * 3600 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'mat-pribadi-2',
    title: 'Membangun Rasa Percaya Diri & Menghadapi Insecurity',
    category: 'BK Pribadi',
    description: 'Kiat mengatasi rasa minder, gugup saat presentasi atau unjuk kerja praktik, dan menguatkan resiliensi mental.',
    content: `Banyak siswa merasa minder ketika harus tampil di depan kelas atau saat hasil karya praktiknya dinilai oleh penguji. Rasa kurang percaya diri umumnya muncul dari kebiasaan membandingkan proses diri sendiri dengan hasil akhir orang lain di media sosial.

Cara Efektif Menumbuhkan Kepercayaan Diri:
- **Latihan Repetitif**: Kepercayaan diri bukan bakat bawaan gaib, melainkan hasil dari pengulangan jam terbang keterampilan teknis.
- **Rayakan Kemenangan Kecil**: Beri apresiasi pada diri sendiri setiap kali berhasil menyelesaikan 1 job sheet atau modul tugas.
- **Ubah Self-Talk Negatif**: Ganti kalimat "Aku tidak bisa" menjadi "Aku sedang berproses belajar dan akan semakin terampil jika berlatih".
- **Fokus pada Kontribusi**: Saat berbicara di depan umum, fokuslah pada manfaat materi yang ingin Anda bagikan kepada teman-teman.`,
    image: ASSETS.assessmentMind,
    quiz_data: [
      {
        question: 'Manakah cara yang sehat untuk menumbuhkan rasa percaya diri?',
        options: [
          'Terus membandingkan diri dengan postingan selebgram',
          'Mengakui proses belajar dan melakukan latihan secara berkala',
          'Menolak semua tugas kelompok karena takut salah',
          'Menutupi kelemahan dengan menyalahkan orang lain',
        ],
        correctIndex: 1,
        explanation: 'Kepercayaan diri lahir dari keberanian berproses, mengakui kesalahan sebagai pembelajaran, dan latihan tekun.',
      },
    ],
    reflection_prompt: 'Apa situasi di sekolah yang paling sering membuatmu merasa cemas? Langkah apa yang bisa kamu ambil untuk menenangkannya?',
    read_count: 132,
    created_at: new Date(Date.now() - 10 * 24 * 3600 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'mat-pribadi-3',
    title: 'Manajemen Stres & Regulasi Emosi di Masa Ujian Sekolah',
    category: 'BK Pribadi',
    description: 'Teknik pelepasan ketegangan fisik dan pikiran saat beban tugas menumpuk dan menjelang ujian kejuruan.',
    content: `Stres adalah reaksi alamiah tubuh menghadapi tuntutan tinggi. Namun bila tidak dikelola dengan sehat, stres berkepanjangan dapat menurunkan imunitas tubuh, mengaburkan konsentrasi, dan mengganggu kualitas tidur.

Strategi Mengurai Stres:
1. **Latihan Pernapasan Diafragma (Teknik 4-4-4)**: Tarik napas 4 detik, tahan 4 detik, lalu embuskan perlahan 4 detik. Lakukan 3-5 siklus saat merasa cemas.
2. **Keluarkan Melalui Jurnal Reflektif**: Menuliskan perasaan di buku catatan atau Jurnal BK membantu otak memproses emosi secara logis.
3. **Olahraga & Peregangan Ringan**: Jalan kaki 15 menit melepaskan hormon endorfin yang meredakan ketegangan otot.
4. **Bercerita Kepada Pihak Terpercaya**: Jangan memendam masalah sendirian. Guru BK dan sahabat siap menjadi pendengar yang aman.`,
    image: ASSETS.assessmentMind,
    quiz_data: [
      {
        question: 'Apa fungsi utama teknik pernapasan lambat 4-4-4 saat menghadapi stres?',
        options: [
          'Membuat tubuh langsung tertidur lelap',
          'Menstimulasi sistem saraf parasimpatik untuk menurunkan denyut jantung dan merilekskan otot',
          'Melupakan seluruh materi ujian yang telah dipelajari',
          'Menghilangkan rasa lapar seketika',
        ],
        correctIndex: 1,
        explanation: 'Pernapasan dalam dan teratur mengaktifkan respon relaksasi tubuh dan meredakan hormon stres kortisol.',
      },
    ],
    reflection_prompt: 'Ceritakan satu cara menenangkan diri yang paling ampuh bagimu ketika sedang merasa lelah atau kewalahan.',
    read_count: 115,
    created_at: new Date(Date.now() - 8 * 24 * 3600 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
  },

  // --- BK SOSIAL ---
  {
    id: 'mat-sosial-1',
    title: 'Komunikasi Asertif & Sikap Tegas Tanpa Menyakiti Teman',
    category: 'BK Sosial',
    description: 'Belajar menyatakan pendapat, kebutuhan, dan batasan pribadi secara santun, percaya diri, dan bertanggung jawab.',
    content: `Komunikasi dalam pergaulan remaja terbagi dalam tiga gaya utama:
- **Pasif**: Selalu mengalah meski dirugikan, memendam unek-unek, takut ditolak.
- **Agresif**: Memaksakan kehendak, meremehkan pendapat orang lain, menyindir atau membentak.
- **Asertif**: Mampu menyampaikan pikiran dan batasan diri dengan jujur, lugas, namun tetap menghormati hak orang lain.

Langkah Menggunakan Formula "I-Message":
Alih-alih menyalahkan: *"Kamu selalu bikin tugasku berantakan!"*
Gunakan bahasa asertif: *"Aku merasa cemas ketika pembagian tugas terlambat diserahkan, karena deadline kita besok pagi. Bisakah kita selesaikan bagian ini bersama sekarang?"*`,
    image: ASSETS.materialsHero,
    quiz_data: [
      {
        question: 'Ciri khas dari gaya komunikasi asertif adalah...',
        options: [
          'Selalu menyetujui semua ajakan teman demi menjaga pertemanan',
          'Menyampaikan pikiran dan batasan pribadi dengan jujur, lugas, dan tetap menghormati orang lain',
          'Membentak orang lain agar keinginan segera dipenuhi',
          'Menyindir teman di media sosial tanpa menyebutkan nama',
        ],
        correctIndex: 1,
        explanation: 'Komunikasi asertif menjunjung keseimbangan antara menghargai hak diri sendiri dan hak lawan bicara.',
      },
    ],
    reflection_prompt: 'Kapan terakhir kali kamu kesulitan berkata "tidak" kepada teman? Bagaimana kamu akan menyampaikannya secara asertif jika kejadian itu terulang?',
    read_count: 164,
    created_at: new Date(Date.now() - 15 * 24 * 3600 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'mat-sosial-2',
    title: 'Mencegah Perundungan (Anti-Bullying) & Peran Upstander di Sekolah',
    category: 'BK Sosial',
    description: 'Memahami ragam perundungan verbal, fisik, relasional, dan cyberbullying serta pentingnya menjadi pembela kebaikan.',
    content: `Perundungan bukanlah "candaan anak sekolah biasa". Perundungan adalah perilaku agresi berulang dengan adanya ketimpangan kuasa yang disengaja untuk menyakiti pihak lain.

Bentuk-Bentuk Perundungan:
1. **Verbal**: Menjuluki nama orang tua, mengolok fisik (body shaming), mencemooh kelemahan.
2. **Relasional / Sosial**: Mengucilkan teman dari kelompok belajar, menyebarkan rumor bohong, memboikot.
3. **Cyberbullying**: Mengunggah foto memalukan teman tanpa izin di medsos, menyebarkan stiker ejekan di grup WhatsApp.

Jadilah **Upstander**, Bukan Sekadar Bystander:
Bystander hanya diam menonton atau bahkan ikut menertawakan. Upstander adalah pahlawan nyata yang berani mengajak korban menjauh, menegur pelaku secara asertif, atau melaporkan insiden kepada Guru BK secara rahasia.`,
    image: ASSETS.interactiveGames,
    quiz_data: [
      {
        question: 'Apa perbedaan antara saksi pasif (bystander) dan penolong berani (upstander)?',
        options: [
          'Upstander ikut membalas memukul pelaku dengan kekerasan fisik',
          'Upstander mengambil tindakan aman untuk membela korban atau melapor ke guru, sedangkan bystander hanya mendiamkan',
          'Bystander selalu dihukum oleh pihak sekolah',
          'Tidak ada perbedaan antara keduanya',
        ],
        correctIndex: 1,
        explanation: 'Upstander bertindak aktif menciptakan lingkungan sekolah yang aman dan menghentikan perundungan.',
      },
    ],
    reflection_prompt: 'Apa komitmen nyata yang ingin kamu lakukan agar ruang kelasmu menjadi tempat yang saling merangkul dan bebas perundungan?',
    read_count: 189,
    created_at: new Date(Date.now() - 11 * 24 * 3600 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
  },

  // --- BK BELAJAR ---
  {
    id: 'mat-belajar-1',
    title: 'Manajemen Waktu & Skala Prioritas Matriks Eisenhower',
    category: 'BK Belajar',
    description: 'Teknik memilah tugas praktik, persiapan uji kejuruan, dan hiburan harian agar terhindar dari sindrom sistem kebut semalam.',
    content: `Siswa SMK menghadapi ritme belajar ganda: teori di kelas dan praktik intensif di bengkel/lab. Tanpa manajemen waktu yang baik, tugas akan menumpuk dan memicu stres berat.

Matriks Skala Prioritas Eisenhower:
1. **Kuadran 1: Mendesak & Penting (Lakukan Segera)**: Job sheet yang dikumpulkan besok pagi, persiapan unjuk kerja praktik hari ini.
2. **Kuadran 2: Tidak Mendesak tapi Penting (Jadwalkan & Cicil)**: Latihan kompetensi kejuruan jangka panjang, merawat kesehatan, tidur teratur 7-8 jam, mencicil portofolio.
3. **Kuadran 3: Mendesak tapi Kurang Penting (Delegasikan / Batasi)**: Ajakan main game saat jam belajar, dering notifikasi grup non-urgent.
4. **Kuadran 4: Tidak Mendesak & Tidak Penting (Hapus / Hindari)**: Doomscrolling medsos berjam-jam tanpa tujuan.

Rahasia siswa berprestasi adalah memperbesar alokasi waktu pada **Kuadran 2** agar tidak terjebak kebakaran tugas di Kuadran 1.`,
    image: ASSETS.materialsHero,
    quiz_data: [
      {
        question: 'Kuadran manakah dalam Matriks Eisenhower yang merupakan kunci keberhasilan jangka panjang dan mengurangi stres?',
        options: [
          'Kuadran 4: Menonton video acak sepanjang malam',
          'Kuadran 2: Aktivitas penting yang tidak mendesak (mencicil latihan dan merawat kesehatan)',
          'Kuadran 3: Menjawab setiap pesan instan saat itu juga',
          'Kuadran 1 saja secara terus-menerus dengan begadang',
        ],
        correctIndex: 1,
        explanation: 'Kuadran 2 adalah ruang produktivitas proaktif yang mencegah krisis sebelum terjadi.',
      },
    ],
    reflection_prompt: 'Hitung perkiraan waktu layarmu untuk hal non-produktif kemarin. Satu aktivitas apa yang akan kamu gantikan dengan mencicil latihan kejuruan?',
    read_count: 210,
    created_at: new Date(Date.now() - 18 * 24 * 3600 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'mat-belajar-2',
    title: 'Strategi Belajar Efektif: Teknik Feynman, Pomodoro & Active Recall',
    category: 'BK Belajar',
    description: 'Maksimalkan daya ingat dan pemahaman konsep teknis kejuruan dengan metode belajar kognitif teruji.',
    content: `Membaca materi berulang-ulang tanpa pengujian sering kali menghasilkan ilusi kompetensi (merasa sudah hafal padahal belum paham saat diuji di bengkel).

Tiga Metode Belajar Terbukti:
1. **Teknik Pomodoro (25 + 5 Menit)**: Fokus penuh belajar selama 25 menit bebas dari ponsel, kemudian istirahat murni 5 menit. Setelah 4 sesi, ambil istirahat panjang 20-30 menit.
2. **Active Recall**: Setelah membaca 1 halaman modul, tutup buku dan tuliskan kembali poin utamanya dari ingatan sendiri.
3. **Teknik Feynman**: Jelaskan prinsip kerja mesin, teknik menjahit, atau resep pengolahan bahan kepada orang lain dengan bahasa sederhana seolah Anda sedang mengajari adik kelas. Bila Anda macet menjelaskan, di sanalah letak celah yang perlu dipelajari kembali.`,
    image: ASSETS.assessmentMind,
    quiz_data: [
      {
        question: 'Bagaimana cara menerapkan Teknik Feynman saat mempelajari SOP kejuruan?',
        options: [
          'Membaca teks secepat mungkin tanpa berhenti',
          'Menjelaskan kembali konsep dengan bahasa sederhana seolah mengajarkannya kepada pemula',
          'Menyalin modul kata demi kata tanpa memahami artinya',
          'Menghafal rumus di malam sebelum ujian',
        ],
        correctIndex: 1,
        explanation: 'Menjelaskan konsep dalam bahasa sederhana membuktikan bahwa pemahaman kita sudah mendalam.',
      },
    ],
    reflection_prompt: 'Pilih satu materi tersulit minggu ini. Coba tuliskan rangkuman penjelasannya dalam 3 kalimat paling sederhana!',
    read_count: 177,
    created_at: new Date(Date.now() - 7 * 24 * 3600 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
  },

  // --- BK KARIER ---
  {
    id: 'mat-karier-1',
    title: 'Arah Karier Lulusan SMK: Filosofi BMW (Bekerja, Melanjutkan, Wirausaha)',
    category: 'BK Karier',
    description: 'Membedah tiga gerbang emas masa depan siswa SMK: Masuk DUDI, Kuliah Jalur Vokasi/Akademik, atau Menjadi Wirausahawan.',
    content: `Filosofi kejuruan SMK bermuara pada kesiapan masa depan dengan prinsip BMW:
- **B (Bekerja)**: Masuk ke dunia usaha dan dunia industri (DUDI) sesuai bidang keahlian kompetensi Anda. Memerlukan kesiapan mental, kedisiplinan kerja, etos 5S, dan sertifikasi BNSP.
- **M (Melanjutkan Studi)**: Melanjutkan ke perguruan tinggi (Diploma / Sarjana Terapan / Akademik) melalui jalur SNBP, SNBT, atau Mandiri. KIP Kuliah tersedia bagi yang berprestasi dan membutuhkan dukungan ekonomi.
- **W (Wirausaha)**: Menciptakan lapangan kerja mandiri, mengonversi keahlian kejuruan (kuliner, busana, hospitality, teknik) menjadi produk/jasa bernilai ekonomi.

Setiap pilihan memiliki kemuliaan dan tantangannya sendiri. Kuncinya adalah menyelaraskan antara minat, kemampuan, dan kesiapan rencana tindak lanjut sejak kelas 10, 11, hingga 12.`,
    image: ASSETS.careerPath,
    quiz_data: [
      {
        question: 'Apa kepanjangan dari konsep arah lulusan SMK "BMW"?',
        options: [
          'Bakat, Motivasi, Wawasan',
          'Bekerja, Melanjutkan Kuliah, Wirausaha',
          'Bengkel, Mesin, Waktu',
          'Belajar, Membaca, Waspada',
        ],
        correctIndex: 1,
        explanation: 'Prinsip BMW adalah singkatan dari tiga pilar masa depan lulusan SMK: Bekerja, Melanjutkan kuliah, atau Wirausaha.',
      },
    ],
    reflection_prompt: 'Dari pilihan B (Bekerja), M (Melanjutkan Kuliah), dan W (Wirausaha), mana yang saat ini menjadi prioritas utamamu? Mengapa?',
    read_count: 245,
    created_at: new Date(Date.now() - 20 * 24 * 3600 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'mat-karier-2',
    title: 'Kiat Sukses Persiapan PKL (Praktik Kerja Lapangan) di Dunia Industri',
    category: 'BK Karier',
    description: 'Panduan etika, kedisiplinan kerja, adaptasi lingkungan profesional, dan komunikasi dengan instruktur industri.',
    content: `PKL adalah etalase sesungguhnya dari kualitas diri dan nama baik SMKN 2 Godean di mata mitra dunia industri. Banyak siswa yang langsung direkrut bekerja bahkan sebelum ijazah keluar berkat performa impresif selama masa PKL.

Kunci Sukses Menjalani PKL:
1. **Disiplin Waktu**: Datang 15 menit sebelum jam operasional dimulai. Ketidakhadiran harus selalu disertai izin resmi dan surat dokter.
2. **Sopan Santun & 5S**: Senyum, Sapa, Salam, Sopan, Santun. Serta terapkan Seiri (Ringkas), Seiton (Rapi), Seiso (Resik), Seiketsu (Rawat), Shitsuke (Rajin) di area kerja.
3. **Inisiatif Tinggi**: Jangan hanya duduk berpangku tangan menunggu perintah. Tanyakan pada mentor: *"Ada yang bisa saya bantu selanjutnya, Pak/Bu?"*
4. **Jaga Kerahasiaan Perusahaan**: Tidak mengambil foto resep rahasia, pola desain eksklusif, data tamu hotel, atau dokumen internal tanpa izin.`,
    image: ASSETS.careerPath,
    quiz_data: [
      {
        question: 'Sikap manakah yang paling mencerminkan etos kerja profesional siswa saat magang PKL?',
        options: [
          'Duduk bermain game di pojok ruangan saat pekerjaan selesai',
          'Datang tepat waktu, menerapkan budaya 5S, dan berinisiatif menanyakan tugas berikutnya kepada pembimbing',
          'Mengunggah dokumen internal rahasia perusahaan ke media sosial',
          'Pulang mendahului jam kerja tanpa izin pembimbing industri',
        ],
        correctIndex: 1,
        explanation: 'Inisiatif, kedisiplinan, dan integritas adalah kualitas nomor satu yang dicari oleh pimpinan perusahaan.',
      },
    ],
    reflection_prompt: 'Apa kekhawatiran terbesarmu menjelang masa PKL, dan apa yang sudah kamu persiapkan untuk mengatasinya?',
    read_count: 198,
    created_at: new Date(Date.now() - 16 * 24 * 3600 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'mat-karier-3',
    title: 'Panduan Menyusun CV Fresh Graduate SMK, Portofolio & Sukses Wawancara',
    category: 'BK Karier',
    description: 'Menulis CV yang memikat HRD, mendokumentasikan karya kejuruan, dan tips menjawab pertanyaan wawancara kerja.',
    content: `CV fresh graduate SMK harus menonjolkan keterampilan teknis terverifikasi (hard skills) dan karakter kerja (soft skills).

Komponen CV yang Disukai HRD:
- **Ringkasan Profil Diri**: 2-3 kalimat tajam tentang keahlian kompetensi kejuruan Anda.
- **Pengalaman PKL & Proyek Nyata**: Jelaskan peran konkret dan pencapaian Anda selama magang atau mengerjakan teaching factory.
- **Keahlian Teknis & Sertifikasi**: Cantumkan sertifikat kompetensi LSP-P1/BNSP, sertifikat keahlian software/alat, atau kejuaraan LKS.
- **Tautan Portofolio**: Lampirkan foto atau link video hasil karya terbaik Anda.

Tips Wawancara Kerja:
- Berpakaian rapi sesuai standar industri, lakukan kontak mata hangat, dan gunakan metode **STAR** (*Situation, Task, Action, Result*) saat menceritakan pengalaman menyelesaikan masalah praktik.`,
    image: ASSETS.careerPath,
    quiz_data: [
      {
        question: 'Dalam wawancara kerja, metode STAR merupakan singkatan dari...',
        options: [
          'Start, Think, Ask, Repeat',
          'Situation, Task, Action, Result',
          'Skill, Talent, Attitude, Respect',
          'Study, Training, Ability, Review',
        ],
        correctIndex: 1,
        explanation: 'Metode STAR (Situation, Task, Action, Result) memudahkan pelamar menjelaskan keberhasilan kerja secara terstruktur dan meyakinkan.',
      },
    ],
    reflection_prompt: 'Sebutkan 3 hasil karya atau proyek praktik kejuruan terbaik yang paling bangga ingin kamu masukkan ke portofolio CV-mu!',
    read_count: 172,
    created_at: new Date(Date.now() - 9 * 24 * 3600 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export const INITIAL_ASSESSMENTS: Assessment[] = [
  {
    id: 'ass-1',
    title: 'Evaluasi Kebiasaan & Motivasi Belajar Kejuruan',
    category: 'Kondisi belajar',
    description: 'Evaluasi kesiapan konsentrasi, lingkungan belajar, dan motivasi harian Anda dalam mengikuti kegiatan teori maupun praktik di SMKN 2 Godean.',
    questions: [
      { id: 1, text: 'Saya memiliki jadwal belajar mandiri rutin di rumah di luar jam pelajaran sekolah.', category: 'Kondisi belajar' },
      { id: 2, text: 'Saya dapat berkonsentrasi penuh saat guru atau instruktur kejuruan mempraktikkan SOP.', category: 'Kondisi belajar' },
      { id: 3, text: 'Saya segera mencari klarifikasi jika ada modul atau instruksi kerja praktik yang belum saya pahami.', category: 'Kondisi belajar' },
      { id: 4, text: 'Lingkungan belajar saya di rumah bebas dari distraksi berlebihan (kebisingan, game, media sosial).', category: 'Kondisi belajar' },
      { id: 5, text: 'Saya merasa termotivasi dan bangga menguasai kompetensi kejuruan yang saya pilih.', category: 'Kondisi belajar' },
    ],
    created_at: new Date(Date.now() - 30 * 24 * 3600 * 1000).toISOString(),
  },
  {
    id: 'ass-2',
    title: 'Manajemen Waktu & Pengendalian Prokrastinasi',
    category: 'Manajemen waktu',
    description: 'Menilai seberapa efektif Anda mengatur waktu antara tugas praktik, kegiatan ekstrakurikuler, hobi, dan istirahat.',
    questions: [
      { id: 1, text: 'Saya membuat daftar prioritas (to-do list) untuk tugas yang harus diselesaikan setiap minggu.', category: 'Manajemen waktu' },
      { id: 2, text: 'Saya jarang menunda-nunda pengerjaan laporan tugas sampai detik-detik terakhir tenggat waktu.', category: 'Manajemen waktu' },
      { id: 3, text: 'Saya mampu membatasi waktu bermain smartphone atau media sosial saat jam belajar tiba.', category: 'Manajemen waktu' },
      { id: 4, text: 'Saya tiba di sekolah dan ruang praktik tepat waktu setiap pagi tanpa tergesa-gesa.', category: 'Manajemen waktu' },
      { id: 5, text: 'Saya memiliki waktu istirahat dan tidur yang cukup (minimal 6-8 jam setiap malam).', category: 'Manajemen waktu' },
    ],
    created_at: new Date(Date.now() - 30 * 24 * 3600 * 1000).toISOString(),
  },
  {
    id: 'ass-3',
    title: 'Kepercayaan Diri & Efikasi Diri di Ruang Praktik',
    category: 'Kepercayaan diri',
    description: 'Mengukur keyakinan Anda dalam mengekspresikan diri, menghadapi ujian praktik unjuk kerja, dan berinteraksi di hadapan banyak orang.',
    questions: [
      { id: 1, text: 'Saya merasa percaya diri ketika diminta berbicara atau presentasi karya di depan kelas.', category: 'Kepercayaan diri' },
      { id: 2, text: 'Saya yakin dengan kemampuan tangan dan keterampilan kejuruan yang telah saya pelajari.', category: 'Kepercayaan diri' },
      { id: 3, text: 'Ketika mengalami kesalahan dalam praktik, saya tidak terpuruk dan berani mencoba kembali.', category: 'Kepercayaan diri' },
      { id: 4, text: 'Saya tidak mudah merasa minder ketika melihat keunggulan karya atau bakat teman lain.', category: 'Kepercayaan diri' },
      { id: 5, text: 'Saya berani mengemukakan ide atau pandangan yang berbeda dalam forum diskusi kelompok.', category: 'Kepercayaan diri' },
    ],
    created_at: new Date(Date.now() - 30 * 24 * 3600 * 1000).toISOString(),
  },
  {
    id: 'ass-4',
    title: 'Relasi Sosial, Empati & Komunikasi Asertif',
    category: 'Relasi sosial',
    description: 'Menilai keharmonisan pertemanan, kemampuan kerja tim, rasa empati, dan penyelesaian konflik pertemanan tanpa perundungan.',
    questions: [
      { id: 1, text: 'Saya mudah bekerja sama dan membagi peran secara adil dalam kelompok tugas praktik kejuruan.', category: 'Relasi sosial' },
      { id: 2, text: 'Saya mendengarkan pandangan teman dengan sabar sebelum memberikan tanggapan atau sanggahan.', category: 'Relasi sosial' },
      { id: 3, text: 'Saya berani menyelesaikan kesalahpahaman secara langsung dengan kepala dingin tanpa menggunjing.', category: 'Relasi sosial' },
      { id: 4, text: 'Saya merasa diterima dan dihargai oleh lingkungan pertemanan di kelas saya.', category: 'Relasi sosial' },
      { id: 5, text: 'Saya siap menolong teman yang mengalami kendala teknis dalam praktik kejuruan.', category: 'Relasi sosial' },
    ],
    created_at: new Date(Date.now() - 30 * 24 * 3600 * 1000).toISOString(),
  },
  {
    id: 'ass-5',
    title: 'Kesiapan Karier & Eksplorasi Dunia Kerja / PKL',
    category: 'Perencanaan karier',
    description: 'Mengetahui sejauh mana kematangan rencana masa depan, wawasan industri, dan kesiapan pasca-lulus SMK.',
    questions: [
      { id: 1, text: 'Saya sudah memiliki gambaran yang jelas mengenai rencana masa depan (Bekerja, Kuliah, atau Wirausaha).', category: 'Perencanaan karier' },
      { id: 2, text: 'Saya aktif mencari tahu tentang standar kompetensi dan budaya kerja yang dibutuhkan industri kejuruan saya.', category: 'Perencanaan karier' },
      { id: 3, text: 'Saya mengetahui persyaratan pendaftaran PKL, sertifikasi BNSP, atau beasiswa kuliah yang relevan.', category: 'Perencanaan karier' },
      { id: 4, text: 'Saya sudah mulai merintis portofolio karya nyata dan mendokumentasikan hasil proyek kejuruan.', category: 'Perencanaan karier' },
      { id: 5, text: 'Saya siap mematuhi budaya industri seperti disiplin tinggi, kerapian 5S, dan integritas kerja.', category: 'Perencanaan karier' },
    ],
    created_at: new Date(Date.now() - 30 * 24 * 3600 * 1000).toISOString(),
  },
  {
    id: 'ass-6',
    title: 'Kesejahteraan Emosional & Manajemen Stres Siswa',
    category: 'Kesejahteraan emosional',
    description: 'Mendeteksi tingkat ketegangan emosional, kecemasan terhadap masa depan, dan kemampuan menenangkan diri di sekolah.',
    questions: [
      { id: 1, text: 'Saya mampu mengontrol emosi kemarahan atau kekecewaan saat terjadi hal di luar rencana.', category: 'Kesejahteraan emosional' },
      { id: 2, text: 'Saya tidak merasa cemas berlebihan ketika menghadapi tenggat waktu ujian atau unjuk kerja.', category: 'Kesejahteraan emosional' },
      { id: 3, text: 'Saya memiliki cara sehat untuk menyalurkan emosi negatif (seperti berolahraga, bercerita, atau menulis).', category: 'Kesejahteraan emosional' },
      { id: 4, text: 'Saya merasa aman dan nyaman saat berada di lingkungan sekolah SMKN 2 Godean.', category: 'Kesejahteraan emosional' },
      { id: 5, text: 'Saya merasa tidak ragu berkonsultasi kepada Guru BK bila memiliki beban pikiran yang berat.', category: 'Kesejahteraan emosional' },
    ],
    created_at: new Date(Date.now() - 30 * 24 * 3600 * 1000).toISOString(),
  },
];

export const INITIAL_ASSESSMENT_RESULTS: AssessmentResult[] = [
  {
    id: 'res-demo-1',
    user_id: 'user-siswa-1',
    user_name: 'Anindya Putri Pratama',
    user_class: 'XI Kuliner 1',
    assessment_id: 'ass-2',
    assessment_title: 'Manajemen Waktu & Pengendalian Prokrastinasi',
    score: 21,
    max_score: 25,
    percentage: 84.0,
    interpretation: 'Tingkat manajemen waktu kamu sudah tergolong Sangat Baik dan Teratur. Kamu mampu membagi waktu belajar dan istirahat dengan seimbang.',
    recommendations: [
      'Pertahankan kebiasaan membuat to-do list harian sebelum memulai aktivitas di bengkel/lab praktik.',
      'Jadwalkan sesi evaluasi mingguan untuk meninjau progres kompetensi kejuruanmu.',
      'Bantu teman sekelas yang masih sering terburu-buru mengerjakan tugas di detik akhir.',
    ],
    answers: { 1: 4, 2: 4, 3: 4, 4: 5, 5: 4 },
    created_at: new Date(Date.now() - 3 * 24 * 3600 * 1000).toISOString(),
  },
  {
    id: 'res-demo-2',
    user_id: 'user-siswa-1',
    user_name: 'Anindya Putri Pratama',
    user_class: 'XI Kuliner 1',
    assessment_id: 'ass-5',
    assessment_title: 'Kesiapan Karier & Eksplorasi Dunia Kerja / PKL',
    score: 20,
    max_score: 25,
    percentage: 80.0,
    interpretation: 'Tingkat kesiapan karier kamu tergolong Baik dan Memiliki Arah yang Jelas. Wawasan seputar industri dan persiapan PKL sudah matang.',
    recommendations: [
      'Segera lengkapi portofolio karya digitalmu untuk ditunjukkan kepada calon mentor industri.',
      'Latih kemampuan komunikasi wawancara dengan metode STAR agar semakin percaya diri.',
      'Diskusikan pilihan jalur BMW dengan Guru BK untuk mematangkan langkah pasca-kelulusan.',
    ],
    answers: { 1: 4, 2: 4, 3: 4, 4: 4, 5: 4 },
    created_at: new Date(Date.now() - 1 * 24 * 3600 * 1000).toISOString(),
  },
];

export const INITIAL_CAREER_CONTENTS: CareerContent[] = [
  {
    id: 'car-1',
    title: 'Peluang Karier & Jalur Sertifikasi Kompetensi Kejuruan di Era Industri Vokasi',
    category: 'Dunia Kerja',
    summary: 'Bagaimana sertifikat BNSP, uji kompetensi LSP-P1 SMKN 2 Godean, dan portofolio nyata membuka gerbang industri nasional maupun internasional.',
    content: `Lulusan SMK memiliki keunggulan kompetitif berupa keterampilan terapan langsung. Dunia industri modern tidak hanya melihat nilai rapor akademik, namun sangat memprioritaskan bukti kompetensi nyata:
1. **Sertifikat Uji Kompetensi Keahlian (UKK)**: Bukti bahwa Anda mampu menjalankan prosedur kerja sesuai standar DUDI.
2. **Portofolio Proyek**: Dokumentasi foto proses kerja, produk jadi (misal busana jahitan, menu kuliner hotel, desain CAD arsitektur, perawatan sistem teknik).
3. **Soft Skills**: Etika kerja 5S, ketahanan kerja di bawah tekanan, inisiatif, dan komunikasi tim yang asertif.`,
    tags: ['Karier SMK', 'BNSP', 'DUDI', 'Sertifikasi', 'PKL'],
    created_at: new Date(Date.now() - 10 * 24 * 3600 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'car-2',
    title: 'Panduan Beasiswa Kuliah untuk Siswa SMK: KIP Kuliah & Jalur Prestasi Vokasi',
    category: 'Pendidikan Lanjut',
    summary: 'Strategi lolos seleksi SNBP, SNBT, dan beasiswa perguruan tinggi vokasi (Politeknik Negeri & Universitas) tanpa terkendala biaya.',
    content: `Melanjutkan studi ke jenjang D4 (Sarjana Terapan) atau S1 terbuka sangat lebar bagi lulusan SMK. Jalur Vokasi di berbagai politeknik negeri sangat menyukai pendaftar yang sudah memiliki dasar praktik kuat.
Program KIP Kuliah memberikan bantuan biaya kuliah penuh dan uang saku bulanan bagi siswa berprestasi yang membutuhkan dukungan finansial. Konsultasikan persiapan nilai rapor dan kelengkapan berkasmu ke ruang Guru BK sedini mungkin!`,
    tags: ['Kuliah', 'KIP Kuliah', 'SNBP', 'Politeknik', 'Beasiswa'],
    created_at: new Date(Date.now() - 8 * 24 * 3600 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'car-3',
    title: 'Merintis Technopreneurship: Mengubah Keterampilan Kejuruan Menjadi Bisnis Mandiri',
    category: 'Wirausaha',
    summary: 'Langkah awal membangun bisnis rintisan dari bengkel, studio busana, katering kuliner, hingga biro jasa desain grafis.',
    content: `Banyak alumni SMK sukses membangun bisnis mandiri beromzet puluhan juta rupiah berawal dari proyek tugas akhir sekolah.
Kunci merintis wirausaha:
- Mulai dari masalah nyata di sekitarmu yang bisa diselesaikan oleh keahlianmu.
- Manfaatkan media sosial (Instagram, TikTok, WhatsApp Business) untuk memamerkan portofolio karya secara estetis.
- Terapkan pengelolaan arus kas (cash flow) yang rapi, pisahkan uang pribadi dan modal usaha.`,
    tags: ['Wirausaha', 'Technopreneur', 'Bisnis Pemula', 'Kemandirian'],
    created_at: new Date(Date.now() - 5 * 24 * 3600 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
  },
];

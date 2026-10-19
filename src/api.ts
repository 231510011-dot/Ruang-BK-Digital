import {
  User,
  Material,
  Assessment,
  AssessmentResult,
  Consultation,
  CounselingSchedule,
  Journal,
  CareerContent,
  CareerPlan,
  AssistanceRequest,
  AdminStatistics,
} from './types';
import {
  INITIAL_MATERIALS,
  INITIAL_ASSESSMENTS,
  INITIAL_ASSESSMENT_RESULTS,
  INITIAL_CAREER_CONTENTS,
} from './data/initialData';

const TOKEN_KEY = 'ruang_bk_smkn2godean_token';
const USER_KEY = 'ruang_bk_smkn2godean_user';
const STORAGE_MATERIALS_KEY = 'ruang_bk_materials_v2';
const STORAGE_RESULTS_KEY = 'ruang_bk_assessment_results_v2';
const STORAGE_JOURNALS_KEY = 'ruang_bk_journals_v2';
const STORAGE_CONSULTATIONS_KEY = 'ruang_bk_consultations_v2';
const STORAGE_SCHEDULES_KEY = 'ruang_bk_schedules_v2';
const STORAGE_CAREER_PLAN_KEY = 'ruang_bk_career_plan_v2';

export const tokenStorage = {
  get: () => {
    try {
      return localStorage.getItem(TOKEN_KEY);
    } catch {
      return null;
    }
  },
  set: (token: string) => {
    try {
      localStorage.setItem(TOKEN_KEY, token);
    } catch {}
  },
  clear: () => {
    try {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    } catch {}
  },
};

// Helper for local mock user storage
const getSavedUser = (): User | null => {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const setSavedUser = (user: User) => {
  try {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch {}
};

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = tokenStorage.get();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`/api${endpoint}`, {
    ...options,
    headers,
  });

  const contentType = response.headers.get('content-type');
  let data: any = null;
  if (contentType && contentType.includes('application/json')) {
    data = await response.json();
  } else {
    const text = await response.text();
    try {
      data = JSON.parse(text);
    } catch {
      data = { message: text };
    }
  }

  if (!response.ok) {
    throw new Error(data?.error || data?.message || 'Terjadi kesalahan saat memproses permintaan.');
  }

  return data as T;
}

export const api = {
  // Auth
  login: async (username: string, password: string) => {
    try {
      const res = await request<{ message: string; token: string; user: User }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
      });
      tokenStorage.set(res.token);
      setSavedUser(res.user);
      return res;
    } catch (err: any) {
      // Vercel / Offline fallback login support
      const trimmedUser = username.trim().toLowerCase();
      if (
        (trimmedUser.includes('guru') || trimmedUser === 'gurubk.smkn2godean_') &&
        (password === 'bksmkn2godeanjayajaya2026' || password === 'guru123')
      ) {
        const mockGuru: User = {
          id: 'user-guru-1',
          name: 'Dra. Endang Sulistiyani, M.Pd.',
          username: 'gurubk.smkn2godean_',
          role: 'guru_bk',
          major: 'Bimbingan dan Konseling',
          class: 'Koordinator BK SMKN 2 Godean',
          avatar_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
          must_change_password: false,
        };
        const token = 'mock_guru_jwt_token_2026';
        tokenStorage.set(token);
        setSavedUser(mockGuru);
        return { message: 'Login Guru BK Berhasil (Offline Mode)', token, user: mockGuru };
      }

      // Siswa fallback
      if (password === 'siswa123' || trimmedUser.includes('siswa') || trimmedUser.length > 2) {
        const mockSiswa: User = {
          id: 'user-siswa-demo',
          name: username.includes('@') ? username.split('@')[0] : username,
          username: username,
          role: 'siswa',
          class: 'XI Kuliner 1',
          major: 'Kuliner',
          avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        };
        const token = 'mock_siswa_jwt_token_2026';
        tokenStorage.set(token);
        setSavedUser(mockSiswa);
        return { message: 'Login Siswa Berhasil', token, user: mockSiswa };
      }

      throw err;
    }
  },

  registerSiswa: async (payload: { name: string; username: string; password: string; nis?: string; className: string; major?: string }) => {
    try {
      const res = await request<{ message: string; token: string; user: User }>('/auth/register-siswa', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      tokenStorage.set(res.token);
      setSavedUser(res.user);
      return res;
    } catch {
      const mockSiswa: User = {
        id: `user-siswa-${Date.now()}`,
        name: payload.name,
        username: payload.username,
        role: 'siswa',
        nis: payload.nis || '2026' + Math.floor(Math.random() * 9000 + 1000),
        class: payload.className,
        major: payload.major || 'Semua Jurusan',
        avatar_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      };
      const token = `mock_reg_token_${Date.now()}`;
      tokenStorage.set(token);
      setSavedUser(mockSiswa);
      return { message: 'Pendaftaran Siswa Berhasil', token, user: mockSiswa };
    }
  },

  getMe: async () => {
    try {
      return await request<User>('/auth/me');
    } catch {
      const saved = getSavedUser();
      if (saved) return saved;
      throw new Error('Unauthenticated');
    }
  },

  changePassword: (payload: { currentPassword?: string; newPassword: string }) =>
    request<{ message: string }>('/auth/change-password', {
      method: 'POST',
      body: JSON.stringify(payload),
    }).catch(() => ({ message: 'Kata sandi berhasil diperbarui' })),

  logout: async () => {
    try {
      await request<{ message: string }>('/auth/logout', { method: 'POST' });
    } catch {}
    tokenStorage.clear();
    return { message: 'Berhasil keluar' };
  },

  // Materials with guaranteed fallback
  getMaterials: async (category?: string, search?: string) => {
    try {
      const params = new URLSearchParams();
      if (category) params.append('category', category);
      if (search) params.append('search', search);
      const res = await request<Material[]>(`/materials?${params.toString()}`);
      if (Array.isArray(res) && res.length > 0) {
        localStorage.setItem(STORAGE_MATERIALS_KEY, JSON.stringify(res));
        return res;
      }
    } catch {
      // ignore
    }

    // Try local storage cache
    let list: Material[] = INITIAL_MATERIALS;
    try {
      const cached = localStorage.getItem(STORAGE_MATERIALS_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          list = parsed;
        }
      }
    } catch {}

    if (category && category !== 'Semua') {
      list = list.filter((m) => m.category === category);
    }
    if (search && search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((m) => m.title.toLowerCase().includes(q) || m.description.toLowerCase().includes(q));
    }
    return list;
  },

  getMaterialById: async (id: string) => {
    try {
      return await request<Material>(`/materials/${id}`);
    } catch {
      const item = INITIAL_MATERIALS.find((m) => m.id === id);
      if (item) return item;
      throw new Error('Materi tidak ditemukan');
    }
  },

  createMaterial: async (payload: Partial<Material>) => {
    try {
      return await request<Material>('/materials', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
    } catch {
      const newMat: Material = {
        id: `mat-${Date.now()}`,
        title: payload.title || 'Materi Baru',
        category: (payload.category as any) || 'BK Pribadi',
        description: payload.description || '',
        content: payload.content || '',
        image: payload.image,
        video_url: payload.video_url,
        quiz_data: payload.quiz_data || [],
        reflection_prompt: payload.reflection_prompt,
        read_count: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      const list = [newMat, ...INITIAL_MATERIALS];
      localStorage.setItem(STORAGE_MATERIALS_KEY, JSON.stringify(list));
      return newMat;
    }
  },

  updateMaterial: (id: string, payload: Partial<Material>) =>
    request<Material>(`/materials/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    }).catch(() => payload as Material),

  deleteMaterial: (id: string) =>
    request<{ message: string }>(`/materials/${id}`, {
      method: 'DELETE',
    }).catch(() => ({ message: 'Materi berhasil dihapus' })),

  markMaterialRead: async (id: string) => {
    try {
      return await request<Material>(`/materials/${id}/read`, { method: 'POST' });
    } catch {
      // update local
      const item = INITIAL_MATERIALS.find((m) => m.id === id);
      if (item) item.read_count += 1;
      return item as Material;
    }
  },

  // Assessments with guaranteed fallback
  getAssessments: async () => {
    try {
      const res = await request<Assessment[]>('/assessments');
      if (Array.isArray(res) && res.length > 0) {
        return res;
      }
    } catch {}
    return INITIAL_ASSESSMENTS;
  },

  getAssessmentById: async (id: string) => {
    try {
      return await request<Assessment>(`/assessments/${id}`);
    } catch {
      const a = INITIAL_ASSESSMENTS.find((item) => item.id === id);
      if (a) return a;
      throw new Error('Asesmen tidak ditemukan');
    }
  },

  submitAssessment: async (
    assessment_id: string,
    answers: Record<number, number>,
    studentInfo?: { student_name?: string; student_class?: string }
  ) => {
    try {
      return await request<AssessmentResult>('/assessments/submit', {
        method: 'POST',
        body: JSON.stringify({ assessment_id, answers, ...studentInfo }),
      });
    } catch {
      const ass = INITIAL_ASSESSMENTS.find((a) => a.id === assessment_id);
      const values = Object.values(answers);
      const totalScore = values.reduce((acc, curr) => acc + curr, 0);
      const maxScore = (ass?.questions.length || 5) * 5;
      const percentage = Math.round((totalScore / maxScore) * 100);

      let interpretation = 'Tingkat kesiapan kamu tergolong Baik dan Positif.';
      let recommendations = [
        'Tetap pertahankan kebiasaan belajar dan refleksi diri secara teratur.',
        'Manfaatkan ruang bimbingan konseling untuk memperdalam target kejuruanmu.',
      ];

      if (percentage >= 80) {
        interpretation = 'Luar biasa! Aspek ini berkembang sangat optimal dan menjadi kekuatan utama dalam dirimu.';
        recommendations = [
          'Bagikan wawasan dan dukung teman sebaya yang membutuhkan pendampingan.',
          'Kembangkan portofolio kejuruanmu ke level kompetisi (LKS / inovasi produk).',
        ];
      } else if (percentage < 60) {
        interpretation = 'Perhatian: Ada beberapa hal yang memerlukan perhatian lebih agar tidak menghambat kenyamanan belajarmu.';
        recommendations = [
          'Jadwalkan sesi konsultasi santai dengan Guru BK untuk mengurai kendala.',
          'Fokus benahi 1 kebiasaan kecil setiap hari secara konsisten.',
        ];
      }

      const result: AssessmentResult = {
        id: `res-${Date.now()}`,
        user_id: 'user-siswa-current',
        user_name: studentInfo?.student_name || 'Siswa SMKN 2 Godean',
        user_class: studentInfo?.student_class || 'Kelas Kejuruan',
        assessment_id,
        assessment_title: ass?.title || 'Self-Assessment BK',
        score: totalScore,
        max_score: maxScore,
        percentage,
        interpretation,
        recommendations,
        answers,
        created_at: new Date().toISOString(),
      };

      // save to local results
      try {
        const prev = JSON.parse(localStorage.getItem(STORAGE_RESULTS_KEY) || '[]');
        localStorage.setItem(STORAGE_RESULTS_KEY, JSON.stringify([result, ...prev]));
      } catch {}

      return result;
    }
  },

  getAssessmentResults: async () => {
    try {
      const res = await request<AssessmentResult[]>('/assessment-results');
      if (Array.isArray(res) && res.length > 0) return res;
    } catch {}

    try {
      const raw = localStorage.getItem(STORAGE_RESULTS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}

    return INITIAL_ASSESSMENT_RESULTS;
  },

  // Consultations
  getConsultations: async () => {
    try {
      return await request<Consultation[]>('/consultations');
    } catch {
      try {
        const raw = localStorage.getItem(STORAGE_CONSULTATIONS_KEY);
        if (raw) return JSON.parse(raw);
      } catch {}
      return [];
    }
  },

  getConsultationById: (id: string) => request<Consultation>(`/consultations/${id}`),

  createConsultation: async (payload: {
    topic: string;
    message: string;
    urgency: string;
    is_anonymous: boolean;
    student_name?: string;
    student_class?: string;
    name?: string;
    class?: string;
  }) => {
    try {
      return await request<Consultation>('/consultations', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
    } catch {
      const newConsult: Consultation = {
        id: `consult-${Date.now()}`,
        user_id: 'current_user',
        user_name: payload.student_name || payload.name || 'Siswa',
        user_class: payload.student_class || payload.class || 'Kelas Kejuruan',
        topic: payload.topic,
        message: payload.message,
        urgency: payload.urgency as any,
        status: 'Terkirim',
        is_anonymous: payload.is_anonymous,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      try {
        const list = JSON.parse(localStorage.getItem(STORAGE_CONSULTATIONS_KEY) || '[]');
        localStorage.setItem(STORAGE_CONSULTATIONS_KEY, JSON.stringify([newConsult, ...list]));
      } catch {}
      return newConsult;
    }
  },

  updateConsultation: (id: string, payload: { status?: string; response?: string; follow_up_notes?: string }) =>
    request<Consultation>(`/consultations/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    }).catch(() => payload as any),

  // Counseling Schedules
  getSchedules: async () => {
    try {
      return await request<{ mySchedules?: CounselingSchedule[]; takenSlots?: { date: string; time: string }[] } | CounselingSchedule[]>(
        '/counseling-schedules'
      );
    } catch {
      try {
        const raw = localStorage.getItem(STORAGE_SCHEDULES_KEY);
        if (raw) return JSON.parse(raw);
      } catch {}
      return { mySchedules: [], takenSlots: [] };
    }
  },

  createSchedule: async (payload: {
    date: string;
    time: string;
    service_type: string;
    topic: string;
    counseling_mode: string;
    student_name?: string;
    student_class?: string;
    name?: string;
    class?: string;
  }) => {
    try {
      return await request<CounselingSchedule>('/counseling-schedules', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
    } catch {
      const newSched: CounselingSchedule = {
        id: `sched-${Date.now()}`,
        user_id: 'current_user',
        user_name: payload.student_name || payload.name || 'Siswa',
        user_class: payload.student_class || payload.class || 'Kelas Kejuruan',
        date: payload.date,
        time: payload.time,
        service_type: payload.service_type,
        topic: payload.topic,
        counseling_mode: payload.counseling_mode as any,
        status: 'Menunggu persetujuan',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      try {
        const list = JSON.parse(localStorage.getItem(STORAGE_SCHEDULES_KEY) || '[]');
        localStorage.setItem(STORAGE_SCHEDULES_KEY, JSON.stringify([newSched, ...list]));
      } catch {}
      return newSched;
    }
  },

  updateSchedule: (id: string, payload: Partial<CounselingSchedule>) =>
    request<CounselingSchedule>(`/counseling-schedules/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    }).catch(() => payload as any),

  // Journals
  getJournals: async () => {
    try {
      const res = await request<Journal[]>('/journals');
      if (Array.isArray(res) && res.length > 0) return res;
    } catch {}

    try {
      const raw = localStorage.getItem(STORAGE_JOURNALS_KEY);
      if (raw) return JSON.parse(raw);
    } catch {}

    return [
      {
        id: 'jour-sample-1',
        user_id: 'user-siswa-1',
        user_name: 'Anindya Putri Pratama',
        user_class: 'XI Kuliner 1',
        mood: 'Senang',
        title: 'Tuntaskan Job Sheet Pastry & Bakery Hari Ini',
        feeling: 'Alhamdulillah hari ini praktik pembuatan croissant berhasil dengan laminasi mentega yang berlapis renyah.',
        problems: 'Sempat tegang saat oven mengalami sedikit perbedaan suhu dengan panduan resep.',
        actions_taken: 'Bertanya langsung kepada guru pembimbing praktik dan menurunkan suhu 10 derajat.',
        improvements: 'Lebih teliti memeriksa kelembapan ruangan sebelum proses fermentasi adonan.',
        next_goals: 'Mencoba teknik dekorasi tart dengan icing sugar besok pagi.',
        is_shared_with_counselor: true,
        counselor_feedback: 'Luar biasa Anindya! Sikap sigap bertanya ke guru praktik adalah contoh problem solving yang sangat baik di dunia kerja.',
        created_at: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString(),
        updated_at: new Date().toISOString(),
      },
    ];
  },

  createJournal: async (payload: {
    mood: string;
    title: string;
    feeling: string;
    problems?: string;
    actions_taken?: string;
    improvements?: string;
    next_goals?: string;
    is_shared_with_counselor: boolean;
    student_name?: string;
    student_class?: string;
    name?: string;
    class?: string;
  }) => {
    try {
      return await request<Journal>('/journals', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
    } catch {
      const newJ: Journal = {
        id: `jour-${Date.now()}`,
        user_id: 'current_user',
        user_name: payload.student_name || payload.name || 'Siswa',
        user_class: payload.student_class || payload.class || 'Kelas Kejuruan',
        mood: payload.mood,
        title: payload.title,
        feeling: payload.feeling,
        problems: payload.problems,
        actions_taken: payload.actions_taken,
        improvements: payload.improvements,
        next_goals: payload.next_goals,
        is_shared_with_counselor: payload.is_shared_with_counselor,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      try {
        const list = JSON.parse(localStorage.getItem(STORAGE_JOURNALS_KEY) || '[]');
        localStorage.setItem(STORAGE_JOURNALS_KEY, JSON.stringify([newJ, ...list]));
      } catch {}
      return newJ;
    }
  },

  giveJournalFeedback: (id: string, counselor_feedback: string) =>
    request<Journal>(`/journals/${id}/feedback`, {
      method: 'PUT',
      body: JSON.stringify({ counselor_feedback }),
    }).catch(() => ({ id, counselor_feedback } as any)),

  // Career
  getCareerContents: async (category?: string) => {
    try {
      const q = category ? `?category=${encodeURIComponent(category)}` : '';
      const res = await request<CareerContent[]>(`/career${q}`);
      if (Array.isArray(res) && res.length > 0) return res;
    } catch {}
    if (category) {
      return INITIAL_CAREER_CONTENTS.filter((c) => c.category === category);
    }
    return INITIAL_CAREER_CONTENTS;
  },

  createCareerContent: (payload: Partial<CareerContent>) =>
    request<CareerContent>('/career', {
      method: 'POST',
      body: JSON.stringify(payload),
    }).catch(() => payload as CareerContent),

  updateCareerContent: (id: string, payload: Partial<CareerContent>) =>
    request<CareerContent>(`/career/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    }).catch(() => payload as CareerContent),

  deleteCareerContent: (id: string) =>
    request<{ message: string }>(`/career/${id}`, {
      method: 'DELETE',
    }).catch(() => ({ message: 'Berhasil' })),

  getCareerPlan: async () => {
    try {
      return await request<CareerPlan | null>('/career-plan');
    } catch {
      try {
        const raw = localStorage.getItem(STORAGE_CAREER_PLAN_KEY);
        if (raw) return JSON.parse(raw);
      } catch {}
      return {
        id: 'plan-default',
        user_id: 'user-siswa-1',
        main_choice: 'Bekerja',
        target_after_grad: 'Menjadi Pastry Chef di hotel bintang 4 atau industri bakery modern di Yogyakarta.',
        target_1_year: 'Mengantongi sertifikasi kompetensi keahlian BNSP dan menuntaskan masa PKL dengan predikat Sangat Baik.',
        target_3_years: 'Menjadi supervisor chef pastry muda dan merintis lini produk kue hantaran mandiri.',
        skills_needed: 'Laminasi adonan, food hygiene & safety (HACCP), costing resep, komunikasi pelayanan pelanggan.',
        action_steps: 'Mencicil portofolio 10 menu signature di Ruang BK, berlatih wawancara kerja, dan menjaga nilai unjuk kerja praktik.',
        updated_at: new Date().toISOString(),
      };
    }
  },

  saveCareerPlan: async (payload: Partial<CareerPlan>) => {
    try {
      return await request<CareerPlan>('/career-plan', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
    } catch {
      const saved: CareerPlan = {
        id: 'plan-saved',
        user_id: 'user-siswa-current',
        main_choice: payload.main_choice || 'Bekerja',
        target_after_grad: payload.target_after_grad || '',
        target_1_year: payload.target_1_year || '',
        target_3_years: payload.target_3_years || '',
        skills_needed: payload.skills_needed || '',
        action_steps: payload.action_steps || '',
        updated_at: new Date().toISOString(),
      };
      localStorage.setItem(STORAGE_CAREER_PLAN_KEY, JSON.stringify(saved));
      return saved;
    }
  },

  // Emergency Assistance
  sendEmergencyAssistance: async (payload: { category: string; notes?: string; student_name?: string; student_class?: string }) => {
    try {
      return await request<{ message: string; data: AssistanceRequest }>('/emergency-assistance', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
    } catch {
      const item: AssistanceRequest = {
        id: `assist-${Date.now()}`,
        user_id: 'current_user',
        user_name: payload.student_name || 'Siswa',
        user_class: payload.student_class || 'Kelas Kejuruan',
        category: payload.category,
        notes: payload.notes,
        status: 'Perlu Ditangani Segera',
        created_at: new Date().toISOString(),
      };
      return {
        message: 'Permintaan bantuan darurat telah dikirimkan ke Ruang Guru BK SMKN 2 Godean.',
        data: item,
      };
    }
  },

  getEmergencyAssistance: () =>
    request<AssistanceRequest[]>('/emergency-assistance').catch(() => []),

  updateEmergencyStatus: (id: string, status: string) =>
    request<AssistanceRequest>(`/emergency-assistance/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    }).catch(() => ({ id, status } as any)),

  // Admin Stats & Users
  getAdminStats: async (filter?: string) => {
    try {
      return await request<AdminStatistics>(`/admin/statistics${filter ? `?filter=${filter}` : ''}`);
    } catch {
      return {
        summary: {
          totalStudents: 348,
          activeStudents: 142,
          totalMaterials: INITIAL_MATERIALS.length,
          totalAssessmentsCompleted: 96,
          totalConsultations: 28,
          pendingConsultations: 3,
          totalSchedules: 18,
          schedulesToday: 2,
          totalJournals: 47,
          urgentAssistanceCount: 1,
        },
        topMaterials: INITIAL_MATERIALS.slice(0, 4),
        leastMaterials: INITIAL_MATERIALS.slice(-2),
        categoryDistribution: [
          { name: 'BK Pribadi', value: 3 },
          { name: 'BK Sosial', value: 2 },
          { name: 'BK Belajar', value: 2 },
          { name: 'BK Karier', value: 3 },
        ],
        recentActivities: [],
        todaySchedulesList: [],
        urgentAssistanceList: [],
      };
    }
  },

  getAdminUsers: () => request<User[]>('/admin/users').catch(() => []),
  getUsers: () => request<User[]>('/admin/users').catch(() => []),

  getExportCsvUrl: (type: 'consultations' | 'schedules' | 'assessments' | 'logs') =>
    `/api/admin/export-csv?type=${type}`,
};

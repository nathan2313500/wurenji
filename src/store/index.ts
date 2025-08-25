import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  avatar: string;
  phone: string;
  level: 'basic' | 'premium' | 'vip';
  studyProgress: number;
  totalStudyTime: number;
  completedCourses: number;
  idNumber?: string;
  gender?: string;
  ethnicity?: string;
  birthDate?: string;
  address?: string;
  detailedAddress?: string;
  idCardFront?: string;
  idCardBack?: string;
  criminalRecord?: string;
  auditStatus?: 'pending' | 'reviewing' | 'approved' | 'rejected';
  auditMessage?: string;
}

interface EnrollmentCourse {
  id: string;
  name: string;
  type: 'VLOS' | 'BVLOS' | 'INSTRUCTOR';
  size: 'small' | 'medium';
  price: number;
  description: string;
}

interface EnrollmentInfo {
  courseId: string;
  courseName: string;
  courseType: 'VLOS' | 'BVLOS' | 'INSTRUCTOR';
  courseSize: 'small' | 'medium';
  price: number;
  paymentStatus: 'pending' | 'paid' | 'failed';
  enrollmentDate: string;
}

interface Course {
  id: string;
  title: string;
  category: 'VLOS' | 'BVLOS' | 'INSTRUCTOR';
  cover: string;
  price: number;
  isFree: boolean;
  duration: string;
  description: string;
  chapters: Chapter[];
}

interface Chapter {
  id: string;
  title: string;
  duration: string;
  videoUrl: string;
  completed: boolean;
}

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
}

interface PracticeRecord {
  id: string;
  type: 'chapter' | 'mock' | 'wrong' | 'real';
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeSpent: number;
  date: string;
}

interface Booking {
  id: string;
  type: 'training' | 'exam';
  institutionName: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  price: number;
}

interface CourseProgress {
  courseId: string;
  completedChapters: string[];
  totalChapters: number;
  progressPercentage: number;
  lastWatchedChapter?: string;
}

interface AppState {
  // User state
  user: User | null;
  setUser: (user: User) => void;
  
  // Login state
  isLoggedIn: boolean;
  login: (user: User) => void;
  logout: () => void;
  
  // Enrollment state
  isEnrolled: boolean;
  enrollmentInfo: EnrollmentInfo | null;
  availableCourses: EnrollmentCourse[];
  setEnrollment: (info: EnrollmentInfo) => void;
  clearEnrollment: () => void;
  
  // Navigation state
  activeTab: string;
  setActiveTab: (tab: string) => void;
  
  // Courses state
  courses: Course[];
  setCourses: (courses: Course[]) => void;
  
  // Course purchase state
  purchasedCourses: string[];
  purchaseCourse: (courseId: string) => void;
  isPurchased: (courseId: string) => boolean;
  
  // Course progress state
  courseProgress: CourseProgress[];
  updateCourseProgress: (courseId: string, completedChapters: string[], totalChapters: number) => void;
  getCourseProgress: (courseId: string) => CourseProgress | undefined;
  
  // Practice state
  questions: Question[];
  practiceRecords: PracticeRecord[];
  wrongQuestions: Question[];
  setQuestions: (questions: Question[]) => void;
  addPracticeRecord: (record: PracticeRecord) => void;
  addWrongQuestion: (question: Question) => void;
  
  // Booking state
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
  updateBooking: (id: string, updates: Partial<Booking>) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  // User state
  user: null,
  setUser: (user) => set({ user }),
  
  // Login state
  isLoggedIn: false,
  login: (user) => set({ user, isLoggedIn: true }),
  logout: () => set({ user: null, isLoggedIn: false, isEnrolled: false, enrollmentInfo: null }),
  
  // Enrollment state
  isEnrolled: false,
  enrollmentInfo: null,
  availableCourses: [
    {
      id: 'vlos-small',
      name: '视距内驾驶员（小型）',
      type: 'VLOS',
      size: 'small',
      price: 2800,
      description: '适用于7kg以下小型无人机操作'
    },
    {
      id: 'vlos-medium',
      name: '视距内驾驶员（中型）',
      type: 'VLOS',
      size: 'medium',
      price: 3200,
      description: '适用于7-25kg中型无人机操作'
    },
    {
      id: 'bvlos-small',
      name: '超视距驾驶员（小型）',
      type: 'BVLOS',
      size: 'small',
      price: 3800,
      description: '适用于7kg以下小型无人机超视距操作'
    },
    {
      id: 'bvlos-medium',
      name: '超视距驾驶员（中型）',
      type: 'BVLOS',
      size: 'medium',
      price: 4200,
      description: '适用于7-25kg中型无人机超视距操作'
    },
    {
      id: 'instructor-small',
      name: '教员（小型）',
      type: 'INSTRUCTOR',
      size: 'small',
      price: 4400,
      description: '小型无人机教学资格培训'
    },
    {
      id: 'instructor-medium',
      name: '教员（中型）',
      type: 'INSTRUCTOR',
      size: 'medium',
      price: 4800,
      description: '中型无人机教学资格培训'
    }
  ],
  setEnrollment: (info) => set({ enrollmentInfo: info, isEnrolled: true }),
  clearEnrollment: () => set({ enrollmentInfo: null, isEnrolled: false }),
  
  // Navigation state
  activeTab: 'home',
  setActiveTab: (tab) => set({ activeTab: tab }),
  
  // Courses state
  courses: [],
  setCourses: (courses) => set({ courses }),
  
  // Course purchase state
  purchasedCourses: ['1', '2'], // 模拟已购买的课程
  purchaseCourse: (courseId) => set((state) => ({
    purchasedCourses: [...state.purchasedCourses, courseId]
  })),
  isPurchased: (courseId) => {
    const state = get();
    return state.purchasedCourses.includes(courseId);
  },
  
  // Course progress state
  courseProgress: [
    {
      courseId: '1',
      completedChapters: ['1-1', '1-2'],
      totalChapters: 3,
      progressPercentage: 67,
      lastWatchedChapter: '1-2'
    },
    {
      courseId: '2',
      completedChapters: ['2-1'],
      totalChapters: 3,
      progressPercentage: 33,
      lastWatchedChapter: '2-1'
    }
  ],
  updateCourseProgress: (courseId, completedChapters, totalChapters) => set((state) => {
    const existingIndex = state.courseProgress.findIndex(p => p.courseId === courseId);
    const progressPercentage = totalChapters > 0 ? Math.round((completedChapters.length / totalChapters) * 100) : 0;
    
    const newProgress: CourseProgress = {
      courseId,
      completedChapters,
      totalChapters,
      progressPercentage,
      lastWatchedChapter: completedChapters[completedChapters.length - 1]
    };
    
    if (existingIndex >= 0) {
      const updatedProgress = [...state.courseProgress];
      updatedProgress[existingIndex] = newProgress;
      return { courseProgress: updatedProgress };
    } else {
      return { courseProgress: [...state.courseProgress, newProgress] };
    }
  }),
  getCourseProgress: (courseId) => {
    const state = get();
    return state.courseProgress.find(p => p.courseId === courseId);
  },
  
  // Practice state
  questions: [],
  practiceRecords: [],
  wrongQuestions: [],
  setQuestions: (questions) => set({ questions }),
  addPracticeRecord: (record) => set((state) => ({
    practiceRecords: [...state.practiceRecords, record]
  })),
  addWrongQuestion: (question) => set((state) => {
    const exists = state.wrongQuestions.find(q => q.id === question.id);
    if (!exists) {
      return { wrongQuestions: [...state.wrongQuestions, question] };
    }
    return state;
  }),
  
  // Booking state
  bookings: [],
  addBooking: (booking) => set((state) => ({
    bookings: [...state.bookings, booking]
  })),
  updateBooking: (id, updates) => set((state) => ({
    bookings: state.bookings.map(booking => 
      booking.id === id ? { ...booking, ...updates } : booking
    )
  }))
}));

export type { User, Course, Chapter, Question, PracticeRecord, Booking, EnrollmentCourse, EnrollmentInfo, CourseProgress };
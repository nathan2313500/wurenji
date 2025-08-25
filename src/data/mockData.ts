import { Course, Question, PracticeRecord, Booking } from '@/store';

// 讲师信息接口
export interface Instructor {
  id: string;
  name: string;
  avatar: string;
  title: string;
  experience: string;
  rating: number;
  courses: number;
  certified: boolean;
}

// 课程评价接口
export interface CourseReview {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  date: string;
}

// 扩展课程接口
export interface ExtendedCourse extends Course {
  instructor: Instructor;
  rating: number;
  studentCount: number;
  reviews: CourseReview[];
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

// 模拟讲师数据
export const mockInstructors: Instructor[] = [
  {
    id: 'inst1',
    name: '李航教授',
    avatar: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20aviation%20instructor%20portrait&image_size=square',
    title: '民航局首席无人机教员',
    experience: '15年飞行教学经验',
    rating: 4.9,
    courses: 12,
    certified: true
  },
  {
    id: 'inst2',
    name: '王飞行',
    avatar: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=experienced%20drone%20pilot%20instructor&image_size=square',
    title: '高级无人机飞行员',
    experience: '8年实操培训经验',
    rating: 4.7,
    courses: 8,
    certified: true
  },
  {
    id: 'inst3',
    name: '张教员',
    avatar: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=senior%20aviation%20training%20expert&image_size=square',
    title: '资深培训专家',
    experience: '20年航空教育背景',
    rating: 4.8,
    courses: 15,
    certified: true
  }
];

// 模拟课程评价数据
export const mockCourseReviews: CourseReview[] = [
  {
    id: 'review1',
    userId: 'user1',
    userName: '学员小王',
    userAvatar: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=student%20avatar%20young%20person&image_size=square',
    rating: 5,
    comment: '课程内容非常详细，老师讲解清晰，对新手很友好！',
    date: '2024-01-10'
  },
  {
    id: 'review2',
    userId: 'user2',
    userName: '飞行爱好者',
    userAvatar: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=aviation%20enthusiast%20portrait&image_size=square',
    rating: 4,
    comment: '实用性很强，学完后顺利通过了考试。',
    date: '2024-01-08'
  },
  {
    id: 'review3',
    userId: 'user3',
    userName: '无人机新手',
    userAvatar: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=beginner%20student%20learning&image_size=square',
    rating: 5,
    comment: '从零基础到入门，这个课程帮了我很大忙！',
    date: '2024-01-05'
  }
];

// 模拟课程数据
export const mockCourses: Course[] = [
  {
    id: '1',
    title: 'VLOS视距内飞行基础',
    category: 'VLOS',
    cover: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=drone%20flying%20in%20clear%20sky%20VLOS%20operation&image_size=landscape_16_9',
    price: 0,
    isFree: true,
    duration: '2小时30分',
    description: '学习视距内无人机飞行的基本知识和操作技能',
    chapters: [
      {
        id: '1-1',
        title: '无人机基础知识',
        duration: '30分钟',
        videoUrl: '#',
        completed: true
      },
      {
        id: '1-2',
        title: '飞行前检查',
        duration: '45分钟',
        videoUrl: '#',
        completed: true
      },
      {
        id: '1-3',
        title: '基础飞行操作',
        duration: '75分钟',
        videoUrl: '#',
        completed: false
      }
    ]
  },
  {
    id: '2',
    title: 'BVLOS超视距飞行进阶',
    category: 'BVLOS',
    cover: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=advanced%20drone%20beyond%20visual%20line%20of%20sight%20BVLOS&image_size=landscape_16_9',
    price: 299,
    isFree: false,
    duration: '4小时15分',
    description: '掌握超视距无人机飞行的高级技能和安全规范',
    chapters: [
      {
        id: '2-1',
        title: 'BVLOS飞行规范',
        duration: '60分钟',
        videoUrl: '#',
        completed: false
      },
      {
        id: '2-2',
        title: '导航系统使用',
        duration: '90分钟',
        videoUrl: '#',
        completed: false
      },
      {
        id: '2-3',
        title: '应急处理程序',
        duration: '105分钟',
        videoUrl: '#',
        completed: false
      }
    ]
  },
  {
    id: '3',
    title: '无人机教员资格培训',
    category: 'INSTRUCTOR',
    cover: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=drone%20instructor%20teaching%20students%20professional%20training&image_size=landscape_16_9',
    price: 1299,
    isFree: false,
    duration: '8小时',
    description: '成为合格的无人机培训教员，掌握教学方法和考核标准',
    chapters: [
      {
        id: '3-1',
        title: '教学理论基础',
        duration: '120分钟',
        videoUrl: '#',
        completed: false
      },
      {
        id: '3-2',
        title: '实操教学技巧',
        duration: '180分钟',
        videoUrl: '#',
        completed: false
      },
      {
        id: '3-3',
        title: '考核评估方法',
        duration: '180分钟',
        videoUrl: '#',
        completed: false
      }
    ]
  }
];

// 章节信息接口
export interface ChapterInfo {
  id: string;
  title: string;
  description: string;
  knowledgePoints: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  totalQuestions: number;
  completedQuestions: number;
  correctRate: number;
  lastPracticeDate?: string;
}

// 考试配置接口
export interface ExamConfig {
  id: string;
  name: string;
  description: string;
  duration: number; // 分钟
  totalQuestions: number;
  passingScore: number;
  subjects: string[];
  difficulty: 'easy' | 'medium' | 'hard';
}

// 扩展题目接口
export interface ExtendedQuestion {
  id: string;
  type: 'single' | 'multiple';
  content: string;
  image?: string;
  options: Array<{
    id: string;
    text: string;
    isCorrect?: boolean;
  }>;
  explanation?: string;
  knowledgePoint: string;
  difficulty: 'easy' | 'medium' | 'hard';
  score: number;
  chapterId?: string;
  examType?: string;
}

// 真题题目接口（包含详细解析）
export interface RealExamQuestion extends ExtendedQuestion {
  realExamId: string; // 所属真题考试ID
  detailedExplanation: string; // 详细解析
  knowledgeExtension: string; // 知识点扩展
  relatedQuestions: string[]; // 相关题目ID
  commonMistakes: string[]; // 常见错误
  examFrequency: 'high' | 'medium' | 'low'; // 考试频率
}

// 模拟章节数据
export const mockChapters: ChapterInfo[] = [
  {
    id: 'chapter_1',
    title: '无人机基础知识',
    description: '了解无人机的基本构造、分类和工作原理',
    knowledgePoints: ['无人机分类', '基本构造', '工作原理', '性能参数'],
    difficulty: 'easy',
    totalQuestions: 25,
    completedQuestions: 20,
    correctRate: 85,
    lastPracticeDate: '2024-01-20'
  },
  {
    id: 'chapter_2',
    title: '法律法规',
    description: '掌握无人机相关的法律法规和管理规定',
    knowledgePoints: ['民航法规', '飞行管制', '执照管理', '违法处罚'],
    difficulty: 'medium',
    totalQuestions: 30,
    completedQuestions: 15,
    correctRate: 78,
    lastPracticeDate: '2024-01-18'
  },
  {
    id: 'chapter_3',
    title: '气象知识',
    description: '学习影响无人机飞行的气象因素和天气判断',
    knowledgePoints: ['风速风向', '能见度', '云层高度', '降水影响'],
    difficulty: 'medium',
    totalQuestions: 28,
    completedQuestions: 10,
    correctRate: 72,
    lastPracticeDate: '2024-01-15'
  },
  {
    id: 'chapter_4',
    title: '飞行原理',
    description: '理解无人机的飞行原理和空气动力学基础',
    knowledgePoints: ['升力原理', '阻力分析', '稳定性', '操纵性'],
    difficulty: 'hard',
    totalQuestions: 35,
    completedQuestions: 5,
    correctRate: 65,
    lastPracticeDate: '2024-01-12'
  },
  {
    id: 'chapter_5',
    title: '安全操作',
    description: '掌握无人机安全操作规程和应急处理',
    knowledgePoints: ['飞行前检查', '安全距离', '应急程序', '事故处理'],
    difficulty: 'medium',
    totalQuestions: 32,
    completedQuestions: 25,
    correctRate: 88,
    lastPracticeDate: '2024-01-22'
  }
];

// 模拟考试配置
export const mockExamConfigs: ExamConfig[] = [
  {
    id: 'vlos_exam',
    name: 'VLOS视距内驾驶员考试',
    description: '视距内无人机驾驶员理论考试，涵盖基础知识和操作规范',
    duration: 90,
    totalQuestions: 50,
    passingScore: 70,
    subjects: ['基础知识', '法律法规', '气象知识', '安全操作'],
    difficulty: 'medium'
  },
  {
    id: 'bvlos_exam',
    name: 'BVLOS超视距驾驶员考试',
    description: '超视距无人机驾驶员理论考试，要求更高的专业知识',
    duration: 120,
    totalQuestions: 80,
    passingScore: 80,
    subjects: ['飞行原理', '导航系统', '通信技术', '应急处理'],
    difficulty: 'hard'
  },
  {
    id: 'instructor_exam',
    name: '教员资格考试',
    description: '无人机教员资格理论考试，考核教学能力和专业水平',
    duration: 150,
    totalQuestions: 100,
    passingScore: 85,
    subjects: ['教学理论', '专业知识', '考核标准', '安全管理'],
    difficulty: 'hard'
  }
];

// 真题考试配置
export interface RealExamConfig extends ExamConfig {
  year: string; // 真题年份
  source: string; // 真题来源
  paperType: string; // 试卷类型
}

// 模拟真题考试配置
export const mockRealExamConfigs: RealExamConfig[] = [
  {
    id: 'real_2023_vlos',
    name: '2023年VLOS驾驶员真题',
    description: '2023年民航局VLOS驾驶员资格考试真题',
    duration: 90,
    totalQuestions: 50,
    passingScore: 70,
    subjects: ['基础知识', '法律法规', '气象知识', '安全操作'],
    difficulty: 'medium',
    year: '2023',
    source: '民航局',
    paperType: 'A卷'
  },
  {
    id: 'real_2022_vlos',
    name: '2022年VLOS驾驶员真题',
    description: '2022年民航局VLOS驾驶员资格考试真题',
    duration: 90,
    totalQuestions: 50,
    passingScore: 70,
    subjects: ['基础知识', '法律法规', '气象知识', '安全操作'],
    difficulty: 'medium',
    year: '2022',
    source: '民航局',
    paperType: 'A卷'
  },
  {
    id: 'real_2023_bvlos',
    name: '2023年BVLOS驾驶员真题',
    description: '2023年民航局BVLOS驾驶员资格考试真题',
    duration: 120,
    totalQuestions: 80,
    passingScore: 80,
    subjects: ['飞行原理', '导航系统', '通信技术', '应急处理'],
    difficulty: 'hard',
    year: '2023',
    source: '民航局',
    paperType: 'B卷'
  },
  {
    id: 'real_2022_bvlos',
    name: '2022年BVLOS驾驶员真题',
    description: '2022年民航局BVLOS驾驶员资格考试真题',
    duration: 120,
    totalQuestions: 80,
    passingScore: 80,
    subjects: ['飞行原理', '导航系统', '通信技术', '应急处理'],
    difficulty: 'hard',
    year: '2022',
    source: '民航局',
    paperType: 'B卷'
  },
  {
    id: 'real_2021_vlos',
    name: '2021年VLOS驾驶员真题',
    description: '2021年民航局VLOS驾驶员资格考试真题',
    duration: 90,
    totalQuestions: 50,
    passingScore: 70,
    subjects: ['基础知识', '法律法规', '气象知识', '安全操作'],
    difficulty: 'medium',
    year: '2021',
    source: '民航局',
    paperType: 'A卷'
  }
];

// 获取可用的真题年份
export const getAvailableRealExamYears = (): string[] => {
  const years = mockRealExamConfigs.map(config => config.year);
  return [...new Set(years)].sort((a, b) => parseInt(b) - parseInt(a)); // 降序排列
};

// 根据年份获取真题考试配置
export const getRealExamConfigsByYear = (year: string): RealExamConfig[] => {
  return mockRealExamConfigs.filter(config => config.year === year);
};

// 获取真题考试配置详情
export const getRealExamConfigById = (id: string): RealExamConfig | undefined => {
  return mockRealExamConfigs.find(config => config.id === id);
};


// 模拟题目数据
export const mockQuestions: ExtendedQuestion[] = [
  {
    id: 'q1',
    type: 'single',
    content: '固定翼无人机降落时，放下襟翼，是为了？',
    options: [
      { id: 'a', text: '不对，是通过增加机翼面积或改变升力系数达到降低着陆速度的目的', isCorrect: true },
      { id: 'b', text: '在低速产生足够升力的同时', isCorrect: false },
      { id: 'c', text: '增加阻力', isCorrect: false },
      { id: 'd', text: '以上都对', isCorrect: false }
    ],
    explanation: '襟翼的主要作用是通过增加机翼面积或改变升力系数来降低着陆速度，确保安全降落。',
    knowledgePoint: '飞行原理',
    difficulty: 'medium',
    score: 2,
    chapterId: 'chapter_4',
    examType: 'vlos'
  },
  {
    id: 'q2',
    type: 'multiple',
    content: '升力公式Y=ρVSCy中各项的含义是？',
    options: [
      { id: 'a', text: 'ρ表示空气密度', isCorrect: true },
      { id: 'b', text: 'V表示飞行速度', isCorrect: true },
      { id: 'c', text: 'S表示机翼面积', isCorrect: true },
      { id: 'd', text: 'Cy表示升力系数', isCorrect: true }
    ],
    explanation: '升力公式Y=ρVSCy，其中ρ是空气密度，V是速度，S是机翼面积，Cy是升力系数。',
    knowledgePoint: '飞行原理',
    difficulty: 'medium',
    score: 3,
    chapterId: 'chapter_4',
    examType: 'vlos'
  },
  {
    id: 'q3',
    type: 'single',
    content: '自动定高飞行时，飞行器持续升高或降低高度的可能原因？',
    options: [
      { id: 'a', text: '高度传感器故障', isCorrect: false },
      { id: 'b', text: '气压传感器数据异常', isCorrect: false },
      { id: 'c', text: '飞控系统异常', isCorrect: false },
      { id: 'd', text: '以上都可能', isCorrect: true }
    ],
    explanation: '自动定高飞行异常可能由多种原因造成，包括传感器故障、飞控系统异常等。',
    knowledgePoint: '安全操作',
    difficulty: 'medium',
    score: 2,
    chapterId: 'chapter_5',
    examType: 'bvlos'
  },
  {
    id: 'q4',
    type: 'single',
    content: '根据《民用无人机驾驶员管理规定》，无人机驾驶员执照的有效期是？',
    options: [
      { id: 'a', text: '1年', isCorrect: false },
      { id: 'b', text: '2年', isCorrect: true },
      { id: 'c', text: '3年', isCorrect: false },
      { id: 'd', text: '5年', isCorrect: false }
    ],
    explanation: '根据相关规定，无人机驾驶员执照的有效期为2年，到期前需要进行续期申请。',
    knowledgePoint: '法律法规',
    difficulty: 'easy',
    score: 1,
    chapterId: 'chapter_2',
    examType: 'vlos'
  },
  {
    id: 'q5',
    type: 'multiple',
    content: '无人机飞行前的天气评估应包括哪些要素？',
    options: [
      { id: 'a', text: '风速风向', isCorrect: true },
      { id: 'b', text: '能见度', isCorrect: true },
      { id: 'c', text: '降水情况', isCorrect: true },
      { id: 'd', text: '温度湿度', isCorrect: true }
    ],
    explanation: '飞行前天气评估需要全面考虑各种气象要素对飞行安全的影响，包括风速风向、能见度、降水情况和温度湿度等。',
    knowledgePoint: '气象知识',
    difficulty: 'medium',
    score: 3,
    chapterId: 'chapter_3',
    examType: 'vlos'
  },
  {
    id: 'q6',
    type: 'single',
    content: '无人机在飞行过程中遇到强风天气，应该采取什么措施？',
    options: [
      { id: 'a', text: '继续飞行', isCorrect: false },
      { id: 'b', text: '立即降落', isCorrect: true },
      { id: 'c', text: '增加飞行高度', isCorrect: false },
      { id: 'd', text: '加速飞行', isCorrect: false }
    ],
    explanation: '遇到强风天气时，应立即寻找安全地点降落，确保飞行安全。继续飞行可能导致失控事故。',
    knowledgePoint: '安全操作',
    difficulty: 'easy',
    score: 1,
    chapterId: 'chapter_5',
    examType: 'vlos'
  },
  {
    id: 'q7',
    type: 'single',
    content: '多旋翼无人机的主要组成部分不包括？',
    options: [
      { id: 'a', text: '飞控系统', isCorrect: false },
      { id: 'b', text: '动力系统', isCorrect: false },
      { id: 'c', text: '传动系统', isCorrect: true },
      { id: 'd', text: '通信系统', isCorrect: false }
    ],
    explanation: '多旋翼无人机通过电机直接驱动螺旋桨，不需要传动系统。主要组成包括飞控、动力、通信等系统。',
    knowledgePoint: '无人机基础知识',
    difficulty: 'easy',
    score: 1,
    chapterId: 'chapter_1',
    examType: 'vlos'
  },
  {
    id: 'q8',
    type: 'multiple',
    content: '无人机飞行前检查应包括哪些项目？',
    options: [
      { id: 'a', text: '电池电量检查', isCorrect: true },
      { id: 'b', text: '螺旋桨状态检查', isCorrect: true },
      { id: 'c', text: '遥控器信号检查', isCorrect: true },
      { id: 'd', text: '飞行环境评估', isCorrect: true }
    ],
    explanation: '飞行前检查是确保飞行安全的重要环节，需要全面检查设备状态和飞行环境。',
    knowledgePoint: '安全操作',
    difficulty: 'easy',
    score: 2,
    chapterId: 'chapter_5',
    examType: 'vlos'
  }
];

// 错题记录接口
export interface WrongQuestionRecord {
  id: string;
  questionId: string;
  userAnswer: string[];
  correctAnswer: string[];
  wrongDate: string;
  reviewDate?: string;
  masteredDate?: string;
  status: 'new' | 'reviewed' | 'mastered';
  reviewCount: number;
  knowledgePoint: string;
  difficulty: 'easy' | 'medium' | 'hard';
  chapterId?: string;
  examType?: string;
}

// 练习统计接口
export interface PracticeStats {
  totalPractices: number;
  totalQuestions: number;
  correctQuestions: number;
  averageScore: number;
  totalTimeSpent: number; // 分钟
  streakDays: number;
  lastPracticeDate: string;
  knowledgePointStats: Array<{
    point: string;
    totalQuestions: number;
    correctQuestions: number;
    correctRate: number;
  }>;
}

// 模拟错题记录
export const mockWrongQuestions: WrongQuestionRecord[] = [
  {
    id: 'wr1',
    questionId: 'q1',
    userAnswer: ['b'],
    correctAnswer: ['a'],
    wrongDate: '2024-01-15',
    reviewDate: '2024-01-18',
    status: 'reviewed',
    reviewCount: 2,
    knowledgePoint: '飞行原理',
    difficulty: 'medium',
    chapterId: 'chapter_4',
    examType: 'vlos'
  },
  {
    id: 'wr2',
    questionId: 'q3',
    userAnswer: ['a'],
    correctAnswer: ['d'],
    wrongDate: '2024-01-16',
    reviewDate: '2024-01-20',
    masteredDate: '2024-01-22',
    status: 'mastered',
    reviewCount: 3,
    knowledgePoint: '安全操作',
    difficulty: 'medium',
    chapterId: 'chapter_5',
    examType: 'bvlos'
  },
  {
    id: 'wr3',
    questionId: 'q4',
    userAnswer: ['a'],
    correctAnswer: ['b'],
    wrongDate: '2024-01-19',
    status: 'new',
    reviewCount: 0,
    knowledgePoint: '法律法规',
    difficulty: 'easy',
    chapterId: 'chapter_2',
    examType: 'vlos'
  },
  {
    id: 'wr4',
    questionId: 'q5',
    userAnswer: ['a', 'b'],
    correctAnswer: ['a', 'b', 'c', 'd'],
    wrongDate: '2024-01-17',
    reviewDate: '2024-01-21',
    status: 'reviewed',
    reviewCount: 1,
    knowledgePoint: '气象知识',
    difficulty: 'medium',
    chapterId: 'chapter_3',
    examType: 'vlos'
  },
  {
    id: 'wr5',
    questionId: 'q7',
    userAnswer: ['b'],
    correctAnswer: ['c'],
    wrongDate: '2024-01-14',
    status: 'new',
    reviewCount: 0,
    knowledgePoint: '无人机基础知识',
    difficulty: 'easy',
    chapterId: 'chapter_1',
    examType: 'vlos'
  }
];

// 模拟练习统计
export const mockPracticeStats: PracticeStats = {
  totalPractices: 25,
  totalQuestions: 380,
  correctQuestions: 312,
  averageScore: 82,
  totalTimeSpent: 420, // 7小时
  streakDays: 5,
  lastPracticeDate: '2024-01-22',
  knowledgePointStats: [
    {
      point: '无人机基础知识',
      totalQuestions: 45,
      correctQuestions: 40,
      correctRate: 89
    },
    {
      point: '法律法规',
      totalQuestions: 52,
      correctQuestions: 41,
      correctRate: 79
    },
    {
      point: '气象知识',
      totalQuestions: 38,
      correctQuestions: 28,
      correctRate: 74
    },
    {
      point: '飞行原理',
      totalQuestions: 65,
      correctQuestions: 48,
      correctRate: 74
    },
    {
      point: '安全操作',
      totalQuestions: 58,
      correctQuestions: 52,
      correctRate: 90
    }
  ]
};

// 模拟真题题目数据
export const mockRealExamQuestions: RealExamQuestion[] = [
  {
    id: 'real_q1',
    type: 'single',
    content: '根据《民用无人机驾驶员管理规定》，无人机驾驶员执照的有效期是多久？',
    options: [
      { id: 'a', text: '1年', isCorrect: false },
      { id: 'b', text: '2年', isCorrect: true },
      { id: 'c', text: '3年', isCorrect: false },
      { id: 'd', text: '5年', isCorrect: false }
    ],
    explanation: '根据相关规定，无人机驾驶员执照的有效期为2年，到期前需要进行续期申请。',
    detailedExplanation: '《民用无人机驾驶员管理规定》（AC-61-FS-2018-20R1）第四章第二十五条明确规定：无人机驾驶员执照的有效期为2年。持有人应当在执照有效期满前90天内，向民航局无人机管理办公室或者其委托的机构申请执照更新。',
    knowledgeExtension: '无人机驾驶员执照管理是无人机安全管理体系的重要组成部分。除了有效期规定外，执照还有分类管理要求，包括视距内类别（VLOS）、超视距类别（BVLOS）等不同类型，每种类型的执照对应不同的飞行权限和要求。',
    knowledgePoint: '法律法规',
    difficulty: 'easy',
    score: 2,
    examType: 'vlos',
    realExamId: 'real_2023_vlos',
    relatedQuestions: ['real_q5', 'q4'],
    commonMistakes: ['混淆无人机执照与其他航空执照的有效期', '忽略执照更新的提前申请时间要求'],
    examFrequency: 'high'
  },
  {
    id: 'real_q2',
    type: 'multiple',
    content: '多旋翼无人机悬停状态下，以下哪些因素会影响其稳定性？',
    options: [
      { id: 'a', text: '风速', isCorrect: true },
      { id: 'b', text: '电池电量', isCorrect: true },
      { id: 'c', text: '气压', isCorrect: true },
      { id: 'd', text: '温度', isCorrect: false }
    ],
    explanation: '多旋翼无人机悬停稳定性受风速、电池电量和气压等因素影响。',
    detailedExplanation: '多旋翼无人机悬停稳定性受多种因素影响：\n1. 风速：外部风力会直接影响无人机的平衡，风速越大，保持稳定所需的控制输入越大；\n2. 电池电量：电量不足会导致电机输出功率不稳定，影响悬停精度；\n3. 气压：气压变化会影响气压计读数，进而影响高度保持精度；\n温度虽然会间接影响电池性能和空气密度，但对悬停稳定性的直接影响相对较小。',
    knowledgeExtension: '多旋翼无人机的悬停稳定性是通过飞控系统中的多种传感器和控制算法共同维持的。现代飞控系统通常包含加速度计、陀螺仪、气压计、GPS等传感器，通过PID控制算法实时调整各电机转速，抵消外部干扰，保持飞行器姿态稳定。',
    knowledgePoint: '飞行原理',
    difficulty: 'medium',
    score: 3,
    examType: 'vlos',
    realExamId: 'real_2023_vlos',
    relatedQuestions: ['real_q7', 'q1'],
    commonMistakes: ['忽略电池电量对稳定性的影响', '低估气压变化对高度保持的影响'],
    examFrequency: 'medium'
  },
  {
    id: 'real_q3',
    type: 'single',
    content: '无人机在飞行过程中突然出现GPS信号丢失，以下处理方式最正确的是？',
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=drone%20flying%20with%20GPS%20signal%20loss%20warning&image_size=landscape_4_3',
    options: [
      { id: 'a', text: '立即切换到姿态模式手动控制', isCorrect: true },
      { id: 'b', text: '继续飞行任务', isCorrect: false },
      { id: 'c', text: '立即关闭电机', isCorrect: false },
      { id: 'd', text: '等待GPS信号恢复', isCorrect: false }
    ],
    explanation: 'GPS信号丢失时，应立即切换到姿态模式手动控制，确保飞行安全。',
    detailedExplanation: 'GPS信号丢失是无人机飞行中常见的紧急情况之一。正确的处理流程是：\n1. 立即切换到姿态模式（ATTI模式）手动控制无人机；\n2. 保持视线接触，避免无人机飞出可视范围；\n3. 控制无人机降低高度，寻找安全区域降落；\n4. 切勿惊慌关闭电机，这会导致无人机直接坠落；\n5. 不要被动等待GPS恢复，应主动采取控制措施。',
    knowledgeExtension: 'GPS信号丢失的常见原因包括：高楼遮挡、电磁干扰、卫星信号弱、飞控系统故障等。现代无人机通常配备多种导航系统，如GPS、GLONASS、北斗等，以提高定位可靠性。此外，视觉定位、超声波定位等辅助系统也能在GPS失效时提供一定的定位能力。',
    knowledgePoint: '应急处理',
    difficulty: 'hard',
    score: 4,
    examType: 'bvlos',
    realExamId: 'real_2023_bvlos',
    relatedQuestions: ['real_q8', 'q3'],
    commonMistakes: ['惊慌失措直接关闭电机', '消极等待GPS信号恢复而不采取主动控制'],
    examFrequency: 'high'
  },
  {
    id: 'real_q4',
    type: 'single',
    content: '根据《民用无人机空中交通管理办法》，在人口稠密区域上空，无人机飞行高度不得超过多少米？',
    options: [
      { id: 'a', text: '50米', isCorrect: false },
      { id: 'b', text: '120米', isCorrect: true },
      { id: 'c', text: '150米', isCorrect: false },
      { id: 'd', text: '200米', isCorrect: false }
    ],
    explanation: '根据规定，在人口稠密区域上空，无人机飞行高度不得超过120米。',
    detailedExplanation: '《民用无人机空中交通管理办法》明确规定，在人口稠密区域上空，无人机飞行高度不得超过120米（自地面或建筑物顶部起计算）。这一规定旨在减少无人机对地面人员和财产的潜在风险，同时避免与载人航空器的空域冲突。',
    knowledgeExtension: '无人机飞行高度限制是空域管理的重要组成部分。不同国家和地区对无人机飞行高度有不同规定，但大多数国家采用了类似的高度限制。例如，美国FAA规定无人机飞行高度不得超过400英尺（约122米），欧盟EASA规定不得超过120米。此外，在机场周边、军事区域等特殊空域，还有更严格的高度和区域限制。',
    knowledgePoint: '法律法规',
    difficulty: 'medium',
    score: 2,
    examType: 'vlos',
    realExamId: 'real_2022_vlos',
    relatedQuestions: ['real_q1', 'q4'],
    commonMistakes: ['混淆不同区域的高度限制', '忽略从建筑物顶部计算高度的规定'],
    examFrequency: 'high'
  },
  {
    id: 'real_q5',
    type: 'multiple',
    content: '以下哪些情况下，无人机操作员需要向空管部门申请飞行计划？',
    options: [
      { id: 'a', text: '在机场净空区域飞行', isCorrect: true },
      { id: 'b', text: '超视距飞行', isCorrect: true },
      { id: 'c', text: '在私人庭院内飞行高度低于10米', isCorrect: false },
      { id: 'd', text: '飞行重量超过7公斤', isCorrect: true }
    ],
    explanation: '在机场净空区域飞行、超视距飞行和飞行重量超过7公斤的情况下，需要向空管部门申请飞行计划。',
    detailedExplanation: '根据《民用无人机空中交通管理办法》和《轻小无人机运行规定》，以下情况需要向空管部门申请飞行计划：\n1. 在机场净空区域飞行：这些区域属于管制空域，需要特别许可；\n2. 超视距飞行：超出操作员视线范围的飞行增加了风险，需要特别申请；\n3. 飞行重量超过7公斤：较重的无人机具有更大的动能，可能造成更严重的伤害；\n而在私人庭院内低于10米的飞行，通常属于微型无人机室内或低风险类别，不需要申请飞行计划。',
    knowledgeExtension: '无人机飞行计划申请是确保空域安全的重要管理手段。申请流程通常包括：提前24小时通过无人机云系统提交申请、提供飞行区域、高度、时间等信息、获得批准后按计划执行。不同类型和重量的无人机适用不同的管理规定，例如250克以下的微型无人机在非禁飞区域飞行通常无需申请飞行计划。',
    knowledgePoint: '法律法规',
    difficulty: 'hard',
    score: 4,
    examType: 'vlos',
    realExamId: 'real_2022_vlos',
    relatedQuestions: ['real_q1', 'real_q4'],
    commonMistakes: ['忽略无人机重量对管理要求的影响', '误认为所有无人机飞行都需要申请飞行计划'],
    examFrequency: 'high'
  },
  {
    id: 'real_q6',
    type: 'single',
    content: '多旋翼无人机电机突然停转，最可能的原因是？',
    options: [
      { id: 'a', text: 'GPS信号丢失', isCorrect: false },
      { id: 'b', text: '电机过热保护', isCorrect: false },
      { id: 'c', text: '电调故障', isCorrect: true },
      { id: 'd', text: '遥控器信号干扰', isCorrect: false }
    ],
    explanation: '电机突然停转最可能的原因是电调故障，电调负责控制电机的转速和方向。',
    detailedExplanation: '多旋翼无人机电机突然停转的原因分析：\n1. 电调故障：电子调速器(ESC)是连接电池和电机的关键组件，负责将电池的直流电转换为驱动电机的三相交流电。电调故障是电机突然停转的最常见原因；\n2. GPS信号丢失通常不会导致电机停转，只会影响定位功能；\n3. 电机过热保护通常会导致电机功率降低而非完全停转；\n4. 遥控器信号干扰通常会导致控制异常，而非电机直接停转。',
    knowledgeExtension: '电子调速器(ESC)是无人机动力系统的核心组件之一。现代电调通常集成了多种保护功能，如过流保护、过热保护、低压保护等。电调故障的常见原因包括：元器件老化、焊点虚焊、固件问题、过载损坏等。为避免电调故障，应定期检查电调状态，避免过载使用，选择质量可靠的产品，并确保良好的散热条件。',
    knowledgePoint: '无人机基础知识',
    difficulty: 'medium',
    score: 3,
    examType: 'vlos',
    realExamId: 'real_2021_vlos',
    relatedQuestions: ['real_q2', 'q7'],
    commonMistakes: ['混淆电调故障与信号问题', '忽视电调在动力系统中的关键作用'],
    examFrequency: 'medium'
  },
  {
    id: 'real_q7',
    type: 'multiple',
    content: '无人机飞行前，以下哪些检查项目是必须的？',
    options: [
      { id: 'a', text: '螺旋桨安装是否牢固', isCorrect: true },
      { id: 'b', text: '电池电量是否充足', isCorrect: true },
      { id: 'c', text: '遥控器与飞行器是否正常连接', isCorrect: true },
      { id: 'd', text: '飞行器外观是否有新的贴纸', isCorrect: false }
    ],
    explanation: '飞行前必须检查螺旋桨安装、电池电量和遥控器连接状态，确保飞行安全。',
    detailedExplanation: '无人机飞行前安全检查是确保飞行安全的关键步骤，必须检查的项目包括：\n1. 螺旋桨安装是否牢固：松动的螺旋桨可能导致飞行不稳或脱落，造成严重事故；\n2. 电池电量是否充足：电量不足可能导致飞行中断或返航失败；\n3. 遥控器与飞行器是否正常连接：确保控制信号稳定，避免失控风险；\n而飞行器外观是否有新贴纸属于美观性检查，不影响飞行安全，非必检项目。',
    knowledgeExtension: '完整的无人机飞行前检查通常包括：机体结构检查、动力系统检查、控制系统检查、传感器检查、软件状态检查、环境评估等。专业无人机操作团队通常会使用标准化的检查清单(Checklist)，确保每次飞行前的检查全面且一致。此外，不同类型的无人机（如多旋翼、固定翼、垂直起降固定翼等）有各自特定的检查要点。',
    knowledgePoint: '安全操作',
    difficulty: 'easy',
    score: 2,
    examType: 'vlos',
    realExamId: 'real_2021_vlos',
    relatedQuestions: ['real_q3', 'q8'],
    commonMistakes: ['忽略螺旋桨检查的重要性', '仅关注电池电量而忽视其他安全项目'],
    examFrequency: 'high'
  },
  {
    id: 'real_q8',
    type: 'single',
    content: '无人机飞行过程中遭遇雷雨天气，正确的应对方式是？',
    options: [
      { id: 'a', text: '加速飞行，尽快完成任务', isCorrect: false },
      { id: 'b', text: '升高高度，避开云层', isCorrect: false },
      { id: 'c', text: '立即寻找安全地点降落', isCorrect: true },
      { id: 'd', text: '悬停等待雷雨过去', isCorrect: false }
    ],
    explanation: '遭遇雷雨天气时，应立即寻找安全地点降落，确保飞行安全。',
    detailedExplanation: '无人机遭遇雷雨天气的正确应对流程：\n1. 立即寻找安全地点降落：雷雨天气对无人机构成多重威胁，包括雨水导致电路短路、雷击风险、强风导致失控等；\n2. 加速飞行会增加电机负载，在恶劣天气下更容易失控；\n3. 升高高度不仅无法避开雷雨，反而增加了雷击风险；\n4. 悬停等待会延长暴露在危险环境中的时间，增加事故风险。',
    knowledgeExtension: '气象因素是影响无人机飞行安全的重要外部条件。除雷雨外，其他需要注意的恶劣天气包括：强风（一般风速超过8-10m/s时不建议飞行）、大雾（影响能见度和传感器性能）、极端温度（影响电池性能和电子元件工作）、沙尘（可能堵塞电机或进入精密部件）等。专业无人机操作员应具备基本的气象知识，能够判断天气条件是否适合飞行。',
    knowledgePoint: '安全操作',
    difficulty: 'medium',
    score: 3,
    examType: 'bvlos',
    realExamId: 'real_2022_bvlos',
    relatedQuestions: ['real_q3', 'real_q7'],
    commonMistakes: ['低估雷雨天气对无人机的危险性', '错误地认为可以通过改变高度避开雷雨'],
    examFrequency: 'medium'
  }
];

// 获取真题题目
export const getRealExamQuestionsByExamId = (examId: string): RealExamQuestion[] => {
  return mockRealExamQuestions.filter(question => question.realExamId === examId);
};

// 获取真题题目详情
export const getRealExamQuestionById = (id: string): RealExamQuestion | undefined => {
  return mockRealExamQuestions.find(question => question.id === id);
};

// 模拟练习记录
export const mockPracticeRecords: PracticeRecord[] = [
  {
    id: 'pr1',
    type: 'chapter',
    score: 85,
    totalQuestions: 20,
    correctAnswers: 17,
    timeSpent: 15,
    date: '2024-01-20'
  },
  {
    id: 'pr2',
    type: 'mock',
    score: 78,
    totalQuestions: 50,
    correctAnswers: 39,
    timeSpent: 45,
    date: '2024-01-18'
  },
  {
    id: 'pr3',
    type: 'wrong',
    score: 92,
    totalQuestions: 15,
    correctAnswers: 14,
    timeSpent: 12,
    date: '2024-01-15'
  },
  {
    id: 'pr4',
    type: 'chapter',
    score: 90,
    totalQuestions: 25,
    correctAnswers: 23,
    timeSpent: 18,
    date: '2024-01-22'
  },
  {
    id: 'pr5',
    type: 'mock',
    score: 82,
    totalQuestions: 50,
    correctAnswers: 41,
    timeSpent: 42,
    date: '2024-01-21'
  },
  {
    id: 'pr6',
    type: 'real',
    score: 88,
    totalQuestions: 50,
    correctAnswers: 44,
    timeSpent: 40,
    date: '2024-01-23'
  }
];

// 模拟预约记录
export const mockBookings: Booking[] = [
  {
    id: 'b1',
    type: 'training',
    institutionName: '忠和野生动物园',
    date: '2024-02-15',
    time: '09:00-12:00',
    status: 'confirmed',
    price: 800
  },
  {
    id: 'b2',
    type: 'exam',
    institutionName: '上海无人机考试中心',
    date: '2024-02-20',
    time: '14:00-16:00',
    status: 'pending',
    price: 300
  }
];

// 培训场地数据
export const mockInstitutions = [
  {
    id: 'inst1',
    name: '忠和野生动物园',
    address: '兰州市城关区忠和镇忠和村',
    rating: 4.8,
    distance: '2.3km',
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=wildlife%20park%20training%20ground%20outdoor%20drone%20practice%20area&image_size=landscape_4_3',
    services: ['VLOS培训', 'BVLOS培训', '教员培训']
  },
  {
    id: 'inst2',
    name: '洮河如意湾如意广场',
    address: '定西市临洮县太石服务区西',
    rating: 4.6,
    distance: '3.8km',
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=riverside%20plaza%20training%20ground%20drone%20practice%20area%20scenic%20location&image_size=landscape_4_3',
    services: ['VLOS培训', 'BVLOS培训']
  },
  {
    id: 'inst3',
    name: '五泉山室外训练场',
    address: '兰州市城关区五泉南路103号',
    rating: 4.6,
    distance: '5.1km',
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=mountain%20outdoor%20drone%20training%20field%20practice%20area&image_size=landscape_4_3',
    services: ['VLOS培训', 'BVLOS培训']
  }
];

// 培训场地教练数据
export const mockVenueInstructors = {
  'inst1': [ // 忠和野生动物园
    {
      id: 'coach1',
      name: '刘教练',
      avatar: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20drone%20instructor%20outdoor%20training&image_size=square',
      title: 'VLOS/BVLOS认证教员',
      experience: '6年实操培训经验',
      rating: 4.8,
      specialties: ['VLOS培训', 'BVLOS培训']
    },
    {
      id: 'coach2',
      name: '陈教练',
      avatar: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=experienced%20female%20drone%20instructor&image_size=square',
      title: '高级飞行教员',
      experience: '8年教学经验',
      rating: 4.9,
      specialties: ['教员培训', 'BVLOS培训']
    }
  ],
  'inst2': [ // 洮河如意湾如意广场
    {
      id: 'coach5',
      name: '张教练',
      avatar: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20drone%20instructor%20riverside%20training&image_size=square',
      title: 'VLOS认证教员',
      experience: '4年河滨飞行培训',
      rating: 4.6,
      specialties: ['VLOS培训', '河滨飞行']
    },
    {
      id: 'coach6',
      name: '赵教练',
      avatar: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=experienced%20drone%20trainer%20scenic%20location&image_size=square',
      title: 'BVLOS认证教员',
      experience: '5年景区培训经验',
      rating: 4.7,
      specialties: ['BVLOS培训', '景区飞行']
    }
  ],
  'inst3': [ // 五泉山室外训练场
    {
      id: 'coach3',
      name: '王教练',
      avatar: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=senior%20drone%20pilot%20mountain%20training&image_size=square',
      title: 'VLOS认证教员',
      experience: '5年山地飞行培训',
      rating: 4.7,
      specialties: ['VLOS培训', '山地飞行']
    },
    {
      id: 'coach4',
      name: '李教练',
      avatar: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20outdoor%20drone%20trainer&image_size=square',
      title: 'BVLOS认证教员',
      experience: '7年户外培训经验',
      rating: 4.8,
      specialties: ['BVLOS培训', '户外飞行']
    }
  ]
};

// 预约时段数据
export const mockTimeSlots = {
  'inst1': [
    { id: 'slot1', time: '09:00-11:00', available: true, date: '2024-02-20' },
    { id: 'slot2', time: '14:00-16:00', available: true, date: '2024-02-20' },
    { id: 'slot3', time: '16:30-18:30', available: false, date: '2024-02-20' },
    { id: 'slot4', time: '09:00-11:00', available: true, date: '2024-02-21' },
    { id: 'slot5', time: '14:00-16:00', available: true, date: '2024-02-21' }
  ],
  'inst2': [
    { id: 'slot11', time: '09:30-11:30', available: true, date: '2024-02-20' },
    { id: 'slot12', time: '14:30-16:30', available: true, date: '2024-02-20' },
    { id: 'slot13', time: '17:00-19:00', available: false, date: '2024-02-20' },
    { id: 'slot14', time: '09:30-11:30', available: true, date: '2024-02-21' },
    { id: 'slot15', time: '14:30-16:30', available: true, date: '2024-02-21' }
  ],
  'inst3': [
    { id: 'slot6', time: '08:00-10:00', available: true, date: '2024-02-20' },
    { id: 'slot7', time: '10:30-12:30', available: false, date: '2024-02-20' },
    { id: 'slot8', time: '15:00-17:00', available: true, date: '2024-02-20' },
    { id: 'slot9', time: '08:00-10:00', available: true, date: '2024-02-21' },
    { id: 'slot10', time: '15:00-17:00', available: true, date: '2024-02-21' }
  ]
};

// 考试中心数据
export const mockExamCenters = [
  {
    id: 'exam1',
    name: '民航局无人机考试中心',
    address: '北京市顺义区机场路789号',
    rating: 4.9,
    distance: '12.5km',
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=official%20aviation%20exam%20center%20building&image_size=landscape_4_3',
    examTypes: ['理论考试', '实操考试']
  },
  {
    id: 'exam2',
    name: '华东地区考试中心',
    address: '上海市虹桥区考试路321号',
    rating: 4.7,
    distance: '8.2km',
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=regional%20examination%20center%20professional&image_size=landscape_4_3',
    examTypes: ['理论考试', '实操考试']
  }
];

// 扩展课程数据（包含详细信息）
export const mockExtendedCourses: ExtendedCourse[] = [
  {
    ...mockCourses[0],
    instructor: mockInstructors[0],
    rating: 4.8,
    studentCount: 1256,
    reviews: [mockCourseReviews[0], mockCourseReviews[2]],
    tags: ['基础入门', '视距内飞行', '免费课程'],
    difficulty: 'beginner'
  },
  {
    ...mockCourses[1],
    instructor: mockInstructors[1],
    rating: 4.6,
    studentCount: 892,
    reviews: [mockCourseReviews[1]],
    tags: ['进阶课程', '超视距飞行', '付费精品'],
    difficulty: 'intermediate'
  },
  {
    ...mockCourses[2],
    instructor: mockInstructors[2],
    rating: 4.9,
    studentCount: 345,
    reviews: [mockCourseReviews[0], mockCourseReviews[1], mockCourseReviews[2]],
    tags: ['教员培训', '高级课程', '职业认证'],
    difficulty: 'advanced'
  }
];

// 获取课程详情的辅助函数
export const getCourseById = (id: string): ExtendedCourse | undefined => {
  return mockExtendedCourses.find(course => course.id === id);
};

// 获取讲师信息的辅助函数
export const getInstructorById = (id: string): Instructor | undefined => {
  return mockInstructors.find(instructor => instructor.id === id);
};

// 获取课程评价的辅助函数
export const getReviewsByCourseId = (courseId: string): CourseReview[] => {
  const course = getCourseById(courseId);
  return course ? course.reviews : [];
};

// 添加课程评价的函数
export const addCourseReview = (courseId: string, review: Omit<CourseReview, 'id'>): boolean => {
  const courseIndex = mockExtendedCourses.findIndex(course => course.id === courseId);
  if (courseIndex !== -1) {
    const newReview: CourseReview = {
      ...review,
      id: `review_${Date.now()}`
    };
    
    mockExtendedCourses[courseIndex].reviews.push(newReview);
    
    // 重新计算课程评分
    const reviews = mockExtendedCourses[courseIndex].reviews;
    const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
    mockExtendedCourses[courseIndex].rating = Math.round((totalRating / reviews.length) * 10) / 10;
    
    return true;
  }
  return false;
};

// 更新章节完成状态的函数
export const updateChapterCompletion = (courseId: string, chapterId: string, completed: boolean): boolean => {
  const courseIndex = mockExtendedCourses.findIndex(course => course.id === courseId);
  if (courseIndex !== -1) {
    const chapterIndex = mockExtendedCourses[courseIndex].chapters.findIndex(chapter => chapter.id === chapterId);
    if (chapterIndex !== -1) {
      mockExtendedCourses[courseIndex].chapters[chapterIndex].completed = completed;
      return true;
    }
  }
  return false;
};

// 获取课程完成进度的函数
export const getCourseProgress = (courseId: string): number => {
  const course = getCourseById(courseId);
  if (!course) return 0;
  
  const completedChapters = course.chapters.filter(chapter => chapter.completed).length;
  const totalChapters = course.chapters.length;
  
  return Math.round((completedChapters / totalChapters) * 100);
};

// 检查课程是否已完成的函数
export const isCourseCompleted = (courseId: string): boolean => {
  return getCourseProgress(courseId) === 100;
};

// 检查用户是否已评价课程的函数
export const hasUserReviewedCourse = (courseId: string): boolean => {
  return localStorage.getItem(`course_reviewed_${courseId}`) === 'true';
};

// 标记用户已评价课程的函数
export const markCourseAsReviewed = (courseId: string): void => {
  localStorage.setItem(`course_reviewed_${courseId}`, 'true');
};

// Banner轮播图接口
export interface BannerItem {
  id: string;
  title: string;
  description?: string;
  image: string;
  link?: string;
}

// 新闻资讯接口
export interface NewsItem {
  id: string;
  title: string;
  summary?: string;
  content?: string;
  publishTime: string;
  category?: string;
  image?: string;
  link?: string;
  isHot?: boolean;
  author?: string;
  readCount?: number;
  tags?: string[];
  relatedNews?: string[];
}

// 模拟Banner数据
export const mockBanners: BannerItem[] = [
  {
    id: 'banner1',
    title: '2024年无人机新政策发布',
    description: '了解最新的无人机管理规定和飞行要求',
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=drone%20policy%20announcement%20official%20document&image_size=landscape_16_9',
    link: '/news/policy-2024'
  },
  {
    id: 'banner2',
    title: '春季培训班火热招生',
    description: '专业教员指导，通过率高达95%',
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=drone%20training%20class%20students%20learning&image_size=landscape_16_9',
    link: '/enrollment'
  },
  {
    id: 'banner3',
    title: '免费体验课程开放',
    description: '零基础入门，专业教员一对一指导',
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=free%20drone%20course%20beginner%20friendly&image_size=landscape_16_9',
    link: '/learning'
  }
];

// 模拟新闻数据
export const mockNews: NewsItem[] = [
  {
    id: 'news1',
    title: '民航局发布无人机飞行新规定',
    summary: '为进一步规范无人机飞行活动，保障航空安全，民航局发布了最新的管理规定...',
    content: `为进一步规范无人机飞行活动，保障航空安全，中国民用航空局近日发布了《无人驾驶航空器飞行管理暂行条例》修订版。\n\n新规定主要包括以下几个方面：\n\n**1. 飞行区域管控**\n严格划分禁飞区、限飞区和适飞区，无人机操作者必须在规定区域内进行飞行活动。机场、军事基地、核设施等敏感区域周边15公里范围内禁止无人机飞行。\n\n**2. 操作人员资质要求**\n重量超过250克的无人机操作人员必须取得相应的操作证书。培训机构需要具备民航局认可的资质，确保培训质量和安全标准。\n\n**3. 飞行高度限制**\n民用无人机飞行高度不得超过120米，在机场净空保护区内飞行高度进一步限制在60米以下。\n\n**4. 实名登记制度**\n所有无人机必须进行实名登记，并在机体上标注登记号码。违反规定的将面临罚款和设备没收等处罚。\n\n新规定将于2024年3月1日正式实施，为无人机行业的健康发展提供了更加完善的法律保障。`,
    publishTime: '2024-01-25T10:30:00Z',
    category: '政策法规',
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=aviation%20authority%20regulation%20announcement&image_size=landscape_4_3',
    link: '/news/regulation-2024',
    isHot: true,
    author: '民航局新闻办',
    readCount: 15420,
    tags: ['政策法规', '飞行管理', '安全规范'],
    relatedNews: ['news2', 'news3']
  },
  {
    id: 'news2',
    title: '无人机技术创新大赛圆满落幕',
    summary: '2024年全国无人机技术创新大赛在北京成功举办，来自全国各地的参赛队伍展示了最新的技术成果...',
    content: `2024年全国无人机技术创新大赛于1月20日在北京国家会议中心圆满落幕。本次大赛吸引了来自全国31个省市的200多支参赛队伍，共计800余名选手参与角逐。\n\n**大赛亮点**\n\n本届大赛设置了多个竞赛项目，包括：\n- 无人机编程飞行挑战赛\n- 航拍摄影创意大赛\n- 无人机救援应用演示\n- 农业植保技术比拼\n\n**获奖情况**\n\n经过激烈角逐，北京航空航天大学代表队获得编程飞行项目冠军，他们设计的自主避障算法在复杂环境中表现出色。华南理工大学团队凭借创新的多旋翼协同作业方案获得救援应用项目第一名。\n\n**技术创新**\n\n本次大赛展示了众多前沿技术，包括：\n- AI视觉识别与自主导航\n- 5G通信在无人机控制中的应用\n- 新型复合材料机身设计\n- 长续航电池技术\n\n大赛不仅促进了技术交流，也为无人机行业培养了大批优秀人才，推动了产业创新发展。`,
    publishTime: '2024-01-23T14:20:00Z',
    category: '行业动态',
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=drone%20technology%20competition%20innovation&image_size=landscape_4_3',
    link: '/news/competition-2024',
    author: '科技日报记者',
    readCount: 8760,
    tags: ['技术创新', '竞赛活动', '人才培养'],
    relatedNews: ['news4', 'news5']
  },
  {
    id: 'news3',
    title: '春季无人机培训班开始报名',
    summary: '易飞行教育2024年春季培训班正式开始报名，提供VLOS、BVLOS等多种课程选择...',
    content: `易飞行教育2024年春季培训班现已开始接受报名！本期培训班将于3月1日正式开课，为期两个月。\n\n**课程设置**\n\n我们提供多种课程选择，满足不同学员需求：\n\n**VLOS视距内飞行课程**\n- 课程时长：40学时\n- 培训费用：2800元\n- 适合人群：零基础学员\n- 课程内容：基础理论、模拟飞行、实操训练\n\n**BVLOS超视距飞行课程**\n- 课程时长：60学时\n- 培训费用：4500元\n- 适合人群：有基础飞行经验\n- 课程内容：高级导航、应急处理、复杂环境飞行\n\n**教员资格培训课程**\n- 课程时长：80学时\n- 培训费用：8800元\n- 适合人群：资深飞行员\n- 课程内容：教学方法、考核标准、实习指导\n\n**报名优惠**\n\n早鸟优惠：2月15日前报名享受9折优惠\n团体报名：3人以上团体报名享受8.5折优惠\n老学员推荐：成功推荐新学员可获得500元奖励\n\n**联系方式**\n报名热线：400-123-4567\n在线咨询：www.efly.com\n报名地址：北京市朝阳区航空大厦15层`,
    publishTime: '2024-01-20T09:15:00Z',
    category: '培训资讯',
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=spring%20drone%20training%20enrollment&image_size=landscape_4_3',
    link: '/enrollment',
    author: '易飞行教育',
    readCount: 12350,
    tags: ['培训招生', '课程介绍', '优惠活动'],
    relatedNews: ['news1', 'news5']
  },
  {
    id: 'news4',
    title: '无人机在农业领域的应用前景',
    summary: '随着技术的不断发展，无人机在农业植保、作物监测等领域展现出巨大潜力...',
    content: `随着科技的快速发展，无人机技术在农业领域的应用越来越广泛，为现代农业带来了革命性的变化。\n\n**植保作业**\n\n无人机植保是目前最成熟的应用领域之一。相比传统的人工喷洒，无人机植保具有以下优势：\n- 效率提升：每小时可作业60-80亩，是人工效率的30-40倍\n- 精准施药：GPS定位确保喷洒精度，减少农药浪费\n- 安全环保：避免人员接触农药，降低中毒风险\n- 成本节约：减少农药使用量20-30%\n\n**作物监测**\n\n通过搭载多光谱相机，无人机可以实现：\n- 作物长势监测：实时了解作物生长状况\n- 病虫害识别：早期发现并定位病虫害区域\n- 产量预估：通过图像分析预测作物产量\n- 土壤分析：监测土壤湿度和养分状况\n\n**市场前景**\n\n据农业部统计，2023年全国农用无人机保有量已超过15万架，作业面积达到18亿亩次。预计到2025年，农用无人机市场规模将达到500亿元。\n\n**发展趋势**\n\n未来农用无人机将朝着智能化、自动化方向发展：\n- AI技术融合：实现自主识别和精准作业\n- 集群作业：多机协同提高作业效率\n- 数据服务：提供农业大数据分析服务`,
    publishTime: '2024-01-18T16:45:00Z',
    category: '技术应用',
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=agricultural%20drone%20farming%20application&image_size=landscape_4_3',
    link: '/news/agriculture-application',
    author: '农业科技周刊',
    readCount: 6890,
    tags: ['农业应用', '植保无人机', '智慧农业'],
    relatedNews: ['news2', 'news1']
  },
  {
    id: 'news5',
    title: '考试通过率再创新高',
    summary: '易飞行教育学员在最近一期的民航局考试中取得优异成绩，通过率达到96%...',
    content: `易飞行教育再传佳音！在刚刚结束的2024年第一期民航局无人机操作员资格考试中，我校学员取得了优异成绩，通过率高达96%，再次刷新历史记录。\n\n**考试成绩统计**\n\n本期考试共有150名学员参加，其中：\n- VLOS视距内飞行：98名学员参考，96名通过，通过率98%\n- BVLOS超视距飞行：52名学员参考，48名通过，通过率92%\n\n**优秀学员表彰**\n\n以下学员在考试中表现突出：\n- 张明：理论考试满分，实操考试95分\n- 李华：连续三次模拟考试满分\n- 王强：从零基础到通过考试仅用时45天\n\n**成功经验分享**\n\n高通过率的背后是我们完善的教学体系：\n\n**1. 科学的课程设计**\n- 理论与实践相结合\n- 循序渐进的教学进度\n- 个性化辅导方案\n\n**2. 优秀的师资团队**\n- 民航局认证教员授课\n- 平均教学经验10年以上\n- 一对一实操指导\n\n**3. 完善的考前辅导**\n- 真题模拟训练\n- 考试技巧指导\n- 心理素质培养\n\n**4. 先进的教学设备**\n- 最新型号训练无人机\n- 专业飞行模拟器\n- 标准化考试场地\n\n我们将继续秉承"严谨教学、用心服务"的理念，为更多学员实现飞行梦想提供专业支持！`,
    publishTime: '2024-01-15T11:30:00Z',
    category: '教学成果',
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=exam%20success%20celebration%20students&image_size=landscape_4_3',
    link: '/news/exam-results',
    author: '易飞行教育',
    readCount: 9540,
    tags: ['考试成绩', '教学质量', '学员成就'],
    relatedNews: ['news3', 'news2']
   }
 ];
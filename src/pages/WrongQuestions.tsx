import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Clock, Target, TrendingUp, Filter, Search, RotateCcw, CheckCircle, AlertTriangle, Calendar, BarChart3, ChevronDown, X } from 'lucide-react';
import QuestionCard from '../components/QuestionCard';

interface WrongQuestion {
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
  wrongDate: string;
  wrongCount: number;
  userAnswer: string[];
  correctAnswer: string[];
  isReviewed: boolean;
  isMastered: boolean;
  lastReviewDate?: string;
  source: 'chapter' | 'mock' | 'practice';
  sourceDetail: string;
}

interface WrongQuestionStats {
  totalWrong: number;
  reviewed: number;
  mastered: number;
  needReview: number;
  bySubject: Record<string, number>;
  byDifficulty: Record<string, number>;
  recentWrong: number;
}

const WrongQuestions: React.FC = () => {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState<'overview' | 'categories' | 'practice' | 'detail'>('overview');
  const [wrongQuestions, setWrongQuestions] = useState<WrongQuestion[]>([]);
  const [filteredQuestions, setFilteredQuestions] = useState<WrongQuestion[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  // 练习模式状态管理
  const [practiceAnswers, setPracticeAnswers] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [practiceMode, setPracticeMode] = useState<'all' | 'category' | 'unmastered'>('all');
  const [stats, setStats] = useState<WrongQuestionStats | null>(null);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showDifficultyModal, setShowDifficultyModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);

  // 模拟错题数据
  const mockWrongQuestions: WrongQuestion[] = [
    {
      id: 'wrong_1',
      type: 'single',
      content: '根据《民用无人机驾驶员管理规定》，无人机驾驶员执照的有效期是多长时间？',
      options: [
        { id: 'a', text: '1年', isCorrect: false },
        { id: 'b', text: '2年', isCorrect: true },
        { id: 'c', text: '3年', isCorrect: false },
        { id: 'd', text: '5年', isCorrect: false }
      ],
      explanation: '根据相关规定，无人机驾驶员执照的有效期为2年，到期前需要进行续期申请。',
      knowledgePoint: '法律法规',
      difficulty: 'medium',
      score: 2,
      wrongDate: '2024-01-15',
      wrongCount: 2,
      userAnswer: ['a'],
      correctAnswer: ['b'],
      isReviewed: true,
      isMastered: false,
      lastReviewDate: '2024-01-20',
      source: 'mock',
      sourceDetail: 'VLOS模拟考试'
    },
    {
      id: 'wrong_2',
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
      wrongDate: '2024-01-18',
      wrongCount: 1,
      userAnswer: ['a', 'b'],
      correctAnswer: ['a', 'b', 'c', 'd'],
      isReviewed: false,
      isMastered: false,
      source: 'chapter',
      sourceDetail: '第三章 气象基础知识'
    },
    {
      id: 'wrong_3',
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
      wrongDate: '2024-01-22',
      wrongCount: 3,
      userAnswer: ['c'],
      correctAnswer: ['b'],
      isReviewed: true,
      isMastered: true,
      lastReviewDate: '2024-01-25',
      source: 'practice',
      sourceDetail: '安全操作专项练习'
    },
    {
      id: 'wrong_4',
      type: 'single',
      content: '无人机飞行时，最大飞行高度不得超过多少米？',
      options: [
        { id: 'a', text: '100米', isCorrect: false },
        { id: 'b', text: '120米', isCorrect: true },
        { id: 'c', text: '150米', isCorrect: false },
        { id: 'd', text: '200米', isCorrect: false }
      ],
      explanation: '根据民航局规定，无人机在隔离空域外飞行时，最大飞行高度不得超过120米。',
      knowledgePoint: '法律法规',
      difficulty: 'easy',
      score: 1,
      wrongDate: '2024-01-25',
      wrongCount: 1,
      userAnswer: ['a'],
      correctAnswer: ['b'],
      isReviewed: false,
      isMastered: false,
      source: 'mock',
      sourceDetail: 'BVLOS模拟考试'
    },
    {
      id: 'wrong_5',
      type: 'multiple',
      content: '无人机电池使用时需要注意哪些安全事项？',
      options: [
        { id: 'a', text: '避免过度充电', isCorrect: true },
        { id: 'b', text: '避免过度放电', isCorrect: true },
        { id: 'c', text: '避免高温环境', isCorrect: true },
        { id: 'd', text: '定期检查电池状态', isCorrect: true }
      ],
      explanation: '锂电池使用需要特别注意安全，包括避免过充过放、远离高温环境，并定期检查电池健康状态。',
      knowledgePoint: '设备维护',
      difficulty: 'medium',
      score: 2,
      wrongDate: '2024-01-26',
      wrongCount: 2,
      userAnswer: ['a', 'c'],
      correctAnswer: ['a', 'b', 'c', 'd'],
      isReviewed: false,
      isMastered: false,
      source: 'chapter',
      sourceDetail: '第五章 设备维护与保养'
    },
    {
      id: 'wrong_6',
      type: 'single',
      content: '无人机起飞前必须进行的检查项目不包括以下哪项？',
      options: [
        { id: 'a', text: '电池电量检查', isCorrect: false },
        { id: 'b', text: '螺旋桨检查', isCorrect: false },
        { id: 'c', text: 'GPS信号检查', isCorrect: false },
        { id: 'd', text: '保险购买确认', isCorrect: true }
      ],
      explanation: '起飞前检查主要包括设备状态检查，如电池、螺旋桨、GPS等，保险购买不是起飞前的必要检查项目。',
      knowledgePoint: '飞行操作',
      difficulty: 'medium',
      score: 2,
      wrongDate: '2024-01-28',
      wrongCount: 1,
      userAnswer: ['a'],
      correctAnswer: ['d'],
      isReviewed: true,
      isMastered: false,
      lastReviewDate: '2024-01-30',
      source: 'practice',
      sourceDetail: '飞行操作专项练习'
    },
    {
      id: 'wrong_7',
      type: 'single',
      content: '在城市上空飞行无人机需要满足什么条件？',
      options: [
        { id: 'a', text: '无需任何条件', isCorrect: false },
        { id: 'b', text: '获得相关部门批准', isCorrect: true },
        { id: 'c', text: '只需要执照', isCorrect: false },
        { id: 'd', text: '夜间飞行即可', isCorrect: false }
      ],
      explanation: '在城市等人口密集区域上空飞行无人机，必须获得相关管理部门的批准，确保飞行安全。',
      knowledgePoint: '法律法规',
      difficulty: 'hard',
      score: 3,
      wrongDate: '2024-01-29',
      wrongCount: 3,
      userAnswer: ['c'],
      correctAnswer: ['b'],
      isReviewed: false,
      isMastered: false,
      source: 'mock',
      sourceDetail: 'VLOS模拟考试'
    },
    {
      id: 'wrong_8',
      type: 'multiple',
      content: '影响无人机飞行稳定性的因素有哪些？',
      options: [
        { id: 'a', text: '风速', isCorrect: true },
        { id: 'b', text: '温度', isCorrect: true },
        { id: 'c', text: '湿度', isCorrect: true },
        { id: 'd', text: '气压', isCorrect: true }
      ],
      explanation: '无人机飞行稳定性受多种气象因素影响，包括风速、温度、湿度和气压等，都会影响飞行性能。',
      knowledgePoint: '气象知识',
      difficulty: 'hard',
      score: 3,
      wrongDate: '2024-01-30',
      wrongCount: 2,
      userAnswer: ['a', 'b'],
      correctAnswer: ['a', 'b', 'c', 'd'],
      isReviewed: false,
      isMastered: false,
      source: 'chapter',
      sourceDetail: '第三章 气象基础知识'
    }
  ];

  useEffect(() => {
    // 模拟加载错题数据
    setWrongQuestions(mockWrongQuestions);
    calculateStats(mockWrongQuestions);
  }, []);

  useEffect(() => {
    filterQuestions();
  }, [wrongQuestions, selectedCategory, selectedDifficulty, selectedStatus, searchQuery]);

  const calculateStats = (questions: WrongQuestion[]) => {
    const stats: WrongQuestionStats = {
      totalWrong: questions.length,
      reviewed: questions.filter(q => q.isReviewed).length,
      mastered: questions.filter(q => q.isMastered).length,
      needReview: questions.filter(q => !q.isMastered).length,
      bySubject: {},
      byDifficulty: {},
      recentWrong: questions.filter(q => {
        const wrongDate = new Date(q.wrongDate);
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return wrongDate >= weekAgo;
      }).length
    };

    // 按知识点统计
    questions.forEach(q => {
      stats.bySubject[q.knowledgePoint] = (stats.bySubject[q.knowledgePoint] || 0) + 1;
    });

    // 按难度统计
    questions.forEach(q => {
      stats.byDifficulty[q.difficulty] = (stats.byDifficulty[q.difficulty] || 0) + 1;
    });

    setStats(stats);
  };

  const filterQuestions = () => {
    let filtered = [...wrongQuestions];

    // 按分类筛选
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(q => q.knowledgePoint === selectedCategory);
    }

    // 按难度筛选
    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(q => q.difficulty === selectedDifficulty);
    }

    // 按状态筛选
    if (selectedStatus !== 'all') {
      if (selectedStatus === 'mastered') {
        filtered = filtered.filter(q => q.isMastered);
      } else if (selectedStatus === 'unmastered') {
        filtered = filtered.filter(q => !q.isMastered);
      } else if (selectedStatus === 'reviewed') {
        filtered = filtered.filter(q => q.isReviewed);
      } else if (selectedStatus === 'unreviewed') {
        filtered = filtered.filter(q => !q.isReviewed);
      }
    }

    // 按搜索关键词筛选
    if (searchQuery) {
      filtered = filtered.filter(q => 
        q.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.knowledgePoint.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredQuestions(filtered);
  };

  const handleQuestionStatusChange = (questionId: string, isMastered: boolean) => {
    setWrongQuestions(prev => 
      prev.map(q => 
        q.id === questionId 
          ? { ...q, isMastered, isReviewed: true, lastReviewDate: new Date().toISOString().split('T')[0] }
          : q
      )
    );
  };

  // 重置练习状态
  const resetPracticeState = () => {
    setPracticeAnswers([]);
    setIsSubmitted(false);
    setIsCorrect(null);
  };

  // 处理答案选择，选择后立即显示结果
  const handleAnswerChange = (answers: string[]) => {
    setPracticeAnswers(answers);
    
    if (answers.length > 0) {
      const currentQuestion = filteredQuestions[currentQuestionIndex];
      if (currentQuestion) {
        const correctAnswers = currentQuestion.correctAnswer;
        const isAnswerCorrect = 
          answers.length === correctAnswers.length &&
          answers.every(answer => correctAnswers.includes(answer));

        setIsCorrect(isAnswerCorrect);
        setIsSubmitted(true);
      }
    }
  };

  const startPractice = (mode: 'all' | 'category' | 'unmastered') => {
    setPracticeMode(mode);
    let practiceQuestions = [...wrongQuestions];
    
    // 在所有练习模式中都过滤掉已掌握的题目
    practiceQuestions = practiceQuestions.filter(q => !q.isMastered);
    
    if (mode === 'category' && selectedCategory !== 'all') {
      practiceQuestions = practiceQuestions.filter(q => q.knowledgePoint === selectedCategory);
    }
    // unmastered模式的过滤已经在上面统一处理了
    
    if (practiceQuestions.length > 0) {
      setFilteredQuestions(practiceQuestions);
      setCurrentQuestionIndex(0);
      setCurrentView('practice');
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (question: WrongQuestion) => {
    if (question.isMastered) return 'text-green-600 bg-green-100';
    if (question.isReviewed) return 'text-blue-600 bg-blue-100';
    return 'text-red-600 bg-red-100';
  };

  const getStatusText = (question: WrongQuestion) => {
    if (question.isMastered) return '已掌握';
    if (question.isReviewed) return '已复习';
    return '待复习';
  };

  const renderOverview = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6">
        {/* 头部 - 移动端优化 */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              onClick={() => navigate('/practice')}
              className="p-2 rounded-full bg-white shadow-sm hover:shadow-md transition-shadow flex-shrink-0"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
            </button>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 truncate">错题本</h1>
          </div>
        </div>

        {/* 统计卡片 - 移动端优化 */}
        {stats && (
          <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <div className="text-lg sm:text-2xl font-bold text-red-600 truncate">{stats.totalWrong}</div>
                  <div className="text-xs sm:text-sm text-gray-600">总错题数</div>
                </div>
                <AlertTriangle className="w-6 h-6 sm:w-8 sm:h-8 text-red-600 flex-shrink-0 ml-2" />
              </div>
            </div>
            
            <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <div className="text-lg sm:text-2xl font-bold text-green-600 truncate">{stats.mastered}</div>
                  <div className="text-xs sm:text-sm text-gray-600">已掌握</div>
                </div>
                <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 flex-shrink-0 ml-2" />
              </div>
            </div>
            
            <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <div className="text-lg sm:text-2xl font-bold text-blue-600 truncate">{stats.reviewed}</div>
                  <div className="text-xs sm:text-sm text-gray-600">已复习</div>
                </div>
                <RotateCcw className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 flex-shrink-0 ml-2" />
              </div>
            </div>
            
            <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <div className="text-lg sm:text-2xl font-bold text-orange-600 truncate">{stats.recentWrong}</div>
                  <div className="text-xs sm:text-sm text-gray-600">近7天新增</div>
                </div>
                <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-orange-600 flex-shrink-0 ml-2" />
              </div>
            </div>
          </div>
        )}

        {/* 知识点分布 - 移动端优化 */}
        {stats && (
          <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm mb-4 sm:mb-6">
            <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">错题分布</h2>
            <div className="space-y-2 sm:space-y-3">
              {Object.entries(stats.bySubject).map(([subject, count]) => {
                const percentage = Math.round((count / stats.totalWrong) * 100);
                return (
                  <div key={subject} className="flex items-center justify-between">
                    <span className="font-medium text-gray-800 text-sm sm:text-base truncate flex-shrink-0 mr-3">{subject}</span>
                    <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                      <div className="w-20 sm:w-32 bg-gray-200 rounded-full h-2 flex-shrink-0">
                        <div 
                          className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-xs sm:text-sm text-gray-600 w-8 sm:w-12 text-right flex-shrink-0">{count}题</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 快速操作 - 移动端优化 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <button
            onClick={() => startPractice('all')}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-5 rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl flex flex-col items-center justify-center min-h-[120px] text-center"
          >
            <Target className="w-8 h-8 mx-auto mb-3" />
            <div className="font-semibold mb-1 text-sm leading-tight">全部错题</div>
            <div className="text-xs opacity-90 leading-tight">复习所有错题</div>
          </button>
          
          <button
            onClick={() => startPractice('unmastered')}
            className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-5 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-200 shadow-lg hover:shadow-xl flex flex-col items-center justify-center min-h-[120px] text-center"
          >
            <AlertTriangle className="w-8 h-8 mx-auto mb-3" />
            <div className="font-semibold mb-1 text-sm leading-tight">未掌握</div>
            <div className="text-xs opacity-90 leading-tight">重点复习</div>
          </button>
          
          <button
            onClick={() => setCurrentView('categories')}
            className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-5 rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 shadow-lg hover:shadow-xl flex flex-col items-center justify-center min-h-[120px] text-center"
          >
            <BookOpen className="w-8 h-8 mx-auto mb-3" />
            <div className="font-semibold mb-1 text-sm leading-tight">分类练习</div>
            <div className="text-xs opacity-90 leading-tight">按知识点复习</div>
          </button>
        </div>

        {/* 最近错题 - 移动端优化 */}
        <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h2 className="text-base sm:text-lg font-semibold text-gray-800">最近错题</h2>
            <button
              onClick={() => setCurrentView('categories')}
              className="text-purple-600 hover:text-purple-700 text-xs sm:text-sm font-medium"
            >
              查看全部
            </button>
          </div>
          
          <div className="space-y-2 sm:space-y-3">
            {wrongQuestions.slice(0, 3).map((question) => (
              <div key={question.id} className="p-3 sm:p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-800 font-medium line-clamp-2 text-sm sm:text-base">{question.content}</p>
                    <div className="flex items-center flex-wrap gap-2 mt-2">
                      <span className="text-xs sm:text-sm text-purple-600 truncate">{question.knowledgePoint}</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${getDifficultyColor(question.difficulty)} flex-shrink-0`}>
                        {question.difficulty === 'easy' ? '简单' : 
                         question.difficulty === 'medium' ? '中等' : '困难'}
                      </span>
                      <span className={`px-3 py-1.5 rounded-full text-xs font-medium shadow-sm ${getStatusColor(question)} flex-shrink-0 border border-opacity-20`}>
                        {getStatusText(question)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderCategories = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      <div className="container mx-auto px-4 py-6">
        {/* 头部 */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setCurrentView('overview')}
              className="p-2 rounded-full bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h1 className="text-2xl font-bold text-gray-800">错题分类</h1>
          </div>
        </div>

        {/* 筛选器 */}
        <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
          {/* 搜索框 */}
          <div className="relative mb-4">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="搜索题目内容..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-base bg-gray-50 focus:bg-white transition-colors"
            />
          </div>
          
          {/* 筛选标签 */}
          <div className="flex flex-wrap gap-3">
            {/* 知识点筛选 */}
            <button
              onClick={() => setShowCategoryModal(true)}
              className="flex items-center space-x-2 px-4 py-2.5 bg-purple-50 border border-purple-200 rounded-xl text-purple-700 hover:bg-purple-100 transition-colors min-h-[44px]"
            >
              <span className="text-sm font-medium">
                {selectedCategory === 'all' ? '全部知识点' : selectedCategory}
              </span>
              <ChevronDown className="w-4 h-4" />
            </button>
            
            {/* 难度筛选 */}
            <button
              onClick={() => setShowDifficultyModal(true)}
              className="flex items-center space-x-2 px-4 py-2.5 bg-purple-50 border border-purple-200 rounded-xl text-purple-700 hover:bg-purple-100 transition-colors min-h-[44px]"
            >
              <span className="text-sm font-medium">
                {selectedDifficulty === 'all' ? '全部难度' : 
                 selectedDifficulty === 'easy' ? '简单' :
                 selectedDifficulty === 'medium' ? '中等' : '困难'}
              </span>
              <ChevronDown className="w-4 h-4" />
            </button>
            
            {/* 状态筛选 */}
            <button
              onClick={() => setShowStatusModal(true)}
              className="flex items-center space-x-2 px-4 py-2.5 bg-purple-50 border border-purple-200 rounded-xl text-purple-700 hover:bg-purple-100 transition-colors min-h-[44px]"
            >
              <span className="text-sm font-medium">
                {selectedStatus === 'all' ? '全部状态' :
                 selectedStatus === 'mastered' ? '已掌握' :
                 selectedStatus === 'reviewed' ? '已复习' :
                 selectedStatus === 'unreviewed' ? '待复习' : '未掌握'}
              </span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 知识点选择弹窗 */}
        {showCategoryModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
            <div className="bg-white w-full rounded-t-2xl p-6 max-h-[70vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">选择知识点</h3>
                <button
                  onClick={() => setShowCategoryModal(false)}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              <div className="space-y-2">
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setShowCategoryModal(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-colors ${
                    selectedCategory === 'all'
                      ? 'bg-purple-100 text-purple-700 border border-purple-200'
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  全部知识点
                </button>
                {stats && Object.keys(stats.bySubject).map(subject => (
                  <button
                    key={subject}
                    onClick={() => {
                      setSelectedCategory(subject);
                      setShowCategoryModal(false);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-colors ${
                      selectedCategory === subject
                        ? 'bg-purple-100 text-purple-700 border border-purple-200'
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    {subject}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 难度选择弹窗 */}
        {showDifficultyModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
            <div className="bg-white w-full rounded-t-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">选择难度</h3>
                <button
                  onClick={() => setShowDifficultyModal(false)}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              <div className="space-y-2">
                {[
                  { value: 'all', label: '全部难度' },
                  { value: 'easy', label: '简单' },
                  { value: 'medium', label: '中等' },
                  { value: 'hard', label: '困难' }
                ].map(option => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setSelectedDifficulty(option.value);
                      setShowDifficultyModal(false);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-colors ${
                      selectedDifficulty === option.value
                        ? 'bg-purple-100 text-purple-700 border border-purple-200'
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 状态选择弹窗 */}
        {showStatusModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
            <div className="bg-white w-full rounded-t-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">选择状态</h3>
                <button
                  onClick={() => setShowStatusModal(false)}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              <div className="space-y-2">
                {[
                  { value: 'all', label: '全部状态' },
                  { value: 'mastered', label: '已掌握' },
                  { value: 'reviewed', label: '已复习' },
                  { value: 'unreviewed', label: '待复习' },
                  { value: 'unmastered', label: '未掌握' }
                ].map(option => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setSelectedStatus(option.value);
                      setShowStatusModal(false);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-colors ${
                      selectedStatus === option.value
                        ? 'bg-purple-100 text-purple-700 border border-purple-200'
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 错题列表 */}
        <div className="space-y-4">
          {filteredQuestions.map((question, index) => (
            <div key={question.id} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-sm font-medium text-gray-500">第{index + 1}题</span>
                    <span className="text-sm text-purple-600">{question.knowledgePoint}</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${getDifficultyColor(question.difficulty)}`}>
                      {question.difficulty === 'easy' ? '简单' : 
                       question.difficulty === 'medium' ? '中等' : '困难'}
                    </span>
                    <span className={`px-3 py-1.5 rounded-full text-xs font-medium shadow-sm ${getStatusColor(question)} border border-opacity-20`}>
                      {getStatusText(question)}
                    </span>
                  </div>
                  
                  <p className="text-gray-800 font-medium mb-3">{question.content}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                    {question.options.map((option) => (
                      <div
                        key={option.id}
                        className={`p-3 rounded-lg border ${
                          question.correctAnswer.includes(option.id)
                            ? 'border-green-200 bg-green-50 text-green-700'
                            : question.userAnswer.includes(option.id)
                            ? 'border-red-200 bg-red-50 text-red-700'
                            : 'border-gray-200 bg-gray-50 text-gray-700'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{option.id.toUpperCase()}.</span>
                          <span>{option.text}</span>
                          {question.correctAnswer.includes(option.id) && (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          )}
                          {question.userAnswer.includes(option.id) && !question.correctAnswer.includes(option.id) && (
                            <AlertTriangle className="w-4 h-4 text-red-600" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {question.explanation && (
                    <div className="p-4 bg-blue-50 rounded-lg mb-4">
                      <div className="flex items-start space-x-2">
                        <BookOpen className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="text-sm font-medium text-blue-800 mb-1">解析</div>
                          <p className="text-sm text-blue-700">{question.explanation}</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center space-x-4">
                      <span>错误次数: {question.wrongCount}</span>
                      <span>来源: {question.sourceDetail}</span>
                      <span>错误日期: {question.wrongDate}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* 操作按钮 */}
              <div className="flex items-center justify-end space-x-3">
                {!question.isMastered && (
                  <button
                    onClick={() => handleQuestionStatusChange(question.id, true)}
                    className="px-4 py-2.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-200 text-sm font-medium shadow-md hover:shadow-lg transform hover:scale-105"
                  >
                    标记为已掌握
                  </button>
                )}
                

              </div>
            </div>
          ))}
        </div>
        
        {filteredQuestions.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">暂无符合条件的错题</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderPractice = () => {
    const currentQuestion = filteredQuestions[currentQuestionIndex];
    if (!currentQuestion) return null;

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
        <div className="container mx-auto px-4 py-6">
          {/* 练习头部 */}
          <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
            <div className="bg-white rounded-lg p-4 mb-6 border border-gray-200">
              {/* 顶部导航区域 */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setCurrentView('categories')}
                    className="flex items-center justify-center w-8 h-8 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <div>
                    <h1 className="text-lg font-semibold text-gray-900">错题练习</h1>
                    <span className="text-sm text-gray-500">
                      {currentQuestionIndex + 1} / {filteredQuestions.length}
                    </span>
                  </div>
                </div>
                
                {/* 状态标签和操作按钮 */}
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-md text-xs font-medium ${getStatusColor(currentQuestion)}`}>
                    {getStatusText(currentQuestion)}
                  </span>
                  
                  {/* 标记已掌握按钮 - 只在答案正确且未掌握时显示 */}
                  {!currentQuestion.isMastered && isCorrect === true && (
                    <button
                      onClick={() => {
                        handleQuestionStatusChange(currentQuestion.id, true);
                        // 如果当前题目被标记为已掌握，自动跳转到下一题
                        if (currentQuestionIndex < filteredQuestions.length - 1) {
                          setCurrentQuestionIndex(prev => prev + 1);
                          resetPracticeState();
                        } else {
                          // 如果是最后一题，返回分类页面
                          setCurrentView('categories');
                        }
                      }}
                      className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors text-xs font-medium flex items-center space-x-1"
                    >
                      <CheckCircle className="w-3 h-3" />
                      <span>已掌握</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* 题目卡片 */}
          <QuestionCard
            question={currentQuestion}
            selectedAnswers={practiceAnswers}
            onAnswerChange={handleAnswerChange}
            onPrevious={currentQuestionIndex > 0 ? () => {
              setCurrentQuestionIndex(prev => prev - 1);
              resetPracticeState();
            } : undefined}
            onNext={currentQuestionIndex < filteredQuestions.length - 1 ? () => {
              setCurrentQuestionIndex(prev => prev + 1);
              resetPracticeState();
            } : undefined}
            currentIndex={currentQuestionIndex}
            totalQuestions={filteredQuestions.length}
            showExplanation={isSubmitted}
            showCorrectAnswer={isSubmitted}
          />



        </div>
      </div>
    );
  };

  switch (currentView) {
    case 'overview':
      return renderOverview();
    case 'categories':
      return renderCategories();
    case 'practice':
      return renderPractice();
    default:
      return renderOverview();
  }
};

export default WrongQuestions;
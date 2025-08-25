import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, RotateCcw, Target, Clock, CheckCircle, BookOpen, BarChart3 } from 'lucide-react';
import QuestionCard from '../components/QuestionCard';
import { useAppStore } from '@/store';

interface Chapter {
  id: string;
  title: string;
  description: string;
  totalQuestions: number;
  completedQuestions: number;
  correctRate: number;
  knowledgePoints: string[];
  difficulty: 'easy' | 'medium' | 'hard';
}

interface Question {
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
}

const ChapterPractice: React.FC = () => {
  const { chapterId } = useParams();
  const navigate = useNavigate();
  const { isLoggedIn } = useAppStore();
  const [currentView, setCurrentView] = useState<'list' | 'mode' | 'practice' | 'result'>('list');

  // 检查登录状态
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login', { 
        state: { from: location.pathname } 
      });
    }
  }, [isLoggedIn, navigate]);
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [practiceMode, setPracticeMode] = useState<'sequential' | 'random'>('sequential');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [timeElapsed, setTimeElapsed] = useState(0);

  // 模拟章节数据
  const chapters: Chapter[] = [
    {
      id: '1',
      title: '无人机基础知识',
      description: '了解无人机的基本构造、工作原理和分类',
      totalQuestions: 50,
      completedQuestions: 35,
      correctRate: 85,
      knowledgePoints: ['无人机构造', '飞行原理', '分类标准'],
      difficulty: 'easy'
    },
    {
      id: '2',
      title: '飞行安全规范',
      description: '掌握无人机飞行的安全操作规程和注意事项',
      totalQuestions: 40,
      completedQuestions: 20,
      correctRate: 78,
      knowledgePoints: ['安全规程', '禁飞区域', '应急处理'],
      difficulty: 'medium'
    },
    {
      id: '3',
      title: '法律法规',
      description: '学习无人机相关的法律法规和管理规定',
      totalQuestions: 60,
      completedQuestions: 10,
      correctRate: 92,
      knowledgePoints: ['民航法规', '管理规定', '处罚条例'],
      difficulty: 'hard'
    },
    {
      id: '4',
      title: '气象知识',
      description: '了解影响无人机飞行的气象因素',
      totalQuestions: 30,
      completedQuestions: 30,
      correctRate: 88,
      knowledgePoints: ['风力影响', '能见度', '天气系统'],
      difficulty: 'medium'
    }
  ];

  // 模拟题目数据
  const mockQuestions: Question[] = [
    {
      id: '1',
      type: 'single',
      content: '无人机的最大起飞重量不超过多少公斤时，属于轻小型无人机？',
      options: [
        { id: 'a', text: '7公斤', isCorrect: true },
        { id: 'b', text: '15公斤', isCorrect: false },
        { id: 'c', text: '25公斤', isCorrect: false },
        { id: 'd', text: '50公斤', isCorrect: false }
      ],
      explanation: '根据《民用无人机驾驶员管理规定》，最大起飞重量不超过7公斤的无人机属于轻小型无人机。',
      knowledgePoint: '无人机分类',
      difficulty: 'easy'
    },
    {
      id: '2',
      type: 'multiple',
      content: '无人机飞行前需要检查哪些项目？',
      options: [
        { id: 'a', text: '电池电量', isCorrect: true },
        { id: 'b', text: '螺旋桨状态', isCorrect: true },
        { id: 'c', text: '遥控器信号', isCorrect: true },
        { id: 'd', text: '天气条件', isCorrect: true }
      ],
      explanation: '飞行前检查是确保飞行安全的重要环节，需要全面检查设备状态和环境条件。',
      knowledgePoint: '飞行前检查',
      difficulty: 'medium'
    }
  ];

  useEffect(() => {
    if (chapterId) {
      const chapter = chapters.find(c => c.id === chapterId);
      if (chapter) {
        setSelectedChapter(chapter);
        setCurrentView('mode');
      }
    }
  }, [chapterId]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (startTime && currentView === 'practice') {
      interval = setInterval(() => {
        setTimeElapsed(Math.floor((Date.now() - startTime.getTime()) / 1000));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [startTime, currentView]);

  const handleChapterSelect = (chapter: Chapter) => {
    setSelectedChapter(chapter);
    setCurrentView('mode');
  };

  const handleStartPractice = () => {
    setQuestions(practiceMode === 'random' ? [...mockQuestions].sort(() => Math.random() - 0.5) : mockQuestions);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setStartTime(new Date());
    setCurrentView('practice');
  };

  const handleAnswerChange = (questionId: string, selectedAnswers: string[]) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: selectedAnswers
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setCurrentView('result');
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach(question => {
      const userAnswers = answers[question.id] || [];
      const correctAnswers = question.options.filter(opt => opt.isCorrect).map(opt => opt.id);
      
      if (userAnswers.length === correctAnswers.length && 
          userAnswers.every(ans => correctAnswers.includes(ans))) {
        correct++;
      }
    });
    return Math.round((correct / questions.length) * 100);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const renderChapterList = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      <div className="container mx-auto px-4 py-6">
        {/* 头部 */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigate('/practice')}
              className="p-2 rounded-full bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h1 className="text-2xl font-bold text-gray-800">章节练习</h1>
          </div>
        </div>

        {/* 章节列表 */}
        <div className="grid gap-4">
          {chapters.map((chapter) => {
            const progress = (chapter.completedQuestions / chapter.totalQuestions) * 100;
            return (
              <div
                key={chapter.id}
                onClick={() => handleChapterSelect(chapter)}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer border border-gray-100"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{chapter.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{chapter.description}</p>
                    
                    {/* 知识点标签 */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {chapter.knowledgePoints.map((point, index) => (
                        <span key={index} className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                          {point}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(chapter.difficulty)}`}>
                    {chapter.difficulty === 'easy' ? '简单' : 
                     chapter.difficulty === 'medium' ? '中等' : '困难'}
                  </span>
                </div>

                {/* 进度信息 */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">学习进度</span>
                    <span className="font-medium text-gray-800">
                      {chapter.completedQuestions}/{chapter.totalQuestions} 题
                    </span>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="text-gray-600">正确率: 
                        <span className="font-medium text-green-600 ml-1">{chapter.correctRate}%</span>
                      </span>
                    </div>
                    <span className="text-purple-600 font-medium text-sm">{Math.round(progress)}% 完成</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderModeSelection = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      <div className="container mx-auto px-4 py-6">
        {/* 头部 */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setCurrentView('list')}
              className="p-2 rounded-full bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h1 className="text-2xl font-bold text-gray-800">{selectedChapter?.title}</h1>
          </div>
        </div>

        {/* 章节信息卡片 */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <p className="text-gray-600 mb-4">{selectedChapter?.description}</p>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{selectedChapter?.totalQuestions}</div>
              <div className="text-sm text-gray-600">总题数</div>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{selectedChapter?.correctRate}%</div>
              <div className="text-sm text-gray-600">正确率</div>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{selectedChapter?.completedQuestions}</div>
              <div className="text-sm text-gray-600">已完成</div>
            </div>
          </div>
        </div>

        {/* 练习模式选择 */}
        <div className="space-y-4 mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">选择练习模式</h2>
          
          <div 
            onClick={() => setPracticeMode('sequential')}
            className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
              practiceMode === 'sequential' 
                ? 'border-purple-500 bg-purple-50' 
                : 'border-gray-200 bg-white hover:border-purple-300'
            }`}
          >
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-full ${
                practiceMode === 'sequential' ? 'bg-purple-500 text-white' : 'bg-gray-100 text-gray-600'
              }`}>
                <Play className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 mb-1">顺序练习</h3>
                <p className="text-gray-600 text-sm">按照题目顺序依次练习，适合系统学习</p>
              </div>
            </div>
          </div>

          <div 
            onClick={() => setPracticeMode('random')}
            className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
              practiceMode === 'random' 
                ? 'border-purple-500 bg-purple-50' 
                : 'border-gray-200 bg-white hover:border-purple-300'
            }`}
          >
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-full ${
                practiceMode === 'random' ? 'bg-purple-500 text-white' : 'bg-gray-100 text-gray-600'
              }`}>
                <RotateCcw className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 mb-1">随机练习</h3>
                <p className="text-gray-600 text-sm">随机打乱题目顺序，增加练习难度</p>
              </div>
            </div>
          </div>
        </div>

        {/* 开始练习按钮 */}
        <button
          onClick={handleStartPractice}
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          开始练习
        </button>
      </div>
    </div>
  );

  const renderPractice = () => {
    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion) return null;

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
        <div className="container mx-auto px-4 py-6">
          {/* 头部 */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setCurrentView('mode')}
                className="p-2 rounded-full bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <h1 className="text-xl font-bold text-gray-800">章节练习</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600 bg-white px-3 py-1 rounded-full">
                用时: {formatTime(timeElapsed)}
              </div>
              <div className="text-sm text-purple-600 bg-white px-3 py-1 rounded-full font-medium">
                {currentQuestionIndex + 1} / {questions.length}
              </div>
            </div>
          </div>

          {/* 进度条 */}
          <div className="mb-6">
            <div className="w-full bg-white rounded-full h-2 shadow-inner">
              <div 
                className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* 题目卡片 */}
          <QuestionCard
            question={currentQuestion}
            selectedAnswers={answers[currentQuestion.id] || []}
            onAnswerChange={(selectedAnswers) => handleAnswerChange(currentQuestion.id, selectedAnswers)}
            onPrevious={currentQuestionIndex > 0 ? handlePreviousQuestion : undefined}
            onNext={handleNextQuestion}
            currentIndex={currentQuestionIndex}
            totalQuestions={questions.length}
          />
        </div>
      </div>
    );
  };

  const renderResult = () => {
    const score = calculateScore();
    const correctCount = Math.round((score / 100) * questions.length);
    const wrongCount = questions.length - correctCount;

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
        <div className="container mx-auto px-4 py-6">
          {/* 成绩卡片 */}
          <div className="bg-white rounded-xl p-8 shadow-lg mb-6 text-center">
            <div className="mb-6">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-gray-800 mb-2">练习完成！</h1>
              <p className="text-gray-600">恭喜你完成了本次章节练习</p>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="p-4 bg-purple-50 rounded-lg">
                <div className="text-3xl font-bold text-purple-600 mb-1">{score}%</div>
                <div className="text-sm text-gray-600">总分</div>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="text-3xl font-bold text-blue-600 mb-1">{formatTime(timeElapsed)}</div>
                <div className="text-sm text-gray-600">用时</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center">
                <div className="text-xl font-bold text-gray-800">{questions.length}</div>
                <div className="text-sm text-gray-600">总题数</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-green-600">{correctCount}</div>
                <div className="text-sm text-gray-600">正确</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-red-600">{wrongCount}</div>
                <div className="text-sm text-gray-600">错误</div>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => setCurrentView('mode')}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all duration-200"
              >
                再次练习
              </button>
              <button
                onClick={() => navigate('/practice')}
                className="w-full border border-purple-600 text-purple-600 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-all duration-200"
              >
                返回练习中心
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  switch (currentView) {
    case 'list':
      return renderChapterList();
    case 'mode':
      return renderModeSelection();
    case 'practice':
      return renderPractice();
    case 'result':
      return renderResult();
    default:
      return renderChapterList();
  }
};

export default ChapterPractice;
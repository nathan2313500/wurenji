import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, BookOpen, Target, Clock, Award, AlertCircle, CheckCircle, BarChart3, Filter, ChevronDown, Play, RotateCcw, ChevronRight } from 'lucide-react';
import QuestionCard from '../components/QuestionCard';

interface RealExam {
  id: string;
  year: number;
  name: string;
  description: string;
  totalQuestions: number;
  difficulty: 'easy' | 'medium' | 'hard';
  subjects: string[];
  examDate: string;
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
  detailedExplanation?: string; // 详细讲解
  knowledgePoint: string;
  knowledgeExtension?: string; // 知识点扩展
  difficulty: 'easy' | 'medium' | 'hard';
  score: number;
  relatedQuestions?: string[]; // 相关题目
}

interface PracticeResult {
  totalScore: number;
  correctAnswers: number;
  totalQuestions: number;
  timeUsed: number;
  wrongQuestions: Question[];
  subjectScores: Record<string, { correct: number; total: number }>;
}

const RealExamPractice: React.FC = () => {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState<'exams' | 'mode' | 'practice' | 'result'>('exams');
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedExam, setSelectedExam] = useState<RealExam | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [practiceResult, setPracticeResult] = useState<PracticeResult | null>(null);

  const [practiceMode, setPracticeMode] = useState<'sequential' | 'random'>('sequential');



  // 模拟真题数据
  const realExams: Record<number, RealExam[]> = {
    2024: [
      {
        id: '2024_spring',
        year: 2024,
        name: '2024年春季无人机驾驶员考试',
        description: '2024年3月全国统一考试真题',
        totalQuestions: 60,
        difficulty: 'medium',
        subjects: ['法律法规', '飞行原理', '气象知识', '安全操作'],
        examDate: '2024-03-15'
      },
      {
        id: '2024_autumn',
        year: 2024,
        name: '2024年秋季无人机驾驶员考试',
        description: '2024年9月全国统一考试真题',
        totalQuestions: 60,
        difficulty: 'medium',
        subjects: ['法律法规', '飞行原理', '气象知识', '安全操作'],
        examDate: '2024-09-20'
      }
    ],
    2023: [
      {
        id: '2023_spring',
        year: 2023,
        name: '2023年春季无人机驾驶员考试',
        description: '2023年3月全国统一考试真题',
        totalQuestions: 60,
        difficulty: 'medium',
        subjects: ['法律法规', '飞行原理', '气象知识', '安全操作'],
        examDate: '2023-03-18'
      }
    ]
  };

  // 模拟真题题目数据
  const mockRealQuestions: Question[] = [
    {
      id: 'real_1',
      type: 'single',
      content: '根据《民用无人机驾驶员管理规定》，无人机驾驶员执照的有效期是多长时间？',
      options: [
        { id: 'a', text: '1年', isCorrect: false },
        { id: 'b', text: '2年', isCorrect: true },
        { id: 'c', text: '3年', isCorrect: false },
        { id: 'd', text: '5年', isCorrect: false }
      ],
      explanation: '根据相关规定，无人机驾驶员执照的有效期为2年。',
      detailedExplanation: '《民用无人机驾驶员管理规定》第十五条明确规定：民用无人机驾驶员执照有效期为2年。执照持有人应当在执照有效期届满前90日内向民航局申请重新颁发执照。重新颁发执照需要满足相应的飞行经历要求和理论考试要求。',
      knowledgePoint: '法律法规',
      knowledgeExtension: '执照管理还包括：1）执照等级分类；2）执照申请条件；3）执照考试要求；4）执照更新程序；5）执照暂停和吊销情形。',
      difficulty: 'medium',
      score: 2,
      relatedQuestions: ['real_2', 'real_3']
    },
    {
      id: 'real_2',
      type: 'single',
      content: '无人机在飞行过程中遇到强风天气，应该采取什么措施？',
      options: [
        { id: 'a', text: '继续飞行', isCorrect: false },
        { id: 'b', text: '立即降落', isCorrect: true },
        { id: 'c', text: '增加飞行高度', isCorrect: false },
        { id: 'd', text: '加速飞行', isCorrect: false }
      ],
      explanation: '遇到强风天气时，应立即寻找安全地点降落，确保飞行安全。',
      detailedExplanation: '强风天气对无人机飞行安全构成严重威胁：1）风速过大会影响无人机的操控性能；2）阵风可能导致无人机失控；3）侧风会影响无人机的航向稳定性。正确的应对措施是：立即评估风力情况，选择合适的降落点，采用迎风降落方式，确保人员和设备安全。',
      knowledgePoint: '安全操作',
      knowledgeExtension: '恶劣天气飞行安全还需要了解：1）风力等级对飞行的影响；2）不同天气条件下的飞行限制；3）应急降落程序；4）天气预报的解读方法。',
      difficulty: 'easy',
      score: 1
    },
    {
      id: 'real_3',
      type: 'multiple',
      content: '无人机飞行前的天气评估应包括哪些要素？',
      options: [
        { id: 'a', text: '风速风向', isCorrect: true },
        { id: 'b', text: '能见度', isCorrect: true },
        { id: 'c', text: '降水情况', isCorrect: true },
        { id: 'd', text: '温度湿度', isCorrect: true }
      ],
      explanation: '飞行前天气评估需要全面考虑各种气象要素对飞行安全的影响。',
      detailedExplanation: '完整的天气评估体系包括：1）风速风向：影响无人机的操控和航线规划；2）能见度：决定视距内飞行的可行性；3）降水情况：雨雪天气会影响设备性能和飞行安全；4）温度湿度：影响电池性能和设备工作状态；5）气压变化：影响高度测量精度；6）雷电活动：存在设备损坏风险。',
      knowledgePoint: '气象知识',
      knowledgeExtension: '气象知识体系还包括：1）天气图的识读；2）气象预报的获取渠道；3）局地天气特征；4）季节性天气规律；5）极端天气的识别和应对。',
      difficulty: 'medium',
      score: 3
    }
  ];



  const handleExamSelect = (exam: RealExam) => {
    setSelectedExam(exam);
    setCurrentView('mode');
  };

  const handleStartPractice = () => {
    if (!selectedExam) return;
    
    // 生成练习题目
    let practiceQuestions = Array.from({ length: selectedExam.totalQuestions }, (_, index) => ({
      ...mockRealQuestions[index % mockRealQuestions.length],
      id: `${selectedExam.id}_${index + 1}`
    }));
    
    // 如果是随机模式，打乱题目顺序
    if (practiceMode === 'random') {
      practiceQuestions = practiceQuestions.sort(() => Math.random() - 0.5);
    }
    
    setQuestions(practiceQuestions);
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

  const handleQuestionJump = (index: number) => {
    setCurrentQuestionIndex(index);
  };

  const handlePracticeFinish = () => {
    const result = calculatePracticeResult();
    setPracticeResult(result);
    setCurrentView('result');
  };

  const calculatePracticeResult = (): PracticeResult => {
    let correctAnswers = 0;
    let totalScore = 0;
    const wrongQuestions: Question[] = [];
    const subjectScores: Record<string, { correct: number; total: number }> = {};

    questions.forEach(question => {
      const userAnswers = answers[question.id] || [];
      const correctOptions = question.options.filter(opt => opt.isCorrect).map(opt => opt.id);
      
      // 初始化科目统计
      if (!subjectScores[question.knowledgePoint]) {
        subjectScores[question.knowledgePoint] = { correct: 0, total: 0 };
      }
      subjectScores[question.knowledgePoint].total++;

      const isCorrect = userAnswers.length === correctOptions.length && 
        userAnswers.every(answer => correctOptions.includes(answer));

      if (isCorrect) {
        correctAnswers++;
        totalScore += question.score;
        subjectScores[question.knowledgePoint].correct++;
      } else {
        wrongQuestions.push(question);
      }
    });

    const timeUsed = startTime ? Math.floor((Date.now() - startTime.getTime()) / 1000) : 0;

    return {
      totalScore,
      correctAnswers,
      totalQuestions: questions.length,
      timeUsed,
      wrongQuestions,
      subjectScores
    };
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-orange-600 bg-orange-100';
      case 'hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };



  // 真题列表界面
  const renderExamList = () => {
    // 获取所有年份并排序
    const years = Object.keys(realExams).map(Number).sort((a, b) => b - a);
    
    return (
      <div className="min-h-screen bg-gray-50">
        {/* 头部导航 */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 flex items-center">
          <button onClick={() => navigate('/practice')} className="mr-4">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-semibold">真题训练</h1>
        </div>

        {/* 真题列表 - 按年份分组 */}
        <div className="p-4 space-y-6">
          {years.map(year => (
            <div key={year} className="space-y-4">
              <h2 className="text-lg font-bold text-gray-800 flex items-center">
                <Calendar className="w-5 h-5 text-orange-500 mr-2" />
                {year}年真题
              </h2>
              
              {realExams[year].map((exam, index) => (
                <div
                  key={index}
                  onClick={() => handleExamSelect(exam)}
                  className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-semibold text-gray-800">{exam.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs ${getDifficultyColor(exam.difficulty)}`}>
                      {exam.difficulty === 'easy' ? '简单' : exam.difficulty === 'medium' ? '中等' : '困难'}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Clock className="w-4 h-4 mr-1" />
                    <span className="mr-3">考试日期: {exam.examDate}</span>
                    <BookOpen className="w-4 h-4 mr-1" />
                    <span>题量: {exam.totalQuestions}题</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-2">
                      {exam.subjects.map((subject, idx) => (
                        <span key={idx} className="bg-orange-50 text-orange-600 px-2 py-1 rounded-md text-xs">
                          {subject}
                        </span>
                      ))}
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // 练习界面
  const renderPractice = () => {
    if (!selectedExam || questions.length === 0) return null;
    
    const currentQuestion = questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    
    return (
      <div className="min-h-screen bg-gray-50">
        {/* 头部 */}
        <div className="bg-white border-b px-4 py-3 sticky top-0 z-10">
          <div className="flex items-center justify-between mb-2">
            <button onClick={() => setCurrentView('mode')}>
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
            <div className="text-center">
              <div className="text-sm font-medium text-gray-800">
                {currentQuestionIndex + 1}/{questions.length}
              </div>
              <div className="text-xs text-gray-500">{selectedExam.name}</div>
            </div>
            <button
              onClick={handlePracticeFinish}
              className="px-3 py-1 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors"
            >
              完成练习
            </button>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* 题目内容 */}
        <div className="p-4">
          <QuestionCard
            question={currentQuestion}
            selectedAnswers={answers[currentQuestion.id] || []}
            onAnswerChange={(answers) => handleAnswerChange(currentQuestion.id, answers)}
            onPrevious={currentQuestionIndex > 0 ? () => setCurrentQuestionIndex(prev => prev - 1) : undefined}
            onNext={currentQuestionIndex < questions.length - 1 ? () => setCurrentQuestionIndex(prev => prev + 1) : undefined}
            showExplanation={false}
          />
        </div>
      </div>
    );
  };

  // 模式选择界面
  const renderModeSelection = () => {
    if (!selectedExam) return null;
    
    return (
      <div className="min-h-screen bg-gray-50">
        {/* 头部 */}
        <div className="bg-gradient-to-br from-orange-500 to-orange-700 px-4 pt-12 pb-6">
          <div className="flex items-center mb-4">
            <button onClick={() => setCurrentView('exams')} className="mr-3">
              <ArrowLeft className="w-6 h-6 text-white" />
            </button>
            <h1 className="text-white text-xl font-bold">{selectedExam.name}</h1>
          </div>
          <p className="text-orange-100 text-sm">选择练习模式开始真题训练</p>
        </div>

        <div className="px-4 py-6">
          {/* 考试信息卡片 */}
          <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
            <p className="text-gray-600 mb-4">{selectedExam.description}</p>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-3 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">{selectedExam.totalQuestions}</div>
                <div className="text-sm text-gray-600">总题数</div>
              </div>
              <div className="p-3 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">{selectedExam.difficulty === 'easy' ? '简单' : selectedExam.difficulty === 'medium' ? '中等' : '困难'}</div>
                <div className="text-sm text-gray-600">难度</div>
              </div>
              <div className="p-3 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">{selectedExam.subjects.length}</div>
                <div className="text-sm text-gray-600">科目数</div>
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
                  ? 'border-orange-500 bg-orange-50' 
                  : 'border-gray-200 bg-white hover:border-orange-300'
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-full ${
                  practiceMode === 'sequential' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600'
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
                  ? 'border-orange-500 bg-orange-50' 
                  : 'border-gray-200 bg-white hover:border-orange-300'
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-full ${
                  practiceMode === 'random' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600'
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
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            开始练习
          </button>
        </div>
      </div>
    );
  };

  // 结果界面
  const renderResult = () => {
    if (!practiceResult || !selectedExam) return null;
    
    const accuracy = Math.round((practiceResult.correctAnswers / practiceResult.totalQuestions) * 100);
    
    return (
      <div className="min-h-screen bg-gray-50">
        {/* 头部 */}
        <div className="bg-gradient-to-br from-orange-500 to-orange-700 px-4 pt-12 pb-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-white text-xl font-bold mb-2">练习完成</h1>
            <p className="text-orange-100 text-sm">{selectedExam.name}</p>
          </div>
        </div>

        {/* 成绩统计 */}
        <div className="px-4 py-6">
          <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-orange-600">{accuracy}%</div>
                <div className="text-gray-500 text-sm">正确率</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800">{practiceResult.correctAnswers}</div>
                <div className="text-gray-500 text-sm">答对题数</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800">{formatTime(practiceResult.timeUsed)}</div>
                <div className="text-gray-500 text-sm">用时</div>
              </div>
            </div>
          </div>

          {/* 科目统计 */}
          <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-orange-500" />
              科目统计
            </h3>
            <div className="space-y-3">
              {Object.entries(practiceResult.subjectScores).map(([subject, score]) => {
                const subjectAccuracy = Math.round((score.correct / score.total) * 100);
                return (
                  <div key={subject} className="flex items-center justify-between">
                    <span className="text-gray-700">{subject}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">{score.correct}/{score.total}</span>
                      <span className={`text-sm font-medium ${
                        subjectAccuracy >= 80 ? 'text-green-600' : 
                        subjectAccuracy >= 60 ? 'text-orange-600' : 'text-red-600'
                      }`}>
                        {subjectAccuracy}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 错题统计 */}
          {practiceResult.wrongQuestions.length > 0 && (
            <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                <AlertCircle className="w-5 h-5 mr-2 text-red-500" />
                错题分析 ({practiceResult.wrongQuestions.length}题)
              </h3>
              <div className="space-y-3">
                {practiceResult.wrongQuestions.slice(0, 3).map((question, index) => (
                  <div key={question.id} className="border-l-4 border-red-500 pl-3">
                    <div className="text-sm font-medium text-gray-800 mb-1">
                      第{questions.findIndex(q => q.id === question.id) + 1}题
                    </div>
                    <div className="text-sm text-gray-600 line-clamp-2">
                      {question.content}
                    </div>
                    <div className="flex items-center space-x-2 mt-2">
                      <span className="px-2 py-1 bg-red-100 text-red-600 rounded-full text-xs">
                        {question.knowledgePoint}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs ${getDifficultyColor(question.difficulty)}`}>
                        {question.difficulty === 'easy' ? '简单' : question.difficulty === 'medium' ? '中等' : '困难'}
                      </span>
                    </div>
                  </div>
                ))}
                {practiceResult.wrongQuestions.length > 3 && (
                  <div className="text-center text-sm text-gray-500">
                    还有 {practiceResult.wrongQuestions.length - 3} 道错题...
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 操作按钮 */}
          <div className="space-y-3">
            <button
              onClick={() => {
                setCurrentView('exams');
                setSelectedYear(null);
                setSelectedExam(null);
                setPracticeResult(null);
              }}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-xl font-medium hover:from-orange-600 hover:to-orange-700 transition-all"
            >
              继续练习
            </button>
            <button
              onClick={() => navigate('/practice')}
              className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-200 transition-all"
            >
              返回练习中心
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {currentView === 'exams' && renderExamList()}
      {currentView === 'mode' && renderModeSelection()}
      {currentView === 'practice' && renderPractice()}
      {currentView === 'result' && renderResult()}
    </div>
  );
};

export default RealExamPractice;
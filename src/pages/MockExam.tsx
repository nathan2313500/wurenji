import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, FileText, Award, AlertCircle, CheckCircle, Target, BarChart3, Download, BookOpen, Grid3X3 } from 'lucide-react';
import QuestionCard from '../components/QuestionCard';

interface ExamType {
  id: string;
  name: string;
  description: string;
  duration: number; // 分钟
  totalQuestions: number;
  passingScore: number;
  difficulty: 'easy' | 'medium' | 'hard';
  subjects: string[];
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
  score: number;
}

interface ExamResult {
  totalScore: number;
  passingScore: number;
  isPassed: boolean;
  timeUsed: number;
  subjectScores: Record<string, { correct: number; total: number; score: number }>;
  wrongQuestions: Question[];
}

const MockExam: React.FC = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState<'types' | 'rules' | 'exam' | 'result'>('types');
  const [selectedExam, setSelectedExam] = useState<ExamType | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [examResult, setExamResult] = useState<ExamResult | null>(null);
  const [showAnswerSheet, setShowAnswerSheet] = useState(false);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);

  // 模拟考试类型数据
  const examTypes: ExamType[] = [
    {
      id: 'vlos',
      name: 'VLOS视距内驾驶员',
      description: '适用于在视距内操作无人机的驾驶员',
      duration: 60,
      totalQuestions: 60,
      passingScore: 70,
      difficulty: 'medium',
      subjects: ['法律法规', '飞行原理', '气象知识', '安全操作']
    },
    {
      id: 'bvlos',
      name: 'BVLOS超视距驾驶员',
      description: '适用于超视距操作无人机的驾驶员',
      duration: 90,
      totalQuestions: 80,
      passingScore: 80,
      difficulty: 'hard',
      subjects: ['法律法规', '飞行原理', '气象知识', '安全操作', '通信导航', '应急处置']
    },
    {
      id: 'instructor',
      name: '教员资格考试',
      description: '适用于无人机培训教员资格认证',
      duration: 120,
      totalQuestions: 100,
      passingScore: 85,
      difficulty: 'hard',
      subjects: ['法律法规', '飞行原理', '气象知识', '安全操作', '教学理论', '培训管理']
    }
  ];

  // 模拟题目数据
  const mockQuestions: Question[] = [
    {
      id: '1',
      type: 'single',
      content: '根据《民用无人机驾驶员管理规定》，无人机驾驶员执照的有效期是多长时间？',
      options: [
        { id: 'a', text: '1年', isCorrect: false },
        { id: 'b', text: '2年', isCorrect: true },
        { id: 'c', text: '3年', isCorrect: false },
        { id: 'd', text: '5年', isCorrect: false }
      ],
      explanation: '根据相关规定，无人机驾驶员执照的有效期为2年。',
      knowledgePoint: '法律法规',
      difficulty: 'medium',
      score: 2
    },
    {
      id: '2',
      type: 'single',
      content: '无人机在飞行过程中遇到强风天气，应该采取什么措施？',
      options: [
        { id: 'a', text: '继续飞行', isCorrect: false },
        { id: 'b', text: '立即降落', isCorrect: true },
        { id: 'c', text: '增加飞行高度', isCorrect: false },
        { id: 'd', text: '加速飞行', isCorrect: false }
      ],
      explanation: '遇到强风天气时，应立即寻找安全地点降落，确保飞行安全。',
      knowledgePoint: '安全操作',
      difficulty: 'easy',
      score: 1
    },
    {
      id: '3',
      type: 'multiple',
      content: '无人机飞行前的天气评估应包括哪些要素？',
      options: [
        { id: 'a', text: '风速风向', isCorrect: true },
        { id: 'b', text: '能见度', isCorrect: true },
        { id: 'c', text: '降水情况', isCorrect: true },
        { id: 'd', text: '温度湿度', isCorrect: true }
      ],
      explanation: '飞行前天气评估需要全面考虑各种气象要素对飞行安全的影响。',
      knowledgePoint: '气象知识',
      difficulty: 'medium',
      score: 3
    }
  ];

  useEffect(() => {
    if (examId) {
      const exam = examTypes.find(e => e.id === examId);
      if (exam) {
        setSelectedExam(exam);
        setCurrentView('rules');
      }
    }
  }, [examId]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timeRemaining > 0 && currentView === 'exam') {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            handleExamFinish();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timeRemaining, currentView]);

  const handleExamSelect = (exam: ExamType) => {
    setSelectedExam(exam);
    setCurrentView('rules');
  };

  const handleStartExam = () => {
    if (!selectedExam) return;
    
    // 生成考试题目（这里使用模拟数据，实际应该根据考试类型生成）
    const examQuestions = Array.from({ length: selectedExam.totalQuestions }, (_, index) => ({
      ...mockQuestions[index % mockQuestions.length],
      id: `exam_${index + 1}`
    }));
    
    setQuestions(examQuestions);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setTimeRemaining(selectedExam.duration * 60);
    setStartTime(new Date());
    setCurrentView('exam');
  };

  const handleAnswerChange = (questionId: string, selectedAnswers: string[]) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: selectedAnswers
    }));
  };

  const handleQuestionJump = (index: number) => {
    setCurrentQuestionIndex(index);
    setShowAnswerSheet(false);
  };

  const handleExamFinish = () => {
    const result = calculateExamResult();
    setExamResult(result);
    setCurrentView('result');
  };

  const handleSubmitClick = () => {
    setShowSubmitConfirm(true);
  };

  const handleConfirmSubmit = () => {
    setShowSubmitConfirm(false);
    handleExamFinish();
  };

  const handleCancelSubmit = () => {
    setShowSubmitConfirm(false);
  };

  const calculateExamResult = (): ExamResult => {
    let totalScore = 0;
    const subjectScores: Record<string, { correct: number; total: number; score: number }> = {};
    const wrongQuestions: Question[] = [];

    // 初始化科目分数
    selectedExam?.subjects.forEach(subject => {
      subjectScores[subject] = { correct: 0, total: 0, score: 0 };
    });

    questions.forEach(question => {
      const userAnswers = answers[question.id] || [];
      const correctAnswers = question.options.filter(opt => opt.isCorrect).map(opt => opt.id);
      
      const isCorrect = userAnswers.length === correctAnswers.length && 
                       userAnswers.every(ans => correctAnswers.includes(ans));
      
      const subject = question.knowledgePoint;
      if (subjectScores[subject]) {
        subjectScores[subject].total += question.score;
        if (isCorrect) {
          subjectScores[subject].correct += question.score;
          totalScore += question.score;
        } else {
          wrongQuestions.push(question);
        }
      }
    });

    // 计算各科目得分率
    Object.keys(subjectScores).forEach(subject => {
      const { correct, total } = subjectScores[subject];
      subjectScores[subject].score = total > 0 ? Math.round((correct / total) * 100) : 0;
    });

    const maxScore = questions.reduce((sum, q) => sum + q.score, 0);
    const finalScore = Math.round((totalScore / maxScore) * 100);
    const timeUsed = startTime ? Math.floor((Date.now() - startTime.getTime()) / 1000) : 0;

    return {
      totalScore: finalScore,
      passingScore: selectedExam?.passingScore || 70,
      isPassed: finalScore >= (selectedExam?.passingScore || 70),
      timeUsed,
      subjectScores,
      wrongQuestions
    };
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
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

  const getAnswerStatus = (questionIndex: number) => {
    const question = questions[questionIndex];
    const userAnswers = answers[question?.id] || [];
    return userAnswers.length > 0 ? 'answered' : 'unanswered';
  };

  const renderExamTypes = () => (
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
            <h1 className="text-2xl font-bold text-gray-800">模拟考试</h1>
          </div>
        </div>

        {/* 考试类型列表 */}
        <div className="grid gap-6">
          {examTypes.map((exam) => (
            <div
              key={exam.id}
              onClick={() => handleExamSelect(exam)}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer border border-gray-100"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{exam.name}</h3>
                  <p className="text-gray-600 mb-4">{exam.description}</p>
                  
                  {/* 科目展示 */}

                </div>
                

              </div>

              {/* 考试信息 */}
              <div className="grid grid-cols-4 gap-4 text-center">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <Clock className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                  <div className="text-sm font-medium text-blue-600">{exam.duration}分钟</div>
                  <div className="text-xs text-gray-600">考试时长</div>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <FileText className="w-5 h-5 text-green-600 mx-auto mb-1" />
                  <div className="text-sm font-medium text-green-600">{exam.totalQuestions}题</div>
                  <div className="text-xs text-gray-600">题目数量</div>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <Target className="w-5 h-5 text-yellow-600 mx-auto mb-1" />
                  <div className="text-sm font-medium text-yellow-600">{exam.passingScore}分</div>
                  <div className="text-xs text-gray-600">及格分数</div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderRules = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      <div className="container mx-auto px-4 py-6">
        {/* 头部 */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setCurrentView('types')}
              className="p-2 rounded-full bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h1 className="text-2xl font-bold text-gray-800">{selectedExam?.name}</h1>
          </div>
        </div>

        {/* 考试规则 */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <div className="flex items-center space-x-2 mb-4">
            <AlertCircle className="w-5 h-5 text-orange-600" />
            <h2 className="text-lg font-semibold text-gray-800">考试规则</h2>
          </div>
          
          <div className="space-y-4 text-gray-700">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0" />
              <p>考试时长：<span className="font-medium text-purple-600">{selectedExam?.duration}分钟</span>，时间到自动提交</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0" />
              <p>题目数量：<span className="font-medium text-purple-600">{selectedExam?.totalQuestions}题</span>，包含单选题和多选题</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0" />
              <p>及格分数：<span className="font-medium text-purple-600">{selectedExam?.passingScore}分</span>，达到及格线即可通过</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0" />
              <p>考试环境：全真模拟考试环境，支持答题卡快速跳转</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0" />
              <p>注意事项：考试过程中请保持网络连接稳定，避免刷新页面</p>
            </div>
          </div>
        </div>

        {/* 考试科目 */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">考试科目</h2>
          <div className="grid grid-cols-2 gap-3">
            {selectedExam?.subjects.map((subject, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                <BookOpen className="w-4 h-4 text-purple-600" />
                <span className="text-purple-700 font-medium">{subject}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 开始考试按钮 */}
        <div className="text-center">
          <button
            onClick={handleStartExam}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            开始考试
          </button>
          <p className="text-gray-600 text-sm mt-3">点击开始后将进入考试界面，请确保环境安静</p>
        </div>
      </div>
    </div>
  );

  const renderExam = () => {
    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion) return null;

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
        <div className="container mx-auto px-4 py-6">
          {/* 考试头部 */}
          <div className="bg-white rounded-xl p-4 md:p-6 shadow-md border border-gray-200 mb-6">
            {/* 标题和进度信息 */}
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-lg md:text-xl font-bold text-gray-900">{selectedExam?.name}</h1>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">
                      第 {currentQuestionIndex + 1} 题 / 共 {questions.length} 题
                    </span>
                  </div>
                </div>
                
                {/* 时间显示 */}
                <div className={`px-4 py-2 rounded-lg font-mono text-base font-semibold border-2 ${
                  timeRemaining < 300 
                    ? 'bg-red-50 text-red-700 border-red-200' 
                    : 'bg-blue-50 text-blue-700 border-blue-200'
                }`}>
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{formatTime(timeRemaining)}</span>
                  </div>
                </div>
              </div>
              
              {/* 按钮区域 */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setShowAnswerSheet(!showAnswerSheet)}
                  className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium text-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <span>答题卡</span>
                </button>
                <button
                  onClick={handleSubmitClick}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium text-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>提交试卷</span>
                </button>
              </div>
            </div>
          </div>

          {/* 答题卡弹窗 */}
          {showAnswerSheet && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-800">答题卡</h2>
                  <button
                    onClick={() => setShowAnswerSheet(false)}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    ×
                  </button>
                </div>
                
                <div className="grid grid-cols-10 gap-2">
                  {questions.map((_, index) => {
                    const status = getAnswerStatus(index);
                    return (
                      <button
                        key={index}
                        onClick={() => handleQuestionJump(index)}
                        className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                          index === currentQuestionIndex
                            ? 'bg-purple-600 text-white'
                            : status === 'answered'
                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {index + 1}
                      </button>
                    );
                  })}
                </div>
                
                <div className="flex items-center justify-between mt-6 pt-4 border-t">
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-green-100 rounded" />
                      <span>已答题</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-gray-100 rounded" />
                      <span>未答题</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleSubmitClick}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    提交试卷
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 提交确认对话框 */}
          {showSubmitConfirm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
                <div className="text-center mb-6">
                  <AlertCircle className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">确认提交试卷</h2>
                  <p className="text-gray-600">
                    确定要提交试卷吗？提交后将无法修改答案，系统将自动计算您的考试成绩。
                  </p>
                </div>
                
                <div className="flex space-x-3">
                  <button
                    onClick={handleCancelSubmit}
                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    取消
                  </button>
                  <button
                    onClick={handleConfirmSubmit}
                    className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                  >
                    确定提交
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 题目卡片 */}
          <QuestionCard
            question={currentQuestion}
            selectedAnswers={answers[currentQuestion.id] || []}
            onAnswerChange={(selectedAnswers) => handleAnswerChange(currentQuestion.id, selectedAnswers)}
            onPrevious={currentQuestionIndex > 0 ? () => setCurrentQuestionIndex(prev => prev - 1) : undefined}
            onNext={currentQuestionIndex < questions.length - 1 ? () => setCurrentQuestionIndex(prev => prev + 1) : handleExamFinish}
            currentIndex={currentQuestionIndex}
            totalQuestions={questions.length}
          />
        </div>
      </div>
    );
  };

  const renderResult = () => {
    if (!examResult) return null;

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
        <div className="container mx-auto px-4 py-6">
          {/* 成绩卡片 */}
          <div className="bg-white rounded-xl p-8 shadow-lg mb-6">
            <div className="text-center mb-8">
              {examResult.isPassed ? (
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              ) : (
                <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              )}
              
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                {examResult.isPassed ? '恭喜通过考试！' : '很遗憾，未通过考试'}
              </h1>
              <p className="text-gray-600">
                {examResult.isPassed ? '您已成功通过本次模拟考试' : '请继续学习后重新参加考试'}
              </p>
            </div>

            {/* 总分显示 */}
            <div className="text-center mb-8">
              <div className={`text-6xl font-bold mb-2 ${
                examResult.isPassed ? 'text-green-600' : 'text-red-600'
              }`}>
                {examResult.totalScore}
              </div>
              <div className="text-gray-600">总分 / 及格线: {examResult.passingScore}分</div>
            </div>

            {/* 考试统计 */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{questions.length}</div>
                <div className="text-sm text-gray-600">总题数</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {questions.length - examResult.wrongQuestions.length}
                </div>
                <div className="text-sm text-gray-600">正确题数</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{formatTime(examResult.timeUsed)}</div>
                <div className="text-sm text-gray-600">用时</div>
              </div>
            </div>

            {/* 各科目得分 */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">各科目得分</h3>
              <div className="space-y-3">
                {Object.entries(examResult.subjectScores).map(([subject, score]) => (
                  <div key={subject} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-800">{subject}</span>
                    <div className="flex items-center space-x-3">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${score.score}%` }}
                        />
                      </div>
                      <span className="font-medium text-gray-800 w-12 text-right">{score.score}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 操作按钮 */}
            <div className="space-y-3">
              {examResult.isPassed && (
                <button className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center space-x-2">
                  <Download className="w-4 h-4" />
                  <span>下载电子证书</span>
                </button>
              )}
              
              <button
                onClick={() => setCurrentView('rules')}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all duration-200"
              >
                重新考试
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
    case 'types':
      return renderExamTypes();
    case 'rules':
      return renderRules();
    case 'exam':
      return renderExam();
    case 'result':
      return renderResult();
    default:
      return renderExamTypes();
  }
};

export default MockExam;
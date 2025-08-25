import React from 'react';
import { Heart, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';

interface Option {
  id: string;
  text: string;
  isCorrect?: boolean;
}

interface Question {
  id: string;
  type: 'single' | 'multiple';
  content: string;
  image?: string;
  options: Option[];
  explanation?: string;
  knowledgePoint: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface QuestionCardProps {
  question: Question;
  selectedAnswers: string[];
  onAnswerChange: (answers: string[]) => void;
  showExplanation?: boolean;
  showCorrectAnswer?: boolean;
  isBookmarked?: boolean;
  onBookmark?: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
  currentIndex?: number;
  totalQuestions?: number;
  timeRemaining?: number;

}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  selectedAnswers,
  onAnswerChange,
  showExplanation = false,
  showCorrectAnswer = false,
  isBookmarked = false,
  onBookmark,
  onPrevious,
  onNext,
  currentIndex,
  totalQuestions,
  timeRemaining,

}) => {




  const handleOptionSelect = (optionId: string) => {
    if (question.type === 'single') {
      onAnswerChange([optionId]);
    } else {
      const newAnswers = selectedAnswers.includes(optionId)
        ? selectedAnswers.filter(id => id !== optionId)
        : [...selectedAnswers, optionId];
      onAnswerChange(newAnswers);
    }
  };

  const getOptionStyle = (option: Option) => {
    const isSelected = selectedAnswers.includes(option.id);
    const isCorrect = option.isCorrect;
    
    if (showCorrectAnswer) {
      if (isCorrect) {
        return 'border-green-500 bg-green-50 text-green-700';
      } else if (isSelected && !isCorrect) {
        return 'border-red-500 bg-red-50 text-red-700';
      }
    }
    
    return isSelected 
      ? 'border-purple-500 bg-purple-50 text-purple-700'
      : 'border-gray-200 hover:border-purple-300';
  };

  const getDifficultyColor = () => {
    switch (question.difficulty) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      {/* 题目头部信息 */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          {currentIndex !== undefined && totalQuestions && (
            <span className="text-sm text-gray-500">
              {currentIndex + 1} / {totalQuestions}
            </span>
          )}
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor()}`}>
            {question.difficulty === 'easy' ? '简单' : 
             question.difficulty === 'medium' ? '中等' : '困难'}
          </span>
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
            {question.knowledgePoint}
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          {timeRemaining !== undefined && (
            <div className="text-sm font-mono text-purple-600 bg-purple-50 px-2 py-1 rounded">
              {formatTime(timeRemaining)}
            </div>
          )}
          {onBookmark && (
            <button
              onClick={onBookmark}
              className={`p-2 rounded-full transition-colors ${
                isBookmarked 
                  ? 'text-red-500 bg-red-50 hover:bg-red-100'
                  : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
              }`}
            >
              <Heart className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>
          )}
        </div>
      </div>

      {/* 题目类型标识 */}
      <div className="mb-4">
        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-purple-100 text-purple-700">
          {question.type === 'single' ? '单选题' : '多选题'}
        </span>
      </div>

      {/* 题目内容 */}
      <div className="mb-6">
        <p className="text-gray-800 text-base leading-relaxed mb-4">
          {question.content}
        </p>
        {question.image && (
          <div className="mb-4">
            <img 
              src={question.image} 
              alt="题目图片" 
              className="max-w-full h-auto rounded-lg border border-gray-200"
            />
          </div>
        )}
      </div>

      {/* 选项列表 */}
      <div className="space-y-3 mb-6">
        {question.options.map((option, index) => {
          const optionLabel = String.fromCharCode(65 + index); // A, B, C, D
          return (
            <button
              key={option.id}
              onClick={() => handleOptionSelect(option.id)}
              disabled={showCorrectAnswer}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                getOptionStyle(option)
              } ${showCorrectAnswer ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <div className="flex items-start space-x-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-current bg-opacity-20 flex items-center justify-center text-sm font-medium">
                  {optionLabel}
                </span>
                <span className="flex-1">{option.text}</span>
                {showCorrectAnswer && option.isCorrect && (
                  <span className="text-green-600 text-sm font-medium">✓ 正确答案</span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* 解析区域 */}
      {showExplanation && question.explanation && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <div className="flex items-center space-x-2 mb-2">
            <BookOpen className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">题目解析</span>
          </div>
          <p className="text-blue-700 text-sm leading-relaxed">
            {question.explanation}
          </p>
        </div>
      )}



      {/* 导航按钮 */}
      {(onPrevious || onNext) && (
        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <button
            onClick={onPrevious}
            disabled={!onPrevious}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              onPrevious 
                ? 'text-purple-600 hover:bg-purple-50 border border-purple-200'
                : 'text-gray-400 cursor-not-allowed'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>上一题</span>
          </button>
          
          <button
            onClick={onNext}
            disabled={!onNext}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              onNext 
                ? 'text-white bg-purple-600 hover:bg-purple-700'
                : 'text-gray-400 cursor-not-allowed bg-gray-100'
            }`}
          >
            <span>下一题</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
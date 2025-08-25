import React, { useState } from 'react';
import { X, Star } from 'lucide-react';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseTitle: string;
  onSubmitReview: (rating: number, comment: string) => void;
}

const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  courseTitle,
  onSubmitReview
}) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0) {
      alert('请选择评分');
      return;
    }

    setIsSubmitting(true);
    
    // 模拟提交延迟
    setTimeout(() => {
      onSubmitReview(rating, comment);
      setIsSubmitted(true);
      setIsSubmitting(false);
      
      // 2秒后关闭弹窗
      setTimeout(() => {
        onClose();
        setIsSubmitted(false);
        setRating(0);
        setComment('');
      }, 2000);
    }, 1000);
  };

  const handleLater = () => {
    onClose();
    setRating(0);
    setComment('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100">
        {/* 头部 */}
        <div className="relative p-6 pb-4">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
          
          {!isSubmitted ? (
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-white fill-current" />
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">恭喜完成学习！</h2>
              <p className="text-gray-600 text-sm">
                您已完成《{courseTitle}》的学习
              </p>
            </div>
          ) : (
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">感谢您的评价！</h2>
              <p className="text-gray-600 text-sm">
                您的反馈对我们很重要
              </p>
            </div>
          )}
        </div>

        {!isSubmitted && (
          <div className="px-6 pb-6">
            {/* 评分区域 */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3 text-center">
                请为本课程评分
              </h3>
              <div className="flex justify-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-8 h-8 transition-colors ${
                        star <= (hoverRating || rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
              {rating > 0 && (
                <p className="text-center text-sm text-gray-600 mt-2">
                  {rating === 1 && '很不满意'}
                  {rating === 2 && '不满意'}
                  {rating === 3 && '一般'}
                  {rating === 4 && '满意'}
                  {rating === 5 && '非常满意'}
                </p>
              )}
            </div>

            {/* 评价输入 */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                分享您的学习感受
              </h3>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value.slice(0, 200))}
                placeholder="请分享您对本课程的看法和建议..."
                className="w-full h-24 p-3 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                maxLength={200}
              />
              <div className="text-right text-xs text-gray-500 mt-1">
                {comment.length}/200
              </div>
            </div>

            {/* 按钮区域 */}
            <div className="flex space-x-3">
              <button
                onClick={handleLater}
                className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                disabled={isSubmitting}
              >
                稍后评价
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || rating === 0}
                className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    提交中...
                  </>
                ) : (
                  '提交评价'
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewModal;
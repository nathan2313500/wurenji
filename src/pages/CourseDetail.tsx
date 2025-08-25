import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Clock, Users, Star, BookOpen, CheckCircle, Lock, Heart, ShoppingCart } from 'lucide-react';
import { getCourseById, addCourseReview, markCourseAsReviewed, hasUserReviewedCourse } from '@/data/mockData';
import { useAppStore } from '@/store';
import ReviewModal from '@/components/ReviewModal';

const CourseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isLoggedIn, purchaseCourse, isPurchased } = useAppStore();

  // 检查登录状态
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login', { 
        state: { from: location.pathname } 
      });
    }
  }, [isLoggedIn, navigate]);
  
  const [showAllChapters, setShowAllChapters] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [courseData, setCourseData] = useState(getCourseById(id || ''));
  const [isPurchasing, setIsPurchasing] = useState(false);

  const course = courseData;

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-600">课程未找到</h2>
          <button
            onClick={() => navigate('/learning')}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            返回学习中心
          </button>
        </div>
      </div>
    );
  }

  const completedChapters = course.chapters.filter(chapter => chapter.completed).length;
  const progress = (completedChapters / course.chapters.length) * 100;
  const displayChapters = showAllChapters ? course.chapters : course.chapters.slice(0, 3);

  // 监听学习进度变化
  useEffect(() => {
    const updatedCourse = getCourseById(id || '');
    if (updatedCourse) {
      setCourseData(updatedCourse);
      
      // 检查是否刚完成课程（进度达到100%）
      const newCompletedChapters = updatedCourse.chapters.filter(chapter => chapter.completed).length;
      const newProgress = (newCompletedChapters / updatedCourse.chapters.length) * 100;
      
      // 如果课程刚完成且用户未评价过，显示评价弹窗
      if (newProgress === 100 && !localStorage.getItem(`reviewed_course_${id}`)) {
        setTimeout(() => {
          setShowReviewModal(true);
        }, 1000); // 延迟1秒显示，让用户看到完成状态
      }
    }
  }, [id]);

  // 处理评价提交
  const handleSubmitReview = (rating: number, comment: string) => {
    if (course && user) {
      const reviewData = {
        courseId: course.id,
        userId: user.id,
        userName: user.name,
        userAvatar: user.avatar,
        rating,
        comment,
        date: new Date().toLocaleDateString('zh-CN')
      };
      
      // 提交评价到模拟数据
      addCourseReview(id || '', reviewData);
      
      // 标记该课程已评价
      localStorage.setItem(`reviewed_course_${id}`, 'true');
      
      // 更新课程数据以显示新评价
      const updatedCourse = getCourseById(id || '');
      if (updatedCourse) {
        setCourseData(updatedCourse);
      }
      
      setShowReviewModal(false);
    }
  };

  const handleStartLearning = () => {
    if (course.chapters.length > 0) {
      navigate(`/learning/video/${course.id}/${course.chapters[0].id}`);
    }
  };

  const handlePurchase = async () => {
    if (!course || isPurchasing) return;
    
    // 检查是否已购买
    if (isPurchased(course.id)) {
      return;
    }
    
    try {
      setIsPurchasing(true);
      
      // 模拟支付过程（2秒延迟）
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // 调用store中的purchaseCourse方法
      purchaseCourse(course.id);
      
      // 显示购买成功提示
      alert('购买成功！现在可以学习全部章节了。');
      
    } catch (error) {
      alert('购买失败，请重试。');
    } finally {
      setIsPurchasing(false);
    }
  };

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return '初级';
      case 'intermediate': return '中级';
      case 'advanced': return '高级';
      default: return '未知';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航 */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => navigate('/learning')}
            className="flex items-center text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="w-5 h-5 mr-1" />
            返回
          </button>
          <h1 className="font-semibold text-gray-800 truncate mx-4">课程详情</h1>
          <button
            onClick={toggleFavorite}
            className={`p-2 rounded-full ${
              isFavorited ? 'text-red-500' : 'text-gray-400'
            } hover:bg-gray-100`}
          >
            <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      <div className="pb-20">
        {/* 课程封面和基本信息 */}
        <div className="bg-white">
          <div className="relative">
            <img
              src={course.cover}
              alt={course.title}
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <button
                onClick={handleStartLearning}
                className="bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-4 transition-all"
              >
                <Play className="w-8 h-8 text-blue-600" />
              </button>
            </div>
          </div>

          <div className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h1 className="text-xl font-bold text-gray-800 mb-2">{course.title}</h1>
                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    <span>{course.studentCount}人学习</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 mr-1 text-yellow-500" />
                    <span>{course.rating}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                {course.isFree ? (
                  <span className="text-2xl font-bold text-green-600">免费</span>
                ) : isPurchased(course.id) ? (
                  <span className="text-lg font-bold text-green-600">已购买</span>
                ) : (
                  <span className="text-2xl font-bold text-blue-600">¥{course.price}</span>
                )}
              </div>
            </div>

            {/* 标签 */}
            <div className="flex flex-wrap gap-2 mb-4">
              {course.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
              <span className={`px-2 py-1 text-xs rounded-full ${getDifficultyColor(course.difficulty)}`}>
                {getDifficultyText(course.difficulty)}
              </span>
            </div>

            {/* 学习进度 */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">学习进度</span>
                <span className="text-sm text-gray-600">
                  {completedChapters}/{course.chapters.length} 章节
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <span className="text-xs text-gray-500 mt-1">{Math.round(progress)}% 完成</span>
            </div>

            <p className="text-gray-600 text-sm leading-relaxed">{course.description}</p>
          </div>
        </div>

        {/* 讲师信息 */}
        <div className="bg-white mt-2 p-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">讲师介绍</h2>
          <div className="flex items-center space-x-3">
            <img
              src={course.instructor.avatar}
              alt={course.instructor.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h3 className="font-medium text-gray-800">{course.instructor.name}</h3>
                {course.instructor.certified && (
                  <CheckCircle className="w-4 h-4 text-blue-500" />
                )}
              </div>
              <p className="text-sm text-gray-600">{course.instructor.title}</p>
              <p className="text-xs text-gray-500">{course.instructor.experience}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center text-sm text-gray-600">
                <Star className="w-4 h-4 mr-1 text-yellow-500" />
                <span>{course.instructor.rating}</span>
              </div>
              <p className="text-xs text-gray-500">{course.instructor.courses}门课程</p>
            </div>
          </div>
        </div>

        {/* 章节目录 */}
        <div className="bg-white mt-2 p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-gray-800">课程目录</h2>
            <span className="text-sm text-gray-600">
              共{course.chapters.length}章节
            </span>
          </div>
          <div className="space-y-3">
            {displayChapters.map((chapter, index) => (
              <div
                key={chapter.id}
                className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex-shrink-0 mr-3">
                  {chapter.completed ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center">
                      {course.isFree || index === 0 || isPurchased(course.id) ? (
                        <Play className="w-3 h-3 text-gray-400" />
                      ) : (
                        <Lock className="w-3 h-3 text-gray-400" />
                      )}
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800">{chapter.title}</h4>
                  <p className="text-sm text-gray-600">{chapter.duration}</p>
                </div>
                {!course.isFree && index > 0 && !chapter.completed && !isPurchased(course.id) && (
                  <Lock className="w-4 h-4 text-gray-400" />
                )}
              </div>
            ))}
          </div>
          {course.chapters.length > 3 && (
            <button
              onClick={() => setShowAllChapters(!showAllChapters)}
              className="w-full mt-3 py-2 text-blue-600 text-sm font-medium hover:bg-blue-50 rounded-lg transition-colors"
            >
              {showAllChapters ? '收起' : `查看全部 ${course.chapters.length} 章节`}
            </button>
          )}
        </div>

        {/* 课程评价 */}
        <div className="bg-white mt-2 p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-gray-800">学员评价</h2>
            <div className="flex items-center text-sm text-gray-600">
              <Star className="w-4 h-4 mr-1 text-yellow-500" />
              <span>{course.rating} ({course.reviews.length}条评价)</span>
            </div>
          </div>
          <div className="space-y-4">
            {course.reviews.slice(0, 3).map((review) => (
              <div key={review.id} className="border-b border-gray-100 pb-4 last:border-b-0">
                <div className="flex items-center space-x-3 mb-2">
                  <img
                    src={review.userAvatar}
                    alt={review.userName}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-800 text-sm">{review.userName}</span>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">{review.date}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 底部操作栏 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="flex space-x-3">
          {course.isFree || isPurchased(course.id) ? (
            <button
              onClick={handleStartLearning}
              className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all flex items-center justify-center"
            >
              <Play className="w-5 h-5 mr-2" />
              立即学习
            </button>
          ) : (
            <>
              <button
                onClick={handleStartLearning}
                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                试看
              </button>
              <button
                onClick={handlePurchase}
                disabled={isPurchasing}
                className={`flex-1 py-3 rounded-lg font-medium transition-all flex items-center justify-center ${
                  isPurchasing 
                    ? 'bg-gray-400 text-white cursor-not-allowed' 
                    : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700'
                }`}
              >
                {isPurchasing ? (
                  <>
                    <div className="w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    支付中...
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    ¥{course.price} 购买
                  </>
                )}
              </button>
            </>
          )}
        </div>
      </div>

      {/* 评价弹窗 */}
      <ReviewModal
        isOpen={showReviewModal}
        onClose={() => setShowReviewModal(false)}
        courseTitle={course.title}
        onSubmitReview={handleSubmitReview}
      />
    </div>
  );
};

export default CourseDetail;
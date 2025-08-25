import React, { useState } from 'react';
import { Play, BookOpen, Brain, Calendar, Clock, Trophy, ChevronRight, User, Award, MapPin, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '@/store';
import { mockCourses, mockBanners, mockNews } from '@/data/mockData';
import BottomNavigation from '@/components/BottomNavigation';
import Banner from '@/components/Banner';
import NewsList from '@/components/NewsList';

const Home = () => {
  const navigate = useNavigate();
  const { user, courses, isLoggedIn, isPurchased, getCourseProgress, isEnrolled, setEnrollment, clearEnrollment, availableCourses } = useAppStore();

  // 处理需要登录的功能点击
  const handleProtectedAction = (path: string) => {
    if (!isLoggedIn) {
      navigate('/login', { 
        state: { from: path } 
      });
    } else {
      navigate(path);
    }
  };

  // 快速操作数据 - 根据报名状态动态生成
  const getQuickActions = () => {
    const baseActions = [
      {
        id: 'course-learning',
        title: '课程学习',
        subtitle: '系统学习',
        icon: BookOpen,
        color: 'from-blue-500 to-blue-600',
        path: '/learning'
      },
      {
        id: 'chapter-practice',
        title: '章节练习',
        subtitle: '分章学习',
        icon: BookOpen,
        color: 'from-green-500 to-green-600',
        path: '/practice?type=chapter'
      },
      {
        id: 'exam-location',
        title: '考试地点',
        subtitle: '查看考试位置',
        icon: MapPin,
        color: 'from-red-500 to-red-600',
        path: '/exam-location'
      }
    ];

    if (isEnrolled) {
      // 已报名：显示培训预约和考试预约
      return [
        ...baseActions.slice(0, 2), // 模拟考试、章节练习
        {
          id: 'training-booking',
          title: '培训预约',
          subtitle: '专业指导',
          icon: Calendar,
          color: 'from-purple-500 to-purple-600',
          path: '/booking'
        },
        {
          id: 'exam-booking',
          title: '考试预约',
          subtitle: '官方考试',
          icon: Award,
          color: 'from-orange-500 to-orange-600',
          path: '/booking'
        },
        baseActions[2] // 考试地点
      ];
    } else {
      // 未报名：显示培训报名
      return [
        ...baseActions.slice(0, 2), // 模拟考试、章节练习
        {
          id: 'training-registration',
          title: '培训报名',
          subtitle: '开始学习',
          icon: UserPlus,
          color: 'from-indigo-500 to-indigo-600',
          path: '/booking'
        },
        baseActions[2] // 考试地点
      ];
    }
  };

  const quickActions = getQuickActions();

  const recentCourses = [...mockCourses, ...courses].slice(0, 3);

  return (
    <div className="mobile-content bg-gray-50 pb-20 relative">
      {/* 顶部横幅 */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-700 px-4 pt-8 pb-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="mobile-title text-white mb-2">易飞行</h1>
            <p className="mobile-subtitle text-blue-100">低空经济服务平台</p>
          </div>

        </div>

        {/* 轮播Banner - 移动到顶部横幅内 */}
        <div className="mb-4">
          <Banner items={mockBanners} autoPlay={true} interval={4000} />
        </div>
      </div>



      {/* 快速入口 */}
      <div className="px-4 py-6">
        <div className="mb-6">

        </div>


 
        <div className={`grid gap-4 ${quickActions.length === 4 ? 'grid-cols-4' : 'grid-cols-5'}`}>
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <button
                key={action.id}
                onClick={() => handleProtectedAction(action.path)}
                className="group flex flex-col items-center space-y-2 transition-all duration-200 active:scale-95"
              >
                {/* iOS风格圆形图标 */}
                <div className={`w-14 h-14 bg-gradient-to-br ${action.color} rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-200 group-hover:scale-105`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                
                {/* 文字标签 */}
                <span className="text-xs font-medium text-gray-700 text-center leading-tight">{action.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 继续学习 */}
      <div className="px-4 pb-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <h2 className="text-lg font-bold text-gray-900">继续学习</h2>
          </div>
          <button 
            onClick={() => handleProtectedAction('/learning')}
            className="bg-blue-50 hover:bg-blue-100 text-blue-600 px-4 py-2 rounded-xl text-sm font-medium flex items-center space-x-2 transition-all duration-200 hover:scale-105"
          >
            <span>查看全部</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        
        <div className="space-y-5">
          {recentCourses.filter(course => isPurchased(course.id)).map((course, index) => (
            <div
              key={course.id}
              onClick={() => handleProtectedAction(`/learning/course/${course.id}`)}
              className="group relative bg-white rounded-3xl p-6 shadow-xl transition-all duration-300 cursor-pointer border border-gray-50 overflow-hidden backdrop-blur-sm"
              style={{
                background: isPurchased(course.id) 
                  ? 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #f8fafc 100%)'
                  : 'linear-gradient(135deg, #ffffff 0%, #fefefe 50%, #f9fafb 100%)',
                boxShadow: isPurchased(course.id)
                  ? '0 20px 25px -5px rgba(59, 130, 246, 0.1), 0 10px 10px -5px rgba(59, 130, 246, 0.04)'
                  : '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
              }}
            >
              {/* 装饰性背景元素 */}

              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-50 to-transparent rounded-full -translate-y-12 -translate-x-12 opacity-20" />
              
              <div className="relative">
                {/* 课程信息 */}
                <div className="w-full">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-gray-900 text-lg leading-tight pr-2">{course.title}</h3>

                  </div>
                  
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{course.description}</p>
                  
                  {/* 课程元信息 */}
                  <div className="flex items-center space-x-4 mb-3">
                    <div className="flex items-center space-x-1.5">
                      <div className="w-5 h-5 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Clock className="w-3 h-3 text-blue-600" />
                      </div>
                      <span className="text-xs font-medium text-gray-600">{course.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <div className="w-5 h-5 bg-orange-100 rounded-lg flex items-center justify-center">
                        <Trophy className="w-3 h-3 text-orange-600" />
                      </div>
                      <span className="text-xs font-medium text-gray-600">{course.chapters?.length || 0}章节</span>
                    </div>
                  </div>
                  
                  {/* 学习进度或价格 */}
                  {isPurchased(course.id) ? (
                    (() => {
                      const progress = getCourseProgress(course.id);
                      const progressPercentage = progress?.progressPercentage || 0;
                      return (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700">学习进度</span>
                            <span className="text-sm font-bold text-blue-600">{progressPercentage}%</span>
                          </div>
                          <div className="relative">
                             <div className="w-full h-3 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full overflow-hidden shadow-inner">
                               <div 
                                 className="h-full bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 rounded-full transition-all duration-700 ease-out relative overflow-hidden"
                                 style={{ width: `${progressPercentage}%` }}
                               >
                                 <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
                                 <div className="absolute inset-0 bg-gradient-to-r from-blue-300/50 to-transparent" />
                               </div>
                             </div>
                             <div className="absolute -top-0.5 -bottom-0.5 left-0 right-0 bg-gradient-to-r from-blue-200/20 via-transparent to-blue-200/20 rounded-full animate-pulse" />
                           </div>
                        </div>
                      );
                    })()
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="text-right">
                        {course.price === 0 ? (
                          <div className="inline-flex items-center space-x-1 bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-md">
                            <span>免费学习</span>
                          </div>
                        ) : (
                          <div className="text-right">
                            <div className="text-2xl font-bold text-orange-600">¥{course.price}</div>
                            <div className="text-xs text-gray-500">一次购买，终身学习</div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* 最新资讯 */}
      <div className="px-4 pb-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">最新资讯</h2>
          <button 
            onClick={() => navigate('/news')}
            className="text-blue-600 text-sm font-medium flex items-center space-x-1"
          >
            <span>查看全部</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        
        <NewsList 
          items={mockNews.slice(0, 3)} 
          compact={true}
        />
      </div>

      <BottomNavigation />
      
      {/* 测试状态切换按钮 - 开发调试工具 */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => {
            if (isEnrolled) {
              clearEnrollment();
            } else {
              // 模拟报名第一个课程
              const firstCourse = availableCourses[0];
              setEnrollment({
                courseId: firstCourse.id,
                courseName: firstCourse.name,
                courseType: firstCourse.type,
                courseSize: firstCourse.size,
                price: firstCourse.price,
                paymentStatus: 'paid',
                enrollmentDate: new Date().toISOString()
              });
            }
          }}
          className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 shadow-lg backdrop-blur-sm ${
            isEnrolled 
              ? 'bg-green-500/80 text-white hover:bg-green-600/80' 
              : 'bg-orange-500/80 text-white hover:bg-orange-600/80'
          }`}
          title="开发调试：切换报名状态"
        >
          {isEnrolled ? '已报名' : '未报名'}
        </button>
      </div>
      
      {/* 悬浮客服入口 - 相对于页面内容定位 */}
      <div className="absolute bottom-24 right-4 z-40">

      </div>
      
      {/* 客服按钮 - 固定在右下角 */}
      <button
        onClick={() => {
          alert('客服联系方式：\n电话：400-123-4567\n微信：yifeixing2024\n邮箱：service@yifeixing.com');
        }}
        className="fixed bottom-24 w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 z-50"
        style={{right: '380px'}}
        title="联系客服"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-white">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      </button>
      
      {/* 客服按钮 - 相对于主容器定位 */}

    </div>
  );
};

export default Home;
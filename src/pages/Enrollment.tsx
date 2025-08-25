import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, BookOpen, Eye, Radar, GraduationCap, Clock, Award } from 'lucide-react';
import { useAppStore } from '@/store';
import type { EnrollmentCourse } from '@/store';

// 课程类型定义
type CourseType = 'VLOS' | 'BVLOS' | 'INSTRUCTOR';
type SizeType = 'small' | 'medium';

// 课程详细信息
interface CourseDetail {
  type: CourseType;
  name: string;
  description: string;
  features: string[];
  duration: string;
  certification: string;
  prices: {
    small: number;
    medium: number;
  };
}

const Enrollment: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAppStore();

  const [activeTab, setActiveTab] = useState<CourseType>('VLOS');
  const [selectedSize, setSelectedSize] = useState<SizeType>('small');

  // 选项卡配置
  const tabs = [
    {
      key: 'VLOS' as CourseType,
      name: '视距内驾驶员',
      icon: <Eye className="w-5 h-5" />
    },
    {
      key: 'BVLOS' as CourseType,
      name: '超视距驾驶员',
      icon: <Radar className="w-5 h-5" />
    },
    {
      key: 'INSTRUCTOR' as CourseType,
      name: '教练',
      icon: <GraduationCap className="w-5 h-5" />
    }
  ];



  // 课程详细数据
  const courseDetails: Record<CourseType, CourseDetail> = {
    VLOS: {
      type: 'VLOS',
      name: '视距内驾驶员',
      description: '适合初学者，学习基础无人机操作技能，在视线范围内安全飞行。',
      features: ['基础飞行理论', '实际操作训练', '安全飞行规范', '法规知识学习'],
      duration: '15天',
      certification: 'CAAC视距内驾驶员证书',
      prices: { small: 3800, medium: 4800 }
    },
    BVLOS: {
      type: 'BVLOS',
      name: '超视距驾驶员',
      description: '进阶课程，学习超视距飞行技术，适合有一定基础的学员。',
      features: ['高级飞行理论', '超视距操作技术', '复杂环境飞行', '应急处置训练'],
      duration: '20天',
      certification: 'CAAC超视距驾驶员证书',
      prices: { small: 5800, medium: 6800 }
    },
    INSTRUCTOR: {
      type: 'INSTRUCTOR',
      name: '教练员',
      description: '专业教练员培训，培养无人机飞行教学能力和管理技能。',
      features: ['教学理论与方法', '飞行技能精进', '学员管理技巧', '考试评估标准'],
      duration: '25天',
      certification: 'CAAC教练员资格证书',
      prices: { small: 8800, medium: 9800 }
    }
  };

  // 获取当前课程
  const currentCourse = courseDetails[activeTab];

  // 获取当前价格
  const getCurrentPrice = () => {
    const basePrice = currentCourse.prices[selectedSize];
    // 视距内驾驶员小型课程有早鸟优惠
    if (activeTab === 'VLOS' && selectedSize === 'small') {
      return basePrice - 200;
    }
    return basePrice;
  };



  // 前往支付
  const handlePayment = () => {
    const courseData = {
      id: `${activeTab.toLowerCase()}-${selectedSize}`,
      name: `${currentCourse.name}（${selectedSize === 'small' ? '小型' : '中型'}）`,
      type: activeTab,
      size: selectedSize,
      price: getCurrentPrice(),
      description: currentCourse.description
    };
    
    // 跳转到支付页面，传递课程信息
    navigate('/payment', {
      state: {
        course: courseData,
        from: '/enrollment'
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 头部 */}
      <div className="bg-white border-b border-gray-200">
        <div className="flex items-center px-4 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <h1 className="flex-1 text-center text-lg font-semibold text-gray-900">培训报名</h1>
          <div className="w-10" />
        </div>
      </div>

      <div className="px-4 py-8 bg-gray-50 min-h-screen">
        {/* 选项卡 - 简洁设计 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-1 mb-8">
          <div className="flex">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 flex flex-col items-center justify-center py-3 px-3 rounded-lg transition-colors ${
                  activeTab === tab.key
                    ? 'bg-blue-50 text-blue-600 border border-blue-200'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className="mb-1">
                  {tab.icon}
                </div>
                <span className="text-sm font-medium text-center">{tab.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 课程详细介绍 - 简洁设计 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="mb-5">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">{currentCourse.name}</h2>
            <span className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-md">{currentCourse.certification}</span>
          </div>
          
          <p className="text-gray-600 leading-relaxed mb-6">{currentCourse.description}</p>
            
          {/* 课程特色 */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
              <BookOpen className="w-5 h-5 text-blue-600 mr-2" />
              课程特色
            </h3>
            <div className="grid grid-cols-1 gap-2">
              {currentCourse.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full flex-shrink-0"></div>
                  <span className="text-gray-700 text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>
            
          {/* 培训时长 */}
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-gray-900">培训时长</span>
              </div>
              <span className="text-lg font-semibold text-blue-600">{currentCourse.duration}</span>
            </div>
          </div>
        </div>

        {/* 规格选择 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <h3 className="font-semibold text-gray-900 mb-4 text-lg">
            选择规格
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setSelectedSize('small')}
              className={`p-4 rounded-lg border-2 transition-colors ${
                selectedSize === 'small'
                  ? 'bg-blue-50 border-blue-500 text-blue-700'
                  : 'bg-gray-50 border-gray-200 text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="text-center">
                <div className="text-lg font-semibold mb-1">小型</div>
                <div className="text-sm text-gray-500 mb-2">7kg以下</div>
                <div className="text-xl font-bold text-blue-600">
                  ¥{currentCourse.prices.small.toLocaleString()}
                </div>
                {selectedSize === 'small' && (
                  <div className="flex items-center justify-center mt-2">
                    <Check className="w-5 h-5 text-blue-600" />
                  </div>
                )}
              </div>
            </button>
            
            <button
              onClick={() => setSelectedSize('medium')}
              className={`p-4 rounded-lg border-2 transition-colors ${
                selectedSize === 'medium'
                  ? 'bg-blue-50 border-blue-500 text-blue-700'
                  : 'bg-gray-50 border-gray-200 text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="text-center">
                <div className="text-lg font-semibold mb-1">中型</div>
                <div className="text-sm text-gray-500 mb-2">7-25kg</div>
                <div className="text-xl font-bold text-blue-600">
                  ¥{currentCourse.prices.medium.toLocaleString()}
                </div>
                {selectedSize === 'medium' && (
                  <div className="flex items-center justify-center mt-2">
                    <Check className="w-5 h-5 text-blue-600" />
                  </div>
                )}
              </div>
            </button>
          </div>
        </div>

        {/* 优惠信息 - 全新设计 */}
        {/* 已按要求删除该区域 */}

        {/* 底部支付栏 */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-10 shadow-lg">
          <div className="max-w-sm mx-auto px-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <span className="text-gray-700 font-semibold">总计</span>
                {activeTab === 'VLOS' && selectedSize === 'small' && (
                  <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-md font-medium">
                    早鸟优惠 -¥200
                  </span>
                )}
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">
                  ¥{getCurrentPrice().toLocaleString()}
                </div>
                {activeTab === 'VLOS' && selectedSize === 'small' && (
                  <div className="text-sm text-gray-400 line-through">
                    ¥{currentCourse.prices.small.toLocaleString()}
                  </div>
                )}
              </div>
            </div>
            
            <button
              onClick={handlePayment}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors"
            >
              立即购买
            </button>
          </div>
        </div>
        
        {/* 底部间距 - 为固定底栏留出空间 */}
        <div className="h-24"></div>
      </div>
    </div>
  );
};

export default Enrollment;
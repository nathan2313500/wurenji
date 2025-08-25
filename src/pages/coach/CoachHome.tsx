import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  Users, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  BookOpen,
  BarChart3,
  Settings
} from 'lucide-react';

const CoachHome: React.FC = () => {
  const navigate = useNavigate();

  // 模拟数据
  const todayStats = {
    totalBookings: 8,
    confirmedBookings: 6,
    pendingBookings: 2,
    completedSessions: 4,
    totalStudents: 15,
    passRate: 85
  };

  const quickActions = [
    {
      title: '预约管理',
      description: '处理学员预约申请',
      icon: Calendar,
      color: 'bg-blue-500',
      lightColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      path: '/coach/bookings',
      count: todayStats.pendingBookings
    },
    {
      title: '培训签到',
      description: '确认学员到场签到',
      icon: CheckCircle,
      color: 'bg-green-500',
      lightColor: 'bg-green-50',
      textColor: 'text-green-600',
      path: '/coach/checkin'
    },
    {
      title: '教学记录',
      description: '记录培训内容',
      icon: BookOpen,
      color: 'bg-orange-500',
      lightColor: 'bg-orange-50',
      textColor: 'text-orange-600',
      path: '/coach/records'
    },
    {
      title: '学员进度',
      description: '查看学员学习进度',
      icon: BarChart3,
      color: 'bg-indigo-500',
      lightColor: 'bg-indigo-50',
      textColor: 'text-indigo-600',
      path: '/coach/progress'
    },
    {
      title: '教练签到',
      description: '学习时间段定位签到',
      icon: Clock,
      color: 'bg-purple-500',
      lightColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      path: '/coach/checkin/coach'
    },
    {
      title: '取消处理',
      description: '处理预约取消申请',
      icon: AlertCircle,
      color: 'bg-red-500',
      lightColor: 'bg-red-50',
      textColor: 'text-red-600',
      path: '/coach/cancellations'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航栏 */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-semibold text-gray-900">教练工作台</h1>
              <p className="text-sm text-gray-500">欢迎回来，张教练</p>
              <div className="flex items-center mt-1">
                <span className="text-xs text-gray-400">当前期数：</span>
                <span className="ml-1 px-2 py-0.5 text-xs bg-blue-100 text-blue-700 rounded-full font-medium">202501期</span>
              </div>
            </div>
            <button 
              onClick={() => navigate('/coach/profile')}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <Settings className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* 今日概览 */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h2 className="text-base font-semibold text-gray-900 mb-4">今日概览</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{todayStats.totalBookings}</div>
              <div className="text-xs text-gray-600 mt-1">总预约</div>
            </div>

            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{todayStats.completedSessions}</div>
              <div className="text-xs text-gray-600 mt-1">已完成</div>
            </div>
          </div>
        </div>

        {/* 操作 */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h2 className="text-base font-semibold text-gray-900 mb-4">操作</h2>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action, index) => {
              const IconComponent = action.icon;
              return (
                <button
                  key={index}
                  onClick={() => navigate(action.path)}
                  className="relative p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-200 text-left group hover:shadow-sm"
                >
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${action.lightColor} group-hover:scale-110 transition-transform`}>
                      <IconComponent className={`w-5 h-5 ${action.textColor}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-gray-900 truncate">{action.title}</h3>
                        {action.count && (
                          <span className="ml-2 px-2 py-1 text-xs bg-red-100 text-red-600 rounded-full">
                            {action.count}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">{action.description}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 学员统计 */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h2 className="text-base font-semibold text-gray-900 mb-4">学员统计</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Users className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-gray-900">总学员数</span>
              </div>
              <span className="text-lg font-semibold text-blue-600">{todayStats.totalStudents}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <BarChart3 className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-gray-900">首次通过率</span>
              </div>
              <span className="text-lg font-semibold text-green-600">{todayStats.passRate}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoachHome;
import React, { useState } from 'react';
import { User, Settings, Bell, Shield, HelpCircle, LogOut, Edit, Camera, Phone, Mail, Calendar, Award, BarChart3, Clock, Users, Star } from 'lucide-react';

interface CoachInfo {
  id: string;
  name: string;
  phone: string;
  email: string;
  avatar: string;
  joinDate: string;
  certification: string[];
  specialties: string[];
  experience: number;
  rating: number;
  totalStudents: number;
  activeStudents: number;
  totalHours: number;
  completedSessions: number;
}

const CoachProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  
  // 模拟教练信息
  const [coachInfo, setCoachInfo] = useState<CoachInfo>({
    id: 'C001',
    name: '李教练',
    phone: '13800138000',
    email: 'coach.li@example.com',
    avatar: '',
    joinDate: '2022-03-15',
    certification: ['商用飞行员执照', '飞行教员执照', '仪表飞行教员'],
    specialties: ['基础飞行训练', '仪表飞行', '夜间飞行', '复杂气象'],
    experience: 8,
    rating: 4.8,
    totalStudents: 156,
    activeStudents: 23,
    totalHours: 2840,
    completedSessions: 1250
  });

  const [editForm, setEditForm] = useState({
    name: coachInfo.name,
    phone: coachInfo.phone,
    email: coachInfo.email
  });

  const [notifications, setNotifications] = useState({
    newBooking: true,
    cancellation: true,
    reminder: true,
    system: false
  });

  const handleSaveProfile = () => {
    setCoachInfo(prev => ({
      ...prev,
      name: editForm.name,
      phone: editForm.phone,
      email: editForm.email
    }));
    setIsEditing(false);
  };

  const handleLogout = () => {
    // 处理退出登录逻辑
    console.log('退出登录');
  };

  const stats = [
    {
      icon: Users,
      label: '总学员数',
      value: coachInfo.totalStudents,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: Clock,
      label: '总教学时长',
      value: `${coachInfo.totalHours}h`,
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: BarChart3,
      label: '完成课程',
      value: coachInfo.completedSessions,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      icon: Star,
      label: '评分',
      value: coachInfo.rating.toFixed(1),
      color: 'bg-yellow-100 text-yellow-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部标题栏 */}
      <div className="bg-white shadow-sm">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-gray-800">个人中心</h1>
              <p className="text-sm text-gray-600 mt-1">管理个人信息和设置</p>
            </div>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* 个人信息卡片 */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="relative">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                {coachInfo.avatar ? (
                  <img src={coachInfo.avatar} alt="头像" className="w-16 h-16 rounded-full object-cover" />
                ) : (
                  <User className="w-8 h-8 text-blue-600" />
                )}
              </div>
              <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                <Camera className="w-3 h-3" />
              </button>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{coachInfo.name}</h3>
                  <p className="text-sm text-gray-600">教练编号: {coachInfo.id}</p>
                </div>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </button>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>{coachInfo.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span>{coachInfo.email}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>入职时间: {coachInfo.joinDate}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 编辑表单 */}
        {isEditing && (
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h4 className="font-medium text-gray-800 mb-3">编辑个人信息</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  姓名
                </label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  手机号
                </label>
                <input
                  type="tel"
                  value={editForm.phone}
                  onChange={(e) => setEditForm(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  邮箱
                </label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  onClick={handleSaveProfile}
                  className="flex-1 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors active:scale-95"
                >
                  保存
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex-1 py-2 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition-colors active:scale-95"
                >
                  取消
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 统计数据 */}
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return null;
          })}
        </div>

        {/* 资质认证 */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h4 className="font-medium text-gray-800 mb-3 flex items-center gap-2">
            <Award className="w-4 h-4" />
            资质认证
          </h4>
          <div className="space-y-2">
            {coachInfo.certification.map((cert, index) => (
              <div key={index} className="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
                <Award className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-800">{cert}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 专业领域 */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h4 className="font-medium text-gray-800 mb-3">专业领域</h4>
          <div className="flex flex-wrap gap-2">
            {coachInfo.specialties.map((specialty, index) => (
              <span key={index} className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                {specialty}
              </span>
            ))}
          </div>
        </div>

        {/* 设置选项 */}
        {showSettings && (
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-4 border-b border-gray-200">
              <h4 className="font-medium text-gray-800">设置</h4>
            </div>
            
            {/* 通知设置 */}
            <div className="p-4 border-b border-gray-200">
              <h5 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                <Bell className="w-4 h-4" />
                通知设置
              </h5>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">新预约通知</span>
                  <button
                    onClick={() => setNotifications(prev => ({ ...prev, newBooking: !prev.newBooking }))}
                    className={`w-12 h-6 rounded-full transition-colors ${notifications.newBooking ? 'bg-blue-600' : 'bg-gray-300'}`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform ${notifications.newBooking ? 'translate-x-6' : 'translate-x-0.5'}`} />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">取消预约通知</span>
                  <button
                    onClick={() => setNotifications(prev => ({ ...prev, cancellation: !prev.cancellation }))}
                    className={`w-12 h-6 rounded-full transition-colors ${notifications.cancellation ? 'bg-blue-600' : 'bg-gray-300'}`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform ${notifications.cancellation ? 'translate-x-6' : 'translate-x-0.5'}`} />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">课程提醒</span>
                  <button
                    onClick={() => setNotifications(prev => ({ ...prev, reminder: !prev.reminder }))}
                    className={`w-12 h-6 rounded-full transition-colors ${notifications.reminder ? 'bg-blue-600' : 'bg-gray-300'}`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform ${notifications.reminder ? 'translate-x-6' : 'translate-x-0.5'}`} />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">系统通知</span>
                  <button
                    onClick={() => setNotifications(prev => ({ ...prev, system: !prev.system }))}
                    className={`w-12 h-6 rounded-full transition-colors ${notifications.system ? 'bg-blue-600' : 'bg-gray-300'}`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform ${notifications.system ? 'translate-x-6' : 'translate-x-0.5'}`} />
                  </button>
                </div>
              </div>
            </div>
            
            {/* 其他设置 */}
            <div className="p-4">
              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <Shield className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-700">隐私设置</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <HelpCircle className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-700">帮助与反馈</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 p-3 text-left hover:bg-red-50 rounded-lg transition-colors text-red-600"
                >
                  <LogOut className="w-5 h-5" />
                  <span>退出登录</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoachProfile;
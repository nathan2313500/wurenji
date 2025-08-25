import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Settings, UserCheck } from 'lucide-react';

const SystemEntry: React.FC = () => {
  const navigate = useNavigate();

  const handleStudentEntry = () => {
    navigate('/student');
  };

  const handleCoachEntry = () => {
    navigate('/coach');
  };

  const handleAdminEntry = () => {
    // 暂时显示提示信息，后续可以添加后台管理系统
    alert('后台管理系统正在开发中...');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-8">
      <div className="max-w-7xl w-full">
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">易飞行系统原型</h1>
          <p className="text-lg text-gray-600">无人机培训与考试预约平台</p>
        </div>

        {/* 入口选项卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* 学员端 */}
          <div 
            onClick={handleStudentEntry}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 p-8 text-center min-h-[280px] flex flex-col justify-center"
          >
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <GraduationCap className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">学员端</h3>
            <p className="text-gray-600 mb-4 text-sm">
              课程学习、练习考试、预约管理
            </p>
            <div className="bg-blue-50 text-blue-700 px-3 py-2 rounded-lg inline-block text-sm">
              点击进入
            </div>
          </div>


          {/* 教练端 */}
          <div 
            onClick={handleCoachEntry}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 p-8 text-center min-h-[280px] flex flex-col justify-center"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserCheck className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">教练端</h3>
            <p className="text-gray-600 mb-4 text-sm">
              预约管理、签到确认、教学记录
            </p>
            <div className="bg-green-50 text-green-700 px-3 py-2 rounded-lg inline-block text-sm">
              点击进入
            </div>
          </div>

          {/* 后台管理系统 */}
          <div 
            onClick={handleAdminEntry}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 p-8 text-center min-h-[280px] flex flex-col justify-center"
          >
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Settings className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">后台管理系统</h3>
            <p className="text-gray-600 mb-4 text-sm">
              系统配置、数据统计、用户管理
            </p>
            <div className="bg-purple-50 text-purple-700 px-3 py-2 rounded-lg inline-block text-sm">
              开发中
            </div>
          </div>
        </div>

        {/* 底部信息 */}
        <div className="text-center mt-12">
          <p className="text-gray-500">请选择要进入的系统模块</p>
        </div>
      </div>
    </div>
  );
};

export default SystemEntry;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Phone, Key, ArrowLeft } from 'lucide-react';

const CoachLogin: React.FC = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    phone: '',
    password: '',
    inviteCode: '',
    name: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 模拟登录/注册逻辑
    if (isLogin) {
      // 登录逻辑
      if (formData.phone && formData.password) {
        navigate('/coach');
      } else {
        alert('请填写完整的登录信息');
      }
    } else {
      // 注册逻辑
      if (formData.phone && formData.password && formData.inviteCode && formData.name) {
        navigate('/coach');
      } else {
        alert('请填写完整的注册信息');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* 顶部导航 */}
      <div className="flex items-center justify-between p-4">
        <button 
          onClick={() => navigate('/')}
          className="p-2 rounded-full bg-white/80 hover:bg-white transition-colors shadow-sm"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h1 className="text-lg font-semibold text-gray-800">教练端</h1>
        <div className="w-9"></div>
      </div>

      <div className="px-6 py-8">
        {/* Logo和标题 */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-bold text-white">易</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {isLogin ? '教练登录' : '教练注册'}
          </h2>
          <p className="text-gray-600 text-sm">
            {isLogin ? '欢迎回来，请登录您的教练账户' : '加入易飞行，开始您的教学之旅'}
          </p>
        </div>

        {/* 登录/注册表单 */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* 姓名输入（仅注册时显示） */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  教练姓名
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="请输入您的姓名"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
            )}

            {/* 手机号输入 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                手机号码
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="请输入手机号码"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* 密码输入 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                密码
              </label>
              <div className="relative">
                <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder={isLogin ? '请输入密码' : '设置登录密码'}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* 邀请码输入（仅注册时显示） */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  机构邀请码
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="inviteCode"
                    value={formData.inviteCode}
                    onChange={handleInputChange}
                    placeholder="请输入机构提供的邀请码"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  请联系您所在的培训机构获取邀请码
                </p>
              </div>
            )}

            {/* 提交按钮 */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all active:scale-95"
            >
              {isLogin ? '登录' : '注册'}
            </button>
          </form>

          {/* 切换登录/注册 */}
          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              {isLogin ? '还没有账户？立即注册' : '已有账户？立即登录'}
            </button>
          </div>

          {/* 忘记密码（仅登录时显示） */}
          {isLogin && (
            <div className="mt-4 text-center">
              <button className="text-gray-500 hover:text-gray-700 text-sm">
                忘记密码？
              </button>
            </div>
          )}
        </div>

        {/* 底部信息 */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            登录即表示您同意我们的服务条款和隐私政策
          </p>
        </div>
      </div>
    </div>
  );
};

export default CoachLogin;
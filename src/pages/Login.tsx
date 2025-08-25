import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Smartphone, MessageSquare } from 'lucide-react';
import { useAppStore } from '@/store';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAppStore();
  
  const [loginType, setLoginType] = useState<'wechat' | 'phone'>('wechat');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [showWechatAuth, setShowWechatAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // 获取来源页面，用于登录成功后跳转
  const from = (location.state as any)?.from?.pathname || '/booking';

  // 倒计时逻辑
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // 发送验证码
  const sendVerificationCode = () => {
    if (!phone || phone.length !== 11) {
      alert('请输入正确的手机号码');
      return;
    }
    setCountdown(60);
    // 模拟发送验证码
    console.log('发送验证码到:', phone);
  };

  // 微信登录
  const handleWechatLogin = () => {
    setShowWechatAuth(true);
    // 模拟微信授权过程
    setTimeout(() => {
      const mockUser = {
        id: 'wx_' + Date.now(),
        name: '微信用户',
        avatar: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=friendly%20user%20avatar%20portrait%20professional&image_size=square',
        phone: '138****8888',
        level: 'basic' as const,
        studyProgress: 0,
        totalStudyTime: 0,
        completedCourses: 0
      };
      login(mockUser);
      setShowWechatAuth(false);
      navigate(from, { replace: true });
    }, 2000);
  };

  // 手机号登录
  const handlePhoneLogin = () => {
    if (!phone || phone.length !== 11) {
      alert('请输入正确的手机号码');
      return;
    }
    if (!code || code.length !== 6) {
      alert('请输入6位验证码');
      return;
    }
    
    setIsLoading(true);
    // 模拟验证过程
    setTimeout(() => {
      const mockUser = {
        id: 'phone_' + Date.now(),
        name: phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2'),
        avatar: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20user%20avatar%20portrait%20friendly&image_size=square',
        phone: phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2'),
        level: 'basic' as const,
        studyProgress: 0,
        totalStudyTime: 0,
        completedCourses: 0
      };
      login(mockUser);
      setIsLoading(false);
      navigate(from, { replace: true });
    }, 1500);
  };

  return (
    <div className="mobile-content bg-gradient-to-br from-blue-50 to-blue-100">
      {/* 头部 */}
      <div className="bg-white shadow-sm">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="mobile-subtitle font-semibold text-gray-900">登录</h1>
          <div className="w-10" />
        </div>
      </div>

      <div className="p-6">
        {/* Logo 和标题 */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
            <span className="text-2xl font-bold text-white">易</span>
          </div>
          <h2 className="mobile-title text-gray-900 mb-2">欢迎使用易飞行</h2>
          <p className="mobile-subtitle text-gray-600">专业的无人机学习与考试平台</p>
        </div>

        {/* 登录方式切换 */}
        <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
          <button
            onClick={() => setLoginType('wechat')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
              loginType === 'wechat'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            微信登录
          </button>
          <button
            onClick={() => setLoginType('phone')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
              loginType === 'phone'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            手机登录
          </button>
        </div>

        {/* 微信登录 */}
        {loginType === 'wechat' && (
          <div className="space-y-4">
            <button
              onClick={handleWechatLogin}
              disabled={showWechatAuth}
              className="mobile-button w-full bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white px-6 rounded-xl font-medium flex items-center justify-center space-x-2 transition-colors"
            >
              <MessageSquare className="w-5 h-5" />
              <span>{showWechatAuth ? '授权中...' : '微信一键登录'}</span>
            </button>
            <p className="text-xs text-gray-500 text-center">
              点击登录即表示同意《用户协议》和《隐私政策》
            </p>
          </div>
        )}

        {/* 手机号登录 */}
        {loginType === 'phone' && (
          <div className="space-y-4">
            {/* 手机号输入 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                手机号码
              </label>
              <div className="relative">
                <Smartphone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 11))}
                  placeholder="请输入手机号码"
                  className="mobile-input w-full pl-10 pr-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  maxLength={11}
                />
              </div>
            </div>

            {/* 验证码输入 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                验证码
              </label>
              <div className="flex space-x-3">
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="请输入验证码"
                  className="mobile-input flex-1 px-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  maxLength={6}
                />
                <button
                  onClick={sendVerificationCode}
                  disabled={countdown > 0 || !phone || phone.length !== 11}
                  className="mobile-button px-4 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white rounded-xl font-medium transition-colors whitespace-nowrap"
                >
                  {countdown > 0 ? `${countdown}s` : '获取验证码'}
                </button>
              </div>
            </div>

            {/* 登录按钮 */}
            <button
              onClick={handlePhoneLogin}
              disabled={isLoading || !phone || !code || phone.length !== 11 || code.length !== 6}
              className="mobile-button w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white px-6 rounded-xl font-medium transition-colors"
            >
              {isLoading ? '登录中...' : '登录'}
            </button>

            <p className="text-xs text-gray-500 text-center">
              点击登录即表示同意《用户协议》和《隐私政策》
            </p>
          </div>
        )}
      </div>

      {/* 微信授权弹窗 */}
      {showWechatAuth && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 mx-4 max-w-sm w-full">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-green-500 rounded-full flex items-center justify-center">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">微信授权登录</h3>
              <p className="text-gray-600 mb-4">正在获取您的微信信息...</p>
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-500"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, CreditCard, Shield, CheckCircle, Loader2, Clock, Smartphone, AlertCircle } from 'lucide-react';
import { useAppStore } from '@/store';
import type { EnrollmentCourse } from '@/store';

interface LocationState {
  course: EnrollmentCourse;
  from: string;
}

type PaymentMethod = 'wechat';

const Payment: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setEnrollment } = useAppStore();
  
  const state = location.state as LocationState;
  const course = state?.course;
  
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'processing' | 'success' | 'failed'>('pending');
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>('wechat');
  const [countdown, setCountdown] = useState(3);
  const [orderTimeout, setOrderTimeout] = useState(15 * 60); // 15分钟倒计时
  const [orderId] = useState(() => `FX${Date.now().toString().slice(-8)}`);

  // 如果没有课程信息，返回报名页面
  useEffect(() => {
    if (!course) {
      navigate('/enrollment');
    }
  }, [course, navigate]);

  // 订单超时倒计时
  useEffect(() => {
    if (paymentStatus === 'pending' && orderTimeout > 0) {
      const timer = setInterval(() => {
        setOrderTimeout(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setPaymentStatus('failed');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [paymentStatus, orderTimeout]);

  // 计算实际支付金额（包含优惠）
  const getActualPrice = () => {
    if (!course) return 0;
    return course.price - (course.id === 'vlos-small' ? 200 : 0);
  };

  // 格式化倒计时显示
  const formatTimeout = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // 支付方式配置
  const paymentMethods = [
    {
      id: 'wechat' as PaymentMethod,
      name: '微信支付',
      description: '推荐使用，支持零钱、银行卡',
      icon: <Smartphone className="w-6 h-6" />,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-500'
    }
  ];

  // 处理支付
  const handlePayment = () => {
    setPaymentStatus('processing');
    
    // 模拟3秒支付过程
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          // 支付成功，更新报名状态并跳转
          setEnrollment({
            courseId: course.id,
            courseName: course.name,
            courseType: course.type,
            courseSize: course.size,
            price: getActualPrice(),
            paymentStatus: 'paid',
            enrollmentDate: new Date().toISOString().split('T')[0]
          });
          // 直接跳转到支付成功页面
          navigate('/payment-success', { replace: true });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // 支付成功后跳转到支付成功页面
  const handleSuccess = () => {
    navigate('/payment-success', { replace: true });
  };

  if (!course) {
    return null;
  }

  return (
    <div className="mobile-content bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 min-h-screen">
      {/* 头部 */}
      <div className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-10">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-200 hover:scale-105"
            disabled={paymentStatus === 'processing'}
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="mobile-title text-gray-900 font-bold">支付订单</h1>
          <div className="w-10" />
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* 订单超时提醒 */}
        {paymentStatus === 'pending' && (
          <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-2xl p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <Clock className="w-5 h-5 text-orange-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-orange-800">订单有效期</h3>
                <p className="text-sm text-orange-600">请在 {formatTimeout(orderTimeout)} 内完成支付</p>
              </div>
              <div className="text-2xl font-bold text-orange-600 font-mono">
                {formatTimeout(orderTimeout)}
              </div>
            </div>
          </div>
        )}

        {/* 订单信息 */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg border border-white/50 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-white">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-bold">订单详情</h2>
                <p className="text-blue-100 text-sm">订单号：{orderId}</p>
              </div>
              <div className="text-right">
                <div className="text-xs text-blue-100">创建时间</div>
                <div className="text-sm font-medium">{new Date().toLocaleString()}</div>
              </div>
            </div>
          </div>
          
          <div className="p-6 space-y-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{course.name}</h3>
                <p className="text-gray-600 mb-3 leading-relaxed">{course.description}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 text-sm rounded-full font-medium">
                    {course.size === 'small' ? '7kg以下' : '7-25kg'}
                  </span>
                  <span className="px-3 py-1 bg-gradient-to-r from-green-100 to-green-200 text-green-800 text-sm rounded-full font-medium">
                    理论+实操
                  </span>
                  <span className="px-3 py-1 bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 text-sm rounded-full font-medium">
                    官方认证
                  </span>
                </div>
              </div>
            </div>
            
            {/* 价格明细 */}
            <div className="bg-gray-50 rounded-2xl p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">课程费用</span>
                <span className="font-semibold text-gray-900">¥{course.price.toLocaleString()}</span>
              </div>
              
              {course.id === 'vlos-small' && (
                <div className="flex justify-between items-center">
                  <span className="text-orange-600 flex items-center">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                    早鸟优惠
                  </span>
                  <span className="font-semibold text-orange-600">-¥200</span>
                </div>
              )}
              
              <div className="border-t border-gray-200 pt-3">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">实付金额</span>
                  <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    ¥{getActualPrice().toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 支付方式选择 */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg border border-white/50 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <CreditCard className="w-6 h-6 mr-2 text-blue-600" />
            选择支付方式
          </h2>
          
          <div className="space-y-3">
            {paymentMethods.map((method) => {
              const isSelected = selectedPayment === method.id;
              return (
                <button
                  key={method.id}
                  onClick={() => setSelectedPayment(method.id)}
                  className={`w-full p-4 rounded-2xl border-2 transition-all duration-200 hover:scale-[1.02] ${
                    isSelected
                      ? `${method.borderColor} ${method.bgColor} shadow-lg`
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                      isSelected ? method.color : 'bg-gray-100'
                    } transition-colors`}>
                      <div className={isSelected ? 'text-white' : 'text-gray-600'}>
                        {method.icon}
                      </div>
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className={`font-bold ${
                        isSelected ? 'text-gray-900' : 'text-gray-700'
                      }`}>{method.name}</h3>
                      <p className={`text-sm ${
                        isSelected ? 'text-gray-600' : 'text-gray-500'
                      }`}>{method.description}</p>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      isSelected
                        ? `${method.borderColor.replace('border-', 'bg-')} border-transparent`
                        : 'border-gray-300'
                    }`}>
                      {isSelected && <CheckCircle className="w-4 h-4 text-white" />}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 安全保障 */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4 border border-green-200">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Shield className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-green-800 mb-1">安全保障</h3>
              <div className="text-sm text-green-700 space-y-1">
                <p>• 24小时客服支持，随时为您解答疑问</p>
              </div>
            </div>
          </div>
        </div>

        {/* 支付状态显示 */}
        {paymentStatus === 'processing' && (
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8 text-center">
            <div className="flex flex-col items-center space-y-6">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                  <Loader2 className="w-10 h-10 text-white animate-spin" />
                </div>
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full opacity-20 animate-pulse"></div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">正在处理支付</h3>
                <p className="text-gray-600">
                  请稍候，预计还需 <span className="font-bold text-blue-600">{countdown}</span> 秒...
                </p>
                <p className="text-sm text-gray-500 mt-2">请勿关闭页面或返回</p>
              </div>
            </div>
          </div>
        )}

        {/* 支付成功 */}
        {paymentStatus === 'success' && (
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8 text-center">
            <div className="flex flex-col items-center space-y-6">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -inset-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full opacity-20 animate-pulse"></div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-green-600 mb-2">支付成功！</h3>
                <p className="text-gray-600 mb-1">
                  恭喜您成功报名 <span className="font-semibold">{course.name}</span>
                </p>
                <p className="text-sm text-gray-500">订单号：{orderId}</p>
              </div>
              <button
                onClick={handleSuccess}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold rounded-2xl transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                开始预约培训
              </button>
            </div>
          </div>
        )}

        {/* 支付失败 */}
        {paymentStatus === 'failed' && (
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8 text-center">
            <div className="flex flex-col items-center space-y-6">
              <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                <AlertCircle className="w-10 h-10 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-red-600 mb-2">订单已超时</h3>
                <p className="text-gray-600 mb-4">很抱歉，订单支付时间已超过15分钟</p>
                <button
                  onClick={() => navigate('/enrollment')}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold rounded-2xl transition-all duration-200"
                >
                  重新报名
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 底部支付按钮 */}
      {paymentStatus === 'pending' && (
        <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 p-4 shadow-2xl">
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-4 mb-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600">实付金额</div>
                <div className="text-xs text-gray-500">使用{paymentMethods.find(m => m.id === selectedPayment)?.name}</div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  ¥{getActualPrice().toLocaleString()}
                </div>
              </div>
            </div>
          </div>
          
          <button
            onClick={handlePayment}
            className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold text-lg rounded-2xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
          >
            确认支付 ¥{getActualPrice().toLocaleString()}
          </button>
          
          <p className="text-xs text-gray-500 text-center mt-3 leading-relaxed">
            点击确认支付即表示
            <span className="text-blue-600 font-medium">《服务协议》</span>
            和
            <span className="text-blue-600 font-medium">《隐私政策》</span>
          </p>
        </div>
      )}
      
      {/* 底部占位 */}
      {paymentStatus === 'pending' && <div className="h-40"></div>}
    </div>
  );
};

export default Payment;
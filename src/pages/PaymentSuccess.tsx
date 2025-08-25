import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Calendar, ArrowRight, Home } from 'lucide-react';

const PaymentSuccess: React.FC = () => {
  const navigate = useNavigate();

  const handleUserInfo = () => {
    navigate('/user-info');
  };

  const handleBackHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm px-4 py-3">
        <div className="flex items-center justify-between">
          <button 
            onClick={handleBackHome}
            className="flex items-center text-gray-600 hover:text-gray-800"
          >
            <Home className="w-5 h-5 mr-2" />
            返回首页
          </button>
          <h1 className="text-lg font-semibold text-gray-800">支付成功</h1>
          <div className="w-20"></div>
        </div>
      </div>

      {/* Success Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        {/* Success Icon */}
        <div className="mb-8">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-16 h-16 text-green-500" />
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">支付成功！</h2>
            <p className="text-gray-600">您的订单已支付完成</p>
          </div>
        </div>

        {/* Order Info */}
        <div className="w-full max-w-sm bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">订单编号</span>
              <span className="text-gray-800 font-medium">FX{Date.now().toString().slice(-8)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">支付金额</span>
              <span className="text-green-600 font-bold text-lg">¥2,980</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">支付方式</span>
              <span className="text-gray-800 font-medium">微信支付</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">支付时间</span>
              <span className="text-gray-800 font-medium">
                {new Date().toLocaleString('zh-CN', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>
          </div>
        </div>



        {/* Action Buttons */}
        <div className="w-full max-w-sm space-y-3">
          <button
            onClick={handleUserInfo}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center"
          >
            <Calendar className="w-5 h-5 mr-2" />
            完善个人信息
          </button>
          
          <button
            onClick={handleBackHome}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-xl transition-colors duration-200"
          >
            返回首页
          </button>
        </div>

        {/* Tips */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            如有疑问，请联系客服：400-123-4567
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Clock, CheckCircle, AlertCircle, Loader } from 'lucide-react';

const CoachCheckin: React.FC = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isCheckingIn, setIsCheckingIn] = useState(false);
  const [checkinStep, setCheckinStep] = useState<'not-started' | 'started' | 'ended'>('not-started');
  const [checkinStatus, setCheckinStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [locationError, setLocationError] = useState<string>('');

  // 模拟当前时间段
  const currentPeriod = {
    start: '09:00',
    end: '11:00',
    type: '理论学习',
    location: '理论教室A'
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setLocationError('');
        },
        (error) => {
          console.error('获取位置失败:', error);
          setLocationError('无法获取位置信息，请检查定位权限');
        }
      );
    } else {
      setLocationError('您的浏览器不支持定位功能');
    }
  };

  const handleStartCheckin = async () => {
    if (!location) {
      setLocationError('请先获取位置信息');
      return;
    }

    setIsCheckingIn(true);
    setCheckinStatus('idle');

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setCheckinStep('started');
      setStartTime(new Date());
      setCheckinStatus('success');
      
      setTimeout(() => {
        setCheckinStatus('idle');
      }, 2000);
    } catch (error) {
      setCheckinStatus('error');
    } finally {
      setIsCheckingIn(false);
    }
  };

  const handleEndCheckin = async () => {
    if (!location) {
      setLocationError('请先获取位置信息');
      return;
    }

    setIsCheckingIn(true);
    setCheckinStatus('idle');

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setCheckinStep('ended');
      setEndTime(new Date());
      setCheckinStatus('success');
      
      setTimeout(() => {
        navigate('/coach');
      }, 2000);
    } catch (error) {
      setCheckinStatus('error');
    } finally {
      setIsCheckingIn(false);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('zh-CN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航 */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-semibold text-gray-900">教练签到</h1>
              <p className="text-sm text-gray-500">学习时间段定位签到</p>
            </div>
            <button
              onClick={() => navigate('/coach')}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              返回
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* 当前时间段信息 */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h2 className="text-base font-semibold text-gray-900 mb-4">当前学习时间段</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-900">{currentPeriod.type}</p>
                <p className="text-xs text-gray-500">{currentPeriod.location}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-blue-600">
                  {currentPeriod.start} - {currentPeriod.end}
                </p>
                <p className="text-xs text-gray-500">当前时间: {formatTime(currentTime)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* 位置信息 */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h2 className="text-base font-semibold text-gray-900 mb-4">位置信息</h2>
          
          {!location && (
            <button
              onClick={getCurrentLocation}
              className="w-full p-4 rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors"
            >
              <MapPin className="w-8 h-8 mx-auto mb-2 text-gray-400" />
              <p className="text-sm text-gray-600">点击获取当前位置</p>
            </button>
          )}

          {location && (
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">位置已获取</p>
                  <p className="text-xs text-gray-500">
                    纬度: {location.lat.toFixed(6)}, 经度: {location.lng.toFixed(6)}
                  </p>
                </div>
              </div>
            </div>
          )}

          {locationError && (
            <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <p className="text-sm text-red-600">{locationError}</p>
            </div>
          )}
        </div>

        {/* 签到按钮 */}
        <div className="space-y-4">
          {checkinStep === 'not-started' && (
            <button
              onClick={handleStartCheckin}
              disabled={!location || isCheckingIn}
              className={`w-full py-4 rounded-lg font-medium transition-colors ${
                !location || isCheckingIn
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              {isCheckingIn ? (
                <div className="flex items-center justify-center space-x-2">
                  <Loader className="w-5 h-5 animate-spin" />
                  <span>开始签到中...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span>开始签到</span>
                </div>
              )}
            </button>
          )}

          {checkinStep === 'started' && (
            <button
              onClick={handleEndCheckin}
              disabled={!location || isCheckingIn}
              className={`w-full py-4 rounded-lg font-medium transition-colors ${
                !location || isCheckingIn
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-red-600 text-white hover:bg-red-700'
              }`}
            >
              {isCheckingIn ? (
                <div className="flex items-center justify-center space-x-2">
                  <Loader className="w-5 h-5 animate-spin" />
                  <span>结束签到中...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>结束签到</span>
                </div>
              )}
            </button>
          )}

          {checkinStep === 'ended' && (
            <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-green-600">签到已完成</p>
                <p className="text-xs text-gray-500">正在返回...</p>
              </div>
            </div>
          )}

          {checkinStatus === 'success' && checkinStep !== 'ended' && (
            <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-green-600">
                  {checkinStep === 'started' ? '开始签到成功' : '签到成功'}
                </p>
              </div>
            </div>
          )}

          {checkinStatus === 'error' && (
            <div className="flex items-center space-x-3 p-4 bg-red-50 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <p className="text-sm text-red-600">签到失败，请重试</p>
            </div>
          )}
        </div>

        {/* 签到状态显示 */}
        {(startTime || endTime) && (
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">签到记录</h3>
            <div className="space-y-2">
              {startTime && (
                <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                  <span className="text-xs text-gray-600">开始时间:</span>
                  <span className="text-xs font-medium text-green-600">
                    {startTime.toLocaleTimeString('zh-CN')}
                  </span>
                </div>
              )}
              {endTime && (
                <div className="flex items-center justify-between p-2 bg-red-50 rounded">
                  <span className="text-xs text-gray-600">结束时间:</span>
                  <span className="text-xs font-medium text-red-600">
                    {endTime.toLocaleTimeString('zh-CN')}
                  </span>
                </div>
              )}
              {startTime && endTime && (
                <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
                  <span className="text-xs text-gray-600">学习时长:</span>
                  <span className="text-xs font-medium text-blue-600">
                    {Math.round((endTime.getTime() - startTime.getTime()) / 60000)}分钟
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 签到规则说明 */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-2">签到规则</h3>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>• 必须在学习时间段内开始和结束签到</li>
            <li>• 签到时需开启定位功能</li>
            <li>• 签到位置需在指定范围内</li>
            <li>• 每次学习时间段支持开始和结束两次签到</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CoachCheckin;
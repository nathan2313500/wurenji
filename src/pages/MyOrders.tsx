import React, { useState } from 'react';
import { ArrowLeft, Package, Calendar, Clock, CheckCircle, XCircle, AlertCircle, CreditCard, BookOpen, Users, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '@/store';

interface CourseOrder {
  id: string;
  courseTitle: string;
  courseImage: string;
  price: number;
  status: 'pending' | 'paid' | 'completed' | 'cancelled';
  orderTime: string;
  paymentMethod: string;
}

interface EnrollmentOrder {
  id: string;
  type: 'training' | 'exam';
  title: string;
  date: string;
  time: string;
  location: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  orderTime: string;
  fee: number;
}

const MyOrders = () => {
  const navigate = useNavigate();
  const { user } = useAppStore();
  const [activeTab, setActiveTab] = useState<'course' | 'enrollment'>('course');

  // 模拟课程订单数据
  const courseOrders: CourseOrder[] = [
    {
      id: 'CO001',
      courseTitle: '私人飞行员执照理论课程',
      courseImage: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=pilot_training_course_cockpit_view&image_size=landscape_4_3',
      price: 2999,
      status: 'paid',
      orderTime: '2024-01-15 14:30',
      paymentMethod: '微信支付'
    },
    {
      id: 'CO002',
      courseTitle: '仪表飞行规则培训',
      courseImage: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=aircraft_instrument_panel_training&image_size=landscape_4_3',
      price: 4999,
      status: 'completed',
      orderTime: '2024-01-10 09:15',
      paymentMethod: '支付宝'
    },
    {
      id: 'CO003',
      courseTitle: '航空气象学基础',
      courseImage: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=aviation_weather_meteorology_training&image_size=landscape_4_3',
      price: 1999,
      status: 'pending',
      orderTime: '2024-01-20 16:45',
      paymentMethod: '待支付'
    }
  ];

  // 模拟报名订单数据
  const enrollmentOrders: EnrollmentOrder[] = [
    {
      id: 'EO001',
      type: 'training',
      title: '飞行实操培训',
      date: '2024-02-15',
      time: '09:00-17:00',
      location: '北京通用航空培训基地',
      status: 'confirmed',
      orderTime: '2024-01-18 10:30',
      fee: 8000
    },
    {
      id: 'EO004',
      type: 'training',
      title: '视距内无人机中型培训',
      date: '2024-02-25',
      time: '09:00-17:00',
      location: '无人机培训基地',
      status: 'confirmed',
      orderTime: '2024-01-21 14:20',
      fee: 6000
    }
  ];

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'pending':
        return { icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-50', text: '待处理' };
      case 'paid':
      case 'confirmed':
        return { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50', text: status === 'paid' ? '已支付' : '已确认' };
      case 'completed':
        return { icon: CheckCircle, color: 'text-blue-600', bg: 'bg-blue-50', text: '已完成' };
      case 'cancelled':
        return { icon: XCircle, color: 'text-red-600', bg: 'bg-red-50', text: '已取消' };
      default:
        return { icon: AlertCircle, color: 'text-gray-600', bg: 'bg-gray-50', text: '未知' };
    }
  };

  const EnrollmentOrderCard = ({ order }: { order: EnrollmentOrder }) => {
    const statusConfig = getStatusConfig(order.status);
    const StatusIcon = statusConfig.icon;
    const TypeIcon = order.type === 'training' ? Users : BookOpen;

    return (
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <div className="flex items-start space-x-3">
          <div className="w-16 h-16 bg-blue-50 rounded-lg flex items-center justify-center">
            <TypeIcon className="w-8 h-8 text-blue-600" />
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-gray-800 text-sm leading-tight">{order.title}</h3>
              <div className={`flex items-center space-x-1 px-2 py-1 rounded-full ${statusConfig.bg}`}>
                <StatusIcon className={`w-3 h-3 ${statusConfig.color}`} />
                <span className={`text-xs font-medium ${statusConfig.color}`}>
                  {statusConfig.text}
                </span>
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">订单号: {order.id}</span>
                <span className="text-sm font-semibold text-red-600">¥{order.fee}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">下单时间: {order.orderTime}</span>
                <span className="text-xs text-gray-500">{order.date} {order.time}</span>
              </div>
              <div className="text-xs text-gray-500">地点: {order.location}</div>
            </div>
          </div>
        </div>
        
        <div className="flex space-x-2 mt-3 pt-3 border-t border-gray-100">
          {order.status === 'pending' && (
            <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
              确认报名
            </button>
          )}
          {order.status === 'confirmed' && (
            <button className="flex-1 bg-green-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
              查看详情
            </button>
          )}
          <button className="flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-600 rounded-lg text-sm hover:bg-gray-50 transition-colors">
            <MessageCircle className="w-4 h-4 mr-1" />
            客服
          </button>
        </div>
      </div>
    );
  };

  const CourseOrderCard = ({ order }: { order: CourseOrder }) => {
    const statusConfig = getStatusConfig(order.status);
    const StatusIcon = statusConfig.icon;

    return (
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <div className="flex items-start space-x-3">
          <img
            src={order.courseImage}
            alt={order.courseTitle}
            className="w-16 h-16 rounded-lg object-cover"
          />
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-gray-800 text-sm leading-tight">{order.courseTitle}</h3>
              <div className={`flex items-center space-x-1 px-2 py-1 rounded-full ${statusConfig.bg}`}>
                <StatusIcon className={`w-3 h-3 ${statusConfig.color}`} />
                <span className={`text-xs font-medium ${statusConfig.color}`}>
                  {statusConfig.text}
                </span>
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">订单号: {order.id}</span>
                <span className="text-sm font-semibold text-red-600">¥{order.price}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">下单时间: {order.orderTime}</span>
                <span className="text-xs text-gray-500">{order.paymentMethod}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex space-x-2 mt-3 pt-3 border-t border-gray-100">
          {order.status === 'pending' && (
            <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
              立即支付
            </button>
          )}
          {order.status === 'paid' && (
            <button 
              onClick={() => navigate('/learning')}
              className="flex-1 bg-green-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
            >
              开始学习
            </button>
          )}
          <button className="px-4 py-2 border border-gray-300 text-gray-600 rounded-lg text-sm hover:bg-gray-50 transition-colors">
            查看详情
          </button>
        </div>
      </div>
    );
  };



  return (
    <div className="min-h-screen bg-gray-50">
      {/* 头部 */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-lg font-semibold text-gray-800">我的订单</h1>
        </div>
      </div>

      {/* 标签页 */}
      <div className="bg-white border-b border-gray-200">
        <div className="flex">
          <button
            onClick={() => setActiveTab('course')}
            className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
              activeTab === 'course'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Package className="w-4 h-4 inline mr-1" />
            课程订单
          </button>
          <button
            onClick={() => setActiveTab('enrollment')}
            className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
              activeTab === 'enrollment'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Calendar className="w-4 h-4 inline mr-1" />
            报名订单
          </button>
        </div>
      </div>

      {/* 订单列表 */}
      <div className="p-4">
        {activeTab === 'course' ? (
          <div className="space-y-4">
            {courseOrders.map((order) => (
              <CourseOrderCard key={order.id} order={order} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {enrollmentOrders.map((order) => (
              <EnrollmentOrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </div>

      {/* 空状态 */}
      {((activeTab === 'course' && courseOrders.length === 0) ||
        (activeTab === 'enrollment' && enrollmentOrders.length === 0)) && (
        <div className="flex flex-col items-center justify-center py-16">
          <Package className="w-16 h-16 text-gray-300 mb-4" />
          <p className="text-gray-500 text-center">
            暂无{activeTab === 'course' ? '课程' : '报名'}订单
          </p>
          <button
            onClick={() => navigate(activeTab === 'course' ? '/courses' : '/enrollment')}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            去{activeTab === 'course' ? '选课' : '报名'}
          </button>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
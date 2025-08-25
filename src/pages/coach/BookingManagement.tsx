import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, User, Phone, CheckCircle, XCircle, AlertCircle, ArrowLeft } from 'lucide-react';

interface Booking {
  id: string;
  studentName: string;
  studentPhone: string;
  date: string;
  time: string;
  subject: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  notes?: string;
}

const BookingManagement: React.FC = () => {
  const navigate = useNavigate();
  
  // 筛选状态
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('all');

  // 模拟预约数据
  const [bookings] = useState<Booking[]>([
    {
      id: '1',
      studentName: '张三',
      studentPhone: '138****1234',
      date: '2024-01-15',
      time: '09:00-11:00',
      subject: '理论课程',
      status: 'pending',
      notes: '学员首次预约理论课程'
    },
    {
      id: '2',
      studentName: '李四',
      studentPhone: '139****5678',
      date: '2024-01-15',
      time: '14:00-16:00',
      subject: '实操训练',
      status: 'confirmed',
      notes: '学员已完成理论学习'
    },
    {
      id: '3',
      studentName: '王五',
      studentPhone: '137****9012',
      date: '2024-01-16',
      time: '10:00-12:00',
      subject: '模拟飞行',
      status: 'pending',
      notes: '需要确认设备可用性'
    },
    {
      id: '4',
      studentName: '赵六',
      studentPhone: '136****3456',
      date: '2024-01-14',
      time: '15:00-17:00',
      subject: '理论考试',
      status: 'completed'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return '待确认';
      case 'confirmed': return '已确认';
      case 'cancelled': return '已取消';
      case 'completed': return '已完成';
      default: return '未知';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <AlertCircle className="w-4 h-4" />;
      case 'confirmed': return <CheckCircle className="w-4 h-4" />;
      case 'cancelled': return <XCircle className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const filteredBookings = bookings.filter(booking => {
    // 基础状态筛选
    if (booking.status !== 'confirmed') return false;
    
    // 日期筛选
    if (selectedDate && booking.date !== selectedDate) return false;
    
    // 时间段筛选
    if (selectedTimeSlot !== 'all') {
      const bookingTime = booking.time.split('-')[0]; // 获取开始时间
      const hour = parseInt(bookingTime.split(':')[0]);
      
      switch (selectedTimeSlot) {
        case 'morning':
          if (hour < 9 || hour >= 12) return false;
          break;
        case 'afternoon':
          if (hour < 13 || hour >= 17) return false;
          break;
        case 'evening':
          if (hour < 18 || hour >= 21) return false;
          break;
      }
    }
    
    return true;
  });

  const handleBookingAction = (bookingId: string, action: 'confirm' | 'cancel') => {
    // 这里应该调用API更新预约状态
    console.log(`${action} booking ${bookingId}`);
  };

  const handleBookingDetails = (bookingId: string) => {
    navigate(`/coach/booking-details/${bookingId}`);
  };

  // 根据预约日期计算期数标签（年份+期数+班级）
  const getPeriodLabel = (bookingDate: string) => {
    const date = new Date(bookingDate);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    
    // 计算期数
    let period = 1;
    if (month >= 4 && month <= 6) period = 2;
    else if (month >= 7 && month <= 9) period = 3;
    else if (month >= 10 && month <= 12) period = 4;
    
    // 根据月份分配班级（简单的分配逻辑）
    const classes = ['1班', '2班', '3班'];
    const classIndex = (month - 1) % classes.length;
    const className = classes[classIndex];
    
    return `${year}第${period}期${className}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部标题栏 */}
      <div className="bg-white shadow-sm">
        <div className="px-4 py-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xl font-semibold text-gray-800">已确认预约</h1>

            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* 日期和时间段筛选 */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h3 className="text-sm font-medium text-gray-800 mb-3 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            筛选条件
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {/* 日期选择器 */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                选择日期
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            {/* 时间段选择器 */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                时间段
              </label>
              <select
                value={selectedTimeSlot}
                onChange={(e) => setSelectedTimeSlot(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">全部时间段</option>
                <option value="morning">上午 (09:00-12:00)</option>
                <option value="afternoon">下午 (13:00-17:00)</option>
                <option value="evening">晚上 (18:00-21:00)</option>
              </select>
            </div>
            
            {/* 清除筛选按钮 */}
            {(selectedDate || selectedTimeSlot !== 'all') && (
              <button
                onClick={() => {
                  setSelectedDate('');
                  setSelectedTimeSlot('all');
                }}
                className="w-full py-2 px-3 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
              >
                <XCircle className="w-4 h-4" />
                清除筛选
              </button>
            )}
          </div>
        </div>

        {/* 预约统计 */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  {selectedDate ? `${selectedDate}预约` : '今日已确认'}
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {selectedDate 
                    ? filteredBookings.filter(b => b.date === selectedDate).length
                    : filteredBookings.filter(b => b.date === new Date().toISOString().split('T')[0]).length
                  }
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  {(selectedDate || selectedTimeSlot !== 'all') ? '筛选结果' : '总已确认'}
                </p>
                <p className="text-2xl font-bold text-blue-600">{filteredBookings.length}</p>
              </div>
              <Calendar className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>

        {/* 预约列表 */}
        <div className="space-y-3">
          {filteredBookings.length === 0 ? (
            <div className="bg-white rounded-lg p-8 text-center shadow-sm">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500">
                {(selectedDate || selectedTimeSlot !== 'all') 
                  ? '没有符合筛选条件的预约记录' 
                  : '暂无预约记录'
                }
              </p>
              {(selectedDate || selectedTimeSlot !== 'all') && (
                <button
                  onClick={() => {
                    setSelectedDate('');
                    setSelectedTimeSlot('all');
                  }}
                  className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  清除筛选条件
                </button>
              )}
            </div>
          ) : (
            filteredBookings.map(booking => (
              <div key={booking.id} className="bg-white rounded-lg p-4 shadow-sm relative">
                {/* 期数标签 */}
                <div className="absolute top-3 right-3">
                  <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                    {getPeriodLabel(booking.date)}
                  </span>
                </div>
                
                <div className="flex items-start justify-between mb-3 pr-16">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <User className="w-4 h-4 text-gray-500" />
                      <span className="font-medium text-gray-800">{booking.studentName}</span>
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                        getStatusColor(booking.status)
                      }`}>
                        {getStatusIcon(booking.status)}
                        {getStatusText(booking.status)}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                      <div className="flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        <span>{booking.studentPhone}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-700">{booking.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-700">{booking.time}</span>
                  </div>
                </div>

                <div className="mb-3">
                  <p className="text-sm font-medium text-gray-800 mb-1">课程：{booking.subject}</p>
                  
                </div>


              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingManagement;
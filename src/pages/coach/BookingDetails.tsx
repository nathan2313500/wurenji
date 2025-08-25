import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, User, Phone, Calendar, Clock, BookOpen, MapPin, Edit3, Save, X, CheckCircle, XCircle } from 'lucide-react';

interface BookingDetail {
  id: string;
  studentName: string;
  studentPhone: string;
  studentEmail: string;
  date: string;
  time: string;
  subject: string;
  location: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  notes: string;
  studentNotes: string;
  createdAt: string;
  updatedAt: string;
}

const BookingDetails: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [isEditing, setIsEditing] = useState(false);
  const [editedNotes, setEditedNotes] = useState('');

  // 模拟预约详情数据
  const [booking, setBooking] = useState<BookingDetail>({
    id: id || '1',
    studentName: '张三',
    studentPhone: '138****1234',
    studentEmail: 'zhangsan@example.com',
    date: '2024-01-15',
    time: '09:00-11:00',
    subject: '理论课程',
    location: '教室A-101',
    status: 'pending',
    notes: '学员首次预约理论课程，需要准备基础教材',
    studentNotes: '希望重点学习飞行原理部分',
    createdAt: '2024-01-10 14:30',
    updatedAt: '2024-01-12 09:15'
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'confirmed': return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
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

  const handleStatusChange = (newStatus: 'confirmed' | 'cancelled') => {
    setBooking(prev => ({
      ...prev,
      status: newStatus,
      updatedAt: new Date().toLocaleString('zh-CN')
    }));
  };

  const handleSaveNotes = () => {
    setBooking(prev => ({
      ...prev,
      notes: editedNotes,
      updatedAt: new Date().toLocaleString('zh-CN')
    }));
    setIsEditing(false);
  };

  const handleEditNotes = () => {
    setEditedNotes(booking.notes);
    setIsEditing(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航 */}
      <div className="bg-white shadow-sm">
        <div className="flex items-center justify-between p-4">
          <button 
            onClick={() => navigate('/coach/booking-management')}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-lg font-semibold text-gray-800">预约详情</h1>
          <div className="w-9"></div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* 状态卡片 */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">预约状态</h2>
            <div className={`px-3 py-1 rounded-full border text-sm font-medium ${
              getStatusColor(booking.status)
            }`}>
              {getStatusText(booking.status)}
            </div>
          </div>
          
          {booking.status === 'pending' && (
            <div className="flex gap-3">
              <button
                onClick={() => handleStatusChange('confirmed')}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors active:scale-95"
              >
                <CheckCircle className="w-4 h-4" />
                确认预约
              </button>
              <button
                onClick={() => handleStatusChange('cancelled')}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors active:scale-95"
              >
                <XCircle className="w-4 h-4" />
                拒绝预约
              </button>
            </div>
          )}
        </div>

        {/* 学员信息 */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">学员信息</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">姓名</p>
                <p className="font-medium text-gray-800">{booking.studentName}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">手机号</p>
                <p className="font-medium text-gray-800">{booking.studentPhone}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-5 h-5 text-gray-500 text-center">@</span>
              <div>
                <p className="text-sm text-gray-600">邮箱</p>
                <p className="font-medium text-gray-800">{booking.studentEmail}</p>
              </div>
            </div>
          </div>
        </div>

        {/* 预约信息 */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">预约信息</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">预约日期</p>
                <p className="font-medium text-gray-800">{booking.date}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">预约时间</p>
                <p className="font-medium text-gray-800">{booking.time}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <BookOpen className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">课程类型</p>
                <p className="font-medium text-gray-800">{booking.subject}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">上课地点</p>
                <p className="font-medium text-gray-800">{booking.location}</p>
              </div>
            </div>
          </div>
        </div>

        {/* 学员备注 */}
        {booking.studentNotes && (
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">学员备注</h3>
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-gray-700">{booking.studentNotes}</p>
            </div>
          </div>
        )}

        {/* 教练备注 */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-gray-800">教练备注</h3>
            {!isEditing && (
              <button
                onClick={handleEditNotes}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <Edit3 className="w-4 h-4" />
              </button>
            )}
          </div>
          
          {isEditing ? (
            <div className="space-y-3">
              <textarea
                value={editedNotes}
                onChange={(e) => setEditedNotes(e.target.value)}
                placeholder="添加教练备注..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={4}
              />
              <div className="flex gap-2">
                <button
                  onClick={handleSaveNotes}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  保存
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                >
                  <X className="w-4 h-4" />
                  取消
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-gray-700">
                {booking.notes || '暂无备注'}
              </p>
            </div>
          )}
        </div>

        {/* 时间信息 */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">时间记录</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>创建时间：</span>
              <span>{booking.createdAt}</span>
            </div>
            <div className="flex justify-between">
              <span>更新时间：</span>
              <span>{booking.updatedAt}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
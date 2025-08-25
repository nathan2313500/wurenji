import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Clock, MapPin, Phone, Calendar } from 'lucide-react';
import { mockInstitutions, mockVenueInstructors, mockTimeSlots } from '@/data/mockData';

interface Coach {
  id: string;
  name: string;
  avatar: string;
  title: string;
  experience: string;
  rating: number;
  specialties: string[];
}

interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
  date: string;
}

const BookingDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedCoach, setSelectedCoach] = useState<string>('');
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('2024-02-20');

  // 获取培训场地信息
  const venue = mockInstitutions.find(inst => inst.id === id);
  const coaches = mockVenueInstructors[id as keyof typeof mockVenueInstructors] || [];
  const timeSlots = mockTimeSlots[id as keyof typeof mockTimeSlots] || [];

  // 根据选择的日期过滤时段
  const filteredSlots = timeSlots.filter(slot => slot.date === selectedDate);

  const handleBooking = () => {
    if (!selectedCoach || !selectedSlot) {
      alert('请选择教练和预约时段');
      return;
    }
    alert('预约成功！我们会尽快联系您确认详细信息。');
    navigate('/booking');
  };

  if (!venue) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-600">培训场地不存在</h2>
          <button 
            onClick={() => navigate('/booking')}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg"
          >
            返回预约页面
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 头部 */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white">
        <div className="px-4 py-4">
          <div className="flex items-center gap-3 mb-4">
            <button 
              onClick={() => navigate('/booking')}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-semibold">培训场地详情</h1>
          </div>
          
          {/* 场地信息卡片 */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <div className="flex gap-4">
              <img 
                src={venue.image} 
                alt={venue.name}
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h2 className="text-xl font-bold mb-1">{venue.name}</h2>
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm opacity-90">{venue.address}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">{venue.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{venue.distance}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* 选择教练 */}
        <div className="bg-white rounded-xl p-4">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <div className="w-1 h-5 bg-green-500 rounded"></div>
            选择教练
          </h3>
          <div className="space-y-3">
            {coaches.map((coach: Coach) => (
              <div 
                key={coach.id}
                onClick={() => setSelectedCoach(coach.id)}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedCoach === coach.id 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-gray-200 hover:border-green-300'
                }`}
              >
                <div className="flex gap-3">
                  <img 
                    src={coach.avatar} 
                    alt={coach.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold">{coach.name}</h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{coach.title}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{coach.rating}</span>
                      </div>
                      <span>{coach.experience}</span>
                    </div>
                    <div className="flex gap-2 mt-2">
                      {coach.specialties.map((specialty, index) => (
                        <span 
                          key={index}
                          className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 选择日期 */}
        <div className="bg-white rounded-xl p-4">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <div className="w-1 h-5 bg-green-500 rounded"></div>
            选择日期
          </h3>
          <div className="flex gap-3">
            {['2024-02-20', '2024-02-21'].map(date => (
              <button
                key={date}
                onClick={() => setSelectedDate(date)}
                className={`px-4 py-2 rounded-lg border-2 transition-all ${
                  selectedDate === date
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-gray-200 hover:border-green-300'
                }`}
              >
                {new Date(date).toLocaleDateString('zh-CN', { 
                  month: 'short', 
                  day: 'numeric',
                  weekday: 'short'
                })}
              </button>
            ))}
          </div>
        </div>

        {/* 选择时段 */}
        <div className="bg-white rounded-xl p-4">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <div className="w-1 h-5 bg-green-500 rounded"></div>
            选择时段
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {filteredSlots.map((slot: TimeSlot) => (
              <button
                key={slot.id}
                onClick={() => slot.available && setSelectedSlot(slot.id)}
                disabled={!slot.available}
                className={`p-3 rounded-lg border-2 transition-all ${
                  !slot.available
                    ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                    : selectedSlot === slot.id
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-gray-200 hover:border-green-300'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span className="font-medium">{slot.time}</span>
                </div>
                {!slot.available && (
                  <span className="text-xs text-gray-400 mt-1 block">已预约</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* 预约按钮 */}
        <div className="bg-white rounded-xl p-4">
          <button
            onClick={handleBooking}
            disabled={!selectedCoach || !selectedSlot}
            className={`w-full py-4 rounded-xl font-semibold transition-all ${
              selectedCoach && selectedSlot
                ? 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {selectedCoach && selectedSlot ? '确认预约' : '请选择教练和时段'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingDetail;
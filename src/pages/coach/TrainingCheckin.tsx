import React, { useState } from 'react';
import { UserCheck, Search, Clock, User, CheckCircle, AlertCircle, ArrowLeft, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Student {
  id: string;
  name: string;
  phone: string;
  course: string;
  scheduledTime: string;
  status: 'scheduled' | 'checked-in' | 'absent';
  checkinTime?: string;
}

const TrainingCheckin: React.FC = () => {
  const navigate = useNavigate();
  // 移除扫码签到相关状态
  const [searchTerm, setSearchTerm] = useState('');
  // 日期选择器状态，默认为当前日期
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });

  // 手动签到功能
  const handleManualCheckin = (studentId: string) => {
    setStudents(prev => prev.map(student => {
      if (student.id === studentId && student.status === 'scheduled') {
        const now = new Date();
        const checkinTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
        return {
          ...student,
          status: 'checked-in' as const,
          checkinTime
        };
      }
      return student;
    }));
  };

  // 模拟学员数据
  const [students, setStudents] = useState<Student[]>([
    {
      id: '1',
      name: '张三',
      phone: '138****1234',
      course: '理论课程',
      scheduledTime: '09:00-11:00',
      status: 'scheduled'
    },
    {
      id: '2',
      name: '李四',
      phone: '139****5678',
      course: '实操训练',
      scheduledTime: '14:00-16:00',
      status: 'checked-in',
      checkinTime: '13:55'
    },
    {
      id: '3',
      name: '王五',
      phone: '137****9012',
      course: '模拟飞行',
      scheduledTime: '10:00-12:00',
      status: 'scheduled'
    },
    {
      id: '4',
      name: '赵六',
      phone: '136****3456',
      course: '理论考试',
      scheduledTime: '15:00-17:00',
      status: 'absent'
    }
  ]);



  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-yellow-100 text-yellow-800';
      case 'checked-in': return 'bg-green-100 text-green-800';
      case 'absent': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'scheduled': return '待签到';
      case 'checked-in': return '已签到';
      case 'absent': return '缺席';
      default: return '未知';
    }
  };

  // 根据当前日期计算期数标签（年份+期数+班级）
  const getPeriodLabel = (studentId: string) => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    
    // 计算期数
    let period = 1;
    if (month >= 4 && month <= 6) period = 2;
    else if (month >= 7 && month <= 9) period = 3;
    else if (month >= 10 && month <= 12) period = 4;
    
    // 根据学员ID分配班级（简单的分配逻辑）
    const classes = ['1班', '2班', '3班'];
    const classIndex = parseInt(studentId) % classes.length;
    const className = classes[classIndex];
    
    return `${year}第${period}期${className}`;
  };

  // 根据搜索词和选择日期筛选学员
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.course.toLowerCase().includes(searchTerm.toLowerCase());
    
    // 这里可以根据实际需求添加日期筛选逻辑
    // 目前显示所有学员，实际应用中可以根据selectedDate筛选对应日期的预约
    const matchesDate = true; // 简化处理，实际应根据学员的预约日期进行筛选
    
    return matchesSearch && matchesDate;
  });

  const todayStats = {
    total: students.length,
    checkedIn: students.filter(s => s.status === 'checked-in').length,
    scheduled: students.filter(s => s.status === 'scheduled').length,
    absent: students.filter(s => s.status === 'absent').length
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
              <h1 className="text-xl font-semibold text-gray-800">培训签到</h1>
              <p className="text-sm text-gray-600 mt-1">管理学员签到和出勤记录</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">


        {/* 签到统计 */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">已签到</p>
                <p className="text-2xl font-bold text-green-600">{todayStats.checkedIn}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">待签到</p>
                <p className="text-2xl font-bold text-yellow-600">{todayStats.scheduled}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-yellow-600" />
            </div>
          </div>
        </div>

        {/* 手动签到界面 */}
        <div className="space-y-4">
            {/* 搜索和日期选择区域 */}
            <div className="bg-white rounded-lg p-4 shadow-sm space-y-3">
              {/* 日期选择器 */}
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              {/* 搜索框 */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="搜索学员姓名"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* 学员列表 */}
            <div className="space-y-3">
              {filteredStudents.length === 0 ? (
                <div className="bg-white rounded-lg p-8 text-center shadow-sm">
                  <User className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-500">暂无学员记录</p>
                </div>
              ) : (
                filteredStudents.map(student => (
                  <div key={student.id} className="bg-white rounded-lg p-4 shadow-sm relative">
                    {/* 期数标签 */}
                    <div className="absolute top-3 right-3">
                      <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                        {getPeriodLabel(student.id)}
                      </span>
                    </div>
                    
                    <div className="flex items-start justify-between mb-3 pr-16">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <User className="w-4 h-4 text-gray-500" />
                          <span className="font-medium text-gray-800">{student.name}</span>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            getStatusColor(student.status)
                          }`}>
                            {getStatusText(student.status)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{student.phone}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{student.scheduledTime}</span>
                          </div>
                        </div>
                        {student.checkinTime && (
                          <p className="text-xs text-green-600 mt-1">
                            签到时间: {student.checkinTime}
                          </p>
                        )}
                      </div>
                    </div>


                  </div>
                ))
              )}
            </div>
          </div>
      </div>
    </div>
  );
};

export default TrainingCheckin;
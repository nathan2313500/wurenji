import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Play, Clock, Trophy, TrendingUp, Calendar, User, BarChart3, CheckCircle, PlayCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '@/store';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface PurchasedCourse {
  id: string;
  title: string;
  image: string;
  progress: number;
  totalChapters: number;
  completedChapters: number;
  lastStudyTime: string;
  duration: string;
}

interface ExamRecord {
  id: string;
  examName: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  date: string;
  duration: string;
}

interface CoachAppointment {
  id: string;
  coachName: string;
  coachAvatar: string;
  subject: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  location: string;
}

const MyLearning = () => {
  const navigate = useNavigate();
  const { user } = useAppStore();
  const [activeTab, setActiveTab] = useState<'courses' | 'exams' | 'appointments'>('courses');

  // 模拟已购课程数据
  const purchasedCourses: PurchasedCourse[] = [
    {
      id: '1',
      title: '私人飞行员执照理论课程',
      image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=pilot_training_course_cockpit_view&image_size=landscape_4_3',
      progress: 75,
      totalChapters: 12,
      completedChapters: 9,
      lastStudyTime: '2024-01-20 14:30',
      duration: '24小时'
    },
    {
      id: '2',
      title: '仪表飞行规则培训',
      image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=aircraft_instrument_panel_training&image_size=landscape_4_3',
      progress: 100,
      totalChapters: 8,
      completedChapters: 8,
      lastStudyTime: '2024-01-18 16:45',
      duration: '16小时'
    },
    {
      id: '3',
      title: '航空气象学基础',
      image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=aviation_weather_meteorology_training&image_size=landscape_4_3',
      progress: 30,
      totalChapters: 10,
      completedChapters: 3,
      lastStudyTime: '2024-01-15 10:20',
      duration: '20小时'
    }
  ];

  // 模拟考试记录数据
  const examRecords: ExamRecord[] = [
    {
      id: '1',
      examName: 'PPL理论模拟考试',
      score: 85,
      totalQuestions: 100,
      correctAnswers: 85,
      date: '2024-01-20',
      duration: '120分钟'
    },
    {
      id: '2',
      examName: '航空法规专项练习',
      score: 92,
      totalQuestions: 50,
      correctAnswers: 46,
      date: '2024-01-18',
      duration: '60分钟'
    },
    {
      id: '3',
      examName: '飞行原理测试',
      score: 78,
      totalQuestions: 80,
      correctAnswers: 62,
      date: '2024-01-15',
      duration: '90分钟'
    },
    {
      id: '4',
      examName: '气象知识练习',
      score: 88,
      totalQuestions: 60,
      correctAnswers: 53,
      date: '2024-01-12',
      duration: '75分钟'
    },
    {
      id: '5',
      examName: '导航系统测试',
      score: 95,
      totalQuestions: 40,
      correctAnswers: 38,
      date: '2024-01-10',
      duration: '50分钟'
    }
  ];

  // 成绩曲线数据
  const scoreChartData = examRecords.map((record, index) => ({
    exam: `考试${index + 1}`,
    score: record.score,
    date: record.date
  })).reverse();

  // 模拟教练预约记录
  const coachAppointments: CoachAppointment[] = [
    {
      id: '1',
      coachName: '张教练',
      coachAvatar: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=professional_flight_instructor_portrait&image_size=square',
      subject: '飞行实操指导',
      date: '2024-01-25',
      time: '09:00-11:00',
      status: 'upcoming',
      location: '北京通用航空培训基地'
    },
    {
      id: '2',
      coachName: '李教练',
      coachAvatar: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=experienced_pilot_instructor_headshot&image_size=square',
      subject: '仪表飞行训练',
      date: '2024-01-20',
      time: '14:00-16:00',
      status: 'completed',
      location: '飞行模拟器中心'
    },
    {
      id: '3',
      coachName: '王教练',
      coachAvatar: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=senior_aviation_trainer_portrait&image_size=square',
      subject: '理论知识答疑',
      date: '2024-01-15',
      time: '10:00-12:00',
      status: 'completed',
      location: '在线视频通话'
    }
  ];

  const CourseCard = ({ course }: { course: PurchasedCourse }) => {
    return (
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <div className="flex items-start space-x-3">
          <img
            src={course.image}
            alt={course.title}
            className="w-16 h-16 rounded-lg object-cover"
          />
          <div className="flex-1">
            <h3 className="font-semibold text-gray-800 mb-2 leading-tight">{course.title}</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">学习进度</span>
                <span className="font-medium text-blue-600">{course.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{course.completedChapters}/{course.totalChapters} 章节</span>
                <span>总时长: {course.duration}</span>
              </div>
              <div className="flex items-center text-xs text-gray-500">
                <Clock className="w-3 h-3 mr-1" />
                <span>最后学习: {course.lastStudyTime}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex space-x-2 mt-4 pt-3 border-t border-gray-100">
          <button 
            onClick={() => navigate(`/course/${course.id}`)}
            className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
          >
            <PlayCircle className="w-4 h-4 mr-1" />
            {course.progress === 100 ? '复习课程' : '继续学习'}
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-600 rounded-lg text-sm hover:bg-gray-50 transition-colors">
            查看详情
          </button>
        </div>
      </div>
    );
  };

  const ExamRecordCard = ({ record }: { record: ExamRecord }) => {
    const getScoreColor = (score: number) => {
      if (score >= 90) return 'text-green-600';
      if (score >= 80) return 'text-blue-600';
      if (score >= 70) return 'text-yellow-600';
      return 'text-red-600';
    };

    return (
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
              <Trophy className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">{record.examName}</h3>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span>{record.date}</span>
                <span>用时: {record.duration}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className={`text-2xl font-bold ${getScoreColor(record.score)}`}>
              {record.score}
            </div>
            <div className="text-xs text-gray-500">分</div>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="text-sm text-gray-600">
            答对 {record.correctAnswers}/{record.totalQuestions} 题
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-xs bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
              查看解析
            </button>
            <button className="px-3 py-1 text-xs bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
              重新考试
            </button>
          </div>
        </div>
      </div>
    );
  };

  const AppointmentCard = ({ appointment }: { appointment: CoachAppointment }) => {
    const getStatusColor = (status: string) => {
      switch (status) {
        case 'upcoming': return 'bg-blue-50 text-blue-600';
        case 'completed': return 'bg-green-50 text-green-600';
        case 'cancelled': return 'bg-red-50 text-red-600';
        default: return 'bg-gray-50 text-gray-600';
      }
    };

    const getStatusText = (status: string) => {
      switch (status) {
        case 'upcoming': return '即将开始';
        case 'completed': return '已完成';
        case 'cancelled': return '已取消';
        default: return '未知';
      }
    };

    return (
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <div className="flex items-start space-x-3">
          <img
            src={appointment.coachAvatar}
            alt={appointment.coachName}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-semibold text-gray-800">{appointment.coachName}</h3>
                <p className="text-sm text-gray-600">{appointment.subject}</p>
              </div>
              <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getStatusColor(appointment.status)}`}>
                {getStatusText(appointment.status)}
              </span>
            </div>
            
            <div className="space-y-1 text-sm text-gray-600">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{appointment.date} {appointment.time}</span>
              </div>
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                <span>{appointment.location}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex space-x-2 mt-4 pt-3 border-t border-gray-100">
          {appointment.status === 'upcoming' && (
            <>
              <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                查看详情
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-600 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                取消预约
              </button>
            </>
          )}
          {appointment.status === 'completed' && (
            <>
              <button className="flex-1 bg-green-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
                查看记录
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-600 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                再次预约
              </button>
            </>
          )}
          {appointment.status === 'cancelled' && (
            <button className="flex-1 bg-gray-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors">
              重新预约
            </button>
          )}
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
          <h1 className="text-lg font-semibold text-gray-800">我的学习</h1>
        </div>
      </div>

      {/* 标签页 */}
      <div className="bg-white border-b border-gray-200">
        <div className="flex">
          <button
            onClick={() => setActiveTab('courses')}
            className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
              activeTab === 'courses'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <BookOpen className="w-4 h-4 inline mr-1" />
            已购课程
          </button>
          <button
            onClick={() => setActiveTab('exams')}
            className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
              activeTab === 'exams'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <BarChart3 className="w-4 h-4 inline mr-1" />
            考试记录
          </button>
          <button
            onClick={() => setActiveTab('appointments')}
            className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
              activeTab === 'appointments'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <User className="w-4 h-4 inline mr-1" />
            教练预约
          </button>
        </div>
      </div>

      {/* 内容区域 */}
      <div className="p-4">
        {activeTab === 'courses' && (
          <div className="space-y-4">
            {purchasedCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}

        {activeTab === 'exams' && (
          <div className="space-y-6">
            {/* 成绩曲线图 */}
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex items-center space-x-2 mb-4">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-semibold text-gray-800">成绩趋势</h2>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={scoreChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="exam" 
                      stroke="#666"
                      fontSize={12}
                    />
                    <YAxis 
                      domain={[0, 100]}
                      stroke="#666"
                      fontSize={12}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: '#fff',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="score" 
                      stroke="#3b82f6" 
                      strokeWidth={3}
                      dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* 考试记录列表 */}
            <div className="space-y-4">
              {examRecords.map((record) => (
                <ExamRecordCard key={record.id} record={record} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'appointments' && (
          <div className="space-y-4">
            {coachAppointments.map((appointment) => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyLearning;
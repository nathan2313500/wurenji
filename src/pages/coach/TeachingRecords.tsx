import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Calendar, Clock, User, Search, Plus, Edit3, Eye, Filter, ArrowLeft } from 'lucide-react';

interface TeachingRecord {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  studentName: string;
  studentId: string;
  studentSession: string;
  content: string;
  progress: string;
  homework?: string;
  nextPlan?: string;
  rating: number;
  notes?: string;
  attachments?: string[];
  status: 'completed' | 'in_progress' | 'cancelled';
}

const TeachingRecords: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSession, setSelectedSession] = useState('20250101');
  const [selectedDate, setSelectedDate] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [viewingRecord, setViewingRecord] = useState<string | null>(null);
  
  // 模拟教学记录数据
  const [records, setRecords] = useState<TeachingRecord[]>([
    {
      id: '1',
      date: '2024-01-15',
      startTime: '09:00',
      endTime: '11:00',
      studentName: '张三',
      studentId: 'S001',
      studentSession: '20250101',
      content: '飞行基础理论，航空法规学习',
      progress: '掌握基本概念，需要加强法规记忆',
      homework: '复习航空法规第3-5章',
      nextPlan: '下节课进行模拟考试',
      rating: 4,
      notes: '学习态度认真，理解能力较强',
      status: 'completed'
    },
    {
      id: '2',
      date: '2024-01-15',
      startTime: '14:00',
      endTime: '16:00',
      studentName: '李四',
      studentId: 'S002',
      studentSession: '20240301',
      content: '起飞降落练习，基本操作训练',
      progress: '起飞技术熟练，降落需要改进',
      homework: '观看降落技术视频',
      nextPlan: '重点练习降落技术',
      rating: 3,
      notes: '操作较为紧张，需要放松心态',
      status: 'completed'
    },
    {
      id: '3',
      date: '2024-01-14',
      startTime: '10:00',
      endTime: '12:00',
      studentName: '王五',
      studentId: 'S003',
      studentSession: '20240201',
      content: '复杂天气条件下的飞行模拟',
      progress: '应对能力有所提升，决策速度需要加快',
      homework: '练习紧急情况处理程序',
      nextPlan: '进行夜间飞行模拟',
      rating: 4,
      notes: '技术水平稳步提升',
      status: 'completed'
    },
    {
      id: '4',
      date: '2024-01-16',
      startTime: '15:00',
      endTime: '17:00',
      studentName: '赵六',
      studentId: 'S004',
      studentSession: '20240101',
      content: '气象学基础知识',
      progress: '应对能力有所提升，决策速度需要加快',
      homework: '练习紧急情况处理程序',
      nextPlan: '进行夜间飞行模拟',
      rating: 4,
      notes: '技术水平稳步提升',
      status: 'completed'
    },
    {
      id: '5',
      date: '2024-01-17',
      startTime: '09:00',
      endTime: '11:00',
      studentName: '陈七',
      studentId: 'S005',
      studentSession: '20250101',
      content: '模拟飞行训练',
      progress: '正在进行中',
      rating: 0,
      status: 'in_progress'
    }
  ]);

  const [newRecord, setNewRecord] = useState({
    date: new Date().toISOString().split('T')[0],
    startTime: '',
    endTime: '',
    studentName: '',
    studentId: '',
    studentSession: '',
    content: '',
    progress: '',
    homework: '',
    nextPlan: '',
    rating: 5,
    notes: ''
  });

  const studentSessions = ['20250101', '20240301', '20240201', '20240101', '20230301'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return '已完成';
      case 'in-progress': return '进行中';
      case 'cancelled': return '已取消';
      default: return '未知';
    }
  };

  // 根据记录日期计算期数标签（年份+期数+班级）
  const getPeriodLabel = (recordDate: string) => {
    const date = new Date(recordDate);
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

  const getRatingStars = (rating: number) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  const filteredRecords = records.filter(record => {
    const matchesSearch = record.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.studentSession.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSession = selectedSession === 'all' || record.studentSession === selectedSession;
    const matchesDate = !selectedDate || record.date === selectedDate;
    
    return matchesSearch && matchesSession && matchesDate;
  });

  const handleAddRecord = () => {
    if (!newRecord.studentName || !newRecord.studentSession || !newRecord.content) {
      alert('请填写必要信息');
      return;
    }

    const record: TeachingRecord = {
      id: Date.now().toString(),
      ...newRecord,
      status: 'completed'
    };

    setRecords(prev => [record, ...prev]);
    setNewRecord({
      date: new Date().toISOString().split('T')[0],
      startTime: '',
      endTime: '',
      studentName: '',
      studentId: '',
      studentSession: '',
      content: '',
      progress: '',
      homework: '',
      nextPlan: '',
      rating: 5,
      notes: ''
    });
    setShowAddForm(false);
  };

  // 计算总教学时长
  const calculateTotalHours = () => {
    return records.reduce((total, record) => {
      if (record.startTime && record.endTime) {
        const start = new Date(`2000-01-01T${record.startTime}:00`);
        const end = new Date(`2000-01-01T${record.endTime}:00`);
        const hours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
        return total + hours;
      }
      return total;
    }, 0);
  };

  const stats = {
    total: records.length,
    completed: records.filter(r => r.status === 'completed').length,
    inProgress: records.filter(r => r.status === 'in_progress').length,
    avgRating: records.filter(r => r.rating > 0).reduce((sum, r) => sum + r.rating, 0) / records.filter(r => r.rating > 0).length || 0,
    totalHours: calculateTotalHours()
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部标题栏 */}
      <div className="bg-white shadow-sm">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate(-1)}
                className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-xl font-semibold text-gray-800">教学记录</h1>
                <p className="text-sm text-gray-600 mt-1">记录和管理培训内容</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* 统计卡片 */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">总记录</p>
                <p className="text-2xl font-bold text-blue-600">{stats.total}</p>
              </div>
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <FileText className="w-4 h-4 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">总教学时长</p>
                <p className="text-2xl font-bold text-green-600">{stats.totalHours.toFixed(1)}h</p>
              </div>
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Clock className="w-4 h-4 text-green-600" />
              </div>
            </div>
          </div>

        </div>

        {/* 搜索和筛选 */}
        <div className="bg-white rounded-lg p-4 shadow-sm space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="搜索学员姓名"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                学员期数
              </label>
              <select
                value={selectedSession}
                onChange={(e) => setSelectedSession(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">全部期数</option>
                {studentSessions.map(session => (
                  <option key={session} value={session}>{session}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                日期筛选
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* 添加记录表单 */}
        {showAddForm && (
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">新增教学记录</h3>
              <button
                onClick={() => setShowAddForm(false)}
                className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    学员姓名 *
                  </label>
                  <input
                    type="text"
                    value={newRecord.studentName}
                    onChange={(e) => setNewRecord(prev => ({ ...prev, studentName: e.target.value }))}
                    placeholder="请输入学员姓名"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    学员编号
                  </label>
                  <input
                    type="text"
                    value={newRecord.studentId}
                    onChange={(e) => setNewRecord(prev => ({ ...prev, studentId: e.target.value }))}
                    placeholder="请输入学员编号"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    日期
                  </label>
                  <input
                    type="date"
                    value={newRecord.date}
                    onChange={(e) => setNewRecord(prev => ({ ...prev, date: e.target.value }))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    开始时间
                  </label>
                  <input
                    type="time"
                    value={newRecord.startTime}
                    onChange={(e) => setNewRecord(prev => ({ ...prev, startTime: e.target.value }))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    结束时间
                  </label>
                  <input
                    type="time"
                    value={newRecord.endTime}
                    onChange={(e) => setNewRecord(prev => ({ ...prev, endTime: e.target.value }))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  学员期数 *
                </label>
                <select
                  value={newRecord.studentSession}
                  onChange={(e) => setNewRecord(prev => ({ ...prev, studentSession: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">请选择学员期数</option>
                  {studentSessions.map(session => (
                    <option key={session} value={session}>{session}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  教学内容 *
                </label>
                <textarea
                  value={newRecord.content}
                  onChange={(e) => setNewRecord(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="请描述本次教学的主要内容"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={3}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  学习进度
                </label>
                <textarea
                  value={newRecord.progress}
                  onChange={(e) => setNewRecord(prev => ({ ...prev, progress: e.target.value }))}
                  placeholder="请描述学员的学习进度和掌握情况"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={2}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  课后作业
                </label>
                <input
                  type="text"
                  value={newRecord.homework}
                  onChange={(e) => setNewRecord(prev => ({ ...prev, homework: e.target.value }))}
                  placeholder="请输入课后作业内容"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  下次计划
                </label>
                <input
                  type="text"
                  value={newRecord.nextPlan}
                  onChange={(e) => setNewRecord(prev => ({ ...prev, nextPlan: e.target.value }))}
                  placeholder="请输入下次课程计划"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    教学评分
                  </label>
                  <select
                    value={newRecord.rating}
                    onChange={(e) => setNewRecord(prev => ({ ...prev, rating: parseInt(e.target.value) }))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value={5}>5星 - 优秀</option>
                    <option value={4}>4星 - 良好</option>
                    <option value={3}>3星 - 一般</option>
                    <option value={2}>2星 - 较差</option>
                    <option value={1}>1星 - 很差</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    备注
                  </label>
                  <input
                    type="text"
                    value={newRecord.notes}
                    onChange={(e) => setNewRecord(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="其他备注信息"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <button
                onClick={handleAddRecord}
                className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors active:scale-95"
              >
                保存记录
              </button>
            </div>
          </div>
        )}

        {/* 记录列表 */}
        <div className="space-y-3">
          {filteredRecords.length === 0 ? (
            <div className="space-y-3"></div>
          ) : (
            filteredRecords.map(record => (
              <div key={record.id} className="bg-white rounded-lg p-4 shadow-sm relative">
                {/* 期数标签 */}
                <div className="absolute top-3 right-3">
                  <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                    {getPeriodLabel(record.date)}
                  </span>
                </div>
                
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 pr-16">
                    <div className="flex items-center gap-2 mb-2">
                      <User className="w-4 h-4 text-gray-500" />
                      <span className="font-medium text-gray-800">{record.studentName}</span>
                      {record.studentId && (
                        <span className="text-xs text-gray-500">({record.studentId})</span>
                      )}
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        getStatusColor(record.status)
                      }`}>
                        {getStatusText(record.status)}
                      </span>
                    </div>
                    
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3 h-3" />
                        <span>{record.date}</span>
                        {record.startTime && record.endTime && (
                          <>
                            <Clock className="w-3 h-3 ml-2" />
                            <span>{record.startTime} - {record.endTime}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 操作按钮 */}
                <div className="flex gap-2">
                </div>
              </div>
            ))
          )}
        </div>

        {/* 详情弹窗 */}
        {viewingRecord && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full max-h-[80vh] overflow-y-auto">
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">教学记录详情</h3>
                  <button
                    onClick={() => setViewingRecord(null)}
                    className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    ×
                  </button>
                </div>
                
                {(() => {
                  const record = records.find(r => r.id === viewingRecord);
                  if (!record) return null;
                  
                  return (
                    <div className="space-y-4 text-sm">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="font-medium text-gray-700">学员姓名</p>
                          <p className="text-gray-600">{record.studentName}</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-700">学员编号</p>
                          <p className="text-gray-600">{record.studentId || '-'}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="font-medium text-gray-700">日期</p>
                          <p className="text-gray-600">{record.date}</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-700">时间</p>
                          <p className="text-gray-600">
                            {record.startTime && record.endTime 
                              ? `${record.startTime} - ${record.endTime}` 
                              : '-'
                            }
                          </p>
                        </div>
                      </div>
                      
                      <div>
                        <p className="font-medium text-gray-700">学员期数</p>
                        <p className="text-gray-600">{record.studentSession}</p>
                      </div>
                      
                      <div>
                        <p className="font-medium text-gray-700">教学内容</p>
                        <p className="text-gray-600">{record.content}</p>
                      </div>
                      
                      {record.progress && (
                        <div>
                          <p className="font-medium text-gray-700">学习进度</p>
                          <p className="text-gray-600">{record.progress}</p>
                        </div>
                      )}
                      
                      {record.homework && (
                        <div>
                          <p className="font-medium text-gray-700">课后作业</p>
                          <p className="text-gray-600">{record.homework}</p>
                        </div>
                      )}
                      
                      {record.nextPlan && (
                        <div>
                          <p className="font-medium text-gray-700">下次计划</p>
                          <p className="text-gray-600">{record.nextPlan}</p>
                        </div>
                      )}
                      
                      {record.rating > 0 && (
                        <div>
                          <p className="font-medium text-gray-700">教学评分</p>
                          <p className="text-gray-600">
                            <span className="text-yellow-600">{getRatingStars(record.rating)}</span>
                            <span className="ml-2">({record.rating}/5)</span>
                          </p>
                        </div>
                      )}
                      
                      {record.notes && (
                        <div>
                          <p className="font-medium text-gray-700">备注</p>
                          <p className="text-gray-600">{record.notes}</p>
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeachingRecords;
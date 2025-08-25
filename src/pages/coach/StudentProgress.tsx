import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, TrendingUp, Clock, Award, BookOpen, Target, Search, Filter, Eye, BarChart3, ArrowLeft } from 'lucide-react';

interface Student {
  id: string;
  name: string;
  phone: string;
  email: string;
  enrollDate: string;
  totalHours: number;
  completedHours: number;
  currentLevel: string;
  nextLevel: string;
  progress: number;
  lastActivity: string;
  status: 'active' | 'inactive' | 'graduated' | 'suspended';
  subjects: {
    theory: { completed: number; total: number; score: number };
    practice: { completed: number; total: number; score: number };
    simulation: { completed: number; total: number; score: number };
  };
  achievements: string[];
  weakPoints: string[];
  strengths: string[];
  nextGoals: string[];
}

const StudentProgress: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [levelFilter, setLevelFilter] = useState('all');
  const [viewingStudent, setViewingStudent] = useState<string | null>(null);
  const [periodFilter, setPeriodFilter] = useState('all');
  const [passStatusFilter, setPassStatusFilter] = useState('all');
  
  // 模拟学员数据
  const [students, setStudents] = useState<Student[]>([
    {
      id: 'S001',
      name: '张三',
      phone: '13800138001',
      email: 'zhangsan@example.com',
      enrollDate: '2023-09-01',
      totalHours: 120,
      completedHours: 85,
      currentLevel: '初级',
      nextLevel: '中级',
      progress: 71,
      lastActivity: '2024-01-15',
      status: 'active',
      subjects: {
        theory: { completed: 15, total: 20, score: 88 },
        practice: { completed: 25, total: 40, score: 82 },
        simulation: { completed: 18, total: 25, score: 90 }
      },
      achievements: ['理论考试优秀', '首次单飞成功', '夜间飞行合格'],
      weakPoints: ['降落技术', '无线电通讯'],
      strengths: ['起飞技术', '空域判断', '应急处理'],
      nextGoals: ['完成中级理论考试', '掌握复杂气象飞行']
    },
    {
      id: 'S002',
      name: '李四',
      phone: '13800138002',
      email: 'lisi@example.com',
      enrollDate: '2023-10-15',
      totalHours: 100,
      completedHours: 45,
      currentLevel: '初级',
      nextLevel: '中级',
      progress: 45,
      lastActivity: '2024-01-14',
      status: 'active',
      subjects: {
        theory: { completed: 12, total: 20, score: 75 },
        practice: { completed: 15, total: 40, score: 70 },
        simulation: { completed: 8, total: 25, score: 78 }
      },
      achievements: ['基础理论合格', '模拟器训练优秀'],
      weakPoints: ['高度控制', '航线规划', '气象判断'],
      strengths: ['学习态度', '理论基础'],
      nextGoals: ['提高实操技能', '加强气象知识学习']
    },
    {
      id: 'S003',
      name: '王五',
      phone: '13800138003',
      email: 'wangwu@example.com',
      enrollDate: '2023-08-01',
      totalHours: 150,
      completedHours: 140,
      currentLevel: '高级',
      nextLevel: '教练员',
      progress: 93,
      lastActivity: '2024-01-16',
      status: 'active',
      subjects: {
        theory: { completed: 20, total: 20, score: 95 },
        practice: { completed: 38, total: 40, score: 92 },
        simulation: { completed: 24, total: 25, score: 94 }
      },
      achievements: ['理论考试满分', '复杂气象飞行合格', '夜间飞行优秀', '教学实习合格'],
      weakPoints: ['教学技巧'],
      strengths: ['飞行技术', '理论知识', '安全意识', '沟通能力'],
      nextGoals: ['完成教练员资格考试', '独立带教学员']
    },
    {
      id: 'S004',
      name: '赵六',
      phone: '13800138004',
      email: 'zhaoliu@example.com',
      enrollDate: '2023-11-01',
      totalHours: 80,
      completedHours: 20,
      currentLevel: '入门',
      nextLevel: '初级',
      progress: 25,
      lastActivity: '2024-01-10',
      status: 'inactive',
      subjects: {
        theory: { completed: 5, total: 20, score: 65 },
        practice: { completed: 3, total: 40, score: 60 },
        simulation: { completed: 2, total: 25, score: 70 }
      },
      achievements: ['入学测试合格'],
      weakPoints: ['基础理论', '学习积极性', '时间管理'],
      strengths: ['空间感知'],
      nextGoals: ['提高学习积极性', '完成基础理论学习']
    }
  ]);

  const levels = ['入门', '初级', '中级', '高级', '教练员'];
  const statuses = [
    { value: 'active', label: '在学', color: 'text-green-600' },
    { value: 'inactive', label: '暂停', color: 'text-yellow-600' },
    { value: 'graduated', label: '毕业', color: 'text-blue-600' },
    { value: 'suspended', label: '停学', color: 'text-red-600' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-yellow-100 text-yellow-800';
      case 'graduated': return 'bg-blue-100 text-blue-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    const statusObj = statuses.find(s => s.value === status);
    return statusObj ? statusObj.label : '未知';
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 60) return 'bg-blue-500';
    if (progress >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  // 根据入学日期计算期数标签（年份+期数+班级）
  const getPeriodLabel = (enrollDate: string) => {
    const date = new Date(enrollDate);
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

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.phone.includes(searchTerm) ||
                         student.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || student.status === statusFilter;
    const matchesLevel = levelFilter === 'all' || student.currentLevel === levelFilter;
    
    // 期数筛选逻辑（基于入学日期）
    const matchesPeriod = periodFilter === 'all' || (() => {
      const enrollDate = new Date(student.enrollDate);
      const year = enrollDate.getFullYear();
      const month = enrollDate.getMonth() + 1;
      
      switch (periodFilter) {
        case '2024-01': return year === 2024 && month >= 1 && month <= 3;
        case '2024-02': return year === 2024 && month >= 4 && month <= 6;
        case '2023-04': return year === 2023 && month >= 10 && month <= 12;
        case '2023-03': return year === 2023 && month >= 7 && month <= 9;
        default: return true;
      }
    })();
    
    // 通过状态筛选逻辑（基于进度）
    const matchesPassStatus = passStatusFilter === 'all' || (
      passStatusFilter === 'passed' ? student.progress >= 80 : student.progress < 80
    );
    
    return matchesSearch && matchesStatus && matchesLevel && matchesPeriod && matchesPassStatus;
  });

  const stats = {
    total: students.length,
    active: students.filter(s => s.status === 'active').length,
    avgProgress: students.reduce((sum, s) => sum + s.progress, 0) / students.length || 0,
    graduated: students.filter(s => s.status === 'graduated').length,
    passRate: (students.filter(s => s.progress >= 80).length / students.length) * 100 || 0
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
                <h1 className="text-xl font-semibold text-gray-800">学员进度</h1>
                <p className="text-sm text-gray-600 mt-1">查看学员学习进度和评估</p>
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
                <p className="text-sm text-gray-600">在学学员</p>
                <p className="text-2xl font-bold text-green-600">{stats.active}</p>
              </div>
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">通过率</p>
                <p className="text-2xl font-bold text-blue-600">{stats.passRate.toFixed(0)}%</p>
              </div>
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* 搜索和筛选 */}
        <div className="bg-white rounded-lg p-4 shadow-sm space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">期数</label>
              <select
                value={periodFilter}
                onChange={(e) => setPeriodFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">全部期数</option>
                <option value="2024-01">2024年第1期</option>
                <option value="2024-02">2024年第2期</option>
                <option value="2023-04">2023年第4期</option>
                <option value="2023-03">2023年第3期</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">状态</label>
              <select
                value={passStatusFilter}
                onChange={(e) => setPassStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">全部状态</option>
                <option value="passed">已通过</option>
                <option value="not_passed">未通过</option>
              </select>
            </div>
          </div>
        </div>


        {/* 学员列表 */}
        <div className="space-y-3">
          {filteredStudents.length === 0 ? (
            <div className="bg-white rounded-lg p-8 text-center shadow-sm">
              <User className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500">暂无符合条件的学员</p>
            </div>
          ) : (
            filteredStudents.map(student => (
              <div key={student.id} className="bg-white rounded-lg p-4 shadow-sm relative">
                {/* 期数标签 */}
                <div className="absolute top-3 right-3">
                  <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                    {getPeriodLabel(student.enrollDate)}
                  </span>
                </div>
                
                <div className="flex items-start justify-between mb-3 pr-16">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <User className="w-4 h-4 text-gray-500" />
                      <span className="font-medium text-gray-800">{student.name}</span>
                      <span className="text-xs text-gray-500">({student.id})</span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">理论学习进度</span>
                        <span className="font-medium">{student.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(student.progress)}`}
                          style={{ width: `${student.progress}%` }}
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-xs text-gray-600 mt-3">
                        <div>

                        </div>
                        <div>

                        </div>
                      </div>
                      
                      {/* 科目进度 */}
                      <div className="mt-3 space-y-2">

                        <div className="w-full bg-gray-200 rounded-full h-1">

                        </div>
                        
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-600">实操培训时长</span>
                          <span className="font-medium">{student.subjects.practice.completed}小时/{student.subjects.practice.total}小时</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1">
                          <div 
                            className="h-1 bg-green-500 rounded-full"
                            style={{ width: `${(student.subjects.practice.completed / student.subjects.practice.total) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 操作按钮 */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setViewingStudent(student.id)}
                    className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors active:scale-95"
                  >
                    <Eye className="w-4 h-4" />
                    查看详情
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* 详情弹窗 */}
        {viewingStudent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full max-h-[80vh] overflow-y-auto">
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">学员详细信息</h3>
                  <button
                    onClick={() => setViewingStudent(null)}
                    className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    ×
                  </button>
                </div>
                
                {(() => {
                  const student = students.find(s => s.id === viewingStudent);
                  if (!student) return null;
                  
                  return (
                    <div className="space-y-4 text-sm">
                      {/* 基本信息 */}
                      <div>
                        <h4 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                          <User className="w-4 h-4" />
                          基本信息
                        </h4>
                        <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="font-medium text-gray-700">姓名</p>
                              <p className="text-gray-600">{student.name}</p>
                            </div>
                            <div>
                              <p className="font-medium text-gray-700">学员编号</p>
                              <p className="text-gray-600">{student.id}</p>
                            </div>
                          </div>
                          <div>
                            <p className="font-medium text-gray-700">联系方式</p>
                            <p className="text-gray-600">{student.phone}</p>
                            <p className="text-gray-600">{student.email}</p>
                          </div>
                          <div>
                            <p className="font-medium text-gray-700">入学日期</p>
                            <p className="text-gray-600">{student.enrollDate}</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* 学习进度 */}
                      <div>
                        <h4 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                          <TrendingUp className="w-4 h-4" />
                          学习进度
                        </h4>
                        <div className="bg-gray-50 rounded-lg p-3 space-y-3">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="font-medium text-gray-700">当前等级</p>
                              <p className="text-gray-600">{student.currentLevel}</p>
                            </div>
                            <div>
                              <p className="font-medium text-gray-700">目标等级</p>
                              <p className="text-gray-600">{student.nextLevel}</p>
                            </div>
                          </div>
                          <div>
                            <p className="font-medium text-gray-700">总体进度</p>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="flex-1 bg-gray-200 rounded-full h-2">
                                <div 
                                  className={`h-2 rounded-full ${getProgressColor(student.progress)}`}
                                  style={{ width: `${student.progress}%` }}
                                />
                              </div>
                              <span className="text-gray-600">{student.progress}%</span>
                            </div>
                          </div>
                          <div>
                            <p className="font-medium text-gray-700">完成课时</p>
                            <p className="text-gray-600">{student.completedHours} / {student.totalHours} 小时</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* 成就 */}
                      {student.achievements.length > 0 && (
                        <div>
                          <h4 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                            <Award className="w-4 h-4" />
                            获得成就
                          </h4>
                          <div className="bg-gray-50 rounded-lg p-3">
                            <div className="flex flex-wrap gap-2">
                              {student.achievements.map((achievement, index) => (
                                <span key={index} className="inline-flex items-center px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                                  {achievement}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* 优势与不足 */}
                      <div className="grid grid-cols-1 gap-4">
                        {student.strengths.length > 0 && (
                          <div>
                            <h4 className="font-medium text-gray-800 mb-2">优势</h4>
                            <div className="bg-green-50 rounded-lg p-3">
                              <div className="flex flex-wrap gap-2">
                                {student.strengths.map((strength, index) => (
                                  <span key={index} className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                                    {strength}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {student.weakPoints.length > 0 && (
                          <div>
                            <h4 className="font-medium text-gray-800 mb-2">需要改进</h4>
                            <div className="bg-red-50 rounded-lg p-3">
                              <div className="flex flex-wrap gap-2">
                                {student.weakPoints.map((weakness, index) => (
                                  <span key={index} className="inline-flex items-center px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                                    {weakness}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {/* 下一步目标 */}
                      {student.nextGoals.length > 0 && (
                        <div>
                          <h4 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                            <Target className="w-4 h-4" />
                            下一步目标
                          </h4>
                          <div className="bg-gray-50 rounded-lg p-3">
                            <ul className="space-y-1">
                              {student.nextGoals.map((goal, index) => (
                                <li key={index} className="flex items-start gap-2 text-gray-600">
                                  <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                                  {goal}
                                </li>
                              ))}
                            </ul>
                          </div>
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

export default StudentProgress;
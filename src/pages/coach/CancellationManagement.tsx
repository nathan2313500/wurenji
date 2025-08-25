import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, User, Phone, AlertTriangle, XCircle, MessageSquare, ArrowLeft } from 'lucide-react';

interface CancellationRequest {
  id: string;
  studentName: string;
  studentPhone: string;
  originalDate: string;
  originalTime: string;
  subject: string;
  reason: string;
  requestTime: string;
  status: 'pending' | 'approved' | 'rejected';
  refundAmount?: number;
  notes?: string;
}

const CancellationManagement: React.FC = () => {
  const navigate = useNavigate();


  // 模拟取消申请数据
  const [cancellations, setCancellations] = useState<CancellationRequest[]>([
    {
      id: '1',
      studentName: '张三',
      studentPhone: '138****1234',
      originalDate: '2024-01-20',
      originalTime: '09:00-11:00',
      subject: '理论课程',
      reason: '临时有事无法参加',
      requestTime: '2024-01-18 14:30',
      status: 'pending',
      refundAmount: 200
    },
    {
      id: '2',
      studentName: '李四',
      studentPhone: '139****5678',
      originalDate: '2024-01-22',
      originalTime: '14:00-16:00',
      subject: '实操训练',
      reason: '身体不适，医生建议休息',
      requestTime: '2024-01-19 10:15',
      status: 'pending',
      refundAmount: 500
    },
    {
      id: '3',
      studentName: '王五',
      studentPhone: '137****9012',
      originalDate: '2024-01-18',
      originalTime: '10:00-12:00',
      subject: '模拟飞行',
      reason: '工作安排冲突',
      requestTime: '2024-01-17 16:45',
      status: 'approved',
      refundAmount: 300,
      notes: '已批准退款，扣除10%手续费'
    },
    {
      id: '4',
      studentName: '赵六',
      studentPhone: '136****3456',
      originalDate: '2024-01-19',
      originalTime: '15:00-17:00',
      subject: '理论考试',
      reason: '个人原因',
      requestTime: '2024-01-19 08:30',
      status: 'rejected',
      notes: '距离课程时间过近，不符合取消政策'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return '待处理';
      case 'approved': return '已批准';
      case 'rejected': return '已拒绝';
      default: return '未知';
    }
  };

  const handleApprove = (id: string, notes: string = '') => {
    setCancellations(prev => prev.map(item => 
      item.id === id 
        ? { ...item, status: 'approved', notes }
        : item
    ));
  };

  const handleReject = (id: string, notes: string = '') => {
    setCancellations(prev => prev.map(item => 
      item.id === id 
        ? { ...item, status: 'rejected', notes }
        : item
    ));
  };

  // 显示所有取消申请
  const filteredCancellations = cancellations;

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
              <h1 className="text-xl font-semibold text-gray-800">取消预约信息</h1>

            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">


        {/* 状态筛选 */}


        {/* 取消申请列表 */}
        <div className="space-y-3">
          {filteredCancellations.length === 0 ? (
            <div className="bg-white rounded-lg p-8 text-center shadow-sm">
              <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500">暂无取消申请</p>
            </div>
          ) : (
            filteredCancellations.map(cancellation => (
              <CancellationCard
                key={cancellation.id}
                cancellation={cancellation}
                onApprove={handleApprove}
                onReject={handleReject}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

// 取消申请卡片组件
interface CancellationCardProps {
  cancellation: CancellationRequest;
  onApprove: (id: string, notes?: string) => void;
  onReject: (id: string, notes?: string) => void;
}

const CancellationCard: React.FC<CancellationCardProps> = ({ 
  cancellation, 
  onApprove, 
  onReject 
}) => {
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [actionType, setActionType] = useState<'approve' | 'reject' | null>(null);
  const [notes, setNotes] = useState('');

  const handleAction = () => {
    if (actionType === 'approve') {
      onApprove(cancellation.id, notes);
    } else if (actionType === 'reject') {
      onReject(cancellation.id, notes);
    }
    setShowNoteInput(false);
    setActionType(null);
    setNotes('');
  };

  const startAction = (type: 'approve' | 'reject') => {
    setActionType(type);
    setShowNoteInput(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return '待处理';
      case 'approved': return '已批准';
      case 'rejected': return '已拒绝';
      default: return '未知';
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <User className="w-4 h-4 text-gray-500" />
            <span className="font-medium text-gray-800">{cancellation.studentName}</span>

          </div>
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
            <div className="flex items-center gap-1">
              <Phone className="w-3 h-3" />
              <span>{cancellation.studentPhone}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 原预约信息 */}
      <div className="bg-gray-50 rounded-lg p-3 mb-3">
        <h4 className="text-sm font-medium text-gray-800 mb-2">原预约信息</h4>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <span className="text-gray-700">{cancellation.originalDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-500" />
            <span className="text-gray-700">{cancellation.originalTime}</span>
          </div>
        </div>
        <p className="text-sm text-gray-700 mt-2">
          课程：{cancellation.subject}
        </p>
      </div>

      {/* 取消原因 */}
      <div className="mb-3">
        <div className="flex items-center gap-2 mb-2">
          <MessageSquare className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-800">取消原因</span>
        </div>
        <p className="text-sm text-gray-700 bg-blue-50 p-2 rounded">
          {cancellation.reason}
        </p>
      </div>

      {/* 申请时间 */}
      <p className="text-xs text-gray-500 mb-3">
        申请时间：{cancellation.requestTime}
      </p>

      {/* 处理备注 */}
      {cancellation.notes && (
        <div className="mb-3">

        </div>
      )}

      {/* 备注输入 */}
      {showNoteInput && (
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-800 mb-2">
            处理备注
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="请输入处理备注（可选）"
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={3}
          />
        </div>
      )}

      {/* 操作按钮 */}
      <div className="flex gap-2">
        {cancellation.status === 'pending' && !showNoteInput && (
          <>


          </>
        )}
        
        {showNoteInput && (
          <>
            <button
              onClick={handleAction}
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors active:scale-95 ${
                actionType === 'approve'
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-red-600 text-white hover:bg-red-700'
              }`}
            >
              确认{actionType === 'approve' ? '批准' : '拒绝'}
            </button>
            <button
              onClick={() => {
                setShowNoteInput(false);
                setActionType(null);
                setNotes('');
              }}
              className="flex-1 py-2 px-3 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors active:scale-95"
            >
              取消
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CancellationManagement;
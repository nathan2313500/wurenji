import React, { useState } from 'react';
import { ArrowLeft, User, Phone, IdCard, Upload, Camera, CheckCircle, Clock, XCircle, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '@/store';

interface UserInfoData {
  name: string;
  phone: string;
  idNumber: string;
  gender: string;
  ethnicity: string;
  birthDate: string;
  address: string;
  detailedAddress: string;
  idCardFront?: string;
  idCardBack?: string;
  criminalRecord?: string;
  auditStatus: 'pending' | 'reviewing' | 'approved' | 'rejected';
  auditMessage?: string;
}

const UserInfo = () => {
  const navigate = useNavigate();
  const { user } = useAppStore();
  
  const [userInfo, setUserInfo] = useState<UserInfoData>({
    name: user?.name || '',
    phone: user?.phone || '',
    idNumber: user?.idNumber || '',
    gender: user?.gender || '',
    ethnicity: user?.ethnicity || '',
    birthDate: user?.birthDate || '',
    address: user?.address || '',
    detailedAddress: user?.detailedAddress || '',
    idCardFront: user?.idCardFront || '',
    idCardBack: user?.idCardBack || '',
    criminalRecord: user?.criminalRecord || '',
    auditStatus: user?.auditStatus || 'pending',
    auditMessage: user?.auditMessage || ''
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);

  const handleInputChange = (field: keyof UserInfoData, value: string) => {
    setUserInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = async (field: 'idCardFront' | 'idCardBack' | 'criminalRecord') => {
    setUploading(field);
    // 模拟上传过程
    setTimeout(() => {
      const mockImageUrl = `https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=${field}_document_image&image_size=landscape_4_3`;
      setUserInfo(prev => ({ ...prev, [field]: mockImageUrl }));
      setUploading(null);
    }, 2000);
  };

  const handleSubmitAudit = () => {
    // 模拟提交审核
    setUserInfo(prev => ({ ...prev, auditStatus: 'reviewing' }));
    // 模拟审核过程
    setTimeout(() => {
      const isApproved = Math.random() > 0.3; // 70%通过率
      setUserInfo(prev => ({
        ...prev,
        auditStatus: isApproved ? 'approved' : 'rejected',
        auditMessage: isApproved ? '审核通过，信息已验证' : '身份证信息不清晰，请重新上传'
      }));
    }, 3000);
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'pending':
        return { icon: AlertCircle, color: 'text-yellow-600', bg: 'bg-yellow-50', text: '待提交' };
      case 'reviewing':
        return { icon: Clock, color: 'text-blue-600', bg: 'bg-blue-50', text: '审核中' };
      case 'approved':
        return { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50', text: '审核通过' };
      case 'rejected':
        return { icon: XCircle, color: 'text-red-600', bg: 'bg-red-50', text: '审核失败' };
      default:
        return { icon: AlertCircle, color: 'text-gray-600', bg: 'bg-gray-50', text: '未知状态' };
    }
  };

  const statusConfig = getStatusConfig(userInfo.auditStatus);
  const StatusIcon = statusConfig.icon;

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
          <h1 className="text-lg font-semibold text-gray-800">用户信息</h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* 审核状态 */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">审核状态</h2>
            <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${statusConfig.bg}`}>
              <StatusIcon className={`w-4 h-4 ${statusConfig.color}`} />
              <span className={`text-sm font-medium ${statusConfig.color}`}>
                {statusConfig.text}
              </span>
            </div>
          </div>
          {userInfo.auditMessage && (
            <div className={`p-3 rounded-lg ${statusConfig.bg} border border-opacity-20`}>
              <p className={`text-sm ${statusConfig.color}`}>{userInfo.auditMessage}</p>
            </div>
          )}
        </div>

        {/* 基本信息 */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">基本信息</h2>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              {isEditing ? '取消' : '编辑'}
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4 inline mr-1" />
                姓名<span className="text-red-500 ml-1">*</span>
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={userInfo.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="请输入真实姓名"
                />
              ) : (
                <div className="px-3 py-2 bg-gray-50 rounded-lg text-gray-800">
                  {userInfo.name || '未填写'}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Phone className="w-4 h-4 inline mr-1" />
                手机号码<span className="text-red-500 ml-1">*</span>
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  value={userInfo.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="请输入手机号码"
                />
              ) : (
                <div className="px-3 py-2 bg-gray-50 rounded-lg text-gray-800">
                  {userInfo.phone || '未填写'}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <IdCard className="w-4 h-4 inline mr-1" />
                身份证号<span className="text-red-500 ml-1">*</span>
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={userInfo.idNumber}
                  onChange={(e) => handleInputChange('idNumber', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="请输入身份证号码"
                />
              ) : (
                <div className="px-3 py-2 bg-gray-50 rounded-lg text-gray-800">
                  {userInfo.idNumber ? userInfo.idNumber.replace(/(\d{6})\d{8}(\d{4})/, '$1********$2') : '未填写'}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                性别<span className="text-red-500 ml-1">*</span>
              </label>
              {isEditing ? (
                <select
                  value={userInfo.gender}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">请选择性别</option>
                  <option value="男">男</option>
                  <option value="女">女</option>
                </select>
              ) : (
                <div className="px-3 py-2 bg-gray-50 rounded-lg text-gray-800">
                  {userInfo.gender || '未填写'}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                民族<span className="text-red-500 ml-1">*</span>
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={userInfo.ethnicity}
                  onChange={(e) => handleInputChange('ethnicity', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="请输入民族"
                />
              ) : (
                <div className="px-3 py-2 bg-gray-50 rounded-lg text-gray-800">
                  {userInfo.ethnicity || '未填写'}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                出生日期<span className="text-red-500 ml-1">*</span>
              </label>
              {isEditing ? (
                <input
                  type="date"
                  value={userInfo.birthDate}
                  onChange={(e) => handleInputChange('birthDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <div className="px-3 py-2 bg-gray-50 rounded-lg text-gray-800">
                  {userInfo.birthDate || '未填写'}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                地址<span className="text-red-500 ml-1">*</span>
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={userInfo.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="请输入地址"
                />
              ) : (
                <div className="px-3 py-2 bg-gray-50 rounded-lg text-gray-800">
                  {userInfo.address || '未填写'}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                详细地址<span className="text-red-500 ml-1">*</span>
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={userInfo.detailedAddress}
                  onChange={(e) => handleInputChange('detailedAddress', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="请输入详细地址"
                />
              ) : (
                <div className="px-3 py-2 bg-gray-50 rounded-lg text-gray-800">
                  {userInfo.detailedAddress || '未填写'}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 证件上传 */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">证件上传</h2>
          
          <div className="space-y-4">
            {/* 身份证正面 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">身份证正面<span className="text-red-500 ml-1">*</span></label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                {userInfo.idCardFront ? (
                  <div className="relative">
                    <img
                      src={userInfo.idCardFront}
                      alt="身份证正面"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => handleImageUpload('idCardFront')}
                      className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-50"
                    >
                      <Camera className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleImageUpload('idCardFront')}
                    disabled={uploading === 'idCardFront'}
                    className="w-full flex flex-col items-center justify-center py-8 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                  >
                    {uploading === 'idCardFront' ? (
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    ) : (
                      <>
                        <Upload className="w-8 h-8 mb-2" />
                        <span className="text-sm">点击上传身份证正面</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* 身份证反面 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">身份证反面<span className="text-red-500 ml-1">*</span></label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                {userInfo.idCardBack ? (
                  <div className="relative">
                    <img
                      src={userInfo.idCardBack}
                      alt="身份证反面"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => handleImageUpload('idCardBack')}
                      className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-50"
                    >
                      <Camera className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleImageUpload('idCardBack')}
                    disabled={uploading === 'idCardBack'}
                    className="w-full flex flex-col items-center justify-center py-8 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                  >
                    {uploading === 'idCardBack' ? (
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    ) : (
                      <>
                        <Upload className="w-8 h-8 mb-2" />
                        <span className="text-sm">点击上传身份证反面</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* 无犯罪证明 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">无犯罪证明<span className="text-red-500 ml-1">*</span></label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                {userInfo.criminalRecord ? (
                  <div className="relative">
                    <img
                      src={userInfo.criminalRecord}
                      alt="无犯罪证明"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => handleImageUpload('criminalRecord')}
                      className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-50"
                    >
                      <Camera className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleImageUpload('criminalRecord')}
                    disabled={uploading === 'criminalRecord'}
                    className="w-full flex flex-col items-center justify-center py-8 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                  >
                    {uploading === 'criminalRecord' ? (
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    ) : (
                      <>
                        <Upload className="w-8 h-8 mb-2" />
                        <span className="text-sm">点击上传无犯罪证明</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 提交审核按钮 */}
        {userInfo.auditStatus === 'pending' || userInfo.auditStatus === 'rejected' ? (
          <button
            onClick={handleSubmitAudit}
            disabled={!userInfo.name || !userInfo.phone || !userInfo.idNumber || !userInfo.gender || !userInfo.ethnicity || !userInfo.birthDate || !userInfo.address || !userInfo.detailedAddress || !userInfo.idCardFront || !userInfo.idCardBack || !userInfo.criminalRecord}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            提交审核
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default UserInfo;
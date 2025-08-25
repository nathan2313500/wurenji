import React, { useState } from 'react';
import { ArrowLeft, MapPin, Clock, Navigation, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ExamSite {
  id: string;
  name: string;
  address: string;
  phone: string;
  openTime: string;
  description: string;
  latitude: number;
  longitude: number;
  facilities: string[];
}

const ExamLocation: React.FC = () => {
  const navigate = useNavigate();
  const [selectedSite, setSelectedSite] = useState<ExamSite | null>(null);

  // 甘肃地区考试地点数据
  const examSites: ExamSite[] = [
    {
      id: '1',
      name: '甘肃03考点理论考试场',
      address: '甘肃省兰州市七里河区土门墩雅戈尔时代之星',
      phone: '0931-2345678',
      openTime: '周一至周日 8:00-18:00',
      description: '甘肃省无人机理论考试指定考点，设施完善，环境优良',
      latitude: 36.0611,
      longitude: 103.8343,
      facilities: ['理论考试室', '多媒体教室', '停车场', '休息区']
    },
    {
      id: '2',
      name: '甘肃03考点实操考试场',
      address: '甘肃省兰州市安宁区孔家崖街道大青山保利领秀山二期西侧',
      phone: '0931-3456789',
      openTime: '周一至周六 8:30-17:30',
      description: '甘肃省无人机实操考试指定场地，场地开阔，设备先进',
      latitude: 36.1033,
      longitude: 103.7178,
      facilities: ['飞行训练场', '设备检测区', '观摩区', '安全设施']
    },
    {
      id: '3',
      name: '白银01考点',
      address: '甘肃省白银市白银区合作一路神龙航空',
      phone: '0943-8765432',
      openTime: '周一至周日 9:00-17:00',
      description: '白银地区无人机考试培训基地，专业的航空培训机构',
      latitude: 36.5449,
      longitude: 104.1738,
      facilities: ['考试大厅', '模拟训练室', '理论教室', '停车场']
    }
  ];

  const handleViewMap = (site: ExamSite) => {
    // 这里可以集成真实的地图服务，如高德地图、百度地图等
    const mapUrl = `https://www.google.com/maps?q=${site.latitude},${site.longitude}`;
    window.open(mapUrl, '_blank');
  };



  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航 */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>返回</span>
          </button>
          <h1 className="text-lg font-semibold text-gray-900">考试地点</h1>
          {/* 客服按钮 */}
          <button
            onClick={() => {
              alert('客服热线：400-123-4567\n在线时间：9:00-18:00\n微信客服：easyfly_service');
            }}
            className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow duration-300"
          >
            <MessageCircle className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 考试地点列表 */}
      <div className="p-4 space-y-4">
        {examSites.map((site) => (
          <div
            key={site.id}
            className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
          >
            {/* 地点名称和地址 */}
            <div className="mb-3">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{site.name}</h3>
              <div className="flex items-start space-x-2 text-gray-600">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span className="text-sm">{site.address}</span>
              </div>
            </div>

            {/* 描述 */}


            {/* 联系信息 */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>{site.openTime}</span>
              </div>
            </div>

            {/* 设施标签 */}
            <div className="mb-4">

            </div>

            {/* 操作按钮 */}
            <div className="w-full">
              <button
                onClick={() => handleViewMap(site)}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 px-6 rounded-xl text-base font-semibold flex items-center justify-center space-x-3 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Navigation className="w-5 h-5" />
                <span>查看地图导航</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 底部提示 */}
      <div className="p-4">
        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="text-sm font-medium text-blue-900 mb-2">温馨提示</h4>
          <ul className="text-xs text-blue-700 space-y-1">
            <li>• 请提前30分钟到达考试地点</li>
            <li>• 携带有效身份证件和准考证</li>
            <li>• 建议提前电话确认考试安排</li>
            <li>• 考试当天请保持手机畅通</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ExamLocation;
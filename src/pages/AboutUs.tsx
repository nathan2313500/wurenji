import { ArrowLeft, MapPin, Phone, Mail, Globe, Users, Award, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AboutUs = () => {
  const navigate = useNavigate();

  const companyInfo = {
    name: "易飞行科技有限公司",
    founded: "2018年",
    description: "专注于无人机培训和飞行员培训的专业教育机构，致力于为航空爱好者和专业人士提供高质量的培训服务。",
    mission: "让每个人都能安全、专业地翱翔蓝天",
    vision: "成为中国领先的航空培训服务提供商"
  };

  const milestones = [
    {
      year: "2018",
      title: "公司成立",
      description: "易飞行科技有限公司正式成立，开始专业航空培训服务"
    },
    {
      year: "2019",
      title: "资质认证",
      description: "获得民航局颁发的无人机培训资质，成为合规培训机构"
    },
    {
      year: "2020",
      title: "业务拓展",
      description: "新增飞行员培训业务，培训项目覆盖更加全面"
    },
    {
      year: "2021",
      title: "技术升级",
      description: "引入VR模拟器和先进教学设备，提升培训质量"
    },
    {
      year: "2022",
      title: "规模扩大",
      description: "累计培训学员超过5000人，成为行业知名品牌"
    },
    {
      year: "2023",
      title: "数字化转型",
      description: "推出线上培训平台，实现线上线下融合教学"
    }
  ];

  const teamMembers = [
    {
      name: "张航",
      position: "创始人 & CEO",
      experience: "15年航空行业经验，前民航飞行员",
      avatar: "https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20CEO%20portrait%20aviation%20industry%20leader&image_size=square"
    },
    {
      name: "李教官",
      position: "首席培训师",
      experience: "12年飞行教学经验，资深教练员",
      avatar: "https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20flight%20instructor%20portrait%20experienced&image_size=square"
    },
    {
      name: "王技术",
      position: "技术总监",
      experience: "10年航空技术研发经验，无人机专家",
      avatar: "https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20technical%20director%20aviation%20technology&image_size=square"
    }
  ];

  const contactInfo = {
    address: "北京市朝阳区航空产业园区飞行大厦8层",
    phone: "400-888-9999",
    email: "info@easyfly.com",
    website: "www.easyfly.com"
  };

  const achievements = [
    {
      icon: Users,
      number: "5000+",
      label: "培训学员",
      color: "text-blue-600"
    },
    {
      icon: Award,
      number: "98%",
      label: "通过率",
      color: "text-green-600"
    },
    {
      icon: Calendar,
      number: "6年",
      label: "专业经验",
      color: "text-purple-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 头部 */}
      <div className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-lg font-semibold text-gray-800">关于我们</h1>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* 公司简介 */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe className="w-10 h-10 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{companyInfo.name}</h2>
            <p className="text-gray-600 text-sm mb-4">成立于 {companyInfo.founded}</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">公司简介</h3>
              <p className="text-gray-600 leading-relaxed">{companyInfo.description}</p>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-blue-50 rounded-xl p-4">
                <h4 className="font-semibold text-blue-800 mb-1">我们的使命</h4>
                <p className="text-blue-700 text-sm">{companyInfo.mission}</p>
              </div>
              <div className="bg-green-50 rounded-xl p-4">
                <h4 className="font-semibold text-green-800 mb-1">我们的愿景</h4>
                <p className="text-green-700 text-sm">{companyInfo.vision}</p>
              </div>
            </div>
          </div>
        </div>

        {/* 成就数据 */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">我们的成就</h3>
          <div className="grid grid-cols-3 gap-4">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Icon className={`w-6 h-6 ${achievement.color}`} />
                  </div>
                  <div className={`text-xl font-bold ${achievement.color} mb-1`}>{achievement.number}</div>
                  <div className="text-gray-600 text-xs">{achievement.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 发展历程 */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">发展历程</h3>
          <div className="space-y-4">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-sm">{milestone.year.slice(-2)}</span>
                  </div>
                  {index !== milestones.length - 1 && (
                    <div className="w-px h-8 bg-gray-200 mx-auto mt-2"></div>
                  )}
                </div>
                <div className="flex-1 pb-4">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-sm font-semibold text-gray-800">{milestone.year}</span>
                    <span className="text-blue-600 font-medium">{milestone.title}</span>
                  </div>
                  <p className="text-gray-600 text-sm">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 核心团队 */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">核心团队</h3>
          <div className="space-y-4">
            {teamMembers.map((member, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800">{member.name}</h4>
                  <p className="text-blue-600 text-sm font-medium">{member.position}</p>
                  <p className="text-gray-600 text-xs">{member.experience}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 联系方式 */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">联系我们</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-gray-800 font-medium">公司地址</p>
                <p className="text-gray-600 text-sm">{contactInfo.address}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-gray-800 font-medium">联系电话</p>
                <p className="text-blue-600 text-sm">{contactInfo.phone}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-gray-800 font-medium">邮箱地址</p>
                <p className="text-blue-600 text-sm">{contactInfo.email}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Globe className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-gray-800 font-medium">官方网站</p>
                <p className="text-blue-600 text-sm">{contactInfo.website}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
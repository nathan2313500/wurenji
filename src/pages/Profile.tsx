import { User, Settings, BookOpen, Trophy, Calendar, Award, ChevronRight, BarChart3, LogIn, Heart, Info, Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAppStore } from "@/store";
import { mockBookings } from "@/data/mockData";
import BottomNavigation from "@/components/BottomNavigation";

const Profile = () => {
  const navigate = useNavigate();
  const { user, bookings, practiceRecords, isLoggedIn, logout } = useAppStore();

  // 登录状态检查
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login', { 
        state: { from: '/profile' } 
      });
    }
  }, [isLoggedIn, navigate]);

  const menuItems = [
    {
      id: "userInfo",
      title: "用户信息",
      icon: Info,
      path: "/user-info",
      isInfo: true
    },
    {
      id: "orders",
      title: "我的订单",
      icon: Calendar,
      count: [...mockBookings, ...bookings].length,
      path: "/my-orders"
    },
    {
      id: "favorites",
      title: "收藏",
      icon: Heart,
      count: 0,
      path: "/profile/favorites"
    },
    {
      id: "achievements",
      title: "我的学习",
      icon: Trophy,
      count: 5,
      path: "/my-learning"
    },
    {
      id: "aboutUs",
      title: "关于我们",
      icon: Building2,
      path: "/about-us"
    },
    {
      id: "settings",
      title: "设置",
      icon: Settings,
      path: "/profile/settings"
    },
    {
      id: "logout",
      title: "退出登录",
      icon: LogIn,
      path: "/logout",
      isLogout: true
    }
  ];

  const studyStats = [
    {
      label: "学习进度",
      value: `${user?.studyProgress || 0}%`,
      color: "text-blue-600"
    },
    {
      label: "学习时长",
      value: `${user?.totalStudyTime || 0}小时`,
      color: "text-green-600"
    },
    {
      label: "完成课程",
      value: `${user?.completedCourses || 0}门`,
      color: "text-purple-600"
    },
    {
      label: "练习次数",
      value: `${practiceRecords.length}次`,
      color: "text-orange-600"
    }
  ];

  // 如果未登录，显示加载状态
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <LogIn className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">正在跳转到登录页面...</p>
        </div>
      </div>
    );
  }

  const handleMenuClick = (item: any) => {
    if (item.isLogout) {
      logout();
      navigate('/login');
    } else {
      navigate(item.path);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* 头部用户信息 */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-700 px-4 pt-12 pb-8">
        <div className="flex items-center space-x-4 mb-6">
          <img
            src={user?.avatar || "https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20pilot%20avatar%20portrait%20friendly%20smile&image_size=square"}
            alt="用户头像"
            className="w-16 h-16 rounded-full bg-white/10 object-cover"
          />
          <div className="flex-1">
            <h2 className="text-white text-xl font-bold mb-1">{user?.name || "用户"}</h2>
            <p className="text-blue-100 text-sm mb-2">{user?.phone || "未绑定手机"}</p>
            <div className="flex items-center space-x-2">
              <span className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-medium">
                {user?.level === "premium" ? "高级会员" : user?.level === "vip" ? "VIP会员" : "普通用户"}
              </span>
            </div>
          </div>
          <button 
            onClick={() => navigate("/profile/settings")}
            className="text-white/70 hover:text-white"
          >
            <Settings className="w-6 h-6" />
          </button>
        </div>

        {/* 学习统计 */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
          <div className="flex items-center space-x-2 mb-3">
            <BarChart3 className="w-5 h-5 text-white" />
            <h3 className="text-white font-semibold">学习统计</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {studyStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-white text-lg font-bold mb-1">{stat.value}</div>
                <div className="text-blue-100 text-xs">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 功能菜单 */}
      <div className="px-4 py-6">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item)}
                className={`w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors ${
                  index !== menuItems.length - 1 ? "border-b border-gray-100" : ""
                } ${item.isLogout ? 'text-red-600' : ''}`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 ${item.isLogout ? 'bg-red-50' : 'bg-blue-50'} rounded-xl flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${item.isLogout ? 'text-red-600' : 'text-blue-600'}`} />
                  </div>
                  <span className={`font-medium ${item.isLogout ? 'text-red-600' : 'text-gray-800'}`}>{item.title}</span>
                </div>
                <div className="flex items-center space-x-2">
                  {item.count !== undefined && (
                    <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-medium">
                      {item.count}
                    </span>
                  )}
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </button>
            );
          })}
        </div>
      </div>



      <BottomNavigation />
    </div>
  );
};

export default Profile;
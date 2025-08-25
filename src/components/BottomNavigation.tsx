import React from 'react';
import { Home, BookOpen, Brain, Calendar, User } from 'lucide-react';
import { useAppStore } from '@/store';
import { useNavigate, useLocation } from 'react-router-dom';

const BottomNavigation = () => {
  const { activeTab, setActiveTab } = useAppStore();
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { id: 'home', label: '首页', icon: Home, path: '/' },
    { id: 'learning', label: '学习', icon: BookOpen, path: '/learning' },
    { id: 'practice', label: '练习', icon: Brain, path: '/practice' },
    { id: 'booking', label: '预约', icon: Calendar, path: '/booking' },
    { id: 'profile', label: '我的', icon: User, path: '/profile' }
  ];

  const handleTabClick = (tab: typeof tabs[0]) => {
    setActiveTab(tab.id);
    navigate(tab.path);
  };

  // 根据当前路径设置活跃标签
  const getCurrentTab = () => {
    const currentPath = location.pathname;
    const currentTab = tabs.find(tab => tab.path === currentPath);
    return currentTab?.id || 'home';
  };

  const currentActiveTab = getCurrentTab();

  return (
 <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-1 z-50">
 <div className="flex justify-around items-center max-w-md mx-auto">
 {tabs.map((tab) => {
 const Icon = tab.icon;
 const isActive = currentActiveTab === tab.id;
 
 return (
 <button
 key={tab.id}
 onClick={() => handleTabClick(tab)}
 className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200 ${
 isActive 
 ? 'text-blue-600 bg-blue-50' 
 : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
 }`}
 >
 <Icon 
 size={20} 
 className={`mb-1 ${
 isActive ? 'text-blue-600' : 'text-gray-600'
 }`} 
 />
 <span className={`text-xs font-medium ${
 isActive ? 'text-blue-600' : 'text-gray-600'
 }`}>
 {tab.label}
 </span>
 </button>
 );
 })}
 </div>
 </div>
 );
};

export default BottomNavigation;

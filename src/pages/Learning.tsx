import React, { useState } from "react";
import { BookOpen, Clock, Star, Play, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/store";
import { mockCourses } from "@/data/mockData";
import BottomNavigation from "@/components/BottomNavigation";

const Learning = () => {
 const navigate = useNavigate();
 const { setCourses, isPurchased } = useAppStore();
 const [activeCategory, setActiveCategory] = useState("all");

 const categories = [
 { id: "all", label: "全部" },
 { id: "VLOS", label: "VLOS" },
 { id: "BVLOS", label: "BVLOS" },
 { id: "INSTRUCTOR", label: "教员" }
 ];

 const filteredCourses = activeCategory === "all" 
 ? mockCourses 
 : mockCourses.filter(course => course.category === activeCategory);

 React.useEffect(() => {
 setCourses(mockCourses);
 }, [setCourses]);

 return (
 <div className="min-h-screen bg-gray-50 pb-20">
 {/* 头部 */}
 <div className="bg-gradient-to-br from-blue-500 to-blue-700 px-4 pt-12 pb-6">
 <h1 className="text-white text-xl font-bold mb-4">学习中心</h1>
 
 {/* 分类标签 */}
 <div className="flex space-x-2">
 {categories.map((category) => (
 <button
 key={category.id}
 onClick={() => setActiveCategory(category.id)}
 className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
 activeCategory === category.id
 ? "bg-white text-blue-600"
 : "bg-white/20 text-white hover:bg-white/30"
 }`}
 >
 {category.label}
 </button>
 ))}
 </div>
 </div>

 {/* 课程列表 */}
 <div className="px-4 py-6">
 <div className="space-y-4">
 {filteredCourses.map((course) => {
 const completedChapters = course.chapters.filter(c => c.completed).length;
 const progress = (completedChapters / course.chapters.length) * 100;
 
 return (
 <div
 key={course.id}
 className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
 onClick={() => navigate(`/learning/course/${course.id}`)}
 >
 <div className="flex space-x-4">
 <img
 src={course.cover}
 alt={course.title}
 className="w-20 h-16 object-cover rounded-xl flex-shrink-0"
 />
 <div className="flex-1">
 <div className="flex items-start justify-between mb-2">
 <h3 className="font-semibold text-gray-800 text-base leading-tight">
 {course.title}
 </h3>
 <div className="flex items-center space-x-1">
 {course.isFree ? (
 <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs font-medium">
 免费
 </span>
 ) : isPurchased(course.id) ? (
 <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs font-medium">
 已购买
 </span>
 ) : (
 <span className="text-orange-500 font-bold text-sm">
 ¥{course.price}
 </span>
 )}
 </div>
 </div>
 
 <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
 <div className="flex items-center space-x-1">
 <Clock className="w-4 h-4" />
 <span>{course.duration}</span>
 </div>
 <div className="flex items-center space-x-1">
 <BookOpen className="w-4 h-4" />
 <span>{course.chapters.length}章节</span>
 </div>
 </div>
 
 {isPurchased(course.id) && (
 <div className="mb-2">
 <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
 <span>学习进度</span>
 <span>{Math.round(progress)}%</span>
 </div>
 <div className="w-full bg-gray-200 rounded-full h-2">
 <div 
 className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300"
 style={{ width: `${progress}%` }}
 />
 </div>
 </div>
 )}
 
 <p className="text-gray-600 text-sm line-clamp-2">
 {course.description}
 </p>
 </div>
 </div>
 </div>
 );
 })}
 </div>
 </div>

 <BottomNavigation />
 </div>
 );
};

export default Learning;

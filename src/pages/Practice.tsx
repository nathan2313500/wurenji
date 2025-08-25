import React, { useState } from "react";
import { Brain, Trophy, BookOpen, Clock, ChevronRight, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/store";
import { mockQuestions, mockPracticeRecords } from "@/data/mockData";
import BottomNavigation from "@/components/BottomNavigation";

const Practice = () => {
 const navigate = useNavigate();
 const { practiceRecords, wrongQuestions } = useAppStore();

 const practiceTypes = [
 {
 id: "chapter",
 title: "章节练习",
 description: "按章节分类练习，巩固知识点",
 icon: BookOpen,
 color: "bg-gradient-to-br from-blue-500 to-blue-600",
 path: "/practice/chapter"
 },
 {
 id: "mock",
 title: "模拟考试",
 description: "全真模拟考试环境，检验学习成果",
 icon: Trophy,
 color: "bg-gradient-to-br from-green-500 to-green-600",
 path: "/practice/mock"
 },
 {
 id: "real",
 title: "真题训练",
 description: "真题训练专项训练，详细错题讲解",
 icon: Brain,
 color: "bg-gradient-to-br from-orange-500 to-orange-600",
 path: "/practice/real"
 },
 {
 id: "wrong",
 title: "错题本",
 description: "针对性练习错题，提高答题准确率",
 icon: Target,
 color: "bg-gradient-to-br from-red-500 to-red-600",
 path: "/practice/wrong"
 }
 ];

 const recentRecords = [...mockPracticeRecords, ...practiceRecords]
 .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
 .slice(0, 3);

 return (
 <div className="min-h-screen bg-gray-50 pb-20">
 {/* 头部 */}
 <div className="bg-gradient-to-br from-purple-500 to-purple-700 px-4 pt-12 pb-6">
 <h1 className="text-white text-xl font-bold mb-4">练习中心</h1>
 
 {/* 统计卡片 */}
 <div className="grid grid-cols-3 gap-3">
 <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
 <div className="text-white text-lg font-bold">{mockQuestions.length}</div>
 <div className="text-purple-100 text-xs">题库总数</div>
 </div>
 <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
 <div className="text-white text-lg font-bold">{recentRecords.length}</div>
 <div className="text-purple-100 text-xs">练习次数</div>
 </div>
 <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
 <div className="text-white text-lg font-bold">{wrongQuestions.length}</div>
 <div className="text-purple-100 text-xs">错题数量</div>
 </div>
 </div>
 </div>

 {/* 练习类型 */}
 <div className="px-4 py-6">
 <h2 className="text-lg font-semibold text-gray-800 mb-4">选择练习类型</h2>
 <div className="space-y-4 mb-8">
 {practiceTypes.map((type) => {
 const Icon = type.icon;
 return (
 <button
 key={type.id}
 onClick={() => navigate(type.path)}
 className="w-full bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all flex items-center space-x-4"
 >
 <div className={`w-12 h-12 ${type.color} rounded-xl flex items-center justify-center`}>
 <Icon className="w-6 h-6 text-white" />
 </div>
 <div className="flex-1 text-left">
 <h3 className="font-semibold text-gray-800 mb-1">{type.title}</h3>
 <p className="text-gray-600 text-sm">{type.description}</p>
 </div>
 <ChevronRight className="w-5 h-5 text-gray-400" />
 </button>
 );
 })}
 </div>

 {/* 最近练习记录 */}
 {recentRecords.length > 0 && (
 <div>
 <h2 className="text-lg font-semibold text-gray-800 mb-4">最近练习</h2>
 <div className="space-y-3">
 {recentRecords.map((record) => {
 const typeMap = {
 chapter: { label: "章节练习", color: "bg-blue-100 text-blue-600" },
 mock: { label: "模拟考试", color: "bg-green-100 text-green-600" },
 real: { label: "真题训练", color: "bg-orange-100 text-orange-600" },
 wrong: { label: "错题练习", color: "bg-red-100 text-red-600" }
 };
 
 const typeInfo = typeMap[record.type];
 const accuracy = Math.round((record.correctAnswers / record.totalQuestions) * 100);
 
 return (
 <div key={record.id} className="bg-white rounded-xl p-4 shadow-sm">
 <div className="flex items-center justify-between mb-2">
 <span className={`px-2 py-1 rounded-full text-xs font-medium ${typeInfo.color}`}>
 {typeInfo.label}
 </span>
 <span className="text-gray-500 text-sm">{record.date}</span>
 </div>
 <div className="flex items-center justify-between">
 <div className="flex items-center space-x-4">
 <div className="text-center">
 <div className="text-lg font-bold text-gray-800">{record.score}</div>
 <div className="text-xs text-gray-500">分数</div>
 </div>
 <div className="text-center">
 <div className="text-lg font-bold text-gray-800">{accuracy}%</div>
 <div className="text-xs text-gray-500">正确率</div>
 </div>
 <div className="text-center">
 <div className="text-lg font-bold text-gray-800">{Math.floor(record.timeSpent / 60)}</div>
 <div className="text-xs text-gray-500">分钟</div>
 </div>
 </div>
 <button className="text-blue-500 text-sm font-medium hover:text-blue-600">
 查看详情
 </button>
 </div>
 </div>
 );
 })}
 </div>
 </div>
 )}
 </div>

 <BottomNavigation />
 </div>
 );
};

export default Practice;

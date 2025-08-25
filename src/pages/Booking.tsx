import { useState, useEffect } from "react";
import { Calendar, MapPin, Star, Clock, ChevronRight, Users, Award, LogIn, CreditCard, X, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/store";
import { mockInstitutions, mockExamCenters, mockBookings } from "@/data/mockData";
import BottomNavigation from "@/components/BottomNavigation";

const Booking = () => {
 const navigate = useNavigate();
 const { bookings, isLoggedIn, isEnrolled, user, enrollmentInfo } = useAppStore();
 const [activeTab, setActiveTab] = useState("training");
 const [myBookingsList, setMyBookingsList] = useState([]);
 const [showCancelModal, setShowCancelModal] = useState(false);
 const [cancelReason, setCancelReason] = useState("");
 const [bookingToCancel, setBookingToCancel] = useState(null);

 // 登录状态检查
 useEffect(() => {
 if (!isLoggedIn) {
 navigate('/login', { 
 state: { from: '/booking' } 
 });
 }
 }, [isLoggedIn, navigate]);

 const serviceTypes = [
 {
 id: "training",
 title: "培训预约",
 description: "预约无人机培训课程",
 icon: Users,
 color: "bg-gradient-to-br from-blue-500 to-blue-600"
 },
 {
 id: "exam",
 title: "考试预约",
 description: "预约无人机执照考试",
 icon: Award,
 color: "bg-gradient-to-br from-green-500 to-green-600"
 }
 ];

 const currentData = activeTab === "training" ? mockInstitutions : mockExamCenters;
 
 // 初始化我的预约列表
 useEffect(() => {
 const initialBookings = [...mockBookings, ...bookings].filter(booking => booking.type === activeTab);
 setMyBookingsList(initialBookings);
 }, [activeTab, bookings]);
 
 // 取消预约处理函数
 const handleCancelBooking = (booking) => {
 const bookingWithDetails = {
 ...booking,
 studentName: user?.name || '张三',
 studentPhone: user?.phone || '138****5678',
 course: '科目二训练',
 applyTime: new Date().toLocaleString('zh-CN')
 };
 setBookingToCancel(bookingWithDetails);
 setShowCancelModal(true);
 };
 
 // 提交取消预约
 const submitCancelBooking = () => {
 if (bookingToCancel && cancelReason.trim()) {
 setMyBookingsList(prev => prev.filter(b => b.id !== bookingToCancel.id));
 setShowCancelModal(false);
 setCancelReason("");
 setBookingToCancel(null);
 }
 };
 
 // 关闭取消弹窗
 const closeCancelModal = () => {
 setShowCancelModal(false);
 setCancelReason("");
 setBookingToCancel(null);
 };

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

 // 如果已登录但未报名，显示报名提示
 if (!isEnrolled) {
 return (
 <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 pb-20">
 {/* 头部 */}
 <div className="bg-gradient-to-br from-blue-500 to-blue-600 px-4 pt-12 pb-6">
 <h1 className="text-white text-xl font-bold mb-4">预约服务</h1>
 <p className="text-white/90 text-sm">欢迎回来，{user?.name}</p>
 </div>

 {/* 报名提示 */}
 <div className="px-4 py-8">
 <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
 <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
 <CreditCard className="w-8 h-8 text-blue-600" />
 </div>
 <h2 className="text-xl font-semibold text-gray-900 mb-2">开始您的飞行之旅</h2>
 <p className="text-gray-600 mb-6">
 您还未报名任何课程，请先选择适合的培训课程进行报名
 </p>
 <button
 onClick={() => navigate('/enrollment')}
 className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-4 px-6 rounded-xl font-semibold text-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
 >
 立即报名
 </button>
 {/* 课程优势 */}
 <div className="mt-6 space-y-4">
 <h3 className="text-lg font-semibold text-gray-900">为什么选择我们？</h3>
 <div className="grid gap-4">
 <div className="bg-white rounded-xl p-4 shadow-sm">
 <div className="flex items-center space-x-3">
 <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
 <Award className="w-5 h-5 text-green-600" />
 </div>
 <div>
 <h4 className="font-semibold text-gray-900">专业认证</h4>
 <p className="text-sm text-gray-600">CAAC认证培训机构</p>
 </div>
 </div>
 </div>
 <div className="bg-white rounded-xl p-4 shadow-sm">
 <div className="flex items-center space-x-3">
 <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
 <Users className="w-5 h-5 text-blue-600" />
 </div>
 <div>
 <h4 className="font-semibold text-gray-900">资深教练</h4>
 <p className="text-sm text-gray-600">10年以上飞行经验</p>
 </div>
 </div>
 </div>
 </div>
 </div>
 </div>
 </div>

 <BottomNavigation />
 </div>
 );
 }

 return (
 <div className="min-h-screen bg-gray-50 pb-20">
 {/* 头部 */}
 <div className="px-4 pt-12 pb-6" style={{backgroundColor: '#2969ED'}}>
 <div className="flex items-center justify-between mb-4">
 <div>
 <h1 className="text-white text-xl font-bold">预约服务</h1>
 <p className="text-white/90 text-sm">欢迎回来，{user?.name}</p>
 </div>
 </div>
 
 {/* 服务类型切换 */}
 <div className="flex space-x-2">
 {serviceTypes.map((type) => (
 <button
 key={type.id}
 onClick={() => setActiveTab(type.id)}
 className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
 activeTab === type.id
 ? "bg-white"
 : "bg-white/20 text-white hover:bg-white/30"
 }`}
 style={activeTab === type.id ? { color: '#2969ED' } : {}}
 >
 {type.title}
 </button>
 ))}
 </div>
 </div>

 {/* 我的预约 */}
 {myBookingsList.length > 0 && (
 <div className="px-4 py-6">
 <h2 className="text-lg font-semibold text-gray-800 mb-4">我的预约</h2>
 <div className="space-y-3 mb-6">
 {myBookingsList.slice(0, 2).map((booking) => {
 const statusMap = {
 pending: { label: "待确认", color: "bg-yellow-100 text-yellow-600" },
 confirmed: { label: "已确认", color: "bg-green-100 text-green-600" },
 completed: { label: "已完成", color: "bg-blue-100 text-blue-600" },
 cancelled: { label: "已取消", color: "bg-gray-100 text-gray-600" }
 };
 
 const statusInfo = statusMap[booking.status];
 
 return (
 <div key={booking.id} className="bg-white rounded-xl p-4 shadow-sm">
 <div className="flex items-center justify-between mb-2">
 <h3 className="font-semibold text-gray-800">{booking.institutionName}</h3>
 <div className="flex items-center space-x-2">
 <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
 {statusInfo.label}
 </span>
 {booking.status !== 'cancelled' && booking.status !== 'completed' && (
 <button
 onClick={() => handleCancelBooking(booking)}
 className="text-red-500 hover:text-red-600 transition-colors text-sm"
 >取消预约</button>
 )}
 </div>
 </div>
 <div className="flex items-center space-x-4 text-sm text-gray-600">
 <div className="flex items-center space-x-1">
 <Calendar className="w-4 h-4" />
 <span>{booking.date}</span>
 </div>
 <div className="flex items-center space-x-1">
 <Clock className="w-4 h-4" />
 <span>{booking.time}</span>
 </div>
 </div>
 </div>
 );
 })}
 </div>
 </div>
 )}

 {/* 机构/考点列表 */}
 <div className="px-4 pb-6">
 <h2 className="text-lg font-semibold text-gray-800 mb-4">
 {activeTab === "training" ? "培训场地" : "考试中心"}
 </h2>
 <div className="space-y-4">
 {currentData.map((item) => (
 <div
 key={item.id}
 className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
 onClick={() => navigate(`/booking/${item.id}`)}
 >
 <div className="flex space-x-4">
 <img
 src={item.image}
 alt={item.name}
 className="w-20 h-16 object-cover rounded-xl flex-shrink-0"
 />
 <div className="flex-1">
 <div className="flex items-start justify-between mb-2">
 <h3 className="font-semibold text-gray-800 text-base leading-tight">
 {item.name}
 </h3>
 <div className="flex items-center space-x-1">
 <Star className="w-4 h-4 text-yellow-400 fill-current" />
 <span className="text-sm font-medium text-gray-700">{item.rating}</span>
 </div>
 </div>
 
 <div className="flex items-center space-x-1 text-sm text-gray-600 mb-2">
 <MapPin className="w-4 h-4" />
 <span className="flex-1">{item.address}</span>
 <span className="text-blue-500">{item.distance}</span>
 </div>
 
 <div className="flex flex-wrap gap-1">
 {(activeTab === "training" ? item.services : item.examTypes).map((service, index) => (
 <span
 key={index}
 className="bg-blue-50 text-blue-600 px-2 py-1 rounded-full text-xs"
 >
 {service}
 </span>
 ))}
 </div>
 </div>
 <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
 </div>
 </div>
 ))}
 </div>
 </div>

 {/* 取消预约弹窗 */}
 {showCancelModal && (
 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
 <div className="bg-white rounded-2xl p-6 w-full max-w-sm">
 <div className="flex items-center justify-between mb-4">
 <h3 className="text-lg font-semibold text-gray-900">取消预约</h3>
 <button
 onClick={closeCancelModal}
 className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
 >
 <X className="w-5 h-5" />
 </button>
 </div>
 
 {bookingToCancel && (
 <div className="mb-4 p-4 bg-gray-50 rounded-lg space-y-3">
 <div className="grid grid-cols-2 gap-3 text-sm">
 <div>
 <span className="text-gray-600">学员姓名：</span>
 <span className="font-medium text-gray-900">{bookingToCancel.studentName}</span>
 </div>
 <div>
 <span className="text-gray-600">联系电话：</span>
 <span className="font-medium text-gray-900">{bookingToCancel.studentPhone}</span>
 </div>
 <div>
 <span className="text-gray-600">预约日期：</span>
 <span className="font-medium text-gray-900">{bookingToCancel.date}</span>
 </div>
 <div>
 <span className="text-gray-600">预约时间：</span>
 <span className="font-medium text-gray-900">{bookingToCancel.time}</span>
 </div>
 <div>
 <span className="text-gray-600">课程类型：</span>
 <span className="font-medium text-gray-900">{bookingToCancel.course}</span>
 </div>
 <div>
 <span className="text-gray-600">申请时间：</span>
 <span className="font-medium text-gray-900">{bookingToCancel.applyTime}</span>
 </div>
 </div>
 </div>
 )}
 
 <div className="mb-6">
 <label className="block text-sm font-medium text-gray-700 mb-2">
 取消原因 <span className="text-red-500">*</span>
 </label>
 <textarea
 value={cancelReason}
 onChange={(e) => setCancelReason(e.target.value)}
 placeholder="请输入取消预约的原因..."
 className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
 rows={4}
 />
 </div>
 
 <div className="flex space-x-3">
 <button
 onClick={closeCancelModal}
 className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
 >
 取消
 </button>
 <button
 onClick={submitCancelBooking}
 disabled={!cancelReason.trim()}
 className="flex-1 py-3 px-4 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
 >
 确认取消
 </button>
 </div>
 </div>
 </div>
 )}

 <BottomNavigation />
 </div>
 );
};

export default Booking;

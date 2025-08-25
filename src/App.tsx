import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import SystemEntry from "@/pages/SystemEntry";
import Home from "@/pages/Home";
import Learning from "@/pages/Learning";
import CourseDetail from "@/pages/CourseDetail";
import VideoPlayer from "@/pages/VideoPlayer";
import Practice from "@/pages/Practice";
import ChapterPractice from "@/pages/ChapterPractice";
import MockExam from "@/pages/MockExam";
import WrongQuestions from "@/pages/WrongQuestions";
import RealExamPractice from "@/pages/RealExamPractice";
import Booking from "@/pages/Booking";
import BookingDetail from "@/pages/BookingDetail";
import Profile from "@/pages/Profile";
import Login from "@/pages/Login";
import Enrollment from "@/pages/Enrollment";
import Payment from "@/pages/Payment";
import PaymentSuccess from "@/pages/PaymentSuccess";
import NewsDetail from "@/pages/NewsDetail";
import News from "@/pages/News";
import UserInfo from "@/pages/UserInfo";
import MyOrders from "@/pages/MyOrders";
import MyLearning from "@/pages/MyLearning";
import AboutUs from "@/pages/AboutUs";
import ExamLocation from "@/pages/ExamLocation";

// 教练端页面导入
import CoachHome from "@/pages/coach/CoachHome";
import CoachLogin from "@/pages/coach/CoachLogin";
import BookingManagement from "@/pages/coach/BookingManagement";
import BookingDetails from "@/pages/coach/BookingDetails";
import CancellationManagement from "@/pages/coach/CancellationManagement";
import TrainingCheckin from "@/pages/coach/TrainingCheckin";

import TeachingRecords from "@/pages/coach/TeachingRecords";
import StudentProgress from "@/pages/coach/StudentProgress";
import CoachProfile from "@/pages/coach/CoachProfile";
import CoachCheckin from "@/pages/coach/CoachCheckin";



export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const isEntry = location.pathname === "/";


  const content = (
    <Routes>
      <Route path="/" element={<SystemEntry />} />
      
      {/* 学员端路由 */}
      <Route path="/student" element={<Home />} />
      <Route path="/learning" element={<Learning />} />
      <Route path="/learning/course/:id" element={<CourseDetail />} />
      <Route path="/learning/video/:courseId/:chapterId" element={<VideoPlayer />} />
      <Route path="/practice" element={<Practice />} />
      <Route path="/practice/chapter" element={<ChapterPractice />} />
      <Route path="/practice/chapter/:chapterId" element={<ChapterPractice />} />
      <Route path="/practice/mock" element={<MockExam />} />
      <Route path="/practice/mock/:examId" element={<MockExam />} />
      <Route path="/practice/wrong" element={<WrongQuestions />} />
      <Route path="/practice/real" element={<RealExamPractice />} />
      <Route path="/booking" element={<Booking />} />
      <Route path="/booking/:id" element={<BookingDetail />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/login" element={<Login />} />
      <Route path="/enrollment" element={<Enrollment />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/payment-success" element={<PaymentSuccess />} />
      <Route path="/news" element={<News />} />
      <Route path="/news/:id" element={<NewsDetail />} />
      <Route path="/user-info" element={<UserInfo />} />
      <Route path="/my-orders" element={<MyOrders />} />
      <Route path="/my-learning" element={<MyLearning />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/exam-location" element={<ExamLocation />} />
      <Route path="/profile/favorites" element={<div className="mobile-content text-center">收藏 - 开发中</div>} />
      <Route path="/profile/settings" element={<div className="mobile-content text-center">设置 - 开发中</div>} />
      
      {/* 教练端路由 */}
      <Route path="/coach" element={<CoachHome />} />
      <Route path="/coach/login" element={<CoachLogin />} />
      <Route path="/coach/bookings" element={<BookingManagement />} />
      <Route path="/coach/bookings/:id" element={<BookingDetails />} />
      <Route path="/coach/cancellations" element={<CancellationManagement />} />
      <Route path="/coach/checkin" element={<TrainingCheckin />} />

      <Route path="/coach/records" element={<TeachingRecords />} />
      <Route path="/coach/progress" element={<StudentProgress />} />
      <Route path="/coach/profile" element={<CoachProfile />} />
      <Route path="/coach/checkin/coach" element={<CoachCheckin />} />
      

    </Routes>
  );

  return isEntry ? content : <div className="mobile-container">{content}</div>;
}

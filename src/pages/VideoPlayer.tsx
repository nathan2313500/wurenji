import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Pause, Volume2, MessageCircle, BookOpen, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { getCourseById } from '../data/mockData';
import ReviewModal from '../components/ReviewModal';
import { useAppStore } from '@/store';

interface Note {
  id: string;
  time: number;
  content: string;
  timestamp: string;
}

interface Discussion {
  id: string;
  user: string;
  avatar: string;
  content: string;
  time: string;
  replies?: Discussion[];
}

const VideoPlayer: React.FC = () => {
  const { courseId, chapterId } = useParams<{ courseId: string; chapterId: string }>();
  const navigate = useNavigate();
  const { isLoggedIn } = useAppStore();

  // 检查登录状态
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login', { 
        state: { from: location.pathname } 
      });
    }
  }, [isLoggedIn, navigate]);
  const [course, setCourse] = useState<any>(null);
  const [currentChapter, setCurrentChapter] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const [showChapters, setShowChapters] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [showDiscussion, setShowDiscussion] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState('');
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [newDiscussion, setNewDiscussion] = useState('');
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [courseData, setCourseData] = useState<any>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (courseId) {
      const courseData = getCourseById(courseId);
      setCourse(courseData);
      setCourseData(courseData);
      
      if (courseData && chapterId) {
        const chapter = courseData.chapters.find((ch: any) => ch.id === chapterId);
        setCurrentChapter(chapter);
        setDuration(typeof chapter?.duration === 'number' ? chapter.duration : 0);
      }
    }

    // 模拟讨论数据
    setDiscussions([
      {
        id: '1',
        user: '张同学',
        avatar: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=student%20avatar%20profile%20picture&image_size=square',
        content: '这个章节的飞行原理讲解得很清楚，请问老师能再详细说明一下升力的产生机制吗？',
        time: '2小时前',
        replies: [
          {
            id: '1-1',
            user: '李教练',
            avatar: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=instructor%20teacher%20avatar%20professional&image_size=square',
            content: '升力主要由伯努利定理和牛顿第三定律共同作用产生，机翼上下表面的压力差是关键。',
            time: '1小时前'
          }
        ]
      },
      {
        id: '2',
        user: '王学员',
        avatar: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=student%20learner%20avatar%20young&image_size=square',
        content: '考试中关于这部分内容的重点是什么？',
        time: '30分钟前'
      }
    ]);
  }, [courseId, chapterId]);

  // 监听课程完成状态
  useEffect(() => {
    if (courseData) {
      const completedChapters = courseData.chapters.filter((chapter: any) => chapter.completed).length;
      const totalChapters = courseData.chapters.length;
      const progress = Math.round((completedChapters / totalChapters) * 100);
      
      // 检查是否已评价过
      const hasReviewed = localStorage.getItem(`course_reviewed_${courseData.id}`) === 'true';
      
      if (progress === 100 && !hasReviewed && !showReviewModal) {
        // 延迟1秒显示评价弹窗
        setTimeout(() => {
          setShowReviewModal(true);
        }, 1000);
      }
    }
  }, [courseData, showReviewModal]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = (parseFloat(e.target.value) / 100) * duration;
    setCurrentTime(newTime);
  };



  const handleChapterChange = (chapterId: string) => {
    navigate(`/learning/video/${courseId}/${chapterId}`);
    setShowChapters(false);
  };

  // 标记章节为完成状态
  const markChapterCompleted = (chapterId: string) => {
    if (courseData) {
      const updatedCourse = {
        ...courseData,
        chapters: courseData.chapters.map((chapter: any) => 
          chapter.id === chapterId ? { ...chapter, completed: true } : chapter
        )
      };
      setCourseData(updatedCourse);
    }
  };

  // 处理评价提交
  const handleSubmitReview = (rating: number, comment: string) => {
    if (courseData) {
      const newReview = {
        id: Date.now(),
        user: '当前用户',
        avatar: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20user%20avatar%20portrait%20friendly%20smile&image_size=square',
        rating,
        comment,
        date: new Date().toLocaleDateString('zh-CN')
      };
      
      // 更新课程评价数据
      const updatedCourse = {
        ...courseData,
        reviews: [...(courseData.reviews || []), newReview],
        rating: courseData.reviews ? 
          ((courseData.rating * courseData.reviews.length + rating) / (courseData.reviews.length + 1)).toFixed(1) :
          rating.toString()
      };
      
      setCourseData(updatedCourse);
      
      // 标记为已评价
      localStorage.setItem(`course_reviewed_${courseData.id}`, 'true');
      setShowReviewModal(false);
    }
  };

  const handleAddNote = () => {
    if (newNote.trim()) {
      const note: Note = {
        id: Date.now().toString(),
        time: currentTime,
        content: newNote,
        timestamp: new Date().toLocaleString()
      };
      setNotes([...notes, note]);
      setNewNote('');
    }
  };

  const handleAddDiscussion = () => {
    if (newDiscussion.trim()) {
      const discussion: Discussion = {
        id: Date.now().toString(),
        user: '我',
        avatar: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=user%20avatar%20profile%20default&image_size=square',
        content: newDiscussion,
        time: '刚刚'
      };
      setDiscussions([discussion, ...discussions]);
      setNewDiscussion('');
    }
  };

  if (!course || !currentChapter) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-500">课程或章节未找到</div>
          <button
            onClick={() => navigate('/learning')}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            返回学习中心
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航 */}
      <div className="bg-white shadow-sm px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => navigate(`/learning/course/${courseId}`)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="font-semibold text-gray-900 truncate">{currentChapter.title}</h1>
            <p className="text-sm text-gray-500">{course.title}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowChapters(!showChapters)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <BookOpen className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 视频播放器 */}
      <div className="bg-black relative">
        <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto">
              {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
            </div>
            <p className="text-lg font-medium">{currentChapter.title}</p>
            <p className="text-sm text-gray-300 mt-1">时长: {Math.floor(currentChapter.duration / 60)}分钟</p>
          </div>
        </div>

        {/* 播放控制栏 */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <div className="flex items-center space-x-4 text-white">
            <button
              onClick={handlePlayPause}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
            </button>
            
            <div className="flex-1 flex items-center space-x-3">
              <span className="text-sm">{formatTime(currentTime)}</span>
              <input
                type="range"
                min="0"
                max="100"
                value={(currentTime / duration) * 100 || 0}
                onChange={handleProgressChange}
                className="flex-1 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-sm">{formatTime(duration)}</span>
            </div>

            <div className="flex items-center space-x-2">
              <Volume2 className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      {/* 章节列表侧边栏 */}
      {showChapters && (
        <div className="fixed inset-y-0 right-0 w-80 bg-white shadow-xl z-50 overflow-y-auto">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">课程章节</h3>
              <button
                onClick={() => setShowChapters(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <ChevronUp className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="p-4 space-y-2">
            {course.chapters.map((chapter: any, index: number) => (
              <button
                key={chapter.id}
                onClick={() => handleChapterChange(chapter.id)}
                className={`w-full text-left p-3 rounded-lg border transition-colors ${
                  chapter.id === chapterId
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">
                      {index + 1}. {chapter.title}
                    </div>
                    <div className="text-sm text-gray-500 mt-1 flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>{Math.floor(chapter.duration / 60)}分钟</span>
                      {chapter.isFree && (
                        <span className="px-2 py-0.5 bg-green-100 text-green-600 text-xs rounded-full">
                          免费
                        </span>
                      )}
                    </div>
                  </div>
                  {chapter.completed && (
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 底部功能区 */}
      <div className="bg-white border-t">
        <div className="flex">
          <button
            onClick={() => {
              setShowNotes(!showNotes);
              setShowDiscussion(false);
            }}
            className={`flex-1 py-3 px-4 text-center border-r transition-colors ${
              showNotes ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <BookOpen className="w-5 h-5 mx-auto mb-1" />
            <div className="text-sm">笔记 ({notes.length})</div>
          </button>
          <button
            onClick={() => {
              setShowDiscussion(!showDiscussion);
              setShowNotes(false);
            }}
            className={`flex-1 py-3 px-4 text-center transition-colors ${
              showDiscussion ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <MessageCircle className="w-5 h-5 mx-auto mb-1" />
            <div className="text-sm">讨论 ({discussions.length})</div>
          </button>
        </div>

        {/* 笔记区域 */}
        {showNotes && (
          <div className="border-t bg-gray-50 p-4 max-h-80 overflow-y-auto">
            <div className="mb-4">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="在此添加学习笔记..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={handleAddNote}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  添加
                </button>
              </div>
            </div>
            <div className="space-y-3">
              {notes.map(note => (
                <div key={note.id} className="bg-white p-3 rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-blue-600 font-medium">
                      {formatTime(note.time)}
                    </span>
                    <span className="text-xs text-gray-500">{note.timestamp}</span>
                  </div>
                  <p className="text-gray-900">{note.content}</p>
                </div>
              ))}
              {notes.length === 0 && (
                <div className="text-center text-gray-500 py-8">
                  暂无笔记，开始记录学习要点吧！
                </div>
              )}
            </div>
          </div>
        )}

        {/* 讨论区域 */}
        {showDiscussion && (
          <div className="border-t bg-gray-50 p-4 max-h-80 overflow-y-auto">
            <div className="mb-4">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newDiscussion}
                  onChange={(e) => setNewDiscussion(e.target.value)}
                  placeholder="提出问题或分享想法..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={handleAddDiscussion}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  发送
                </button>
              </div>
            </div>
            <div className="space-y-4">
              {discussions.map(discussion => (
                <div key={discussion.id} className="bg-white p-4 rounded-lg border">
                  <div className="flex items-start space-x-3">
                    <img
                      src={discussion.avatar}
                      alt={discussion.user}
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-gray-900">{discussion.user}</span>
                        <span className="text-xs text-gray-500">{discussion.time}</span>
                      </div>
                      <p className="text-gray-700">{discussion.content}</p>
                      {discussion.replies && (
                        <div className="mt-3 pl-4 border-l-2 border-gray-200 space-y-2">
                          {discussion.replies.map(reply => (
                            <div key={reply.id} className="flex items-start space-x-2">
                              <img
                                src={reply.avatar}
                                alt={reply.user}
                                className="w-6 h-6 rounded-full"
                              />
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-1">
                                  <span className="text-sm font-medium text-gray-900">{reply.user}</span>
                                  <span className="text-xs text-gray-500">{reply.time}</span>
                                </div>
                                <p className="text-sm text-gray-700">{reply.content}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* 评价弹窗 */}
      <ReviewModal
        isOpen={showReviewModal}
        onClose={() => setShowReviewModal(false)}
        courseTitle={courseData?.title || ''}
        onSubmitReview={handleSubmitReview}
      />
    </div>
  );
};

export default VideoPlayer;
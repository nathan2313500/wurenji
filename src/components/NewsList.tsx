import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock } from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  summary?: string;
  publishTime: string;
  category?: string;
  image?: string;
  link?: string;
  isHot?: boolean;
}

interface NewsListProps {
  items: NewsItem[];
  onItemClick?: (item: NewsItem) => void;
  showImage?: boolean;
  compact?: boolean;
}

const NewsList: React.FC<NewsListProps> = ({
  items,
  onItemClick,
  showImage = true,
  compact = false
}) => {
  const navigate = useNavigate();
  
  const handleItemClick = (item: NewsItem) => {
    if (onItemClick) {
      onItemClick(item);
    } else {
      // 跳转到资讯详情页
      navigate(`/news/${item.id}`);
    }
  };

  const formatTime = (timeString: string) => {
    try {
      const date = new Date(timeString);
      const now = new Date();
      const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
      
      if (diffInHours < 1) {
        return '刚刚';
      } else if (diffInHours < 24) {
        return `${diffInHours}小时前`;
      } else if (diffInHours < 24 * 7) {
        const days = Math.floor(diffInHours / 24);
        return `${days}天前`;
      } else {
        return date.toLocaleDateString('zh-CN', {
          month: 'short',
          day: 'numeric'
        });
      }
    } catch {
      return timeString;
    }
  };

  if (!items || items.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>暂无资讯</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div
          key={item.id}
          onClick={() => handleItemClick(item)}
          className={`bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer ${
            compact ? 'p-3' : 'p-4'
          }`}
        >
          <div className="flex items-start space-x-3">
            {/* 图片 */}
            {showImage && item.image && (
              <div className={`flex-shrink-0 rounded-xl overflow-hidden ${
                compact ? 'w-16 h-16' : 'w-20 h-20'
              }`}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            {/* 内容 */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <h3 className={`font-semibold text-gray-800 line-clamp-2 ${
                  compact ? 'text-sm' : 'text-base'
                }`}>
                  {item.title}

                </h3>

              </div>
              
              {/* 摘要 */}
              {item.summary && (
                <p className={`text-gray-600 line-clamp-2 mb-2 ${
                  compact ? 'text-xs' : 'text-sm'
                }`}>
                  {item.summary}
                </p>
              )}
              
              {/* 底部信息 */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {item.category && (
                    <span className={`bg-blue-100 text-blue-600 px-2 py-1 rounded-full font-medium ${
                      compact ? 'text-xs' : 'text-sm'
                    }`}>
                      {item.category}
                    </span>
                  )}
                </div>
                
                <div className="flex items-center space-x-1 text-gray-500">
                  <Clock className="w-3 h-3" />
                  <span className="text-xs">
                    {formatTime(item.publishTime)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsList;
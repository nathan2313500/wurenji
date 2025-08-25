import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Tag, Share2, Eye, User } from 'lucide-react';
import { mockNews, NewsItem } from '@/data/mockData';

// 获取新闻详情的辅助函数
const getNewsById = (id: string): NewsItem | undefined => {
  return mockNews.find(news => news.id === id);
};



// 格式化阅读量
const formatReadCount = (count: number): string => {
  if (count >= 10000) {
    return `${(count / 10000).toFixed(1)}万`;
  }
  return count.toString();
};

// 渲染Markdown内容
const renderContent = (content: string): string => {
  return content
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br/>')
    .replace(/^(.*)$/, '<p>$1</p>');
};

// 旧的模拟数据（保留作为备用）
const legacyMockNewsData: { [key: string]: any } = {
  '1': {
    id: '1',
    title: '无人机新规发布：民航局最新政策解读',
    content: `
      <div class="news-content">
        <p>近日，中国民用航空局发布了关于无人机管理的最新政策，对无人机的飞行管理、操作员资质要求等方面进行了重要调整。</p>
        
        <h3>主要变化内容</h3>
        <p>1. <strong>飞行高度限制</strong>：在原有基础上，对不同重量级别的无人机设定了更加细化的飞行高度限制。</p>
        <p>2. <strong>操作员资质</strong>：新增了无人机教员资格认证，要求从事无人机培训的教员必须通过专业考试。</p>
        <p>3. <strong>飞行区域</strong>：更新了禁飞区域地图，新增了部分敏感区域的管制要求。</p>
        
        <h3>对行业的影响</h3>
        <p>此次政策调整将进一步规范无人机行业发展，提高飞行安全水平。对于无人机操作员和培训机构来说，需要及时了解新政策要求，确保合规操作。</p>
        
        <h3>实施时间</h3>
        <p>新政策将于2024年3月1日起正式实施，给行业留出了充足的适应时间。建议相关从业人员提前做好准备工作。</p>
      </div>
    `,
    publishTime: '2024-01-15T10:30:00Z',
    category: '政策法规',
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=drone%20policy%20regulation%20official%20document%20civil%20aviation&image_size=landscape_16_9',
    author: '民航资讯',
    readCount: 1250,
    isHot: true
  },
  '2': {
    id: '2',
    title: '2024年无人机技术发展趋势分析',
    content: `
      <div class="news-content">
        <p>随着技术的不断进步，无人机行业在2024年将迎来新的发展机遇。本文将从多个维度分析无人机技术的发展趋势。</p>
        
        <h3>技术发展方向</h3>
        <p>1. <strong>人工智能集成</strong>：AI技术与无人机的深度融合，实现更智能的自主飞行。</p>
        <p>2. <strong>续航能力提升</strong>：电池技术和能源管理系统的改进，显著提高飞行时间。</p>
        <p>3. <strong>载重能力增强</strong>：材料科学的进步使无人机能够承载更重的设备。</p>
        
        <h3>应用领域扩展</h3>
        <p>无人机的应用领域正在快速扩展，从传统的航拍摄影扩展到物流配送、农业植保、应急救援等多个领域。</p>
        
        <h3>市场前景</h3>
        <p>预计2024年全球无人机市场规模将达到新的高度，中国作为重要的制造和应用大国，将在其中发挥重要作用。</p>
      </div>
    `,
    publishTime: '2024-01-14T14:20:00Z',
    category: '行业动态',
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=futuristic%20drone%20technology%20development%20trends%20innovation&image_size=landscape_16_9',
    author: '技术分析师',
    readCount: 890,
    isHot: false
  },
  '3': {
    id: '3',
    title: '无人机教员资格考试报名开始',
    content: `
      <div class="news-content">
        <p>2024年第一期无人机教员资格考试报名工作正式启动，有意从事无人机培训工作的人员可以开始报名。</p>
        
        <h3>报名条件</h3>
        <p>1. 持有有效的无人机操作员执照</p>
        <p>2. 具备3年以上无人机操作经验</p>
        <p>3. 无重大飞行事故记录</p>
        <p>4. 通过理论知识和实操技能考核</p>
        
        <h3>考试内容</h3>
        <p>考试分为理论考试和实操考试两部分：</p>
        <ul>
          <li>理论考试：包括法规知识、教学方法、安全管理等</li>
          <li>实操考试：包括飞行技能演示和教学能力评估</li>
        </ul>
        
        <h3>报名方式</h3>
        <p>考生可通过官方网站在线报名，报名截止时间为2024年2月15日。</p>
      </div>
    `,
    publishTime: '2024-01-13T09:15:00Z',
    category: '考试资讯',
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=drone%20instructor%20certification%20exam%20registration%20education&image_size=landscape_16_9',
    author: '考试中心',
    readCount: 567,
    isHot: false
  }
};

const NewsDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const newsData = id ? getNewsById(id) : null;

  const formatTime = (timeString: string) => {
    try {
      const date = new Date(timeString);
      return date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return timeString;
    }
  };

  const handleShare = () => {
    if (navigator.share && newsData) {
      navigator.share({
        title: newsData.title,
        text: newsData.title,
        url: window.location.href
      });
    } else {
      // 复制链接到剪贴板
      navigator.clipboard.writeText(window.location.href);
      alert('链接已复制到剪贴板');
    }
  };

  if (!newsData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">资讯不存在</p>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            返回
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 头部导航 */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>返回</span>
          </button>
          
          <button
            onClick={handleShare}
            className="flex items-center space-x-1 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <Share2 className="w-5 h-5" />
            <span>分享</span>
          </button>
        </div>
      </div>

      {/* 内容区域 */}
      <div className="max-w-4xl mx-auto p-4">
        {/* 文章头部 */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-4">
          {/* 标题 */}
          <h1 className="text-2xl font-bold text-gray-800 mb-4 leading-tight">
            {newsData.title}
          </h1>
          
          {/* 元信息 */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
            <div className="flex items-center space-x-1">
              <Tag className="w-4 h-4" />
              <span>{newsData.category}</span>
            </div>
            
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{formatTime(newsData.publishTime)}</span>
            </div>
            
            {newsData.author && (
              <div className="flex items-center space-x-1">
                <User className="w-4 h-4" />
                <span>{newsData.author}</span>
              </div>
            )}
            
            {newsData.readCount && (
              <div className="flex items-center space-x-1">
                <Eye className="w-4 h-4" />
                <span>{formatReadCount(newsData.readCount)}</span>
              </div>
            )}
          </div>
          
          {/* 标签 */}
          {newsData.tags && newsData.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {newsData.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
          
          {/* 主图 */}
          {newsData.image && (
            <div className="mb-6">
              <img
                src={newsData.image}
                alt={newsData.title}
                className="w-full h-64 object-cover rounded-xl"
              />
            </div>
          )}
        </div>
        
        {/* 文章内容 */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div 
            className="prose prose-gray max-w-none leading-relaxed text-gray-700"
            dangerouslySetInnerHTML={{ __html: renderContent(newsData.content || '') }}
          />
        </div>
        

        
        {/* 底部操作 */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mt-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
            >
              返回列表
            </button>
            
            <button
              onClick={handleShare}
              className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors flex items-center space-x-2"
            >
              <Share2 className="w-4 h-4" />
              <span>分享文章</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;
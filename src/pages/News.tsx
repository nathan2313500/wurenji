import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import NewsList from '@/components/NewsList';
import { mockNews } from '@/data/mockData';

const News: React.FC = () => {
  const navigate = useNavigate();

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
          
          <h1 className="text-lg font-semibold text-gray-800">最新资讯</h1>
          
          <div className="w-16"></div> {/* 占位符保持居中 */}
        </div>
      </div>

      {/* 内容区域 */}
      <div className="max-w-4xl mx-auto p-4">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-2">行业动态</h2>
          <p className="text-gray-600 text-sm">了解无人机行业最新政策法规、技术发展和培训资讯</p>
        </div>
        
        {/* 资讯列表 */}
        <NewsList 
          items={mockNews} 
          showImage={true}
          compact={false}
        />
      </div>
    </div>
  );
};

export default News;
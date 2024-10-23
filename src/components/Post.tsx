import React from 'react';
import { Heart, MessageCircle, Share2 } from 'lucide-react';

interface PostProps {
  post: {
    author: string;
    content: string;
    wavelength: number;
    timestamp: string;
    avatar: string;
    mood: string;
  };
}

const Post: React.FC<PostProps> = ({ post }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex space-x-4">
        <img
          src={post.avatar}
          alt={`${post.author}'s avatar`}
          className="w-12 h-12 rounded-full"
        />
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <h3 className="font-semibold text-gray-900">{post.author}</h3>
            <span className="text-sm text-gray-500">{post.timestamp}</span>
          </div>
          <p className="mt-2 text-gray-700">{post.content}</p>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex space-x-4">
              <button className="flex items-center space-x-1 text-gray-500 hover:text-pink-500">
                <Heart className="w-5 h-5" />
                <span>24</span>
              </button>
              <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500">
                <MessageCircle className="w-5 h-5" />
                <span>3</span>
              </button>
              <button className="flex items-center space-x-1 text-gray-500 hover:text-green-500">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
            <span className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700">
              {post.mood}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
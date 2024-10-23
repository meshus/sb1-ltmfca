import React, { useState } from 'react';
import { Send, Waves } from 'lucide-react';

interface CreatePostProps {
  onPost: (post: any) => void;
}

const CreatePost: React.FC<CreatePostProps> = ({ onPost }) => {
  const [content, setContent] = useState('');
  const [wavelength, setWavelength] = useState(0.5);
  const [mood, setMood] = useState('happy');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    onPost({
      author: "You",
      content,
      wavelength,
      timestamp: "Just now",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100&h=100",
      mood
    });

    setContent('');
    setWavelength(0.5);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <form onSubmit={handleSubmit}>
        <div className="flex items-start space-x-4">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100&h=100"
            alt="Your avatar"
            className="w-12 h-12 rounded-full"
          />
          <div className="flex-1">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Share your wavelength..."
              className="w-full px-4 py-2 text-gray-700 bg-gray-50 rounded-lg focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-400"
              rows={3}
            />
            
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Waves className="w-5 h-5 text-indigo-600" />
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={wavelength}
                    onChange={(e) => setWavelength(parseFloat(e.target.value))}
                    className="w-24 accent-indigo-600"
                  />
                </div>
                
                <select
                  value={mood}
                  onChange={(e) => setMood(e.target.value)}
                  className="px-3 py-1 rounded-md bg-gray-50 border border-gray-200 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                >
                  <option value="happy">Happy</option>
                  <option value="energetic">Energetic</option>
                  <option value="calm">Calm</option>
                  <option value="reflective">Reflective</option>
                  <option value="creative">Creative</option>
                </select>
              </div>
              
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center space-x-2"
              >
                <span>Share</span>
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
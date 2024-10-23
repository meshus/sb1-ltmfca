import React from 'react';

interface WavePatternProps {
  posts: Array<{
    wavelength: number;
    mood: string;
  }>;
}

const WavePattern: React.FC<WavePatternProps> = ({ posts }) => {
  const getWaveColor = (mood: string) => {
    const colors = {
      happy: '#FCD34D',
      energetic: '#F87171',
      calm: '#60A5FA',
      reflective: '#A78BFA',
      creative: '#34D399'
    };
    return colors[mood as keyof typeof colors] || '#9CA3AF';
  };

  return (
    <div className="h-24 bg-white rounded-xl shadow-sm p-4 mb-6">
      <svg width="100%" height="100%" viewBox="0 0 1000 100" preserveAspectRatio="none">
        {posts.map((post, index) => {
          const startX = (index / posts.length) * 1000;
          const endX = ((index + 1) / posts.length) * 1000;
          const amplitude = post.wavelength * 40;
          const path = `M ${startX} 50 
            Q ${(startX + endX) / 2} ${50 - amplitude} ${endX} 50`;

          return (
            <path
              key={index}
              d={path}
              stroke={getWaveColor(post.mood)}
              strokeWidth="3"
              fill="none"
            />
          );
        })}
      </svg>
    </div>
  );
};

export default WavePattern;
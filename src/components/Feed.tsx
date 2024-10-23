import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getPosts, createPost } from '../api';
import CreatePost from './CreatePost';
import Post from './Post';
import WavePattern from './WavePattern';
import { useStore } from '../store/useStore';
import toast from 'react-hot-toast';

const Feed: React.FC = () => {
  const queryClient = useQueryClient();
  const { user } = useStore();
  
  const { data: posts = [] } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts
  });

  const createPostMutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast.success('Post created successfully!');
    },
    onError: () => {
      toast.error('Failed to create post');
    }
  });

  const handleNewPost = (post: any) => {
    if (!user) return toast.error('Please log in to post');
    createPostMutation.mutate({
      ...post,
      authorId: user.id
    });
  };

  return (
    <div className="space-y-6">
      <CreatePost onPost={handleNewPost} />
      <WavePattern posts={posts} />
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Feed;
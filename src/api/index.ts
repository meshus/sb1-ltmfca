import axios from 'axios';
import { Post, Comment } from '../types';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export const getPosts = () => api.get<Post[]>('/posts').then((res) => res.data);

export const createPost = (post: Partial<Post>) =>
  api.post<{ id: number }>('/posts', post).then((res) => res.data);

export const likePost = (postId: number, userId: number) =>
  api.post(`/posts/${postId}/like`, { userId });

export const unlikePost = (postId: number, userId: number) =>
  api.delete(`/posts/${postId}/like`, { data: { userId } });

export const getComments = (postId: number) =>
  api.get<Comment[]>(`/posts/${postId}/comments`).then((res) => res.data);

export const createComment = (postId: number, comment: Partial<Comment>) =>
  api.post<{ id: number }>(`/posts/${postId}/comments`, comment).then((res) => res.data);
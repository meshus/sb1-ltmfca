export interface User {
  id: number;
  username: string;
  avatar: string;
  bio?: string;
  settings: UserSettings;
}

export interface UserSettings {
  darkMode: boolean;
  notifications: boolean;
  privacy: 'public' | 'private';
}

export interface Post {
  id: number;
  authorId: number;
  author: string;
  content: string;
  wavelength: number;
  timestamp: string;
  avatar: string;
  mood: string;
  likes: number;
  comments: number;
  liked: boolean;
}

export interface Comment {
  id: number;
  postId: number;
  authorId: number;
  author: string;
  content: string;
  timestamp: string;
  avatar: string;
}
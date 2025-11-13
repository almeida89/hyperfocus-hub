export interface Project {
  id: string;
  title: string;
  description: string;
  activityId: string;
  activityTitle: string;
  category: string;
  authorName: string;
  authorAvatar: string;
  image: string;
  likes: number;
  commentCount: number;
  createdAt: string;
  isLiked?: boolean;
}

export interface Comment {
  id: string;
  projectId: string;
  authorName: string;
  authorAvatar: string;
  content: string;
  createdAt: string;
  isModerated: boolean;
}

export interface ProjectFilters {
  categories: string[];
  sortBy: 'recent' | 'popular' | 'mostLiked';
  searchQuery: string;
}

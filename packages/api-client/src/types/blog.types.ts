export interface BlogCategory {
  id: number;
  title: string;
  englishTitle: string;
}

export interface MostViewedPost {
  id: number;
  title: string;
  coverUrl: string;
  readingTime: number;
  createDate: string;
  blogCategory?: any;
  creator?: any;
}

export interface BlogPageResponse {
  blogCategories: BlogCategory[];
  mostViewedPosts: MostViewedPost[];
}

export interface BlogPostItem {
  id: number;
  title: string;
  coverUrl: string;
  readingTime: number;
  createDate: string;

  blogCategory: {
    id: number;
    title: string;
    englishTitle: string;
  };
  creator: {
    name: string;
    lastName: string;
  };
}

export interface PaginatedBlogResponse {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalCount: number;
  items: BlogPostItem[];
  searchParams: any;
}

export interface BlogPostDetail {
  id: number;
  title: string;
  englishTitle: string;
  coverUrl: string;
  coverAlt: string;
  readingTime: number;
  content: string;
  views: number;
  metaTitle: string;
  metaDescription: string;
  canonicalUrl: string;
  createDate: string;
  blogCategory: {
    id: number;
    title: string;
    englishTitle: string;
  };
  creator: {
    name: string;
    lastName: string;
  };
}

export interface BlogPostPageResponse {
  post: BlogPostDetail;
  blogCategories: BlogCategory[];
  mostViewedPosts: MostViewedPost[];
  relatedPosts: MostViewedPost[]; // یا تایپی مشابه MostViewedPost
}
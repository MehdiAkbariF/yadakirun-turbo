export interface CommentData {
  id: number | string;
  author: string;
  authorType?: 'buyer' | 'user' | 'admin';
  date: string;
  content: string;
  rating?: number;
  likes?: number;
  dislikes?: number;
  isBuyer?: boolean;
}

export interface ProductStats {
  averageRating: number;
  reviewCount: number;
  starsDistribution?: Record<number, number>; // مثلا {5: 100, 4: 50, ...}
}

export interface NewCommentPayload {
  author: string;
  content: string;
  rating: number;
  mobile?: string;
}
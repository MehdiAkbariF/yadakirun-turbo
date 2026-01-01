import { BlogPageResponse, PaginatedBlogResponse, BlogPostPageResponse } from '../types/blog.types';
import { API_CONFIG } from '../config';

interface NextFetchRequestConfig extends RequestInit {
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
}

// تنظیم آدرس پایه برای بخش Front
const BASE_URL = `${API_CONFIG.BASE_URL}/Front`;

/**
 * تابع کمکی برای درخواست‌های بخش بلاگ
 */
async function blogFetch<T>(endpoint: string, options: NextFetchRequestConfig = {}): Promise<T | null> {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Accept': 'application/json',
        // 'Content-Type': 'application/json', // برای GET الزامی نیست اما بودنش ضرری ندارد
        ...options.headers,
        // ❌ مطمئن شدیم که هیچ هدر Authorization اینجا اضافه نمی‌شود
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Blog API Error [${response.status}]:`, errorText);
      throw new Error(`Blog API failed: ${response.statusText}`);
    }

    return await response.json() as T;
  } catch (error) {
    console.error(`Error in blogFetch for ${endpoint}:`, error);
    return null;
  }
}

export const blogService = {

  getBlogPageData: async (): Promise<BlogPageResponse | null> => {
    return blogFetch<BlogPageResponse>('/BlogPage', {
      next: { revalidate: 3600 },
    });
  },

  /**
   * دریافت لیست مقالات با صفحه‌بندی
   */
  getBlogPosts: async (page = 1, pageSize = 10): Promise<PaginatedBlogResponse | null> => {
    return blogFetch<PaginatedBlogResponse>(`/BlogPosts?PageNumber=${page}&PageSize=${pageSize}`, {
      next: { revalidate: 3600 },
    });
  },

  /**
   * دریافت جزئیات کامل یک مقاله بر اساس ID
   */
  getBlogPostDetail: async (id: string | number): Promise<BlogPostPageResponse | null> => {
    return blogFetch<BlogPostPageResponse>(`/BlogPostPage?Id=${id}`, {
      next: { revalidate: 3600 },
    });
  },
};
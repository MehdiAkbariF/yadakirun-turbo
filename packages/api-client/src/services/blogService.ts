import { BlogPageResponse, PaginatedBlogResponse, BlogPostPageResponse } from '../types/blog.types';
import { API_CONFIG } from '../config';

interface NextFetchRequestConfig extends RequestInit {
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
}

const BASE_URL = `${API_CONFIG.BASE_URL}/Front`;

async function blogFetch<T>(endpoint: string, options: NextFetchRequestConfig = {}): Promise<T | null> {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Accept': 'application/json',
        ...options.headers,
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

  getBlogPosts: async (page = 1, pageSize = 10): Promise<PaginatedBlogResponse | null> => {
    return blogFetch<PaginatedBlogResponse>(`/BlogPosts?PageNumber=${page}&PageSize=${pageSize}`, {
      next: { revalidate: 3600 },
    });
  },

  /**
   * دریافت جزئیات یک پست بلاگ
   * اگر ورودی عدد باشد -> Id
   * اگر ورودی متن باشد -> Title (یا فیلد مشابه در API)
   */
  getBlogPostDetail: async (slugOrId: string | number): Promise<BlogPostPageResponse | null> => {
    const inputStr = String(slugOrId);
    // تشخیص عدد بودن ورودی
    const isId = /^\d+$/.test(inputStr);
    
    // نکته: در اینجا فرض می‌کنیم API شما از پارامتر "Title" برای جستجوی متنی پشتیبانی می‌کند
    // اگر پارامتر دیگری دارد (مثل Slug یا EnglishTitle)، آن را جایگزین کنید.
    const queryParam = isId ? `Id=${inputStr}` : `Title=${encodeURIComponent(inputStr)}`;

    return blogFetch<BlogPostPageResponse>(`/BlogPostPage?${queryParam}`, {
      next: { revalidate: 3600 },
    });
  },
};
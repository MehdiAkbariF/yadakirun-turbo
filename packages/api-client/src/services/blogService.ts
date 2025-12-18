import { BlogPageResponse, PaginatedBlogResponse, BlogPostPageResponse } from '../types/blog.types';

const BASE_URL = "https://api-yadakirun.yadakchi.com/api";

export const blogService = {
  // دریافت اطلاعات عمومی (دسته بندی ها و پربازدیدها)
  getBlogPageData: async (): Promise<BlogPageResponse | null> => {
    try {
      const response = await fetch(`${BASE_URL}/Front/BlogPage`, {
        next: { revalidate: 3600 },
      } as any);
      if (!response.ok) throw new Error(`API failed`);
      return await response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  },

  // ✅ متد جدید برای دریافت لیست مقالات با صفحه بندی
  getBlogPosts: async (page = 1, pageSize = 10): Promise<PaginatedBlogResponse | null> => {
    try {
      const response = await fetch(
        `${BASE_URL}/Front/BlogPosts?PageNumber=${page}&PageSize=${pageSize}`,
        { next: { revalidate: 3600 } } as any
      );
      if (!response.ok) throw new Error(`API failed`);
      return await response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  },
    getBlogPostDetail: async (id: string | number): Promise<BlogPostPageResponse | null> => {
    try {
      const response = await fetch(`${BASE_URL}/Front/BlogPostPage?Id=${id}`, {
        next: { revalidate: 3600 },
      } as any);
      if (!response.ok) throw new Error(`API failed`);
      return await response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  },
};
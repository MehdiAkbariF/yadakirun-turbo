import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { blogService } from '@monorepo/api-client/src/services/blogService';

// --- ایمپورت‌های دیزاین سیستم ---
import { Container } from '@monorepo/design-system/src/components/organisms/Container/Container';
import { Label } from '@monorepo/design-system/src/components/atoms/Label/Label';
import { ArticleRow } from '@monorepo/design-system/src/components/molecules/ArticleRow/ArticleRow';
import { SidebarWidget } from '@monorepo/design-system/src/components/molecules/SidebarWidget/SidebarWidget';
import { Pagination } from '@monorepo/design-system/src/components/molecules/Pagination/Pagination';
import { BlogSlider } from '@monorepo/design-system/src/components/molecules/BlogSlider/BlogSlider';
import { AdBanner } from '@monorepo/design-system/src/components/atoms/AdBanner/AdBanner';

export const metadata: Metadata = {
  title: 'وبلاگ یدکی‌ران | مقالات و آموزش‌های تخصصی خودرو',
  description: 'جدیدترین مقالات آموزشی و اخبار دنیای خودرو را در وبلاگ یدکی‌ران بخوانید.',
};

const BASE_IMG_URL = "https://api-yadakirun.yadakchi.com";
const PAGE_SIZE = 10;

interface BlogPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;

  // ۱. فراخوانی موازی هر دو API برای لود سریع‌تر
  const [apiPageData, apiPostsData] = await Promise.all([
    blogService.getBlogPageData(),
    blogService.getBlogPosts(currentPage, PAGE_SIZE)
  ]);

  // ۲. استخراج داده‌ها
  const categories = apiPageData?.blogCategories || [];
  const mostViewedPosts = apiPageData?.mostViewedPosts || [];
  const latestPosts = apiPostsData?.items || [];
  const totalPages = apiPostsData?.totalPages || 1;

  // ۳. آماده‌سازی اسلایدر (از پربازدیدترین‌ها)
  const blogSliderItems = mostViewedPosts.map(post => ({
    title: post.title,
    excerpt: "برای مطالعه این مقاله کاربردی و تخصصی با یدکی‌ران همراه باشید...",
    imgSrc: post.coverUrl ? `${BASE_IMG_URL}${post.coverUrl}` : '/placeholder.png',
    category: post.blogCategory?.title || "مقالات",
    date: new Date(post.createDate).toLocaleDateString('fa-IR'),
    readTime: post.readingTime,
    href: `/blog/${post.id}`
  }));

  return (
    <div className="bg-background min-h-screen pb-20">
      <Container>
        <div className="text-center py-6">
          <Label as="h1" size="3x" weight="extra-bold">مجله تخصصی یدکی‌ران</Label>
        </div>
      </Container>

      <Container>
        {/* --- اسلایدر ویژه (فقط صفحه اول) --- */}
        {currentPage === 1 && blogSliderItems.length > 0 && (
          <section className="mb-10">
            <BlogSlider items={blogSliderItems} uniqueId="blog-featured-slider" />
          </section>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* --- لیست تازه‌ترین نوشته‌ها (Dynamic) --- */}
          <div className="lg:col-span-9 bg-surface p-5 rounded-3xl border border-border-secondary shadow-sm">
            <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
              <Label as="h3" size="xl" weight="bold">تازه‌ترین نوشته‌ها</Label>
              <Label size="sm" color="secondary">نمایش صفحه {currentPage} از {totalPages}</Label>
            </div>

            <div className="flex flex-col gap-6">
              {latestPosts.map((post) => (
                <ArticleRow
                  key={post.id}
                  href={`/blog/${post.id}`}
                  title={post.title}
                  excerpt={`${post.creator.name} ${post.creator.lastName} عزیز در این مقاله به بررسی تخصصی موضوع ${post.title} پرداخته است...`}
                  imgSrc={post.coverUrl ? `${BASE_IMG_URL}${post.coverUrl}` : '/placeholder.png'}
                  category={post.blogCategory?.title || "آموزش"}
                  date={new Date(post.createDate).toLocaleDateString('fa-IR')}
                  readTime={post.readingTime}
                />
              ))}

              {latestPosts.length === 0 && (
                <div className="text-center py-20">
                  <Label color="secondary">در حال حاضر مقاله‌ای در این بخش وجود ندارد.</Label>
                </div>
              )}
            </div>

            {totalPages > 1 && (
              <div className="mt-12">
                <Pagination 
                  currentPage={currentPage} 
                  totalPages={totalPages} 
                  baseUrl="/blog" 
                />
              </div>
            )}
          </div>

          {/* --- سایدبار --- */}
          <aside className="lg:col-span-3 space-y-8 lg:sticky lg:top-24">
            
            {/* دسته‌بندی‌ها */}
            <SidebarWidget title="دسته‌بندی‌ها">
              <ul className="space-y-1">
                {categories.map((cat) => (
                  <li key={cat.id}>
                    <Link 
                      href={`/blog/category/${cat.id}`} 
                      className="flex items-center justify-between p-3 rounded-xl hover:bg-bg-secondary transition-all group"
                    >
                      <Label size="sm" className="group-hover:text-brand-primary">{cat.title}</Label>
                      <ChevronLeft size={16} className="text-text-placeholder group-hover:text-brand-primary" />
                    </Link>
                  </li>
                ))}
              </ul>
            </SidebarWidget>

            <AdBanner title="مشاوره فنی" subTitle="۰۲۱-۳۳۹۸۸۰۱۳" />

            {/* پربازدیدترین‌ها در سایدبار */}
            <SidebarWidget title="پربازدیدترین‌ها">
              <div className="flex flex-col gap-4">
                {mostViewedPosts.map((post) => (
                  <Link 
                    key={`side-${post.id}`} 
                    href={`/blog/${post.id}`} 
                    className="group border-b border-gray-50 pb-3 last:border-0"
                  >
                    <Label size="sm" weight="bold" className="line-clamp-2 leading-6 group-hover:text-brand-primary">
                      {post.title}
                    </Label>
                    <div className="flex items-center gap-3 mt-1">
                      <Label size="xs" color="placeholder">{post.readingTime} دقیقه مطالعه</Label>
                    </div>
                  </Link>
                ))}
              </div>
            </SidebarWidget>

          </aside>
        </div>
      </Container>
    </div>
  );
}
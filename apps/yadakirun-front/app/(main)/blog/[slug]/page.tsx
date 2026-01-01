import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { Clock, Calendar, Folder, MessageSquare, ChevronLeft } from 'lucide-react';
import { blogService } from '@monorepo/api-client/src/services/blogService';

// --- ایمپورت‌های دیزاین سیستم ---
import { Container } from '@monorepo/design-system/src/components/organisms/Container/Container';
import { Label } from '@monorepo/design-system/src/components/atoms/Label/Label';
import { SidebarWidget } from '@monorepo/design-system/src/components/molecules/SidebarWidget/SidebarWidget';
import { SidebarNewsSlider } from '@monorepo/design-system/src/components/molecules/SidebarNewsSlider/SidebarNewsSlider';
import { AdBanner } from '@monorepo/design-system/src/components/atoms/AdBanner/AdBanner';
import { CommentsSection } from '@monorepo/design-system/src/components/organisms/CommentsSection/CommentsSection';
import { FeedbackActions } from '@monorepo/design-system/src/components/molecules/FeedbackActions/FeedbackActions';
import { BlogCard } from '@monorepo/design-system/src/components/molecules/BlogCard/BlogCard';

// --- تنظیمات متا دیتا داینامیک ---
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const apiData = await blogService.getBlogPostDetail(slug);

  if (!apiData) return { title: 'مقاله یافت نشد' };

  return {
    title: apiData.post.metaTitle || apiData.post.title,
    description: apiData.post.metaDescription,
    alternates: {
      canonical: apiData.post.canonicalUrl,
    },
  };
}

const BASE_IMG_URL = "https://api-yadakirun.yadakchi.com";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;

  // ۱. دریافت داده‌ها (هوشمند: با ID یا Title)
  const apiData = await blogService.getBlogPostDetail(slug);

  if (!apiData) {
    notFound();
  }

  const { post, blogCategories, mostViewedPosts, relatedPosts } = apiData;

  // ۲. ✅ لاجیک ریدایرکت سئو (SEO Redirect)
  // فرض بر این است که Title مقاله همان Slug مورد نظر ماست (چون EnglishTitle در تایپ‌ها نبود)
  // اگر فیلد دیگری برای اسلاگ دارید، آن را جایگزین کنید.
  const currentSlug = decodeURIComponent(slug);
  const standardSlug = post.title; // یا post.englishTitle اگر وجود دارد

  // اگر Slug فعلی با Slug استاندارد متفاوت است (مثلاً کاربر ID وارد کرده)
  if (standardSlug && currentSlug !== standardSlug && !/^\d+$/.test(standardSlug)) {
     // redirect(`/blog/${standardSlug}`);
  }

  // تبدیل داده‌های سایدبار
  const sidebarNewsItems = mostViewedPosts.map(p => ({
    title: p.title,
    date: new Date(p.createDate).toLocaleDateString('fa-IR'),
    imgSrc: p.coverUrl ? `${BASE_IMG_URL}${p.coverUrl}` : '/placeholder.png',
    href: `/blog/${p.id}` // اینجا هم می‌توانید به Slug تغییر دهید اگر می‌خواهید
  }));

  async function handleAddComment(data: any) {
    'use server';
    console.log('Comment Submitted:', data);
  }

  return (
    <div className="bg-body min-h-screen pb-20">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start py-12">
          
          {/* --- Main Content --- */}
          <div className="lg:col-span-9">
            
            <article className="bg-surface rounded-3xl shadow-sm overflow-hidden border border-border-secondary">
              
              {/* Hero Header */}
              <header className="p-6 md:p-10 border-b border-gray-100">
                 <div className="flex flex-col gap-8">
                    {/* تصویر شاخص */}
                    <div className="relative w-full h-[300px] md:h-[450px] rounded-2xl overflow-hidden shadow-lg">
                       <Image 
                         src={post.coverUrl ? `${BASE_IMG_URL}${post.coverUrl}` : "/placeholder.png"} 
                         alt={post.coverAlt || post.title} 
                         fill 
                         className="object-cover"
                         priority
                       />
                    </div>

                    <div className="flex flex-col gap-4">
                       <div className="flex flex-wrap items-center gap-4 text-secondary">
                          <div className="flex items-center gap-2 bg-brand-secondary/20 px-3 py-1.5 rounded-full">
                             <Folder size={16} className="text-brand-primary" />
                             <Label size="xs" weight="bold" color="brand-primary">{post.blogCategory?.title}</Label>
                          </div>
                          <div className="flex items-center gap-1.5">
                             <Calendar size={16} className="text-placeholder" />
                             <Label size="xs" color="placeholder">{new Date(post.createDate).toLocaleDateString('fa-IR')}</Label>
                          </div>
                          <div className="flex items-center gap-1.5">
                             <Clock size={16} className="text-placeholder" />
                             <Label size="xs" color="placeholder">{post.readingTime} دقیقه مطالعه</Label>
                          </div>
                       </div>

                       <Label as="h1" size="3x" weight="black" className="leading-tight text-heading">
                         {post.title}
                       </Label>
                       
                       <div className="flex items-center gap-2 mt-2">
                          <Label size="sm" color="secondary">نویسنده:</Label>
                          <Label size="sm" weight="bold" color="primary">{post.creator.name} {post.creator.lastName}</Label>
                       </div>
                    </div>
                 </div>
              </header>

              {/* Article Content Body */}
              <div className="p-6 md:p-10">
                 <div className="prose prose-lg max-w-none text-justify leading-loose text-primary">
                    <div 
                      className="whitespace-pre-line"
                      dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                 </div>
              </div>

              {/* Footer Actions */}
              <div className="px-6 md:px-10 py-8 border-t border-border-secondary bg-gray-50/50">
                 <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <FeedbackActions />
                    
                    <a href="#comments" className="flex items-center gap-2 px-8 py-3 bg-brand-primary text-on-brand rounded-2xl font-bold hover:bg-brand-primary-hover transition-all shadow-lg shadow-brand-primary/20 no-underline">
                       <MessageSquare size={20} />
                       <span className="text-sm">ثبت و مشاهده دیدگاه‌ها</span>
                    </a>
                 </div>
              </div>

            </article>
            
            {/* Related Posts Section (Dynamic) */}
            {relatedPosts.length > 0 && (
                <section className="mt-16">
                   <div className="flex items-center gap-3 mb-8">
                      <div className="w-2 h-10 bg-brand-primary rounded-full"></div>
                      <Label as="h3" size="2x" weight="black" color="primary">مقالات مرتبط</Label>
                   </div>
                   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                      {relatedPosts.map((related) => (
                        <BlogCard
                           key={related.id}
                           href={`/blog/${related.id}`} // یا related.title
                           title={related.title}
                           imgSrc={related.coverUrl ? `${BASE_IMG_URL}${related.coverUrl}` : "/placeholder.png"}
                           category={related.blogCategory?.title || "خواندنی"}
                           date={new Date(related.createDate).toLocaleDateString('fa-IR')}
                        />
                      ))}
                   </div>
                </section>
            )}

            {/* Comments Section */}
            <div className="mt-16" id="comments">
               <CommentsSection 
                 comments={[]} 
                 stats={{ reviewCount: post.views, averageRating: 5 }}
                 onAddComment={handleAddComment}
               />
            </div>

          </div>

          {/* --- Sidebar (Dynamic) --- */}
          <aside className="lg:col-span-3 space-y-8 lg:sticky lg:top-24">
              
             {/* Categories Widget */}
             <SidebarWidget title="دسته‌بندی‌ها">
                <ul className="space-y-1">
                   {blogCategories.map((cat) => (
                      <li key={cat.id}>
                         <Link href={`/blog/category/${cat.id}`} className="flex items-center justify-between p-3 rounded-xl hover:bg-white hover:shadow-sm transition-all group">
                            <Label size="sm" className="group-hover:text-brand-primary transition-colors">{cat.title}</Label>
                            <ChevronLeft size={16} className="text-text-placeholder group-hover:text-brand-primary" />
                         </Link>
                      </li>
                   ))}
                </ul>
             </SidebarWidget>

             <SidebarWidget title="پربازدیدترین مقالات">
                <SidebarNewsSlider items={sidebarNewsItems} />
             </SidebarWidget>

             <div className="grid gap-4">
                <AdBanner title="مشاوره فنی یدکی‌ران" subTitle="تماس با کارشناسان ما" />
             </div>
            
          </aside>
        </div>
      </Container>
    </div>
  );
}
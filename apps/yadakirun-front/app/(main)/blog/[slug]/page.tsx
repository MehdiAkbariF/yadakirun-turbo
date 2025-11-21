import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Clock, Calendar, Folder, CornerDownLeft, MessageSquare, ChevronLeft } from 'lucide-react';

// --- ایمپورت‌های دیزاین سیستم ---
import { Container } from '@monorepo/design-system/src/components/organisms/Container/Container';
import { Label } from '@monorepo/design-system/src/components/atoms/Label/Label';
import { SidebarWidget } from '@monorepo/design-system/src/components/molecules/SidebarWidget/SidebarWidget';
import { SidebarNewsSlider } from '@monorepo/design-system/src/components/molecules/SidebarNewsSlider/SidebarNewsSlider';
import { AdBanner } from '@monorepo/design-system/src/components/atoms/AdBanner/AdBanner';
import { CommentsSection } from '@monorepo/design-system/src/components/organisms/CommentsSection/CommentsSection';
import { ProductCard } from '@monorepo/design-system/src/components/atoms/ProductCard/ProductCard';
import { Accordion } from '@monorepo/design-system/src/components/molecules/Accordion/Accordion';
import { QuoteBlock } from '@monorepo/design-system/src/components/atoms/QuoteBlock/QuoteBlock';
import { CallToActionBanner } from '@monorepo/design-system/src/components/molecules/CallToActionBanner/CallToActionBanner';
import { FeedbackActions } from '@monorepo/design-system/src/components/molecules/FeedbackActions/FeedbackActions';

// --- تایپ‌ها ---
import { NewCommentPayload, CommentData, ProductStats } from '@monorepo/design-system/src/types/comment.types';

// --- داده‌های نمونه (Mock Data) ---
const blogPostsData = [
  {
    id: 1,
    slug: "how-to-change-oil",
    title: "راهنمای جامع تعویض روغن موتور خودرو در خانه",
    excerpt: "در این مقاله به صورت قدم به قدم یاد می‌گیرید که چگونه روغن موتور خودروی خود را مانند یک حرفه‌ای تعویض کنید...",
    imageUrl: "/Renault.svg",
    bannerUrl: "/SGA-banner.webp",
    category: { name: "آموزش فنی", slug: "technical" },
    date: "۱۴۰۴/۰۵/۰۱",
    readTime: 5,
    tableOfContents: [
      "مقدمه‌ای بر اهمیت روغن موتور",
      "ابزار مورد نیاز",
      "بخش ویژه: نکات کلیدی",
      "مراحل تعویض روغن",
    ],
    content: [
      { type: "paragraph", text: "روغن موتور نقش خون در رگ‌های خودروی شما را دارد. تعویض به موقع آن نه تنها عمر موتور را افزایش می‌دهد، بلکه باعث کاهش مصرف سوخت و عملکرد نرم‌تر خودرو می‌شود." },
      { type: "heading", text: "ابزار مورد نیاز" },
      { type: "paragraph", text: "برای تعویض روغن به یک آچار فیلتر، یک تشت برای جمع‌آوری روغن سوخته، قیف و دستکش نیاز دارید. حتماً از ایمن بودن جک خودرو اطمینان حاصل کنید." },
      { type: "banner" },
      { type: "heading", text: "انتخاب روغن مناسب" },
      { type: "paragraph", text: "همیشه به دفترچه راهنمای خودرو مراجعه کنید. ویسکوزیته (غلظت) روغن باید دقیقاً مطابق با توصیه سازنده باشد." },
      { type: "quote", text: "هرگز روغن سوخته را در طبیعت رها نکنید. آن را به مراکز تعویض روغنی تحویل دهید تا بازیافت شود." },
    ],
    cta: {
      title: "خرید بهترین روغن موتورها",
      link: "/products/oil",
      description: "انواع روغن موتورهای اصل با ضمانت کیفیت را از یدکی‌ران تهیه کنید.",
    },
  },
];

// داده‌های محصول مرتبط
const relatedProductData = {
    title: "کیت تسمه تایم اصلی رنو تندر 90 (L90)",
    href: "/product/timing-belt-l90",
    imgSrc: "/Renault.svg",
    price: 2300000,
    badgeText: "پیشنهاد ویژه"
};

const categories = [
    { id: 1, title: 'آموزش فنی', count: 12 },
    { id: 2, title: 'ایمنی خودرو', count: 8 },
    { id: 3, title: 'لوازم جانبی', count: 5 },
];

const newsData = [
    { href: '#', title: 'نکات مهم در خرید لوازم یدکی اصلی', imgSrc: '/SGA-banner.webp', date: '۲۵ آبان ۱۴۰۴' },
    { href: '#', title: 'چطور از جلوبندی خودروی خود مراقبت کنیم؟', imgSrc: '/aisin-clutch-banner.webp', date: '۲۲ آبان ۱۴۰۴' },
        { href: '#', title: 'چطور از جلوبندی خودروی خود مراقبت کنیم؟', imgSrc: '/aisin-clutch-banner.webp', date: '۲۲ آبان ۱۴۰۴' },
            { href: '#', title: 'چطور از جلوبندی خودروی خود مراقبت کنیم؟', imgSrc: '/aisin-clutch-banner.webp', date: '۲۲ آبان ۱۴۰۴' },
                { href: '#', title: 'چطور از جلوبندی خودروی خود مراقبت کنیم؟', imgSrc: '/aisin-clutch-banner.webp', date: '۲۲ آبان ۱۴۰۴' },
                    { href: '#', title: 'چطور از جلوبندی خودروی خود مراقبت کنیم؟', imgSrc: '/aisin-clutch-banner.webp', date: '۲۲ آبان ۱۴۰۴' },
];

// داده‌های نظرات
const mockComments: CommentData[] = [
  { id: 1, author: "علی محمدی", date: "۳ روز پیش", authorType: "buyer", rating: 5, content: "عالی بود! خیلی کامل توضیح دادید.", likes: 15, dislikes: 0, isBuyer: true },
  { id: 2, author: "مریم حسینی", date: "۱ هفته پیش", authorType: "user", rating: 4, content: "ممنون از شما. کاش ویدیوی آموزشی هم داشت.", likes: 8, dislikes: 1, isBuyer: false },
];
const productStatsData: ProductStats = { reviewCount: 123, averageRating: 4.9 };


interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;

  const currentPost = blogPostsData.find((p) => p.slug === slug);

  if (!currentPost) {
    notFound();
  }

  async function handleAddComment(data: NewCommentPayload) {
    'use server';
    console.log('Comment Submitted:', data);
  }

  return (
    <div className="bg-body min-h-screen pb-20">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start py-12">
          
          {/* --- Main Content --- */}
          <div className="lg:col-span-9">
            
            <article className="bg-surface rounded-2xl shadow-sm overflow-hidden border border-border-secondary">
              
              {/* Hero Header */}
              <header className="p-6 md:p-8">
                 <div className="flex flex-col md:flex-row gap-6 mb-6">
                    <div className="relative w-full md:w-1/3 h-64 md:h-48 rounded-xl overflow-hidden flex-shrink-0 bg-secondary-bg">
                       <Image 
                         src={currentPost.imageUrl} 
                         alt={currentPost.title} 
                         fill 
                         className="fill"
                       />
                    </div>
                    <div className="flex flex-col justify-center flex-grow">
                       <Label as="h1" size="2x" weight="extra-bold" className="mb-4 leading-snug text-heading">
                         {currentPost.title}
                       </Label>
                       <Label size="base" color="secondary" className="leading-relaxed mb-4">
                         {currentPost.excerpt}
                       </Label>
                       
                       <div className="flex flex-wrap items-center gap-4 text-secondary mt-auto">
                          <div className="flex items-center gap-2 bg-secondary-bg px-3 py-1.5 rounded-lg">
                             <Folder size={16} className="text-brand-primary" />
                             <Label size="xs" weight="semi-bold" color="primary">{currentPost.category.name}</Label>
                          </div>
                          <div className="flex items-center gap-1.5">
                             <Calendar size={16} className="text-placeholder" />
                             <Label size="xs" color="placeholder">{currentPost.date}</Label>
                          </div>
                          <div className="flex items-center gap-1.5">
                             <Clock size={16} className="text-placeholder" />
                             <Label size="xs" color="placeholder">{currentPost.readTime} دقیقه مطالعه</Label>
                          </div>
                       </div>
                    </div>
                 </div>
              </header>

              {/* Table of Contents (بهبود یافته با چیدمان حرفه‌ای و Label) */}
              {currentPost.tableOfContents && (
                 <div className="px-6 md:px-8 mb-8">
                   <Accordion title="فهرست مطالب این مقاله" defaultOpen={true}>
                      <ul className="flex flex-col gap-2">
                        {currentPost.tableOfContents.map((item, idx) => (
                           <li key={idx}>
                              <a 
                                href="#" 
                                className="flex items-center gap-3 p-3 rounded-lg bg-secondary-bg/30 hover:bg-secondary-bg transition-all group border border-transparent hover:border-border-secondary"
                              >
                                 <div className="flex items-center justify-center w-8 h-8 rounded-full bg-surface text-placeholder group-hover:text-brand-primary transition-colors">
                                    <CornerDownLeft size={18} />
                                 </div>
                                 <Label 
                                    size="sm" 
                                    color="secondary" 
                                    weight="medium"
                                    className="cursor-pointer group-hover:text-primary transition-colors"
                                 >
                                    {item}
                                 </Label>
                              </a>
                           </li>
                        ))}
                      </ul>
                   </Accordion>
                 </div>
              )}

              {/* Article Content Body */}
              <div className="px-6 md:px-8 pb-8">
                 {currentPost.content.map((block, index) => {
                    switch (block.type) {
                       case 'heading':
                          return (
                             <Label 
                               key={index} 
                               as="h2" 
                               size="xl" 
                               weight="bold" 
                               className="mt-8 mb-4 text-heading border-b border-border-secondary pb-2"
                             >
                                {block.text}
                             </Label>
                          );
                       case 'paragraph':
                          return (
                             <Label 
                               key={index} 
                               as="p" 
                               size="base" 
                               className="mb-6 leading-loose text-justify text-primary"
                             >
                                {block.text}
                             </Label>
                          );
                       case 'quote':
                          return <QuoteBlock key={index} text={block.text || ''} />;
                       case 'banner':
                          // ✅ افزایش ارتفاع بنر به 450px
                          return currentPost.bannerUrl ? (
                             <div key={index} className="relative w-full h-[450px] rounded-xl overflow-hidden my-8 shadow-md bg-secondary-bg">
                                <Image src={currentPost.bannerUrl} alt="Banner" fill className="fill" />
                             </div>
                          ) : null;
                       default:
                          return null;
                    }
                 })}

                 {/* CTA Banner */}
                 {currentPost.cta && (
                    <CallToActionBanner 
                      title={currentPost.cta.title} 
                      description={currentPost.cta.description} 
                      link={currentPost.cta.link} 
                    />
                 )}
              </div>

              {/* Footer */}
              <div className="px-6 md:px-8 py-6 border-t border-border-secondary bg-secondary-bg">
                 <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <FeedbackActions />
                    
                    <a href="#comments" className="flex items-center gap-2 px-6 py-3 bg-brand-primary text-on-brand rounded-xl font-bold hover:bg-brand-primary-hover transition-colors no-underline">
                       <MessageSquare size={18} />
                       <Label size='sm' color='brand-secondary'>

                                            ثبت دیدگاه
                       </Label>
   
                    </a>
                 </div>
              </div>

            </article>
            
            {/* Related Product */}
            <section className="mt-12">
               <div className="flex items-center gap-3 mb-6">
                  <div className="w-1.5 h-8 bg-brand-accent rounded-full"></div>
                  <Label as="h3" size="xl" weight="bold" color="primary">محصول مرتبط</Label>
               </div>
               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  <ProductCard {...relatedProductData} />
               </div>
            </section>

            {/* Comments */}
            <div className="mt-12">
               <CommentsSection 
                 comments={mockComments}
                 stats={productStatsData}
                 onAddComment={handleAddComment}
               />
            </div>

          </div>

          {/* --- Sidebar --- */}
          <aside className="lg:col-span-3 space-y-6 lg:sticky lg:top-24">
              <SidebarWidget title="آخرین اخبار">
                <SidebarNewsSlider items={newsData} />
             </SidebarWidget>

             {/* Categories Widget (with Icons) */}
             <SidebarWidget title="دسته‌بندی‌ها">
                <ul className="space-y-2">
                   {categories.map((cat) => (
                      <li key={cat.id}>
                         <Link href={`/blog/category/${cat.id}`} className="flex items-center justify-between p-2 rounded-lg hover:bg-secondary-bg transition-colors group">
                            <Label size="sm" className="group-hover:text-brand-primary transition-colors">{cat.title}</Label>
                            {/* ✅ جایگزینی عدد با آیکون < */}
                            <ChevronLeft 
                              size={16} 
                              className="text-placeholder group-hover:text-brand-primary transition-colors" 
                            />
                         </Link>
                      </li>
                   ))}
                </ul>
             </SidebarWidget>

             <div className="grid gap-4">
                <AdBanner title="تبلیغ سایدبار" subTitle="محل تبلیغ شما" />
                <AdBanner title="فروش ویژه" subTitle="لوازم یدکی" />
             </div>

            
          </aside>
        </div>
      </Container>
    </div>
  );
}
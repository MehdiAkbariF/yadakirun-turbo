import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

// --- ایمپورت‌های دیزاین سیستم ---
import { Container } from '@monorepo/design-system/src/components/organisms/Container/Container';
import { Label } from '@monorepo/design-system/src/components/atoms/Label/Label';
import { BlogCard } from '@monorepo/design-system/src/components/molecules/BlogCard/BlogCard';
import { ArticleRow } from '@monorepo/design-system/src/components/molecules/ArticleRow/ArticleRow';
import { SidebarWidget } from '@monorepo/design-system/src/components/molecules/SidebarWidget/SidebarWidget';
import { Pagination } from '@monorepo/design-system/src/components/molecules/Pagination/Pagination';
import { SidebarNewsSlider } from '@monorepo/design-system/src/components/molecules/SidebarNewsSlider/SidebarNewsSlider';
import { BlogSlider } from '@monorepo/design-system/src/components/molecules/BlogSlider/BlogSlider';
import { AdBanner } from '@monorepo/design-system/src/components/atoms/AdBanner/AdBanner';
import { ImageCard } from '@monorepo/design-system/src/components/atoms/ImageCard/ImageCard'; // برای استفاده در محبوب‌ترین‌ها (یا لینک ساده)

// --- تنظیمات متا دیتا ---
export const metadata: Metadata = {
  title: 'وبلاگ یدکی‌ران | مقالات و آموزش‌های تخصصی خودرو',
  description: 'جدیدترین مقالات آموزشی، راهنمای خرید قطعات، نگهداری خودرو و اخبار دنیای خودرو را در وبلاگ یدکی‌ران بخوانید.',
};

// --- تعریف تایپ داده‌های بلاگ ---
interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  imgSrc: string; // ✅ تغییر نام به imgSrc برای هماهنگی با ArticleRow
  category: string;
  date: string;
  readTime: number;
  views: number;
}

// --- داده‌های نمونه پست‌های اصلی (هماهنگ با ArticleRow) ---
const blogPostsData: BlogPost[] = [
    { 
      id: 1, 
      slug: 'how-to-change-oil', 
      title: 'راهنمای جامع تعویض روغن موتور خودرو در خانه', 
      excerpt: 'یاد بگیرید چگونه روغن موتور خودروی خود را مانند یک حرفه‌ای تعویض کنید و در هزینه‌ها صرفه‌جویی نمایید.', 
      imgSrc: '/Renault.svg', 
      category: 'آموزش فنی', 
      date: '۱۴۰۳/۰۲/۱۵', 
      views: 1250, 
      readTime: 5 
    },
    { 
      id: 2, 
      slug: 'brake-system-check', 
      title: '۵ نشانه که می‌گویند سیستم ترمز شما نیاز به بررسی دارد', 
      excerpt: 'ایمنی در رانندگی حرف اول را می‌زند. با شناخت این نشانه‌ها از خطرات احتمالی جلوگیری کنید...', 
      imgSrc: '/Renault.svg', 
      category: 'ایمنی خودرو', 
      date: '۱۴۰۳/۰۲/۱۰', 
      views: 2500, 
      readTime: 4 
    },
    { 
      id: 3, 
      slug: 'best-car-accessories', 
      title: 'بهترین لوازم جانبی برای افزایش راحتی در سفر', 
      excerpt: 'با این لوازم جانبی کاربردی، سفرهای جاده‌ای خود را به تجربه‌ای لذت‌بخش تبدیل کنید...', 
      imgSrc: '/Renault.svg', 
      category: 'لوازم جانبی', 
      date: '۱۴۰۳/۰۲/۰۵', 
      views: 800, 
      readTime: 6 
    },
    { 
      id: 4, 
      slug: 'engine-parts', 
      title: 'آشنایی با قطعات اصلی موتور و وظایف آن‌ها', 
      excerpt: 'قلب تپنده خودروی شما چگونه کار می‌کند؟ با اجزای اصلی موتور و نقش هرکدام آشنا شوید...', 
      imgSrc: '/Renault.svg', 
      category: 'قطعات موتوری', 
      date: '۱۴۰۳/۰۲/۰۱', 
      views: 3100, 
      readTime: 8 
    },
    { 
      id: 5, 
      slug: 'summer-tips', 
      title: 'نکات کلیدی نگهداری خودرو در تابستان', 
      excerpt: 'گرمای تابستان می‌تواند به خودرو آسیب بزند. نکات حیاتی برای محافظت از موتور و سیستم خنک‌کننده.', 
      imgSrc: '/Renault.svg', 
      category: 'نگهداری', 
      date: '۱۴۰۳/۰۱/۲۵', 
      views: 1500, 
      readTime: 5 
    },
    { 
      id: 6, 
      slug: 'tire-pressure', 
      title: 'چرا تنظیم باد تایرها مهم است؟', 
      excerpt: 'تنظیم صحیح باد تایرها مصرف سوخت را کاهش می‌دهد و عمر لاستیک‌ها را دو برابر می‌کند.', 
      imgSrc: '/Renault.svg', 
      category: 'ایمنی', 
      date: '۱۴۰۳/۰۱/۲۰', 
      views: 1800, 
      readTime: 3 
    },
    { 
      id: 7, 
      slug: 'car-cleaning', 
      title: 'تمیز کردن خودرو مثل روز اول', 
      excerpt: 'با مواد ساده و در دسترس، خودروی خود را برق بیندازید و از شر لکه‌های قدیمی خلاص شوید.', 
      imgSrc: '/Renault.svg', 
      category: 'نگهداری', 
      date: '۱۴۰۳/۰۱/۱۵', 
      views: 950, 
      readTime: 7 
    },
];

// --- داده‌های اختصاصی برای اسلایدر اخبار ---
const newsData = [
  { 
    href: '#', 
    title: 'عنوان مقاله اول: نکات مهم در خرید لوازم یدکی اصلی', 
    imgSrc: '/SGA-banner.webp',
    date: '۲۵ آبان ۱۴۰۴',
    description: 'در این مقاله به بررسی روش‌های تشخیص قطعات اصلی از تقلبی و اهمیت استفاده از لوازم یدکی با کیفیت می‌پردازیم.'
  },
  { 
    href: '#', 
    title: 'عنوان مقاله دوم: چطور از جلوبندی خودروی خود مراقبت کنیم؟', 
    imgSrc: '/aisin-clutch-banner.webp',
    date: '۲۲ آبان ۱۴۰۴',
    description: 'جلوبندی یکی از بخش‌های حیاتی خودرو است. با رعایت چند نکته ساده، عمر قطعات آن را افزایش دهید.'
  },
  { 
    href: '#', 
    title: 'عنوان مقاله سوم: همه چیز درباره شمع‌های ایریدیوم و پلاتینیوم', 
    imgSrc: '/SGA-banner.webp',
    date: '۲۰ آبان ۱۴۰۴',
    description: 'تفاوت شمع‌های مختلف در چیست و کدام یک برای خودروی شما مناسب‌تر است؟ پاسخ را در این مطلب بخوانید.'
  },
  { 
    href: '#', 
    title: 'عنوان مقاله چهارم: راهنمای کامل انتخاب دیسک و صفحه کلاچ', 
    imgSrc: '/aisin-clutch-banner.webp',
    date: '۱۸ آبان ۱۴۰۴',
    description: 'علائم زمان تعویض دیسک و صفحه و معرفی بهترین برندهای موجود در بازار.'
  },
  { 
    href: '#', 
    title: 'عنوان مقاله پنجم: سیستم ترمز ABS چگونه کار می‌کند؟', 
    imgSrc: '/SGA-banner.webp',
    date: '۱۵ آبان ۱۴۰۴',
    description: 'آشنایی با مکانیزم ترمز ضد قفل و نقش حیاتی آن در ایمنی خودرو.'
  },
  { 
    href: '#', 
    title: 'عنوان مقاله ششم: روغن موتور مناسب برای فصل سرما', 
    imgSrc: '/aisin-clutch-banner.webp',
    date: '۱۲ آبان ۱۴۰۴',
    description: 'با شروع فصل سرما، انتخاب ویسکوزیته مناسب برای روغن موتور اهمیت دوچندان پیدا می‌کند.'
  },
];

const categories = [
  { id: 1, title: 'آموزش فنی', count: 12 },
  { id: 2, title: 'ایمنی خودرو', count: 8 },
  { id: 3, title: 'لوازم جانبی', count: 5 },
  { id: 4, title: 'قطعات موتوری', count: 15 },
  { id: 5, title: 'نگهداری خودرو', count: 9 },
];

const POSTS_PER_PAGE = 5;

interface BlogPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;

  // منطق فیلترینگ و صفحه‌بندی
  const featuredPosts = blogPostsData.slice(0, 6);
  const allPostsSorted = [...blogPostsData].sort((a, b) => b.id - a.id);
  const totalPages = Math.ceil(allPostsSorted.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const currentListPosts = allPostsSorted.slice(startIndex, startIndex + POSTS_PER_PAGE);
  const popularPosts = [...blogPostsData].sort((a, b) => b.views - a.views).slice(0, 5);

  // ✅ تبدیل داده‌ها برای فرمت BlogSlider
  const blogSliderItems = featuredPosts.map(post => ({
    title: post.title,
    excerpt: post.excerpt,
    imgSrc: post.imgSrc, // هماهنگ با ArticleRow
    category: post.category,
    date: post.date,
    readTime: post.readTime,
    href: `/blog/${post.slug}`
  }));

  // ✅ تبدیل داده‌ها برای فرمت SidebarNewsSlider
  const sidebarNewsItems = newsData.map(item => ({
    title: item.title,
    date: item.date,
    imgSrc: item.imgSrc,
    href: item.href
  }));

  return (
    <div className="bg-background min-h-screen pb-20">
      
      {/* --- Header Section --- */}
      <Container>
        <div className="relative z-10 text-center py-2">
          <Label as="h1" size="3x" weight="extra-bold" className="">
            مقالات
          </Label>
        </div>
      </Container>

      <Container>
        {/* --- Featured Posts Section --- */}
        {currentPage === 1 && (
          <section className="mb-10">
            {/* ✅ استفاده از کامپوننت اسلایدر به جای گرید */}
            <BlogSlider items={blogSliderItems} uniqueId="featured-posts-slider" />
          </section>
        )}

        {/* --- Main Content Area (Grid Layout) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* 
             ✅✅✅ ستون محتوا (۹ ستون) 
          */}
          <div className="lg:col-span-9  bg-surface p-5 rounded-3xl">
            <div className="flex items-center justify-between mb-6 border-b border-gray-300 pb-4">
              <Label as="h3" size="xl" weight="bold">تازه ترین نوشته‌ها</Label>
              <Label size="sm" color="secondary">نمایش صفحه {currentPage} از {totalPages}</Label>
            </div>

            <div className="flex flex-col gap-6">
              {currentListPosts.map((post) => (
                <ArticleRow
                  key={`list-${post.id}`}
                  href={`/blog/${post.slug}`}
                  title={post.title}
                  excerpt={post.excerpt}
                  imgSrc={post.imgSrc} // ✅ داده هماهنگ شده
                  category={post.category}
                  date={post.date}
                  readTime={post.readTime} // اضافه کردن زمان مطالعه به لیست
                />
              ))}

              {currentListPosts.length === 0 && (
                <div className="text-center py-20 bg-surface rounded-xl border border-border-secondary">
                    <Label size="lg" color="secondary">مقاله‌ای یافت نشد.</Label>
                </div>
              )}
            </div>

            <div className="mt-12">
              <Pagination 
                currentPage={currentPage} 
                totalPages={totalPages} 
                baseUrl="/blog" 
              />
            </div>
          </div>

          {/* 
             ✅✅✅ ستون سایدبار (۳ ستون) 
          */}
          <aside className="lg:col-span-3 space-y-8 lg:sticky lg:top-24">
            
            {/* Categories Widget */}
             <SidebarWidget title="دسته‌بندی‌ها">
              <ul className="space-y-2">
                {categories.map((cat) => (
                  <li key={cat.id}>
                    <Link 
                      href={`/blog/category/${cat.id}`} 
                      className="flex items-center justify-between p-3 rounded-lg hover:scale-105 transition-all duration-200 group"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-text-placeholder group-hover:bg-brand-primary transition-colors"></span>
                        <Label size="sm" className="group-hover:text-brand-primary transition-colors">{cat.title}</Label>
                      </div>
                      
                      {/* آیکون فلش */}
                      <ChevronLeft 
                        size={16} 
                        className="text-text-placeholder group-hover:text-brand-primary transition-colors" 
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </SidebarWidget>

            <div className="grid grid-cols-1 gap-4">
              <AdBanner title="جایگاه تبلیغاتی A1" subTitle="فرصت دیده شدن شما" />
              <AdBanner title="جایگاه تبلیغاتی A2" subTitle="رزرو آنلاین" />
            </div>

            {/* Popular Posts */}
            <SidebarWidget title="پربازدیدترین‌ها">
              <div className="flex flex-col gap-3">
                {popularPosts.map((post) => (
                  <Link 
                    key={`pop-${post.id}`} 
                    href={`/blog/${post.slug}`} 
                      className="flex items-start gap-3 group p-2 hover:scale-105 rounded-lg transition-all duration-200"
                  >
                    {/* دایره رنگ برند سمت راست */}
                    <span className="mt-2 w-2 h-2 shrink-0 rounded-full bg-brand-primary hover:scale-75 transition-transform"></span>
                    
                    {/* عنوان مقاله */}
                    <Label 
                      size="sm" 
                      weight="semi-bold" 
                      className="line-clamp-2 leading-6 group-hover:text-brand-primary transition-colors"
                    >
                      {post.title}
                    </Label>
                  </Link>
                ))}
              </div>
            </SidebarWidget>

            <SidebarWidget title="سایر اخبار">
               <SidebarNewsSlider items={sidebarNewsItems} /> 
            </SidebarWidget>

          </aside>
        </div>
      </Container>
    </div>
  );
}
import dynamic from 'next/dynamic';
import { Metadata } from 'next';
import { Label } from '@monorepo/design-system/src/components/atoms/Label/Label';
import { Container } from '@monorepo/design-system/src/components/organisms/Container/Container';
import { CardGrid } from '@monorepo/design-system/src/components/molecules/CardGrid/CardGrid';
import { CardSlider } from '@monorepo/design-system/src/components/molecules/CardSlider/CardSlider';
import { ImageCard } from '@monorepo/design-system/src/components/atoms/ImageCard/ImageCard';
import { SpecialOffers } from '@/src/components/layout/SpecialOffers';
import { BestSellersSlider } from '@/src/components/layout/BestSellersSlider';
import { HomeBanner } from '@/src/components/layout/HomeBanner';
import { homeService } from '@monorepo/api-client/src/services/homeService';

const NewsSection = dynamic(() =>
  import('@/src/components/layout/NewsSection').then(mod => mod.NewsSection),
  { loading: () => <div style={{ height: '400px' }} /> }
);

const SeoContentSection = dynamic(() =>
  import('@/src/components/layout/SeoContentSection').then(mod => mod.SeoContentSection),
  { loading: () => <div style={{ height: '500px' }} /> }
);

export async function generateMetadata(): Promise<Metadata> {
  const homeData = await homeService.getHomePageData();

  if (!homeData) {
    return {
      title: 'یدکی‌ران - فروشگاه آنلاین لوازم یدکی خودرو',
      description: 'بزرگترین پلتفرم بررسی و خرید لوازم یدکی خودرو با ضمانت اصالت کالا.',
    };
  }

  return {
    title: homeData.metaTitle,
    description: homeData.metaDescription,
    alternates: {
      canonical: homeData.canonicalUrl,
    },
  };
}

// ✅ تابع تولید لینک محصول (بدون تغییر دادن حروف بزرگ و کوچک)
const getProductLink = (englishTitle: string) => {
  if (!englishTitle) return '#';
  // فقط انکد می‌کنیم تا در URL درست کار کند (مثلاً فاصله تبدیل به %20 شود)
  // اما حروف بزرگ و کوچک را تغییر نمی‌دهیم چون API حساس است
  return `/ProductPage/${englishTitle}`; // Next.js خودش انکد کردن را هندل می‌کند
};

// --- داده‌های استاتیک محتوایی ---
const textContentData = [
    { 
      id: 'sec-1', 
      title: "خرید لوازم یدکی خودرو با ضمانت اصالت", 
      content: (
        <>
          <Label as="p" size="base" className="mb-4 leading-loose text-justify">
            اگه صاحب یکی از خودروهای رنو باشی، حتماً می‌دونی که این ماشینا چه کیفیت خوبی دارن...
          </Label>
        </>
      ) 
    },
    { 
      id: 'sec-2', 
      title: "چرا یدکی‌ران؟", 
      content: (
        <>
          <Label as="p" size="base" className="mb-4 leading-loose text-justify">
            فروشگاه اینترنتی یدکی‌ران با هدف ارائه قطعات اصلی و باکیفیت...
          </Label>
          <ul className="list-disc pr-6 mb-4 space-y-2">
            <li><Label as="span">ضمانت بازگشت وجه در صورت عدم رضایت</Label></li>
            <li><Label as="span">ارسال سریع به سراسر کشور</Label></li>
            <li><Label as="span">مشاوره تخصصی قبل از خرید</Label></li>
            <li><Label as="span">تنوع بالای محصولات برای تمام برندها</Label></li>
          </ul>
        </>
      ) 
    },
];

const brandCardsData = [
  { href: "/brand/1", imgSrc: "/geely.webp", title: "جیلی" },
  { href: "/brand/2", imgSrc: "/jack.png", title: "جک" },
  { href: "/brand/3", imgSrc: "/LandRover.svg", title: "لندرور" },
  { href: "/brand/4", imgSrc: "/Renault.svg", title: "رنو" },
  { href: "/brand/5", imgSrc: "/ssangyong.svg", title: "سانگ یانگ" },
  { href: "/brand/6", imgSrc: "/Renault.svg", title: "پژو" },
  { href: "/brand/7", imgSrc: "/geely.webp", title: "چری" },
  { href: "/brand/8", imgSrc: "/jack.png", title: "لیفان" },
  { href: "/brand/9", imgSrc: "/LandRover.svg", title: "هایما" },
  { href: "/brand/10", imgSrc: "/Renault.svg", title: "برلیانس" },
  { href: "/brand/11", imgSrc: "/ssangyong.svg", title: "مزدا" },
  { href: "/brand/12", imgSrc: "/Renault.svg", title: "نیسان" },
];

export default async function HomePage() {
  const BASE_IMG_URL = "https://api-yadakirun.yadakchi.com";
  
  const homeData = await homeService.getHomePageData();

  const categoryData = homeData?.homePageLinks.map(link => ({
    href: link.url || '#',
    title: link.title,
    imgSrc: link.imageUrl.startsWith('http') ? link.imageUrl : `${BASE_IMG_URL}${link.imageUrl}`
  })) || [];

  const specialOfferProducts = homeData?.discountedProducts.map(p => ({
    id: p.id,
    title: p.title,
    // ✅ لینک‌دهی دقیق بر اساس English Title
    href: getProductLink(p.englishTitle),
    imgSrc: `${BASE_IMG_URL}${p.imageUrl}`,
    price: p.priceAfterDiscount,
    originalPrice: p.price,
    rating: 4.5,
    carName: p.discountPercent > 0 ? `${p.discountPercent}% تخفیف` : "فروش ویژه",
  })) || [];

  const bestSellerItems = homeData?.mostSoldProducts.map(p => ({
    id: String(p.id),
    title: p.title,
    // ✅ لینک‌دهی دقیق
    href: getProductLink(p.englishTitle),
    imgSrc: `${BASE_IMG_URL}${p.imageUrl}`,
    price: p.priceAfterDiscount,
    originalPrice: p.price,
    rating: 4.8,
    badgeText: "پرفروش",
  })) || [];

  const newestProductItems = homeData?.mostRecentProducts.map(p => ({
    id: String(p.id),
    title: p.title,
    // ✅ لینک‌دهی دقیق
    href: getProductLink(p.englishTitle),
    imgSrc: `${BASE_IMG_URL}${p.imageUrl}`,
    price: p.priceAfterDiscount,
    originalPrice: p.price,
    rating: 4.2,
    badgeText: "جدیدترین",
  })) || [];

  const newsItems = homeData?.mostRecentBlogPosts.map(post => ({
    href: `/blog/${post.id}`,
    title: post.title,
    imgSrc: `${BASE_IMG_URL}${post.coverUrl}`,
    date: new Date(post.createDate).toLocaleDateString('fa-IR', { day: 'numeric', month: 'long', year: 'numeric' }),
    description: `این مقاله را در ${post.readingTime} دقیقه بخوانید...`,
  })) || [];

  const moreCount = 10;
  const moreHref = "/categories";
  
  const hasCategories = categoryData.length > 0;
  
  const desktopItems = hasCategories ? [
    { href: moreHref, title: `${moreCount}+ بیشتر`, isMore: true },
    ...categoryData.slice(0, 6)
  ] : [];

  const mobileItems = hasCategories ? [
    ...categoryData,
    { href: moreHref, title: `${moreCount}+ بیشتر`, isMore: true }
  ] : [];

  return (
    <>
      <HomeBanner />

      {hasCategories && (
        <Container>
          <section className="my-10">
            <div className="hidden lg:block">
              <CardGrid items={desktopItems} columns={7} />
            </div>
            <div className="lg:hidden">
              <CardSlider items={mobileItems} />
            </div>
          </section>
        </Container>
      )}
      
      <Container>
        <SpecialOffers products={specialOfferProducts} title="پیشنهادهای شگفت‌انگیز" />
        <BestSellersSlider title="پرفروش‌ترین محصولات" items={bestSellerItems} uniqueId="bestsellers" />
      </Container>
      
      <Container className="my-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ImageCard
            href="/category/offroad"
            src="/SGA-banner.webp"
            alt="لوازم آفرودی"
            aspectRatio="5 / 1"
            priority={true}
          />
          <ImageCard
            href="/category/tuning"
            src="/aisin-clutch-banner.webp"
            alt="لوازم تیونینگ"
            aspectRatio="5 / 1"
            priority={true}
          />
        </div>
      </Container>

      <Container>
        <BestSellersSlider title="جدیدترین محصولات" items={newestProductItems} uniqueId="newest-products" />
      </Container>

       <Container className="my-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <ImageCard href="/category/body" src="/SGA-banner.webp" alt="قطعات بدنه" aspectRatio="6 / 3" />
          <ImageCard href="/category/engine" src="/aisin-clutch-banner.webp" alt="قطعات موتوری" aspectRatio="6 / 3" />
          <ImageCard href="/category/suspension" src="/SGA-banner.webp" alt="جلوبندی" aspectRatio="6 / 3" />
          <ImageCard href="/category/electrical" src="/aisin-clutch-banner.webp" alt="برقی" aspectRatio="6 / 3" />
        </div>
      </Container>

      <Container className="my-4">
         <section>
            <div className="mb-4 text-right border-r-4 border-brand-accent pr-4 pt-2">
                <Label as="h2" size="xl" weight="extra-bold">برندهای منتخب</Label>
            </div>
            <CardGrid items={brandCardsData} className="card-grid--responsive" />
         </section>
      </Container>

      <NewsSection title="آخرین اخبار و مقالات" items={newsItems} uniqueId="homepage-news" />
      
      <SeoContentSection textContentData={textContentData} />
    </>
  );
}
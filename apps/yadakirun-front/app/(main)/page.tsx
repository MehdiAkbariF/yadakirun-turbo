import { Label } from '@monorepo/design-system/src/components/atoms/Label/Label';
import { Container } from '@monorepo/design-system/src/components/organisms/Container/Container';
import { CardGrid } from '@monorepo/design-system/src/components/molecules/CardGrid/CardGrid';
import { CardSlider } from '@monorepo/design-system/src/components/molecules/CardSlider/CardSlider';
import { SpecialOffers } from '@/src/components/layout/SpecialOffers';
import { BestSellersSlider } from '@/src/components/layout/BestSellersSlider';
import { ImageCard } from '@monorepo/design-system/src/components/atoms/ImageCard/ImageCard';
import { NewsSection } from '@/src/components/layout/NewsSection';// ایمپورت کامپوننت
import { ContentSection } from '@monorepo/design-system/src/components/molecules/ContentSection/ContentSection'; 
import { Footer } from '@monorepo/design-system/src/components/organisms/Footer/Footer';
// داده‌های نمونه برای کارت‌های دسته‌بندی
const textContentData = [
    { id: 'sec-1', title: "قطعات یکی خودروهای رنو", content: <><p>اگه صاحب یکی از خودروهای رنو باشی، حتماً می‌دونی که این ماشینا چه کیفیت خوبی دارن؛ چه از نظر سواری، چه از لحاظ مصرف سوخت و حتی دوام موتور. اما با همه‌ی این خوبی‌ها، مثل هر خودروی دیگه‌ای، بالاخره یه روزی به قطعات یدکی نیاز پیدا می‌کنن.</p><p>مخصوصاً وقتی زمان تعویض لنت ترمز، تسمه تایم یا فیلتر روغن می‌رسه، تازه می‌فهمی که انتخاب قطعه درست چقدر مهمه. چون استفاده از یه قطعه نامرغوب می‌تونه به کل سیستم ماشین آسیب بزنه و کلی هزینه رو دستت بذاره.</p></> },
     { id: 'sec-1', title: "قطعات یکی خودروهای رنو", content: <><p>اگه صاحب یکی از خودروهای رنو باشی، حتماً می‌دونی که این ماشینا چه کیفیت خوبی دارن؛ چه از نظر سواری، چه از لحاظ مصرف سوخت و حتی دوام موتور. اما با همه‌ی این خوبی‌ها، مثل هر خودروی دیگه‌ای، بالاخره یه روزی به قطعات یدکی نیاز پیدا می‌کنن.</p><p>مخصوصاً وقتی زمان تعویض لنت ترمز، تسمه تایم یا فیلتر روغن می‌رسه، تازه می‌فهمی که انتخاب قطعه درست چقدر مهمه. چون استفاده از یه قطعه نامرغوب می‌تونه به کل سیستم ماشین آسیب بزنه و کلی هزینه رو دستت بذاره.</p></> },
      { id: 'sec-1', title: "قطعات یکی خودروهای رنو", content: <><p>اگه صاحب یکی از خودروهای رنو باشی، حتماً می‌دونی که این ماشینا چه کیفیت خوبی دارن؛ چه از نظر سواری، چه از لحاظ مصرف سوخت و حتی دوام موتور. اما با همه‌ی این خوبی‌ها، مثل هر خودروی دیگه‌ای، بالاخره یه روزی به قطعات یدکی نیاز پیدا می‌کنن.</p><p>مخصوصاً وقتی زمان تعویض لنت ترمز، تسمه تایم یا فیلتر روغن می‌رسه، تازه می‌فهمی که انتخاب قطعه درست چقدر مهمه. چون استفاده از یه قطعه نامرغوب می‌تونه به کل سیستم ماشین آسیب بزنه و کلی هزینه رو دستت بذاره.</p></> },
       { id: 'sec-1', title: "قطعات یکی خودروهای رنو", content: <><p>اگه صاحب یکی از خودروهای رنو باشی، حتماً می‌دونی که این ماشینا چه کیفیت خوبی دارن؛ چه از نظر سواری، چه از لحاظ مصرف سوخت و حتی دوام موتور. اما با همه‌ی این خوبی‌ها، مثل هر خودروی دیگه‌ای، بالاخره یه روزی به قطعات یدکی نیاز پیدا می‌کنن.</p><p>مخصوصاً وقتی زمان تعویض لنت ترمز، تسمه تایم یا فیلتر روغن می‌رسه، تازه می‌فهمی که انتخاب قطعه درست چقدر مهمه. چون استفاده از یه قطعه نامرغوب می‌تونه به کل سیستم ماشین آسیب بزنه و کلی هزینه رو دستت بذاره.</p></> },
    // ... بقیه داده‌ها
];
const categoryData = [
  { href: "/cat/1", imgSrc: "/geely.webp", title: "جیلی" },
  { href: "/cat/2", imgSrc: "/jack.png", title: "جک" },
  { href: "/cat/3", imgSrc: "/LandRover.svg", title: "لندرور" },
  { href: "/cat/4", imgSrc: "/Renault.svg", title: "رنو" },
  { href: "/cat/5", imgSrc: "/ssangyong.svg", title: "سانگ یانگ" },
  { href: "/cat/6", imgSrc: "/Renault.svg", title: "پژو" },
];
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
const bestSellersData = [
    { id: '1', title: 'کمک فنر حرفه‌ای رنو', href: '#', imgSrc: '/Renault.svg', price: 1250000, originalPrice: 1500000, rating: 4, badgeText: 'رنو' },
    { id: '2', title: 'دیسک ترمز خنک شونده پژو', href: '#', imgSrc: '/Renault.svg',  rating: 5, badgeText: 'پژو' },
     { id: '2', title: 'دیسک ترمز خنک شونده پژو', href: '#', imgSrc: '/Renault.svg', price: 890000, rating: 5, badgeText: 'پژو' },
      { id: '2', title: 'دیسک ترمز خنک شونده پژو', href: '#', imgSrc: '/Renault.svg', price: 890000, rating: 5, badgeText: 'پژو' },
       { id: '2', title: 'دیسک ترمز خنک شونده پژو', href: '#', imgSrc: '/Renault.svg', price: 890000, rating: 5, badgeText: 'پژو' },
        { id: '2', title: 'دیسک ترمز خنک شونده پژو', href: '#', imgSrc: '/Renault.svg', price: 890000, rating: 5, badgeText: 'پژو' },
         { id: '2', title: 'دیسک ترمز خنک شونده پژو', href: '#', imgSrc: '/Renault.svg', price: 890000, rating: 5, badgeText: 'پژو' },
    // ... بقیه 
];

// ✅ داده‌های نمونه برای گرید جدید در انتهای صفحه
const brandCardsData = [
  { href: "/brand/1", imgSrc: "/geely.webp", title: "برند ۱" },
  { href: "/brand/2", imgSrc: "/jack.png", title: "برند ۲" },
  { href: "/brand/3", imgSrc: "/LandRover.svg", title: "برند ۳" },
  { href: "/brand/4", imgSrc: "/Renault.svg", title: "برند ۴" },
  { href: "/brand/5", imgSrc: "/ssangyong.svg", title: "برند ۵" },
  { href: "/brand/6", imgSrc: "/Renault.svg", title: "برند ۶" },
  { href: "/brand/7", imgSrc: "/geely.webp", title: "برند ۷" },
  { href: "/brand/8", imgSrc: "/jack.png", title: "برند ۸" },
  { href: "/brand/9", imgSrc: "/LandRover.svg", title: "برند ۹" },
  { href: "/brand/10", imgSrc: "/Renault.svg", title: "برند ۱۰" },
  { href: "/brand/11", imgSrc: "/ssangyong.svg", title: "برند ۱۱" },
  { href: "/brand/12", imgSrc: "/Renault.svg", title: "برند ۱۲" },
];


export default function HomePage() {
  const moreCount = 10;
  const moreHref = "/categories";

  const desktopItems = [
    { href: moreHref, title: `${moreCount}+ بیشتر`, isMore: true },
    ...categoryData.slice(0, 6)
  ];
  
  const mobileItems = [
    ...categoryData,
    { href: moreHref, title: `${moreCount}+ بیشتر`, isMore: true }
  ];

  return (
    <>
      <section className="w-full h-64 flex items-center justify-center mb-20">
        <Label as="h2" size="3x" weight="bold" color="primary">
          بنر صفحه اصلی
        </Label>
      </section>

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
      
      <Container>
        <SpecialOffers />
        <BestSellersSlider title="پرفروش‌ترین محصولات" items={bestSellersData} uniqueId="bestsellers" />
      </Container>
      
      <Container className="my-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ImageCard
            href="/category/offroad"
            src="/SGA-banner.webp"
            alt="لوازم آفرودی"
            aspectRatio="5 / 1"
          />
          <ImageCard
            href="/category/tuning"
            src="/aisin-clutch-banner.webp"
            alt="لوازم تیونینگ"
            aspectRatio="5 / 1"
          />
        </div>
      </Container>
 <Container>
      
        <BestSellersSlider title="پرفروش‌ترین محصولات" items={bestSellersData} uniqueId="bestsellers" />
      </Container>

       <Container className="my-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <ImageCard
            href="/category/offroad"
            src="/SGA-banner.webp"
            alt="لوازم آفرودی"
            aspectRatio="6 / 3" // بنر مربعی
          />
          <ImageCard
            href="/category/tuning"
            src="/aisin-clutch-banner.webp"
            alt="لوازم تیونینگ"
         aspectRatio="6 / 3"
          />
              <ImageCard
            href="/category/offroad"
            src="/SGA-banner.webp"
            alt="لوازم آفرودی"
          aspectRatio="6 / 3"
          />
          <ImageCard
            href="/category/tuning"
            src="/aisin-clutch-banner.webp"
            alt="لوازم تیونینگ"
         aspectRatio="6 / 3"
          />
        </div>
      </Container>


      {/* ✅✅✅ بخش جدید: گرید ریسپانسیو برندها ✅✅✅ */}
      <Container className="my-16">
         <section>
            <div className="mb-8 text-right border-r-4 border-accent pr-4 pt-2">
                <Label as="h2" size="xl" weight="extra-bold">برندهای منتخب</Label>
            </div>
            {/* 
              از CardGrid استفاده می‌کنیم و تعداد ستون‌ها را به صورت ریسپانسیو در CSS کنترل خواهیم کرد.
              یک کلاس جدید `card-grid--responsive` به آن می‌دهیم.
            */}
            <CardGrid items={brandCardsData} className="card-grid--responsive" />
         </section>


      </Container>
       <NewsSection title="آخرین اخبار و مقالات" items={newsData} uniqueId="homepage-news" />
      <Container asSection className="my-16">
        {textContentData.map((section, index) => (
          <div key={section.id + index} className={index > 0 ? 'mt-12' : ''}>
            <ContentSection title={section.title}>
              {section.content}
            </ContentSection>
          </div>
        ))}
      </Container>
    </>
  );
}
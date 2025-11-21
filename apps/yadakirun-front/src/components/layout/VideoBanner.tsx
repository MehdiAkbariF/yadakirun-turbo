// مسیر: apps/yadakirun-front/src/components/layout/VideoBanner.tsx

export const VideoBanner = () => {
  return (
    // این کانتینر اصلی است که موقعیت و اندازه بنر را مشخص می‌کند
    // overflow-hidden اضافه شد تا بخش‌های اضافی ویدیو بیرون نزند
    <div className="relative top-0 left-0 w-full h-10 z-0 overflow-hidden">
      
      {/* 
        یک لایه تیره روی ویدیو برای خوانایی بهتر متن‌هایی که ممکن است روی آن قرار بگیرند
        این بخش اختیاری است اما ظاهر حرفه‌ای‌تری ایجاد می‌کند
      */}

      
      <video
        // استایل‌ها برای پوشاندن کامل کانتینر
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        
        // مسیر ویدیو از پوشه public
        src="/gif-site-header.mp4" 
        
        // اتریبیوت‌های لازم برای پخش خودکار و تکرار شونده
        autoPlay
        loop
        muted
        playsInline
      />
      
      {/* 
        در اینجا می‌توانید هر محتوای دیگری مثل متن یا لوگو را روی ویدیو قرار دهید
        <div className="relative z-10 flex items-center justify-center h-full">
          <p className="text-white font-bold text-xl">متن روی ویدیو</p>
        </div>
      */}
    </div>
  );
};
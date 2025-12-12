"use client";
import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { Input } from '../../atoms/Input/Input';
import { TextArea } from '../../atoms/TextArea/TextArea';
import { FileUpload } from '../../atoms/FileUpload/FileUpload';
import { Button } from '../../atoms/Button/Button';
import { Label } from '../../atoms/Label/Label';

export const ContactForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    description: '',
    file: null as File | null
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // شبیه‌سازی ارسال
    console.log('Form Data:', formData);
    
    setTimeout(() => {
      setIsLoading(false);
      alert('پیام شما با موفقیت ثبت شد.');
      // ریست فرم
      setFormData({ fullName: '', phone: '', description: '', file: null });
    }, 2000);
  };

  return (
    <div className="bg-bg-surface border border-border-secondary rounded-2xl p-6 lg:p-8 shadow-sm">
      <div className="mb-6">
        <Label as="h3" size="base" weight="bold" className="mb-2">فرم تماس با ما</Label>
        <Label color="secondary" size='sm'>برای ارتباط سریع‌تر، لطفاً اطلاعات زیر را دقیق وارد کنید.</Label>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input 
            id="fullname"
            label="نام و نام خانوادگی" 
            placeholder="نام و نام خانوادگی خود را وارد کنید"
            value={formData.fullName}
            onChange={e => setFormData({...formData, fullName: e.target.value})}
            required
          />
          <Input 
            id="phone"
            label="شماره تماس" 
            placeholder="شماره موبایل خود را وارد کنید"
            type="tel"
            value={formData.phone}
            onChange={e => setFormData({...formData, phone: e.target.value})}
            required
            dir="ltr"
            className="text-right placeholder:text-right"
          />
        </div>

        <TextArea 
          id="desc"
          label="توضیحات (اختیاری)" 
          placeholder="توضیحات خود را وارد کنید..."
          value={formData.description}
          onChange={e => setFormData({...formData, description: e.target.value})}
        />

        <FileUpload 
          id="attachment"
          label="عکس یا فیلم"
          accept="image/*,video/*"
          onFileSelect={file => setFormData({...formData, file})}
        />

        <div className="pt-4 flex justify-end">
           <Button 
             type="submit" 
             size="md" 
             isLoading={isLoading}
             leftIcon={<Send size={18} />}
             className="w-full md:w-auto"
           >
             ثبت و ارسال
           </Button>
        </div>
      </form>
    </div>
  );
};
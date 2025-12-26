"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, MessageSquare, ShieldCheck, User, AlertCircle, X } from 'lucide-react';
import { TicketChatProps } from './TicketChat.types';
import { Label } from '../../atoms/Label/Label';
import './TicketChat.scss';

export const TicketChat = ({
  messages = [],
  categories = [],
  isNewTicket = false,
  ticketInfo,
  onSendMessage,
  onSelectCategory,
  isLoading = false,
  isLoadingCategories = false,
}: TicketChatProps) => {
  const [inputText, setInputText] = useState('');
  const [selectedCat, setSelectedCat] = useState<any | null>(null);
  const [sendCooldown, setSendCooldown] = useState(0);
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (sendCooldown > 0) {
      const timer = setTimeout(() => setSendCooldown(sendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [sendCooldown]);

  const handleSend = () => {
    // حتماً باید متن داشته باشه (حتی اگر فایل attach شده باشه)
    if (inputText.trim() && (selectedCat || !isNewTicket) && sendCooldown === 0) {
      onSendMessage(inputText.trim(), attachedFile || undefined);
      setInputText('');
      setAttachedFile(null);
      setFilePreview(null);
      setSendCooldown(5);
    }
  };

  const handleCategoryClick = (cat: any) => {
    setSelectedCat(cat);
    onSelectCategory?.(cat);
  };

  const handleAttachClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAttachedFile(file);

      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (ev) => setFilePreview(ev.target?.result as string);
        reader.readAsDataURL(file);
      } else {
        setFilePreview(null);
      }
    }
  };

  const removeAttachment = () => {
    setAttachedFile(null);
    setFilePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const isDisabled = isNewTicket && !selectedCat;
  // دکمه ارسال فقط وقتی فعال باشه که حتماً متن نوشته شده باشه
  const isSendDisabled = !inputText.trim() || isDisabled || isLoading || sendCooldown > 0;

  return (
    <div className="ticket-chat" dir="rtl">
      {/* Header */}
      <header className="ticket-chat__header">
        <div className="flex items-center gap-3">
          <div>
            <MessageSquare size={24} />
          </div>
          <div>
            <Label weight="extra-bold" size="base" className="text-heading">
              {isNewTicket
                ? (selectedCat ? `موضوع: ${selectedCat.name || selectedCat.title}` : 'ارسال تیکت جدید')
                : ticketInfo?.subject || 'مشاهده گفتگو'
              }
            </Label>
            <div className="flex items-center gap-2 mt-0.5">
              {isNewTicket ? (
                <div className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${selectedCat ? 'bg-utility-success animate-pulse' : 'bg-text-placeholder'}`} />
                  <Label size="xs" color="secondary">
                    {selectedCat ? 'در حال ثبت تیکت...' : 'در انتظار انتخاب موضوع'}
                  </Label>
                </div>
              ) : (
                <Label size="xs" color="secondary">
                  تیکت شماره #{ticketInfo?.id} | <span className="text-brand-primary font-bold">{ticketInfo?.statusLabel}</span>
                </Label>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="ticket-chat__body custom-scrollbar" ref={scrollRef}>
        {isNewTicket && !selectedCat ? (
          <div className="ticket-chat__setup">
            <div>
              <AlertCircle size={28} className="text-brand-primary opacity-40 mb-4" />
            </div>
            <Label weight="black" size="sm" className="mb-2">موضوع تیکت را انتخاب کنید</Label>
            <Label size="sm" color="secondary" className="mb-6">
              برای شروع گفتگو و دریافت پاسخ از کارشناسان، ابتدا باید دسته‌بندی مربوط به درخواست خود را انتخاب نمایید.
            </Label>

            {isLoadingCategories ? (
              <div className="text-center py-8">
                <Label color="secondary">در حال بارگذاری دسته‌بندی‌ها...</Label>
              </div>
            ) : categories.length > 0 ? (
              <div className="ticket-chat__category-grid">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    className="category-btn"
                    onClick={() => handleCategoryClick(cat)}
                  >
                    <div className="category-btn__icon">
                      <MessageSquare size={20} />
                    </div>
                    <Label size="xs" weight="bold">{cat.name || cat.title}</Label>
                  </button>
                ))}
              </div>
            ) : (
              <Label color="secondary" className="text-center">دسته‌بندی یافت نشد.</Label>
            )}
          </div>
        ) : (
          <div className="ticket-chat__messages">
            {isLoading && messages.length === 0 && (
              <div className="text-center py-8">
                <Label color="secondary">در حال بارگذاری پیام‌ها...</Label>
              </div>
            )}

            {messages.map((msg: any) => (
              <div key={msg.id} className={`message-wrapper message-wrapper--${msg.sender}`}>
                <div className="message-bubble">
                  <div className="message-header">
                    <span className="sender-icon">
                      {msg.sender === 'user' ? <User size={12} /> : <ShieldCheck size={12} />}
                    </span>
                    <Label size="xs" weight="bold" className="sender-name">
                      {msg.sender === 'user' ? 'شما' : 'پشتیبانی یدکی‌ران'}
                    </Label>
                  </div>

                  {msg.imageUrl && (
                    <div className="message-image-container">
                      <img src={msg.imageUrl} alt="پیوست" className="message-image" />
                    </div>
                  )}

                  <div className="message-text">
                    <Label size="sm" className="leading-relaxed">{msg.text}</Label>
                  </div>

                  <Label size="xs" className="message-time">{msg.timestamp}</Label>
                </div>
              </div>
            ))}

            {isNewTicket && selectedCat && messages.length === 0 && !isLoading && (
              <div className="flex justify-center my-6">
                <div className="bg-bg-surface px-5 py-3 rounded-full border border-border-secondary shadow-sm">
                  <Label size="xs" color="secondary" weight="semi-bold">
                    گفتگو درباره <span className="text-brand-primary">{selectedCat.name || selectedCat.title}</span> آغاز شد. پیام خود را بنویسید.
                  </Label>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className={`ticket-chat__footer ${isDisabled ? 'ticket-chat__footer--disabled' : ''}`}>
        {/* پیش‌نمایش فایل در footer */}
        {attachedFile && (
          <div className="mx-6 mb-3 p-3 bg-bg-secondary rounded-lg border border-border-secondary flex items-center gap-3">
            {filePreview ? (
              <img src={filePreview} alt="پیش‌نمایش" className="w-16 h-16 object-cover rounded-lg" />
            ) : (
              <div className="w-16 h-16 bg-bg-surface rounded-lg flex items-center justify-center">
                <Paperclip size={24} className="text-text-secondary" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <Label size="xs" weight="semi-bold" className="block truncate">
                {attachedFile.name}
              </Label>
              <Label size="xs" color="secondary">
                {(attachedFile.size / 1024).toFixed(1)} KB
              </Label>
            </div>
            <button
              onClick={removeAttachment}
              className="p-2 hover:bg-bg-surface-hover rounded-full transition"
            >
              <X size={18} />
            </button>
          </div>
        )}

        <div className="ticket-chat__input-wrapper">
          <div className="chat-input-container">
            <textarea
              placeholder={isDisabled ? "ابتدا موضوع را انتخاب کنید..." : "پیام خود را بنویسید... (اجباری)"}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              disabled={isDisabled || isLoading}
              rows={1}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />
          </div>

          <button
            type="button"
            className={`chat-send-btn ${!isSendDisabled ? 'chat-send-btn--active' : ''}`}
            onClick={handleSend}
            disabled={isSendDisabled}
          >
            {sendCooldown > 0 ? (
              <span className="text-lg font-bold">{sendCooldown}</span>
            ) : (
              <Send size={20} />
            )}
          </button>

          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*,.pdf,.doc,.docx"
            onChange={handleFileChange}
          />

          <button
            type="button"
            className="chat-action-btn chat-action-btn--attach"
            onClick={handleAttachClick}
            disabled={isDisabled || isLoading}
            title="پیوست فایل"
          >
            <Paperclip size={22} />
          </button>
        </div>

        {sendCooldown > 0 && (
          <div className="text-center mt-2">
            <Label size="xs" color="secondary">
              لطفاً {sendCooldown} ثانیه صبر کنید تا   ارسال پیام بعدی صبر کنید
            </Label>
          </div>
        )}
      </footer>
    </div>
  );
};
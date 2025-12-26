"use client";

import React, { useEffect, useState, useCallback } from 'react';
import { Download, X } from 'lucide-react';
import { PWAInstallPromptProps } from './PWAInstallPrompt.types';
import './PWAInstallPrompt.scss';

const STORAGE_KEY = 'pwa_install_dismissed';
const MIN_DELAY_SECONDS = 30;

export const PWAInstallPrompt: React.FC<PWAInstallPromptProps> = ({
  message = "این وبسایت را به صفحه اصلی گوشی خود اضافه کنید و مثل اپلیکیشن استفاده کنید",
  installText = "نصب کن",
  dismissText = "بعداً",
  delaySeconds = MIN_DELAY_SECONDS,
  className,
}) => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY);
    const dismissedTimestamp = dismissed ? parseInt(dismissed) : 0;
    const now = Date.now();
    const oneDay = 1 * 24 * 60 * 60 * 1000;

    if (dismissedTimestamp && now - dismissedTimestamp < oneDay) {
      return;
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      
      setTimeout(() => {
        setIsVisible(true);
      }, delaySeconds * 1000);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, [delaySeconds]);

  const handleInstall = useCallback(() => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    
    deferredPrompt.userChoice.then((choiceResult: { outcome: string }) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('کاربر اپلیکیشن را نصب کرد');
      }
      setIsVisible(false);
    });
  }, [deferredPrompt]);

  const handleDismiss = useCallback(() => {
    setIsDismissed(true);
    localStorage.setItem(STORAGE_KEY, Date.now().toString());
    
    setTimeout(() => {
      setIsVisible(false);
    }, 400);
  }, []);

  if (!deferredPrompt || !isVisible) return null;

  const classNames = [
    'pwa-install-prompt',
    isVisible && !isDismissed ? 'pwa-install-prompt--visible' : '',
    isDismissed ? 'pwa-install-prompt--dismissed' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames} role="dialog" aria-live="polite">
      {/* دکمه X در بالا-چپ */}
      <button
        onClick={handleDismiss}
        className="pwa-install-prompt__close"
        aria-label="بستن نوتیفیکیشن نصب"
      >
        <X />
      </button>

      <div className="pwa-install-prompt__icon">
        <Download />
      </div>

      <div className="pwa-install-prompt__content">
        <div className="pwa-install-prompt__title">وب اپلیکیشن یدکی ران</div>
        <div className="pwa-install-prompt__message">{message}</div>
        
        <div className="pwa-install-prompt__actions">
          <button
            onClick={handleDismiss}
            className="pwa-install-prompt__button pwa-install-prompt__button--dismiss"
          >
            {dismissText}
          </button>
          <button
            onClick={handleInstall}
            className="pwa-install-prompt__button pwa-install-prompt__button--install"
          >
            {installText}
          </button>
        </div>
      </div>
    </div>
  );
};
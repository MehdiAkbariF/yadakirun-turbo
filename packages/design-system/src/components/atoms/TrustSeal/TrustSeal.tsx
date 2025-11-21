import React from 'react';
import Image from 'next/image';

export const TrustSeal = ({ src, alt, href }: { src: string, alt: string, href: string }) => {
  return (
    <a href={href} className="block transition-opacity hover:opacity-80">
      <Image src={src} alt={alt} width={50} height={50} className="object-contain" />
    </a>
  );
};
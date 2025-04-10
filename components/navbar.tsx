"use client";

import { ThemeToggle } from "./theme-toggle";
import { LanguageToggle } from "./language-toggle";
import { useLanguage } from "@/lib/language-provider";
import { t } from "@/lib/translations";
import Link from 'next/link';
export function Navbar() {
  const { language } = useLanguage();
  
  return (
    <nav className='border-b border-border bg-background'>
      <div className='container mx-auto px-4 py-3 flex justify-between items-center'>
        <Link href='/'>
          <h1 className='text-xl font-bold'>{t('appName', language)}</h1>
        </Link>
        <div className='flex items-center space-x-2'>
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
} 

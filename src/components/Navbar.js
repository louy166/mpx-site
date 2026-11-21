'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HiOutlineMenu, HiOutlineX, HiOutlineGlobeAlt } from 'react-icons/hi';
import { useI18n } from '@/lib/i18n';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { t, lang, switchLang } = useI18n();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const NAV_LINKS = [
    { href: '/', label: t('nav_home') },
    { href: '/properties', label: t('nav_properties') },
    { href: '/about', label: t('nav_about') },
    { href: '/contact', label: t('nav_contact') },
  ];

  const isHome = pathname === '/';
  const transparent = isHome && !scrolled && !open;

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
      transparent
        ? 'bg-transparent'
        : 'bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
              transparent ? 'bg-white/20 backdrop-blur-sm' : 'bg-primary'
            }`}>
              <span className={`font-bold text-sm transition-colors duration-300 ${
                transparent ? 'text-white' : 'text-white'
              }`} style={{ fontFamily: 'Space Grotesk, sans-serif' }}>FM</span>
            </div>
            <div className="hidden sm:block">
              <span className={`font-bold text-lg transition-colors duration-300 ${
                transparent ? 'text-white' : 'text-primary'
              }`} style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Foncier</span>
              <span className={`font-semibold text-lg transition-colors duration-300 ${
                transparent ? 'text-gold' : 'text-gold-dark'
              }`} style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{lang === 'ar' ? ' ' : ' '}Mauritanie</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  pathname === link.href
                    ? transparent
                      ? 'bg-white/20 text-white'
                      : 'bg-primary-50 text-primary'
                    : transparent
                      ? 'text-white/80 hover:text-white hover:bg-white/10'
                      : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language Switcher */}
            <button
              onClick={() => switchLang(lang === 'fr' ? 'ar' : 'fr')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                transparent
                  ? 'text-white/80 hover:text-white hover:bg-white/10'
                  : 'text-gray-600 hover:text-primary hover:bg-gray-50'
              }`}
              title={lang === 'fr' ? 'العربية' : 'Francais'}
            >
              <HiOutlineGlobeAlt size={18} />
              <span>{lang === 'fr' ? 'AR' : 'FR'}</span>
            </button>

          </div>

          {/* Mobile: lang + toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => switchLang(lang === 'fr' ? 'ar' : 'fr')}
              className={`p-2 rounded-lg transition-colors ${
                transparent ? 'text-white' : 'text-gray-600'
              }`}
            >
              <HiOutlineGlobeAlt size={22} />
            </button>
            <button onClick={() => setOpen(!open)} className={`p-2 rounded-lg transition-colors ${
              transparent ? 'text-white' : 'text-gray-600'
            }`}>
              {open ? <HiOutlineX size={24} /> : <HiOutlineMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${
        open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="bg-white border-t border-gray-100 px-4 pb-5 pt-2 space-y-1">
          {NAV_LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                pathname === link.href ? 'bg-primary-50 text-primary' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

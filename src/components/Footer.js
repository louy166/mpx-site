'use client';
import Link from 'next/link';
import { HiOutlinePhone, HiOutlineMail, HiOutlineLocationMarker } from 'react-icons/hi';
import { useI18n } from '@/lib/i18n';
import useScrollAnimation from '@/hooks/useScrollAnimation';

export default function Footer() {
  const { t } = useI18n();
  useScrollAnimation();

  return (
    <footer className="bg-gradient-to-b from-primary-dark to-[#002815] text-white relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gold/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-white/3 rounded-full translate-x-1/3 translate-y-1/3" />

      <div className="max-w-7xl mx-auto section-padding py-16 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gold flex items-center justify-center">
                <span className="text-primary-dark font-bold text-sm" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>FM</span>
              </div>
              <div>
                <span className="font-bold text-white text-lg" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Foncier</span>
                <span className="font-semibold text-gold text-lg" style={{ fontFamily: 'Space Grotesk, sans-serif' }}> Mauritanie</span>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              {t('footer_desc')}
            </p>
          </div>

          {/* Nav */}
          <div>
            <h4 className="font-semibold text-gold mb-5 text-sm uppercase tracking-wider">{t('footer_nav')}</h4>
            <ul className="space-y-3">
              {[
                { href: '/', label: t('nav_home') },
                { href: '/properties', label: t('nav_properties') },
                { href: '/about', label: t('nav_about') },
                { href: '/contact', label: t('nav_contact') },
              ].map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/50 hover:text-white text-sm transition-colors duration-200 flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-gold/50 group-hover:bg-gold transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-gold mb-5 text-sm uppercase tracking-wider">{t('footer_services')}</h4>
            <ul className="space-y-3">
              {[t('service_vente'), t('service_location'), t('service_estimation'), t('service_juridique')].map(s => (
                <li key={s} className="text-white/50 text-sm flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-gold/50" />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-gold mb-5 text-sm uppercase tracking-wider">{t('footer_contact')}</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-white/50 text-sm group">
                <div className="w-9 h-9 rounded-lg bg-white/5 group-hover:bg-gold/20 flex items-center justify-center transition-colors">
                  <HiOutlinePhone className="text-gold" size={16} />
                </div>
                <span>+222 41 91 47 72</span>
              </li>
              <li className="flex items-center gap-3 text-white/50 text-sm group">
                <div className="w-9 h-9 rounded-lg bg-white/5 group-hover:bg-gold/20 flex items-center justify-center transition-colors">
                  <HiOutlineMail className="text-gold" size={16} />
                </div>
                <span>contact@foncier.mr</span>
              </li>
              <li className="flex items-center gap-3 text-white/50 text-sm group">
                <div className="w-9 h-9 rounded-lg bg-white/5 group-hover:bg-gold/20 flex items-center justify-center transition-colors">
                  <HiOutlineLocationMarker className="text-gold" size={16} />
                </div>
                <span>Nouakchott, Mauritanie</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-14 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-sm">
            &copy; {new Date().getFullYear()} Foncier Mauritanie. {t('footer_rights')}
          </p>
          <div className="flex items-center gap-4">
            <span className="text-white/20 text-xs">MPX v1.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

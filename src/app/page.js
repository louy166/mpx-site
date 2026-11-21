'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  HiOutlineSearch, HiOutlineShieldCheck, HiOutlineCurrencyDollar,
  HiOutlineUserGroup, HiOutlineHome, HiOutlineArrowRight,
  HiOutlineLockClosed, HiOutlineChevronDown,
} from 'react-icons/hi';
import PropertyCard from '@/components/PropertyCard';
import api from '@/lib/api';
import { PROPERTY_TYPES, VILLES, getLabel } from '@/lib/constants';
import { useI18n } from '@/lib/i18n';
import useScrollAnimation from '@/hooks/useScrollAnimation';

function normalizePage(data) {
  if (!data) return { content: [], totalPages: 0, totalElements: 0 };
  return {
    content: data.data || data.content || [],
    totalPages: data.total_pages || data.totalPages || 0,
    totalElements: data.total_elements || data.totalElements || 0,
  };
}

export default function HomePage() {
  const { t, lang } = useI18n();
  const [featured, setFeatured] = useState([]);
  const [recent, setRecent] = useState([]);
  const [searchType, setSearchType] = useState('');
  const [searchVille, setSearchVille] = useState('');
  const [loading, setLoading] = useState(true);

  useScrollAnimation();

  useEffect(() => {
    async function load() {
      try {
        const [featRes, recRes] = await Promise.all([
          api.getFeaturedProperties().catch(() => []),
          api.getProperties({ page: 0, size: 6, statut: 'publie' }).catch(() => null),
        ]);
        setFeatured(Array.isArray(featRes) ? featRes : featRes?.content || []);
        const normalized = normalizePage(recRes);
        setRecent(normalized.content);
      } catch {}
      setLoading(false);
    }
    load();
  }, []);

  const fontFamily = lang === 'ar' ? 'IBM Plex Sans Arabic, sans-serif' : 'Space Grotesk, sans-serif';

  return (
      <div>
        {/* =========== HERO =========== */}
        <section className="relative min-h-[92vh] flex items-center bg-gradient-to-br from-[#003D1A] via-primary to-[#004D27] overflow-hidden">
          <div className="absolute inset-0 hero-pattern" />

          {/* Animated decorative elements */}
          <div className="absolute top-20 right-10 w-72 h-72 bg-gold/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-float-slow" />
          <div className="absolute top-40 left-1/3 w-64 h-64 bg-gold/5 rounded-full blur-2xl animate-pulse-glow" />

          {/* Floating dots */}
          <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-gold rounded-full opacity-60 animate-float-fast" />
          <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-gold/50 rounded-full animate-float" />
          <div className="absolute bottom-1/3 left-1/4 w-3 h-3 bg-gold/30 rounded-full animate-float-slow" />
          <div className="absolute top-1/4 left-1/6 w-2 h-2 bg-white/20 rounded-full animate-float-fast" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-1/4 right-1/6 w-2.5 h-2.5 bg-gold/40 rounded-full animate-float" style={{ animationDelay: '2s' }} />

          {/* Rotating ring decoration */}
          <div className="absolute top-1/2 right-10 w-48 h-48 border border-white/5 rounded-full animate-rotate-slow hidden lg:block" />
          <div className="absolute top-1/2 right-10 w-32 h-32 border border-gold/10 rounded-full animate-rotate-slow hidden lg:block" style={{ animationDirection: 'reverse' }} />

          <div className="max-w-7xl mx-auto section-padding py-32 relative w-full">
            <div className="max-w-3xl">
              {/* Badge */}
              <div className="hero-anim-1 inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-gold px-5 py-2 rounded-full text-sm font-medium border border-gold/20 mb-8">
                <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                {t('hero_badge')}
              </div>

              <h1 className="hero-anim-2 text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight" style={{ fontFamily }}>
                {t('hero_title_1')}
                <span className="block text-gold mt-2">{t('hero_title_2')}</span>
              </h1>

              <p className="hero-anim-3 mt-7 text-white/60 text-lg md:text-xl max-w-2xl leading-relaxed">
                {t('hero_desc')}
              </p>
            </div>

            {/* Search bar */}
            <div className="hero-anim-4 mt-12 glass rounded-2xl p-5 md:p-6 max-w-4xl">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <div className="relative">
                  <select value={searchType} onChange={(e) => setSearchType(e.target.value)} className="input-field appearance-none cursor-pointer">
                    <option value="">{t('hero_type')}</option>
                    {PROPERTY_TYPES.map(tp => <option key={tp.value} value={tp.value}>{getLabel(tp, lang)}</option>)}
                  </select>
                  <HiOutlineChevronDown className="absolute top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" style={{ [lang === 'ar' ? 'left' : 'right']: '12px' }} size={16} />
                </div>
                <div className="relative">
                  <select value={searchVille} onChange={(e) => setSearchVille(e.target.value)} className="input-field appearance-none cursor-pointer">
                    <option value="">{t('hero_city')}</option>
                    {VILLES.map(v => <option key={v} value={v}>{v}</option>)}
                  </select>
                  <HiOutlineChevronDown className="absolute top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" style={{ [lang === 'ar' ? 'left' : 'right']: '12px' }} size={16} />
                </div>
                <div className="relative">
                  <select className="input-field appearance-none cursor-pointer">
                    <option value="">{t('hero_transaction')}</option>
                    <option value="vente">{t('hero_vente')}</option>
                    <option value="location">{t('hero_location')}</option>
                  </select>
                  <HiOutlineChevronDown className="absolute top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" style={{ [lang === 'ar' ? 'left' : 'right']: '12px' }} size={16} />
                </div>
                <Link href={`/properties?type=${searchType}&ville=${searchVille}`} className="btn-primary flex items-center justify-center gap-2 !shadow-lg !shadow-primary/30">
                  <HiOutlineSearch size={18} />
                  {t('hero_search')}
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom wave */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
              <path d="M0 80L60 73.3C120 66.7 240 53.3 360 48C480 42.7 600 45.3 720 53.3C840 61.3 960 74.7 1080 77.3C1200 80 1320 72 1380 68L1440 64V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0Z" fill="white"/>
            </svg>
          </div>
        </section>

        {/* =========== STATS =========== */}
        <section className="bg-white relative -mt-1">
          <div className="max-w-7xl mx-auto section-padding py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: '500+', label: t('stat_properties') },
                { value: '1200+', label: t('stat_users') },
                { value: '7', label: t('stat_cities') },
                { value: '98%', label: t('stat_satisfaction') },
              ].map((stat, i) => (
                  <div key={i} className={`text-center animate-count stagger-${i + 1}`}>
                    <p className="text-3xl md:text-4xl font-bold text-primary" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                      {stat.value}
                    </p>
                    <p className="text-gray-500 text-sm mt-2">{stat.label}</p>
                  </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========== FEATURED =========== */}
        {featured.length > 0 && (
            <section className="max-w-7xl mx-auto section-padding py-20">
              <div className="scroll-fade-up flex items-end justify-between mb-10">
                <div>
                  <span className="text-primary text-sm font-semibold uppercase tracking-wider">{t('featured_subtitle')}</span>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2" style={{ fontFamily }}>
                    {t('featured_title')}
                  </h2>
                </div>
                <Link href="/properties" className="hidden sm:flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all duration-300 group">
                  {t('view_all')}
                  <HiOutlineArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                {featured.slice(0, 6).map((p) => (
                    <PropertyCard key={p.id} property={p} />
                ))}
              </div>
              <div className="sm:hidden mt-8 text-center scroll-fade-up">
                <Link href="/properties" className="btn-primary inline-flex items-center gap-2">
                  {t('view_all')} <HiOutlineArrowRight />
                </Link>
              </div>
            </section>
        )}

        {/* =========== RECENT =========== */}
        <section className="bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto section-padding py-20">
            <div className="scroll-fade-up flex items-end justify-between mb-10">
              <div>
                <span className="text-primary text-sm font-semibold uppercase tracking-wider">{t('recent_subtitle')}</span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2" style={{ fontFamily }}>
                  {t('recent_title')}
                </h2>
              </div>
              <Link href="/properties" className="hidden sm:flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all duration-300 group">
                {t('view_all')}
                <HiOutlineArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            {loading ? (
                <div className="text-center py-16">
                  <div className="w-10 h-10 border-3 border-primary/20 border-t-primary rounded-full animate-spin mx-auto" />
                  <p className="text-gray-400 mt-4">{t('loading')}</p>
                </div>
            ) : recent.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                  {recent.map((p) => (
                      <PropertyCard key={p.id} property={p} />
                  ))}
                </div>
            ) : (
                <div className="text-center py-16 text-gray-400">{t('no_listings')}</div>
            )}
          </div>
        </section>

        {/* =========== FEATURES =========== */}
        <section className="max-w-7xl mx-auto section-padding py-24">
          <div className="text-center mb-16 scroll-fade-up">
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">{t('features_subtitle')}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3" style={{ fontFamily }}>
              {t('features_title')}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
            {[
              { icon: HiOutlineShieldCheck, title: t('feat_verified_title'), desc: t('feat_verified_desc'), gradient: 'from-primary/10 to-primary/5' },
              { icon: HiOutlineCurrencyDollar, title: t('feat_price_title'), desc: t('feat_price_desc'), gradient: 'from-gold/15 to-gold/5' },
              { icon: HiOutlineUserGroup, title: t('feat_network_title'), desc: t('feat_network_desc'), gradient: 'from-primary/10 to-primary/5' },
              { icon: HiOutlineLockClosed, title: t('feat_secure_title'), desc: t('feat_secure_desc'), gradient: 'from-gold/15 to-gold/5' },
            ].map((feat, i) => (
                <div key={i} className={`scroll-zoom-in stagger-${i + 1} group p-7 rounded-2xl border border-border hover:border-primary/20 bg-white hover:shadow-xl transition-all duration-500 hover:-translate-y-1`}>
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feat.gradient} flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                    <feat.icon size={26} className="text-primary" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-[17px] mb-2.5" style={{ fontFamily }}>
                    {feat.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{feat.desc}</p>
                </div>
            ))}
          </div>
        </section>

        {/* =========== CTA =========== */}
        <section className="relative overflow-hidden">
          <div className="bg-gradient-to-r from-primary via-[#004D27] to-primary-dark">
            <div className="absolute inset-0 hero-pattern" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl -translate-y-1/2 animate-pulse-glow" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full blur-3xl translate-y-1/2 animate-float-slow" />

            <div className="max-w-7xl mx-auto section-padding py-20 relative text-center">
              <div className="scroll-fade-up">
                <h2 className="text-3xl md:text-4xl font-bold text-white" style={{ fontFamily }}>
                  {t('cta_title')}
                </h2>
                <p className="text-white/60 mt-4 max-w-lg mx-auto text-lg">
                  {t('cta_desc')}
                </p>
              </div>
              <div className="scroll-fade-up stagger-2 mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/properties" className="btn-gold !shadow-lg !shadow-gold/30">
                  {t('cta_explore')}
                </Link>
                <Link href="/contact" className="btn-outline-white">
                  {t('cta_contact')}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
  );
}
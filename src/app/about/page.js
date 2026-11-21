'use client';
import { HiOutlineShieldCheck, HiOutlineGlobe, HiOutlineLightningBolt, HiOutlineUserGroup } from 'react-icons/hi';
import { useI18n } from '@/lib/i18n';
import useScrollAnimation from '@/hooks/useScrollAnimation';

export default function AboutPage() {
  const { t, lang } = useI18n();
  const fontFamily = lang === 'ar' ? 'IBM Plex Sans Arabic, sans-serif' : 'Space Grotesk, sans-serif';

  useScrollAnimation();

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#003D1A] via-primary to-[#004D27] text-white pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0 hero-pattern" />
        <div className="absolute top-20 right-20 w-64 h-64 bg-gold/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-white/5 rounded-full blur-2xl animate-float-slow" />
        <div className="absolute top-1/2 right-1/4 w-40 h-40 border border-white/5 rounded-full animate-rotate-slow hidden lg:block" />
        <div className="max-w-7xl mx-auto section-padding text-center relative">
          <span className="hero-anim-1 inline-block text-gold text-sm font-semibold uppercase tracking-wider">{lang === 'ar' ? 'من نحن' : 'A propos'}</span>
          <h1 className="hero-anim-2 text-4xl md:text-5xl font-bold mt-4" style={{ fontFamily }}>
            {t('about_title')}
          </h1>
          <p className="hero-anim-3 text-white/60 text-lg mt-5 max-w-2xl mx-auto leading-relaxed">
            {t('about_desc')}
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="max-w-7xl mx-auto section-padding py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="scroll-fade-left">
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">
              {lang === 'ar' ? 'رؤيتنا' : 'Notre vision'}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3 mb-8" style={{ fontFamily }}>
              {t('mission_title')}
            </h2>
            <p className="text-gray-600 leading-relaxed mb-5 text-[15px]">
              {t('mission_p1')}
            </p>
            <p className="text-gray-600 leading-relaxed text-[15px]">
              {t('mission_p2')}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-5">
            {[
              { icon: HiOutlineShieldCheck, title: t('value_trust'), desc: t('value_trust_desc'), gradient: 'from-primary/10 to-primary/5' },
              { icon: HiOutlineGlobe, title: t('value_access'), desc: t('value_access_desc'), gradient: 'from-gold/15 to-gold/5' },
              { icon: HiOutlineLightningBolt, title: t('value_innovation'), desc: t('value_innovation_desc'), gradient: 'from-gold/15 to-gold/5' },
              { icon: HiOutlineUserGroup, title: t('value_community'), desc: t('value_community_desc'), gradient: 'from-primary/10 to-primary/5' },
            ].map((item, i) => (
              <div key={i} className={`scroll-zoom-in stagger-${i + 1} group p-6 rounded-2xl border border-border hover:border-primary/20 bg-white hover:shadow-xl transition-all duration-500 hover:-translate-y-1`}>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                  <item.icon size={24} className="text-primary" />
                </div>
                <h3 className="font-bold text-sm text-gray-900" style={{ fontFamily }}>{item.title}</h3>
                <p className="text-gray-500 text-xs mt-1.5 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="max-w-3xl mx-auto section-padding text-center scroll-fade-up">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900" style={{ fontFamily }}>
            {t('join_title')}
          </h2>
          <p className="text-gray-500 mt-4 text-lg leading-relaxed">
            {t('join_desc')}
          </p>
        </div>
      </section>
    </div>
  );
}

'use client';
import { useState } from 'react';
import { HiOutlinePhone, HiOutlineMail, HiOutlineLocationMarker } from 'react-icons/hi';
import toast from 'react-hot-toast';
import { useI18n } from '@/lib/i18n';
import useScrollAnimation from '@/hooks/useScrollAnimation';

export default function ContactPage() {
  const { t, lang } = useI18n();
  const fontFamily = lang === 'ar' ? 'IBM Plex Sans Arabic, sans-serif' : 'Space Grotesk, sans-serif';
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [sending, setSending] = useState(false);

  useScrollAnimation();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      toast.success(t('message_sent'));
      setForm({ name: '', phone: '', email: '', message: '' });
      setSending(false);
    }, 1200);
  };

  const contactInfo = [
    { icon: HiOutlinePhone, label: t('phone'), value: '+222 41 91 47 72', href: 'tel:+22241914772' },
    { icon: HiOutlineMail, label: t('email'), value: 'contact@foncier.mr', href: 'mailto:contact@foncier.mr' },
    { icon: HiOutlineLocationMarker, label: t('address_label'), value: 'Nouakchott, Mauritanie', href: null },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#003D1A] via-primary to-[#004D27] text-white pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0 hero-pattern" />
        <div className="absolute bottom-10 left-20 w-72 h-72 bg-gold/10 rounded-full blur-3xl animate-float" />
        <div className="absolute top-20 right-10 w-48 h-48 bg-white/5 rounded-full blur-2xl animate-float-slow" />
        <div className="max-w-7xl mx-auto section-padding text-center relative">
          <span className="hero-anim-1 inline-block text-gold text-sm font-semibold uppercase tracking-wider">{lang === 'ar' ? 'تواصل معنا' : 'Contact'}</span>
          <h1 className="hero-anim-2 text-4xl md:text-5xl font-bold mt-4" style={{ fontFamily }}>
            {t('contact_title')}
          </h1>
          <p className="hero-anim-3 text-white/60 text-lg mt-5 max-w-2xl mx-auto leading-relaxed">
            {t('contact_desc')}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto section-padding py-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact info */}
          <div className="lg:col-span-2 space-y-8">
            {contactInfo.map((item, i) => (
              <div key={i} className={`scroll-fade-left stagger-${i + 1} group flex items-start gap-4`}>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                  <item.icon size={22} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} className="font-semibold text-gray-900 hover:text-primary transition-colors">
                      {item.value}
                    </a>
                  ) : (
                    <p className="font-semibold text-gray-900">{item.value}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Map placeholder */}
            <div className="scroll-fade-up stagger-4 rounded-2xl overflow-hidden border border-border h-48 bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center mt-8">
              <div className="text-center">
                <HiOutlineLocationMarker size={32} className="text-primary/30 mx-auto mb-2" />
                <p className="text-sm text-primary/50 font-medium">Nouakchott, Mauritanie</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3 scroll-fade-right">
            <form onSubmit={handleSubmit} className="card-static p-8 rounded-2xl space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('full_name')}</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
                    placeholder={t('your_name')}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('phone')}</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm(f => ({ ...f, phone: e.target.value }))}
                    placeholder={t('your_phone')}
                    className="input-field"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('email')}</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
                  placeholder={t('your_email')}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('message')}</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm(f => ({ ...f, message: e.target.value }))}
                  placeholder={t('message_placeholder')}
                  className="input-field resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={sending}
                className="btn-primary w-full !py-3.5 !text-base disabled:opacity-60"
              >
                {sending ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {t('send_message')}
                  </span>
                ) : t('send_message')}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

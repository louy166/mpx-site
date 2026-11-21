'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  HiOutlineLocationMarker, HiOutlinePhone, HiOutlineArrowLeft,
  HiOutlineHome, HiOutlineCalendar, HiOutlineChevronLeft, HiOutlineChevronRight,
} from 'react-icons/hi';
import api from '@/lib/api';
import { formatPrice, getTypeLabel, getTransactionLabel, formatDate } from '@/lib/constants';
import { useI18n } from '@/lib/i18n';

export default function PropertyDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { t, lang } = useI18n();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activePhoto, setActivePhoto] = useState(0);

  useEffect(() => {
    async function load() {
      try {
        const data = await api.getProperty(id);
        setProperty(data);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    }
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="pt-24 max-w-7xl mx-auto section-padding py-24 text-center">
        <div className="w-10 h-10 border-3 border-primary/20 border-t-primary rounded-full animate-spin mx-auto" />
        <p className="text-gray-400 mt-4">{t('loading')}</p>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="pt-24 max-w-7xl mx-auto section-padding py-24 text-center">
        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
          <HiOutlineHome size={36} className="text-gray-300" />
        </div>
        <p className="text-gray-500 text-lg font-medium">{t('not_found')}</p>
        <button onClick={() => router.back()} className="btn-primary mt-6">{t('back')}</button>
      </div>
    );
  }

  const photos = (property.photos || []).map(p => api.resolveFileUrl(p.url)).filter(Boolean);

  const prevPhoto = () => setActivePhoto(i => (i > 0 ? i - 1 : photos.length - 1));
  const nextPhoto = () => setActivePhoto(i => (i < photos.length - 1 ? i + 1 : 0));

  return (
    <div className="pt-20 pb-12">
      <div className="max-w-7xl mx-auto section-padding py-6">
        <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-500 hover:text-primary mb-6 transition-colors group">
          {lang === 'ar' ? <HiOutlineChevronRight size={18} className="group-hover:translate-x-1 transition-transform" /> : <HiOutlineArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />}
          {t('back_to_listings')}
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Photo gallery */}
            <div className="rounded-2xl overflow-hidden border border-border shadow-sm">
              <div className="relative h-72 md:h-[450px] bg-gray-100">
                {photos.length > 0 ? (
                  <>
                    <img
                      src={photos[activePhoto]}
                      alt={property.titre}
                      className="w-full h-full object-cover transition-opacity duration-300"
                    />
                    {photos.length > 1 && (
                      <>
                        <button onClick={prevPhoto} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm text-white flex items-center justify-center transition-all">
                          <HiOutlineChevronLeft size={20} />
                        </button>
                        <button onClick={nextPhoto} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm text-white flex items-center justify-center transition-all">
                          <HiOutlineChevronRight size={20} />
                        </button>
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                          {photos.map((_, i) => (
                            <button
                              key={i}
                              onClick={() => setActivePhoto(i)}
                              className={`w-2 h-2 rounded-full transition-all ${i === activePhoto ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/70'}`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100">
                    <HiOutlineHome size={72} className="text-primary/15" />
                  </div>
                )}
              </div>
              {photos.length > 1 && (
                <div className="flex gap-2 p-3 overflow-x-auto bg-white">
                  {photos.map((url, i) => (
                    <button
                      key={i}
                      onClick={() => setActivePhoto(i)}
                      className={`w-18 h-14 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                        i === activePhoto ? 'border-primary ring-2 ring-primary/20' : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={url} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="card-static p-7 rounded-2xl">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold ${
                      property.transaction === 'vente' ? 'bg-primary text-white' : 'bg-gold text-primary-dark'
                    }`}>
                      {getTransactionLabel(property.transaction, lang)}
                    </span>
                    <span className="px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-100 text-gray-600">
                      {getTypeLabel(property.type, lang)}
                    </span>
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900" style={{ fontFamily: lang === 'ar' ? 'IBM Plex Sans Arabic, sans-serif' : 'Space Grotesk, sans-serif' }}>
                    {property.titre}
                  </h1>
                  <div className="flex items-center gap-1.5 mt-2.5 text-gray-500">
                    <HiOutlineLocationMarker size={17} className="text-primary/60" />
                    {[property.quartier, property.ville].filter(Boolean).join(', ')}
                  </div>
                </div>
                <p className="text-3xl font-bold text-primary" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  {formatPrice(property.prix)}
                </p>
              </div>

              {/* Specs */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 p-5 bg-gradient-to-r from-primary-50/50 to-primary-50/30 rounded-xl">
                {property.surface_m2 && (
                  <div className="text-center py-2">
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{t('surface')}</p>
                    <p className="font-bold text-gray-900 text-lg">{property.surface_m2} m²</p>
                  </div>
                )}
                {property.nombre_pieces && (
                  <div className="text-center py-2">
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{t('rooms')}</p>
                    <p className="font-bold text-gray-900 text-lg">{property.nombre_pieces}</p>
                  </div>
                )}
                {property.nombre_chambres && (
                  <div className="text-center py-2">
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{t('bedrooms')}</p>
                    <p className="font-bold text-gray-900 text-lg">{property.nombre_chambres}</p>
                  </div>
                )}
                {property.nombre_salles_bain && (
                  <div className="text-center py-2">
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{t('bathrooms')}</p>
                    <p className="font-bold text-gray-900 text-lg">{property.nombre_salles_bain}</p>
                  </div>
                )}
              </div>

              {property.description && (
                <div className="mt-8">
                  <h3 className="font-bold text-lg text-gray-900 mb-3" style={{ fontFamily: lang === 'ar' ? 'IBM Plex Sans Arabic, sans-serif' : 'Space Grotesk, sans-serif' }}>
                    {t('description')}
                  </h3>
                  <p className="text-gray-600 leading-relaxed whitespace-pre-line">{property.description}</p>
                </div>
              )}
            </div>
          </div>

          {/* Right sidebar */}
          <div className="space-y-6">
            {/* Contact card */}
            <div className="card-static p-7 rounded-2xl sticky top-24">
              <h3 className="font-bold text-lg text-gray-900 mb-5" style={{ fontFamily: lang === 'ar' ? 'IBM Plex Sans Arabic, sans-serif' : 'Space Grotesk, sans-serif' }}>
                {t('contact_seller')}
              </h3>
              {property.proprietaire ? (
                <div className="space-y-5">
                  <div className="flex items-center gap-3.5">
                    <div className="w-13 h-13 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center">
                      <span className="font-bold text-white text-sm" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                        {(property.proprietaire.prenom?.[0] || '') + (property.proprietaire.nom?.[0] || '')}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {property.proprietaire.prenom} {property.proprietaire.nom}
                      </p>
                      <p className="text-sm text-gray-500">{t('owner')}</p>
                    </div>
                  </div>
                  {property.proprietaire.telephone && (
                    <a
                      href={`tel:${property.proprietaire.telephone}`}
                      className="btn-primary w-full flex items-center justify-center gap-2 !shadow-lg !shadow-primary/20"
                    >
                      <HiOutlinePhone size={18} />
                      {t('call')}
                    </a>
                  )}
                </div>
              ) : (
                <p className="text-gray-400 text-sm">{t('contact_us_info')}</p>
              )}
            </div>

            {/* Info card */}
            <div className="card-static p-7 rounded-2xl">
              <h3 className="font-bold text-gray-900 mb-4" style={{ fontFamily: lang === 'ar' ? 'IBM Plex Sans Arabic, sans-serif' : 'Space Grotesk, sans-serif' }}>
                {t('info')}
              </h3>
              <ul className="space-y-4 text-sm">
                <li className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-500">{t('reference')}</span>
                  <span className="font-mono font-medium text-gray-900 bg-gray-50 px-2.5 py-1 rounded-md text-xs">#{property.id?.slice(0, 8)}</span>
                </li>
                <li className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-500">{t('published_on')}</span>
                  <span className="font-medium text-gray-900">{formatDate(property.date_creation)}</span>
                </li>
                {property.adresse && (
                  <li className="flex justify-between items-center py-2">
                    <span className="text-gray-500">{t('address')}</span>
                    <span className="font-medium text-gray-900 text-right max-w-[60%]">{property.adresse}</span>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

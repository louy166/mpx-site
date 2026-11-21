'use client';
import Link from 'next/link';
import { HiOutlineLocationMarker, HiOutlineHome } from 'react-icons/hi';
import { formatPrice, getTypeLabel, getTransactionLabel } from '@/lib/constants';
import { useI18n } from '@/lib/i18n';
import api from '@/lib/api';

export default function PropertyCard({ property }) {
  const { t, lang } = useI18n();
  const photoUrl = property.photos?.[0]?.url
    ? api.resolveFileUrl(property.photos[0].url)
    : null;

  return (
    <Link href={`/properties/${property.id}`} className="group block">
      <div className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1.5">
        {/* Image */}
        <div className="relative h-52 bg-gray-100 overflow-hidden">
          {photoUrl ? (
            <img
              src={photoUrl}
              alt={property.titre || ''}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100">
              <HiOutlineHome size={48} className="text-primary/20" />
            </div>
          )}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Transaction badge */}
          <span className={`absolute top-3 ${lang === 'ar' ? 'right-3' : 'left-3'} px-3.5 py-1.5 rounded-lg text-xs font-semibold backdrop-blur-sm ${
            property.transaction === 'vente'
              ? 'bg-primary/90 text-white'
              : 'bg-gold/90 text-primary-dark'
          }`}>
            {getTransactionLabel(property.transaction, lang)}
          </span>

          {/* Price overlay on hover */}
          <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
            <span className="font-bold text-white text-lg drop-shadow-lg" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              {formatPrice(property.prix)}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <p className="text-primary font-bold text-lg group-hover:text-primary-light transition-colors" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            {formatPrice(property.prix)}
          </p>
          <h3 className="font-semibold text-gray-900 mt-1.5 line-clamp-1 text-[15px]">
            {property.titre || (lang === 'ar' ? 'بدون عنوان' : 'Sans titre')}
          </h3>
          <div className="flex items-center gap-1.5 mt-2.5 text-gray-500 text-sm">
            <HiOutlineLocationMarker size={15} className="text-primary/60 flex-shrink-0" />
            <span className="line-clamp-1">
              {[property.quartier, property.ville].filter(Boolean).join(', ') || (lang === 'ar' ? 'موريتانيا' : 'Mauritanie')}
            </span>
          </div>

          {/* Meta */}
          <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-100 text-sm text-gray-500">
            <span className="px-2.5 py-1 rounded-md bg-gray-50 text-xs font-medium">
              {getTypeLabel(property.type, lang)}
            </span>
            {property.surface_m2 && (
              <span className="text-xs">{property.surface_m2} m&sup2;</span>
            )}
            {property.nombre_chambres && (
              <span className="text-xs">{property.nombre_chambres} {t('rooms_short')}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

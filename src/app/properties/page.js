'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { HiOutlineSearch, HiOutlineAdjustments, HiOutlineChevronDown } from 'react-icons/hi';
import PropertyCard from '@/components/PropertyCard';
import api from '@/lib/api';
import { PROPERTY_TYPES, TRANSACTION_TYPES, VILLES, getLabel } from '@/lib/constants';
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

function PropertiesContent() {
  const { t, lang } = useI18n();
  const searchParams = useSearchParams();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  useScrollAnimation();

  const [filters, setFilters] = useState({
    type: searchParams.get('type') || '',
    transaction: searchParams.get('transaction') || '',
    ville: searchParams.get('ville') || '',
    prixMin: '',
    prixMax: '',
    q: '',
  });

  const loadProperties = async (p = 0) => {
    setLoading(true);
    try {
      const params = { page: p, size: 12, statut: 'publie' };
      if (filters.type) params.type = filters.type;
      if (filters.transaction) params.transaction = filters.transaction;
      if (filters.ville) params.ville = filters.ville;
      if (filters.prixMin) params.prix_min = filters.prixMin;
      if (filters.prixMax) params.prix_max = filters.prixMax;
      if (filters.q) params.q = filters.q;
      const res = await api.getProperties(params);
      const normalized = normalizePage(res);
      setProperties(normalized.content);
      setTotalPages(normalized.totalPages);
      setTotalElements(normalized.totalElements);
      setPage(p);
    } catch (err) {
      console.error('Error loading properties:', err);
    }
    setLoading(false);
  };

  useEffect(() => { loadProperties(); }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    loadProperties(0);
  };

  return (
      <div className="pt-24 pb-12">
        {/* Header */}
        <div className="max-w-7xl mx-auto section-padding mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900" style={{ fontFamily: lang === 'ar' ? 'IBM Plex Sans Arabic, sans-serif' : 'Space Grotesk, sans-serif' }}>
            {t('properties_title')}
          </h1>
          <p className="text-gray-500 mt-2">
            {totalElements > 0 ? t('properties_found', { count: totalElements }) : t('properties_explore')}
          </p>
        </div>

        {/* Search & Filters */}
        <div className="max-w-7xl mx-auto section-padding mb-10">
          <form onSubmit={handleSearch} className="card-static p-5 rounded-2xl">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <HiOutlineSearch className={`absolute top-1/2 -translate-y-1/2 text-gray-400 ${lang === 'ar' ? 'right-4' : 'left-4'}`} size={18} />
                <input
                    type="text"
                    placeholder={t('search_placeholder')}
                    value={filters.q}
                    onChange={(e) => setFilters(f => ({ ...f, q: e.target.value }))}
                    className={`input-field ${lang === 'ar' ? '!pr-11' : '!pl-11'}`}
                />
              </div>
              <button
                  type="button"
                  onClick={() => setShowFilters(!showFilters)}
                  className={`px-4 py-2 rounded-xl border border-border hover:bg-gray-50 flex items-center gap-2 transition-all duration-200 ${
                      showFilters ? 'bg-primary-50 border-primary text-primary' : 'text-gray-600'
                  }`}
              >
                <HiOutlineAdjustments size={18} />
                <span className="hidden sm:inline">{t('filters')}</span>
              </button>
              <button type="submit" className="btn-primary !py-2.5">
                {t('search')}
              </button>
            </div>

            {/* Expanded filters */}
            <div className={`overflow-hidden transition-all duration-300 ${showFilters ? 'max-h-40 mt-4 pt-4 border-t border-gray-100' : 'max-h-0'}`}>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                <div className="relative">
                  <select value={filters.type} onChange={(e) => setFilters(f => ({ ...f, type: e.target.value }))} className="input-field text-sm appearance-none">
                    <option value="">{t('all_types')}</option>
                    {PROPERTY_TYPES.map(tp => <option key={tp.value} value={tp.value}>{getLabel(tp, lang)}</option>)}
                  </select>
                  <HiOutlineChevronDown className="absolute top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" style={{ [lang === 'ar' ? 'left' : 'right']: '12px' }} size={14} />
                </div>
                <div className="relative">
                  <select value={filters.transaction} onChange={(e) => setFilters(f => ({ ...f, transaction: e.target.value }))} className="input-field text-sm appearance-none">
                    <option value="">{t('all_transactions')}</option>
                    {TRANSACTION_TYPES.map(tp => <option key={tp.value} value={tp.value}>{getLabel(tp, lang)}</option>)}
                  </select>
                  <HiOutlineChevronDown className="absolute top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" style={{ [lang === 'ar' ? 'left' : 'right']: '12px' }} size={14} />
                </div>
                <div className="relative">
                  <select value={filters.ville} onChange={(e) => setFilters(f => ({ ...f, ville: e.target.value }))} className="input-field text-sm appearance-none">
                    <option value="">{t('all_cities')}</option>
                    {VILLES.map(v => <option key={v} value={v}>{v}</option>)}
                  </select>
                  <HiOutlineChevronDown className="absolute top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" style={{ [lang === 'ar' ? 'left' : 'right']: '12px' }} size={14} />
                </div>
                <input type="number" placeholder={t('price_min')} value={filters.prixMin} onChange={(e) => setFilters(f => ({ ...f, prixMin: e.target.value }))} className="input-field text-sm" />
                <input type="number" placeholder={t('price_max')} value={filters.prixMax} onChange={(e) => setFilters(f => ({ ...f, prixMax: e.target.value }))} className="input-field text-sm" />
              </div>
            </div>
          </form>
        </div>

        {/* Results */}
        <div className="max-w-7xl mx-auto section-padding">
          {loading ? (
              <div className="text-center py-24">
                <div className="w-10 h-10 border-3 border-primary/20 border-t-primary rounded-full animate-spin mx-auto" />
                <p className="text-gray-400 mt-4">{t('loading')}</p>
              </div>
          ) : properties.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                  {properties.map((p) => (
                      <PropertyCard key={p.id} property={p} />
                  ))}
                </div>

                {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-3 mt-12">
                      <button
                          onClick={() => loadProperties(page - 1)}
                          disabled={page === 0}
                          className="px-5 py-2.5 rounded-xl border border-border text-sm font-medium disabled:opacity-30 hover:bg-gray-50 transition-all"
                      >
                        {t('previous')}
                      </button>
                      <span className="text-sm text-gray-500 px-4 font-medium">
                  {t('page_of', { page: page + 1, total: totalPages })}
                </span>
                      <button
                          onClick={() => loadProperties(page + 1)}
                          disabled={page >= totalPages - 1}
                          className="px-5 py-2.5 rounded-xl border border-border text-sm font-medium disabled:opacity-30 hover:bg-gray-50 transition-all"
                      >
                        {t('next')}
                      </button>
                    </div>
                )}
              </>
          ) : (
              <div className="text-center py-24">
                <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                  <HiOutlineSearch size={36} className="text-gray-300" />
                </div>
                <p className="text-gray-500 text-lg font-medium">{t('no_results')}</p>
                <p className="text-gray-400 text-sm mt-2">{t('no_results_hint')}</p>
              </div>
          )}
        </div>
      </div>
  );
}

export default function PropertiesPage() {
  return (
      <Suspense fallback={
        <div className="pt-24 text-center py-24">
          <div className="w-10 h-10 border-3 border-primary/20 border-t-primary rounded-full animate-spin mx-auto" />
        </div>
      }>
        <PropertiesContent />
      </Suspense>
  );
}
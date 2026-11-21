'use client';
import { createContext, useContext, useState, useCallback, useEffect } from 'react';

const translations = {
  fr: {
    // Navbar
    nav_home: 'Accueil',
    nav_properties: 'Biens',
    nav_about: 'A propos',
    nav_contact: 'Contact',
    nav_pro: 'Espace Pro',
    nav_login: 'Se connecter',

    // Hero
    hero_badge: 'Bourse Immobiliere de Mauritanie',
    hero_title_1: 'Trouvez votre bien',
    hero_title_2: 'ideal en Mauritanie',
    hero_desc: 'Achetez, vendez ou louez des biens immobiliers en toute confiance sur la premiere plateforme immobiliere du pays.',
    hero_search: 'Rechercher',
    hero_type: 'Type de bien',
    hero_city: 'Ville',
    hero_transaction: 'Transaction',
    hero_vente: 'Vente',
    hero_location: 'Location',

    // Stats
    stat_properties: 'Biens disponibles',
    stat_users: 'Utilisateurs actifs',
    stat_cities: 'Villes couvertes',
    stat_satisfaction: 'Satisfaction client',

    // Sections
    featured_title: 'Biens en vedette',
    featured_subtitle: 'Selectionnes pour vous',
    recent_title: 'Annonces recentes',
    recent_subtitle: 'Les derniers biens publies',
    view_all: 'Voir tout',
    loading: 'Chargement...',
    no_listings: 'Aucune annonce pour le moment',

    // Features
    features_title: 'Pourquoi Foncier Mauritanie ?',
    features_subtitle: 'Une plateforme concue pour le marche immobilier mauritanien',
    feat_verified_title: 'Biens verifies',
    feat_verified_desc: 'Chaque bien est verifie par notre equipe pour garantir la fiabilite des annonces.',
    feat_price_title: 'Prix transparents',
    feat_price_desc: 'Des prix clairs en MRU, sans frais caches. Comparez facilement les offres du marche.',
    feat_network_title: 'Reseau local',
    feat_network_desc: 'Un reseau d\'agents et de proprietaires a travers toute la Mauritanie.',
    feat_secure_title: 'Transactions securisees',
    feat_secure_desc: 'Des transactions encadrees et securisees pour votre tranquillite d\'esprit.',

    // CTA
    cta_title: 'Pret a trouver votre bien ?',
    cta_desc: 'Telechargez l\'application mobile ou explorez les annonces en ligne.',
    cta_explore: 'Explorer les biens',
    cta_contact: 'Nous contacter',
    cta_download: 'Telecharger l\'app',

    // Properties page
    properties_title: 'Biens immobiliers',
    properties_found: '{count} bien(s) trouve(s)',
    properties_explore: 'Explorez nos annonces',
    search_placeholder: 'Rechercher un bien...',
    filters: 'Filtres',
    all_types: 'Tout type',
    all_transactions: 'Toute transaction',
    all_cities: 'Toute ville',
    price_min: 'Prix min',
    price_max: 'Prix max',
    search: 'Rechercher',
    no_results: 'Aucun bien trouve',
    no_results_hint: 'Essayez d\'ajuster vos filtres',
    previous: 'Precedent',
    next: 'Suivant',
    page_of: 'Page {page} / {total}',

    // Property detail
    back_to_listings: 'Retour aux annonces',
    not_found: 'Bien non trouve',
    back: 'Retour',
    contact_seller: 'Contacter le vendeur',
    owner: 'Proprietaire',
    call: 'Appeler',
    contact_us_info: 'Contactez-nous pour plus d\'informations',
    info: 'Informations',
    reference: 'Reference',
    published_on: 'Publie le',
    address: 'Adresse',
    surface: 'Surface',
    rooms: 'Pieces',
    bedrooms: 'Chambres',
    bathrooms: 'SDB',
    description: 'Description',
    vente: 'Vente',
    location_label: 'Location',

    // About
    about_title: 'A propos de Foncier Mauritanie',
    about_desc: 'La premiere bourse immobiliere digitale en Mauritanie, creee pour moderniser et securiser les transactions immobilieres.',
    mission_title: 'Notre mission',
    mission_p1: 'Foncier Mauritanie est nee d\'un constat simple : le marche immobilier mauritanien manque de transparence et d\'outils numeriques adaptes. Notre plateforme repond a ce besoin en offrant un espace securise ou acheteurs, vendeurs et professionnels de l\'immobilier peuvent se rencontrer.',
    mission_p2: 'Nous verifions chaque bien, garantissons la transparence des prix et accompagnons nos utilisateurs a chaque etape de leur projet immobilier.',
    value_trust: 'Confiance',
    value_trust_desc: 'Biens verifies et transactions securisees',
    value_access: 'Accessibilite',
    value_access_desc: 'Disponible partout en Mauritanie',
    value_innovation: 'Innovation',
    value_innovation_desc: 'Technologie moderne au service de l\'immobilier',
    value_community: 'Communaute',
    value_community_desc: 'Un reseau de professionnels de confiance',
    join_title: 'Rejoignez-nous',
    join_desc: 'Que vous soyez particulier, proprietaire ou professionnel de l\'immobilier, Foncier Mauritanie est votre partenaire de confiance.',

    // Contact
    contact_title: 'Contactez-nous',
    contact_desc: 'Une question ? Un projet immobilier ? Notre equipe est a votre ecoute.',
    phone: 'Telephone',
    email: 'Email',
    address_label: 'Adresse',
    full_name: 'Nom complet',
    your_name: 'Votre nom',
    your_phone: '+222...',
    your_email: 'votre@email.com',
    message: 'Message',
    message_placeholder: 'Decrivez votre demande...',
    send_message: 'Envoyer le message',
    message_sent: 'Message envoye ! Nous vous repondrons bientot.',

    // Footer
    footer_desc: 'La premiere bourse immobiliere en Mauritanie. Trouvez votre bien en toute confiance.',
    footer_nav: 'Navigation',
    footer_services: 'Services',
    footer_contact: 'Contact',
    service_vente: 'Vente immobiliere',
    service_location: 'Location',
    service_estimation: 'Estimation',
    service_juridique: 'Conseil juridique',
    footer_rights: 'Tous droits reserves.',

    // Property card
    rooms_short: 'ch.',
  },
  ar: {
    // Navbar
    nav_home: 'الرئيسية',
    nav_properties: 'العقارات',
    nav_about: 'من نحن',
    nav_contact: 'اتصل بنا',
    nav_pro: 'المساحة المهنية',
    nav_login: 'تسجيل الدخول',

    // Hero
    hero_badge: 'بورصة موريتانيا العقارية',
    hero_title_1: 'ابحث عن عقارك',
    hero_title_2: 'المثالي في موريتانيا',
    hero_desc: 'اشتر، بع أو استأجر العقارات بكل ثقة على أول منصة عقارية في البلاد.',
    hero_search: 'بحث',
    hero_type: 'نوع العقار',
    hero_city: 'المدينة',
    hero_transaction: 'نوع المعاملة',
    hero_vente: 'بيع',
    hero_location: 'إيجار',

    // Stats
    stat_properties: 'عقار متاح',
    stat_users: 'مستخدم نشط',
    stat_cities: 'مدن مغطاة',
    stat_satisfaction: 'رضا العملاء',

    // Sections
    featured_title: 'عقارات مميزة',
    featured_subtitle: 'مختارة لك',
    recent_title: 'إعلانات حديثة',
    recent_subtitle: 'آخر العقارات المنشورة',
    view_all: 'عرض الكل',
    loading: 'جاري التحميل...',
    no_listings: 'لا توجد إعلانات حاليا',

    // Features
    features_title: 'لماذا فونسيي موريتانيا؟',
    features_subtitle: 'منصة مصممة لسوق العقارات الموريتاني',
    feat_verified_title: 'عقارات موثقة',
    feat_verified_desc: 'يتم التحقق من كل عقار من قبل فريقنا لضمان موثوقية الإعلانات.',
    feat_price_title: 'أسعار شفافة',
    feat_price_desc: 'أسعار واضحة بالأوقية، بدون رسوم مخفية. قارن بسهولة عروض السوق.',
    feat_network_title: 'شبكة محلية',
    feat_network_desc: 'شبكة من الوكلاء والملاك في جميع أنحاء موريتانيا.',
    feat_secure_title: 'معاملات آمنة',
    feat_secure_desc: 'معاملات منظمة وآمنة لراحة بالك.',

    // CTA
    cta_title: 'مستعد للعثور على عقارك؟',
    cta_desc: 'حمل التطبيق أو تصفح الإعلانات عبر الإنترنت.',
    cta_explore: 'استكشف العقارات',
    cta_contact: 'اتصل بنا',
    cta_download: 'تحميل التطبيق',

    // Properties page
    properties_title: 'العقارات',
    properties_found: '{count} عقار(ات) تم العثور عليها',
    properties_explore: 'تصفح إعلاناتنا',
    search_placeholder: 'ابحث عن عقار...',
    filters: 'الفلاتر',
    all_types: 'كل الأنواع',
    all_transactions: 'كل المعاملات',
    all_cities: 'كل المدن',
    price_min: 'السعر الأدنى',
    price_max: 'السعر الأقصى',
    search: 'بحث',
    no_results: 'لم يتم العثور على عقارات',
    no_results_hint: 'حاول تعديل الفلاتر',
    previous: 'السابق',
    next: 'التالي',
    page_of: 'صفحة {page} / {total}',

    // Property detail
    back_to_listings: 'العودة إلى الإعلانات',
    not_found: 'العقار غير موجود',
    back: 'عودة',
    contact_seller: 'الاتصال بالبائع',
    owner: 'المالك',
    call: 'اتصل',
    contact_us_info: 'اتصل بنا للمزيد من المعلومات',
    info: 'معلومات',
    reference: 'المرجع',
    published_on: 'تاريخ النشر',
    address: 'العنوان',
    surface: 'المساحة',
    rooms: 'الغرف',
    bedrooms: 'غرف النوم',
    bathrooms: 'الحمامات',
    description: 'الوصف',
    vente: 'بيع',
    location_label: 'إيجار',

    // About
    about_title: 'عن فونسيي موريتانيا',
    about_desc: 'أول بورصة عقارية رقمية في موريتانيا، أُنشئت لتحديث وتأمين المعاملات العقارية.',
    mission_title: 'مهمتنا',
    mission_p1: 'نشأت فونسيي موريتانيا من ملاحظة بسيطة: سوق العقارات الموريتاني يفتقر إلى الشفافية والأدوات الرقمية المناسبة. منصتنا تلبي هذه الحاجة بتوفير مساحة آمنة حيث يمكن للمشترين والبائعين والمحترفين العقاريين الالتقاء.',
    mission_p2: 'نتحقق من كل عقار، نضمن شفافية الأسعار ونرافق مستخدمينا في كل مرحلة من مشروعهم العقاري.',
    value_trust: 'الثقة',
    value_trust_desc: 'عقارات موثقة ومعاملات آمنة',
    value_access: 'سهولة الوصول',
    value_access_desc: 'متاح في جميع أنحاء موريتانيا',
    value_innovation: 'الابتكار',
    value_innovation_desc: 'تكنولوجيا حديثة في خدمة العقارات',
    value_community: 'المجتمع',
    value_community_desc: 'شبكة من المحترفين الموثوقين',
    join_title: 'انضم إلينا',
    join_desc: 'سواء كنت فردا أو مالكا أو محترفا عقاريا، فونسيي موريتانيا شريكك الموثوق.',

    // Contact
    contact_title: 'اتصل بنا',
    contact_desc: 'سؤال؟ مشروع عقاري؟ فريقنا في خدمتك.',
    phone: 'الهاتف',
    email: 'البريد الإلكتروني',
    address_label: 'العنوان',
    full_name: 'الاسم الكامل',
    your_name: 'اسمك',
    your_phone: '+222...',
    your_email: 'بريدك@email.com',
    message: 'الرسالة',
    message_placeholder: 'صف طلبك...',
    send_message: 'إرسال الرسالة',
    message_sent: 'تم إرسال الرسالة! سنرد عليك قريبا.',

    // Footer
    footer_desc: 'أول بورصة عقارية في موريتانيا. ابحث عن عقارك بكل ثقة.',
    footer_nav: 'التنقل',
    footer_services: 'الخدمات',
    footer_contact: 'اتصل بنا',
    service_vente: 'بيع العقارات',
    service_location: 'الإيجار',
    service_estimation: 'التقييم',
    service_juridique: 'الاستشارة القانونية',
    footer_rights: 'جميع الحقوق محفوظة.',

    // Property card
    rooms_short: 'غ.',
  },
};

const I18nContext = createContext();

export function I18nProvider({ children }) {
  const [lang, setLang] = useState('fr');

  useEffect(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('mpx-lang') : null;
    if (saved === 'ar' || saved === 'fr') setLang(saved);
  }, []);

  const switchLang = useCallback((newLang) => {
    setLang(newLang);
    localStorage.setItem('mpx-lang', newLang);
    document.documentElement.lang = newLang;
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
  }, []);

  const t = useCallback((key, params) => {
    let text = translations[lang]?.[key] || translations.fr[key] || key;
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        text = text.replace(`{${k}}`, v);
      });
    }
    return text;
  }, [lang]);

  return (
    <I18nContext.Provider value={{ lang, switchLang, t, dir: lang === 'ar' ? 'rtl' : 'ltr' }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}

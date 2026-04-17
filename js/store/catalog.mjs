const COUNTRY_LABELS = {
  AT: { es: 'Austria', en: 'Austria', fr: 'Autriche' },
  BE: { es: 'Belgica', en: 'Belgium', fr: 'Belgique' },
  DE: { es: 'Alemania', en: 'Germany', fr: 'Allemagne' },
  DK: { es: 'Dinamarca', en: 'Denmark', fr: 'Danemark' },
  ES: { es: 'Espana', en: 'Spain', fr: 'Espagne' },
  FR: { es: 'Francia', en: 'France', fr: 'France' },
  IE: { es: 'Irlanda', en: 'Ireland', fr: 'Irlande' },
  IT: { es: 'Italia', en: 'Italy', fr: 'Italie' },
  NL: { es: 'Paises Bajos', en: 'Netherlands', fr: 'Pays-Bas' },
  PT: { es: 'Portugal', en: 'Portugal', fr: 'Portugal' }
};

const RESTRICTION_COPY = {
  restricted_country: {
    es: 'Este producto no puede enviarse a {country} en esta fase.',
    en: 'This product cannot be shipped to {country} at this stage.',
    fr: 'Ce produit ne peut pas etre expédie vers {country} a ce stade.'
  }
};

export function getLocale(catalog, locale) {
  const requested = (locale ?? '').toLowerCase();
  const supported = catalog?.store?.supportedLocales ?? ['es'];
  return supported.includes(requested) ? requested : catalog?.store?.defaultLocale ?? 'es';
}

export function getCategoryBySlug(catalog, slug) {
  return catalog.categories.find((category) => category.slug === slug) ?? null;
}

export function getCategoryById(catalog, categoryId) {
  return catalog.categories.find((category) => category.id === categoryId) ?? null;
}

export function getProductBySlug(catalog, slug) {
  return catalog.products.find((product) => product.slug === slug) ?? null;
}

export function getProductById(catalog, id) {
  return catalog.products.find((product) => product.id === id) ?? null;
}

export function getLocalizedCategory(category, locale) {
  if (!category) {
    return null;
  }

  const safeLocale = category.label?.[locale] ? locale : 'es';

  return {
    ...category,
    locale: safeLocale,
    label: category.label[safeLocale],
    description: category.description?.[safeLocale] ?? ''
  };
}

export function getLocalizedProduct(product, locale) {
  if (!product) {
    return null;
  }

  const safeLocale = product.content?.[locale] ? locale : 'es';
  const translated = product.content[safeLocale];

  return {
    ...product,
    locale: safeLocale,
    name: translated.name,
    shortDescription: translated.shortDescription,
    description: translated.description
  };
}

export function getLocalizedProducts(catalog, locale) {
  return catalog.products.map((product) => getLocalizedProduct(product, locale));
}

export function getProductsByCategory(catalog, categoryId, locale) {
  return catalog.products
    .filter((product) => product.category === categoryId)
    .map((product) => getLocalizedProduct(product, locale));
}

export function getFeaturedProducts(catalog, locale, limit = 8) {
  return catalog.products
    .filter((product) => product.featured)
    .slice(0, limit)
    .map((product) => getLocalizedProduct(product, locale));
}

export function searchProducts(catalog, locale, searchTerm = '', categoryId = 'all') {
  const safeSearch = searchTerm.trim().toLowerCase();

  return catalog.products
    .filter((product) => (categoryId === 'all' ? true : product.category === categoryId))
    .map((product) => getLocalizedProduct(product, locale))
    .filter((product) => {
      if (!safeSearch) {
        return true;
      }

      return [product.name, product.shortDescription, product.description]
        .join(' ')
        .toLowerCase()
        .includes(safeSearch);
    });
}

export function getCountryLabel(countryCode, locale = 'es') {
  const safeCode = normalizeCountryCode(countryCode);
  return COUNTRY_LABELS[safeCode]?.[locale] ?? safeCode;
}

export function normalizeCountryCode(countryCode) {
  return String(countryCode ?? '').trim().toUpperCase();
}

export function isProductRestricted(product, countryCode) {
  const safeCode = normalizeCountryCode(countryCode);
  return (product?.restrictedCountries ?? []).includes(safeCode);
}

export function getRestrictedNotice(product, countryCode, locale = 'es') {
  if (!product || !isProductRestricted(product, countryCode)) {
    return null;
  }

  const country = getCountryLabel(countryCode, locale);
  const template = RESTRICTION_COPY.restricted_country[locale] ?? RESTRICTION_COPY.restricted_country.es;

  return {
    code: 'restricted_country',
    countryCode: normalizeCountryCode(countryCode),
    message: template.replace('{country}', country)
  };
}

export function getProductCategory(catalog, product, locale) {
  return getLocalizedCategory(getCategoryById(catalog, product.category), locale);
}

export function formatMoney(amount, currency = 'EUR', locale = 'es') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0
  }).format(amount);
}

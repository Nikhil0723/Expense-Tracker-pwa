export const isValidLocale = (locale: string): boolean => {
  try {
    new Intl.NumberFormat(locale);
    return true;
  } catch {
    return false;
  }
};

export const getValidLocale = (locale: string | undefined): string => {
  const defaultLocale = "en-US"; // Default fallback locale
  if (!locale || !isValidLocale(locale)) {
    return defaultLocale;
  }
  return locale;
};

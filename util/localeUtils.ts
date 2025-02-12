export const isValidLocale = (locale: string): boolean => {
  try {
    new Intl.NumberFormat(locale);
    return true;
  } catch {
    return false;
  }
};

export const getValidLocale = (locale?: string): string => {
  const defaultLocale = "en-US"; 
  try {
    return locale ? new Intl.NumberFormat(locale) && locale : defaultLocale;
  } catch {
    return defaultLocale;
  }
};

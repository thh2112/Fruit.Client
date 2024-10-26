import DOMPurify from 'dompurify';

export const sanitizeHTML = (rawHTML: string): string => {
  if (typeof rawHTML !== 'string' || typeof window === 'undefined') {
    return '';
  }

  return DOMPurify.sanitize(rawHTML);
};

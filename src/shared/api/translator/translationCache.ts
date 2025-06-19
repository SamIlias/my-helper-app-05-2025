const cache = new Map<string, string>();

function getCacheKey(input: string | object, lang: string): string {
  const base = typeof input === 'string' ? input : JSON.stringify(input);
  return `${lang}::${base}`;
}

export function getCachedTranslation<T>(input: string | object, lang: string): T | null {
  const key = getCacheKey(input, lang);
  const value = cache.get(key);
  if (!value) return null;

  try {
    return (typeof input === 'string' ? value : JSON.parse(value)) as T;
  } catch {
    console.warn('Failed to parse cached JSON value');
    return null;
  }
}

export function setCachedTranslation(input: string | object, lang: string, result: string) {
  const key = getCacheKey(input, lang);
  cache.set(key, result);
}

export function clearCache() {
  cache.clear();
}

export function getCacheSize(): number {
  return cache.size;
}

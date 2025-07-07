export declare function getCachedTranslation<T>(input: string | object, lang: string): T | null;
export declare function setCachedTranslation(input: string | object, lang: string, result: string): void;
export declare function clearCache(): void;
export declare function getCacheSize(): number;

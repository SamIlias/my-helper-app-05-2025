export declare const defaultLang = "en";
export declare function getTranslation(source: string, currentLanguage: string): Promise<string>;
export declare function getTranslation<T>(source: T, currentLanguage: string): Promise<T>;

export declare const signIn: (email: string, password: string) => Promise<import("@firebase/auth").UserCredential>;
export declare const signUp: (email: string, password: string) => Promise<import("@firebase/auth").UserCredential>;
export declare const signInWithGoogle: () => Promise<import("@firebase/auth").UserCredential>;
export declare const logOut: () => Promise<void>;

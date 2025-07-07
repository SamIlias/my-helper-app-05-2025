export declare const useAuth: () => {
    email: string;
    password: string;
    setEmail: import("react").Dispatch<import("react").SetStateAction<string>>;
    setPassword: import("react").Dispatch<import("react").SetStateAction<string>>;
    errorMessage: string | null;
    signInAction: () => Promise<void>;
    signUpAction: () => Promise<void>;
    signInWithGoogleAction: () => Promise<void>;
};

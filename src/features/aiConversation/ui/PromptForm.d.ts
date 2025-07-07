import * as React from 'react';
import { ChangeEventHandler, FormEventHandler } from 'react';
type Props = {
    handleSubmit: FormEventHandler<HTMLFormElement>;
    isSending: boolean;
    isSubmitDisabled: boolean;
    query: string;
    onPromptChange: ChangeEventHandler<HTMLTextAreaElement>;
};
export declare const PromptForm: React.FC<Props>;
export {};

import preloader from '@/shared/assets/preloaderGear.svg';
import * as React from 'react';
import { Preloader } from '../../../shared/ui/Preloader';
import { textColors } from '@/shared/myStyles/myStyles';
import { useTranslation } from 'react-i18next';
import { ChangeEventHandler, FormEventHandler } from 'react';

type Props = {
  handleSubmit: FormEventHandler<HTMLFormElement>;
  isSending: boolean;
  isSubmitDisabled: boolean;
  query: string;
  onPromptChange: ChangeEventHandler<HTMLTextAreaElement>;
};

export const PromptForm: React.FC<Props> = ({
  handleSubmit,
  onPromptChange,
  isSubmitDisabled,
  query,
  isSending,
}) => {
  const { t } = useTranslation();

  return (
    <form onSubmit={handleSubmit} className="grid grid-rows-[3fr_1fr] md:grid-rows-[5fr_1fr] gap-2">
      <div className="relative">
        {isSending ? (
          <div className="absolute top-0 left-0 w-full h-full bg-amber-900/10 backdrop-blur-lg flex items-center justify-center">
            <Preloader preloader={preloader} />
          </div>
        ) : (
          <textarea
            className={`${textColors.main} w-full h-full p-2 border border-stone-500 rounded resize-none focus:outline-none focus:ring-2 focus:ring-amber-400`}
            placeholder={t('aiConversation.form.textAreaPlaceholder')}
            value={query}
            onChange={onPromptChange}
          />
        )}
      </div>
      <button
        type="submit"
        disabled={isSubmitDisabled}
        className={`rounded text-md md:text-xl md:font-bold  ${
          !isSubmitDisabled
            ? 'bg-amber-500/80 text-stone-800 hover:bg-amber-700/80 transition cursor-pointer'
            : `bg-stone-900/20 text-gray-500`
        }`}
      >
        {t('aiConversation.form.buttonTitle')}
      </button>
    </form>
  );
};

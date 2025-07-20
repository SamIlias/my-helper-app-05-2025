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
    <form
      onSubmit={handleSubmit}
      className="h-full w-full flex flex-col rounded-xl bg-stone-500/60"
    >
      {isSending ? (
        <div className="flex-1 w-full bg-amber-900/10 backdrop-blur-lg">
          <Preloader preloader={preloader} />
        </div>
      ) : (
        <textarea
          className={`${textColors.placeholder} w-full flex-1 p-2 focus:outline-none focus:bg-amber-500/10 focus:ring-1 focus:ring-amber-600/60 focus:rounded-t-xl`}
          placeholder={t('aiConversation.form.textAreaPlaceholder')}
          value={query}
          onChange={onPromptChange}
        />
      )}
      <button
        type="submit"
        disabled={isSubmitDisabled}
        className={`rounded text-md md:text-xl w-full h-fit py-1 ${
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

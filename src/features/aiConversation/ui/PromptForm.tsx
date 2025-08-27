import preloader from '@/shared/assets/preloaderGear.svg';
import * as React from 'react';
import { Preloader } from '@/shared/ui';
import { promptFormStyle, textColors } from '@/shared/myStyles/myStyles';
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
      className={`h-full w-2/3 shadow-lg border border-stone-400/20 flex flex-col justify-between rounded-lg`}
    >
      {isSending ? (
        <div className="h-3/5 w-full">
          <Preloader preloader={preloader} />
        </div>
      ) : (
        <textarea
          className={`h-3/5 ${textColors.placeholder}  ${promptFormStyle.textarea} w-full flex-1 p-2 `}
          placeholder={t('aiConversation.form.textAreaPlaceholder')}
          value={query}
          onChange={onPromptChange}
        />
      )}
      <button
        type="submit"
        disabled={isSubmitDisabled}
        className={`${promptFormStyle.submitButton(isSubmitDisabled)}`}
      >
        {t('aiConversation.form.buttonTitle')}
      </button>
    </form>
  );
};

import * as React from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
  onOpenTaskForm: () => void;
  isCompletedTasksHidden: boolean;
  onClickHideShowButton: () => void;
};

export const HeaderButtons: React.FC<Props> = ({
  onOpenTaskForm,
  onClickHideShowButton,
  isCompletedTasksHidden,
}) => {
  const { t } = useTranslation('todopage');

  return (
    <div className="flex gap-1">
      <button
        onClick={onOpenTaskForm}
        className="px-2 bg-yellow-500 text-black rounded-md hover:bg-amber-700 hover:text-white transition"
      >
        {t('addTaskButtonName')}
      </button>
      <button
        aria-pressed={!isCompletedTasksHidden}
        aria-controls="tasks-list"
        onClick={onClickHideShowButton}
        title={
          isCompletedTasksHidden
            ? t('showHideButton.titleOnHoverHide')
            : t('showHideButton.titleOnHoverShow')
        }
        className="px-2  bg-stone-400 text-white rounded-md hover:bg-stone-600 dark:hover:bg-stone-300 dark:hover:text-black hover:text-amber-200 transition"
      >
        {isCompletedTasksHidden ? t('showHideButton.showName') : t('showHideButton.hideName')}
      </button>
    </div>
  );
};

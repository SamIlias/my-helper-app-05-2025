import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { buttonStyles, textColors } from '../myStyles/myStyles';

export const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const handleSelectLng = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <div className="h-full flex items-center pl-5">
      <img
        className="h-1/3 px-2 dark:filter dark:invert"
        src={'/public/assets/icons/language.png'}
        alt="Language"
      />
      <select
        value={currentLanguage}
        onChange={handleSelectLng}
        className={`${buttonStyles.selectLanguage}`}
      >
        <option className={`${textColors.secondary}`} value="en">
          English
        </option>
        <option className={`${textColors.secondary}`} value="ru">
          Русский
        </option>
      </select>
    </div>
  );
};

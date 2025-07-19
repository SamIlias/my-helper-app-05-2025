import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { textColors } from '../myStyles/myStyles';

export const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation('common');
  const currentLanguage = i18n.language;

  const handleSelectLng = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <div className="h-full flex items-center pl-5">
      <img
        className="h-1/3 px-2 filter invert"
        src={'/public/assets/icons/language.png'}
        alt="Language"
      />
      <select
        value={currentLanguage}
        onChange={handleSelectLng}
        className={`${textColors.secondary} text-sm cursor-pointer hover:text-amber-300`}
      >
        <option className="text-amber-900" value="en">
          English
        </option>
        <option className="text-amber-900" value="ru">
          Русский
        </option>
      </select>
      <div className="pointer-events-none absolute right-0 top-0 text-gray-500">▼</div>
    </div>
  );
};

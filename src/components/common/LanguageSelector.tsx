import * as React from 'react';

export const LanguageSelector: React.FC<{
  currentLang: string;
  handleSelectLng: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}> = ({ currentLang, handleSelectLng }) => {
  return (
    <div>
      <select value={currentLang} onChange={handleSelectLng} className="text-amber-900">
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

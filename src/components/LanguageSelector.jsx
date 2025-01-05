import React from 'react';
import { Languages } from 'lucide-react';
import { languages } from '../utils/languages';

export const LanguageSelector = ({
  selectedLanguage,
  onLanguageChange,
}) => {
  return (
    <div className="flex items-center gap-2">
      <Languages size={20} className="text-gray-600" />
      <select
        value={selectedLanguage.code}
        onChange={(e) => {
          const language = languages.find(lang => lang.code === e.target.value);
          if (language) onLanguageChange(language);
        }}
        className="bg-white border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {languages.map((language) => (
          <option key={language.code} value={language.code}>
            {language.name}
          </option>
        ))}
      </select>
    </div>
  );
};
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import uzTranslation from './locales/uz.json';
import ruTranslation from './locales/ru.json';
import enTranslation from './locales/en.json';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            uz: {
                translation: uzTranslation,
            },
            ru: {
                translation: ruTranslation,
            },
            en: {
                translation: enTranslation,
            },
        },
        fallbackLng: 'uz',
        debug: true,
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
    });

export default i18n;

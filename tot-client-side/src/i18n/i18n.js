import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import languageDetector from 'i18next-browser-languagedetector'

import lt from './translations/lt.json'
import en from './translations/en.json'

i18next
    .use(languageDetector) // detect language helper
    .use(initReactI18next) // add support for react (e.g. hooks)
    .init({
        resources: {  // resources to initialize with
            en,
            lt
        },
        // language codes to lookup.
        // 'all' --> ['en-US', 'en', 'dev'], 'currentOnly' --> 'en-US', 'languageOnly' --> 'en'
        load: 'all',
        ns: ['header', 'overview', 'homepage', 'footer', 'manage-matches'], // string or array of namespaces to load
        defaultNS: 'homepage',  // default namespace used
        fallbackLng: 'lt', // language to use if translations in user language are not available
        whitelist: ['lt', 'en'], // array of allowed languages
        // logs info level to console output. Helps finding issues with loading not working.
        debug: true,//process.env.NODE_ENV !== 'production',
        // interpolation config
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        }
    });

export default i18next;
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import pt from './pt.json';
import en from './en.json';
import fr from './fr.json';
import de from './de.json';

i18n.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    lng: 'pt',
    resources: {
        en:en,
        pt:pt,
        fr:fr,
        de:de
    },
    react : {
        useSuspense: false,
    },
    interpolation: {
        escapeValue: false,
    }
});

export default i18n;
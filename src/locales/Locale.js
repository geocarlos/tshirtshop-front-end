/**
 * Class to handle locales
 * It can be replaced with i18next or similar, if a more
 * advanced solution is necessary.
 */
class Locale {
    
    static locales = require(`../locales/en.json`);

    /**
     * Load strings in the specified language
     * @param {String} lang 
     */
    static loadLanguage(lang){
        Locale.locales = require(`../locales/${lang}.json`);
    }

    /**
     * Set strings to a given language
     * @param {String} key 
     */
    static translate(key){
        return Locale.locales[key];
    }
}

export default Locale;
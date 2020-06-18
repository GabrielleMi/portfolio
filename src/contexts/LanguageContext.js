import React, {useState} from 'react';
const LanguageContext = React.createContext();
const {Provider, Consumer} = LanguageContext;

const LanguageProvider = props => {
    const [lang, setLang] = useState('fr');

    const changeLang = (newLang) => {
        setLang(newLang);
    }

    return (
        <LanguageContext.Provider value={{lang, changeLang}}>
            {props.children}
        </LanguageContext.Provider>
    );
};

const LanguageConsumer = LanguageContext.Consumer;
export {LanguageProvider, LanguageConsumer}
export default LanguageContext;
import { createContext, useState } from "react";

export const TranslationContext = createContext();

function TranslationProvidor({children}) {

    const [translation, setTranslation] = useState();

    return (
        <TranslationContext.Provider value={[translation, setTranslation]}>
            {children}
        </TranslationContext.Provider>
    )
}

export default TranslationProvidor;
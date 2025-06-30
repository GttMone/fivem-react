import { createContext, useContext, useState, type ReactNode } from "react";
import { useOnNUIs } from "@/hooks/useNUI";

import type { NUIContext } from "@/types/nui";

const NUIContext = createContext<NUIContext>({} as NUIContext);

export function useNUIContext() {
    return useContext(NUIContext);
}

export function NUIProvider({ children }: { children: ReactNode }) {
    const [visible, setVisible] = useState(false);
    const [publicMenuVisible, setPublicMenuVisible] = useState(false);

    useOnNUIs({
        setVisible: (data) => setVisible(prev => typeof data === 'boolean' ? data : !prev),
        setPublicMenuVisible: (data) => setPublicMenuVisible(prev => typeof data === 'boolean' ? data : !prev),
    });

    return (
        <NUIContext.Provider value={{ visible, publicMenuVisible }}>
            { children }
        </NUIContext.Provider>
    )
}
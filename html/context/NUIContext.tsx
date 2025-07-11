import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

import type { NUIContext } from "@/types/nui";
import { useOnNUIs } from "@/hooks/useNUI";
import { nui } from "@/lib/nui";

const NUIContext = createContext<NUIContext>({} as NUIContext);

export function useNUIContext() {
    return useContext(NUIContext);
}

export function NUIProvider({ children }: { children: ReactNode }) {
    const [visible, setVisible] = useState(import.meta.env.DEV);

    useOnNUIs({
        open: ({ self }) => setVisible(true),
        close: () => setVisible(false),
    });

    useEffect(() => {
        window.addEventListener('keyup', handleKeybind);

        return () => window.removeEventListener('keypress', handleKeybind);
    }, []);

    return (
        <NUIContext.Provider value={{ visible }}>
            {children}
        </NUIContext.Provider>
    )

    function handleKeybind(ev: KeyboardEvent) {
        if (ev.key === 'Escape') {
            setVisible(false);
            nui.post('close');
        }
    }
}
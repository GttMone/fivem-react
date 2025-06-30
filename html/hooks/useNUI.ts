import { useEffect, useRef } from "react";

import type { NUIHandler, NUIHandlerMap, NUIMessage } from "@/types/nui";

export function useOnNUI(action: string, handler: NUIHandler) {
    const savedHandler = useRef<NUIHandler>(() => {});

    useEffect(() => {
        savedHandler.current = handler;
    }, [handler]);

    useEffect(() => {
        window.addEventListener('message', handleNUIMessage);

        return () => window.removeEventListener('message', handleNUIMessage);
    }, [action]);

    function handleNUIMessage(ev: MessageEvent<NUIMessage>) {
        const { action: evAction, data } = ev.data;
        if (evAction !== action) return;
        savedHandler.current(data);
    }
};

export function useOnNUIs(handlerMap: NUIHandlerMap) {
    const savedHandlers = useRef<NUIHandlerMap>({});

    useEffect(() => {
        savedHandlers.current = handlerMap;
    }, [handlerMap]);

    useEffect(() => {
        window.addEventListener('message', handleNUIMessage);

        return () => window.removeEventListener('message', handleNUIMessage);
    }, []);

    function handleNUIMessage(ev: MessageEvent<NUIMessage>) {
        const { action, data } = ev.data;
        if (!action) return;
        savedHandlers.current[action]?.(data);
    }
}
import { useEffect, useRef } from "react";
import type { NUIEvents, NUIHandler, NUIHandlerMap, NUIMessage } from "@/types/nui";

export function useOnNUI<T extends keyof NUIEvents>(action: T, handler: NUIHandler<T>) {
    const savedHandler = useRef<NUIHandler<T>>(() => { });

    useEffect(() => {
        savedHandler.current = handler;
    }, [handler]);

    useEffect(() => {
        const handleNUIMessage = (ev: MessageEvent<NUIMessage>) => {
            const { action: evAction, data } = ev.data;
            if (evAction !== action) return;
            savedHandler.current(data as NUIEvents[T]);
        };

        window.addEventListener("message", handleNUIMessage);
        return () => window.removeEventListener("message", handleNUIMessage);
    }, [action]);
}

export function useOnNUIs(handlerMap: NUIHandlerMap) {
    const savedHandlers = useRef<NUIHandlerMap>({});

    useEffect(() => {
        savedHandlers.current = handlerMap;
    }, [handlerMap]);

    useEffect(() => {
        const handleNUIMessage = (ev: MessageEvent<NUIMessage>) => {
            const { action, data } = ev.data;
            savedHandlers.current[action as keyof NUIEvents]?.(data as any);
        };

        window.addEventListener("message", handleNUIMessage);
        return () => window.removeEventListener("message", handleNUIMessage);
    }, []);
}

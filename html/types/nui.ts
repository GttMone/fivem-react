export interface NUIContext {
    visible: boolean;
};

export interface NUIMessage<T extends keyof NUIEvents = keyof NUIEvents> {
    action: T;
    data: NUIEvents[T];
}

export type NUIHandler<T extends keyof NUIEvents> = (data: NUIEvents[T]) => void;

export type NUIHandlerMap = {
    [K in keyof NUIEvents]?: (data: NUIEvents[K]) => void;
};

// Define all known NUI actions and their expected payloads
export interface NUIEvents {
    setVisible: { visible: boolean }
}
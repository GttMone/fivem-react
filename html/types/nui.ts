export interface NUIContext {
    visible: boolean;
    publicMenuVisible: boolean;
};

export interface NUIMessage {
    action: string;
    data?: any;
};

export type NUIHandler = (data?: any) => void;

export type NUIHandlerMap = Record<string, NUIHandler>;
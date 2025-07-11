import axios from 'axios';
import { toast } from 'sonner';

declare function GetParentResourceName(): string;

export const nui = axios.create({
    baseURL: import.meta.env.DEV ? 'http://localhost:3000/' : `https://${GetParentResourceName()}/`,
    method: 'POST'
});

nui.interceptors.response.use((res) => {
    const { error, message, data, ok }: { error?: boolean, message?: string, data?: any, ok?: boolean } = res.data;

    if (error === true || ok === false) {
        toast.error('Operation Failed', { description: message });
        res.data.error = true;
    } else if (!data && !ok) {
        toast.error('Operation Failed', { description: 'Invalid response structure' });
        res.data.error = true;
    } else res.data.error = false;

    delete res.data.ok;
    return res;
}, (err) => {
    toast.error('Operation Failed', { description: err?.response?.data || err?.message })
});
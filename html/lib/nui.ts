import axios from 'axios';
import { toast } from 'sonner';

declare function GetParentResourceName(): string;

export const nui = axios.create({
    baseURL: `https://${GetParentResourceName()}`,
    method: 'POST'
});

nui.interceptors.response.use((res) => {
    const { error, message }: { error: boolean, message: string } = res.data;
    if (error) toast.error('Operation Failed', { description: message });
    return res;
}, (err) => {
    toast.error('Operation Failed', { description: err?.response?.data || err?.message })
});
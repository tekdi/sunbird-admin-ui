interface Status {
    label: string;
    value: string;
}
export interface User {
    id?: string;
    firstName?: string;
    lastName?: string;
    createdDate?: string;
    managedBy?: string;
    phone?: number;
    roles?: any[];
    channel?: string;
    userName?: string;
    email?: string;
    status?: Number;
}

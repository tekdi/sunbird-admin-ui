interface Status {
    label: string;
    value: string;
}
export interface User {
    id?: string;
    firstName?: string;
    lastName?: string;
    createdDate?: any;
    managedBy?: string;
    phone?: number;
    roles?: any[];
    channel?: string;
    userName?: string;
    email?: string;
    status?: Number;
    userId:string;
    rootOrgId?:string;
    organisations:any;
}

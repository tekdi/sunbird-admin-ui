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

export const SearchFilterValue: FilteredValue = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    rootOrgName: '',
    status: ''
}

export interface FilteredValue {
    firstName?: any;
    lastName?: any;
    phone?: string;
    email?: string;
    rootOrgName?: any;
    status?: string;
}
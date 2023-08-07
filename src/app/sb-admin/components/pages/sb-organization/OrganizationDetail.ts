export interface OrganizationDetail {
    orgName: string;
    channel: string;
    isRootOrg: string
    id: string;
    userCount: number;
    subOrgCount: number;
    description: string
}

export interface UserRoles {
    name: string;
    userTypeCount: number;
}

export const SearchFilterValue: any = {
    channel: '',
    isRootOrg: true,
}

export const SearchSubOrgFilterValue: any = {
    channel: '',
    orgName: '',
}

export interface SubOrganizationDetail {
    orgName: string;
    channel: string;
    id: string;
}
export interface OrganizationDetail {
    orgName: string;
    channel: string;
    isRootOrg: string
    id: string;
    userCount: number;
    subOrgCount: number;
}

export const SearchFilterValue: any = {
    channel: '',
    isRootOrg: true,
}
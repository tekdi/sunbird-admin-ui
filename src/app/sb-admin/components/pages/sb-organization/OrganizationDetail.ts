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
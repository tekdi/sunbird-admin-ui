export interface OrganizationDetail {
    orgName: string;
    channel: string;
    isRootOrg: string
    id: string;
    userCount: number;
    subOrgCount: number;
    description: string;
    rootOrgId: string;
    userType: UserType[];
}

export interface UserType {

}
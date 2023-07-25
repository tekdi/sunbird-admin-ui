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
    userType1 : string;
    userType2 : string;
    userType3 : string;
    userType4 : string;
    userType5 : string;
    userType6 : string;
    userType7 : string;
}
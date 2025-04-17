export interface AuthAccess {
    additionalPermissions: string[];
    roles: {
        name: string;
        permissions: string[];
    }[];
    allPermissions?: string[];
}
export interface AuthorizationModel {
    functionKey: string;
    action: string[];
}

export interface RoleModel {
    roleName: string;
    authorizations: AuthorizationModel[];
}

export interface JwtPayload {
    username: string;
    password: string;
    roleAlias ?: string;
}

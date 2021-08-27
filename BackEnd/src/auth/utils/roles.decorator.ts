import { SetMetadata } from "@nestjs/common";

export const hasRoles = (...hasRoles: string[]) => {
    console.log(hasRoles);
    return SetMetadata('roles', hasRoles)
};
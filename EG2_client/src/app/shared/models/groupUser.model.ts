import { IcPermission } from "./cPermission.model";

export interface IGroupUser {
    id: string;
    name: string;
    description: string;
    permissions: IcPermission[];
    createdAt?: Date;
    updatedAt?: Date;
}
import { IcPermission } from "./cPermission.model";
import { IGroupUser } from "./groupUser.model";

export interface IUser {
    id: number;
    username: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    createdAt: Date;
    updatedAt: Date;
    firstName: string;
    lastName: string;
    avatar: any;
    theme: string;
    role: IRole;
    permissions: IcPermission[];
    user_groups: IGroupUser[];
    city: any;
    main_mail: any;
}

export interface IRole {
    id: number;
    createdAt: string;
    description: string;
    name: string;
    type: string;
    updatedAt: string;
}

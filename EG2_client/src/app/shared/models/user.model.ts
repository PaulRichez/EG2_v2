import { IcPermission } from "./cPermission.model";
import { IUserGroup } from "./user-group.model";
import { ICountry, ICity } from 'country-state-city'
export interface IUser {
    id: number;
    username: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    createdAt: Date;
    updatedAt: Date;
    userExtended: IUserExtended;
    user_groups: IUserGroup[];
}

interface IUserExtended {
    firstName: string;
    lastName: string;
    avatar: any;
    theme: string;
    country: ICountry;
    city: ICity;
}

export interface IRole {
    id: number;
    createdAt: string;
    description: string;
    name: string;
    type: string;
    updatedAt: string;
}

import { ItemType } from "./models";
import { ItemData } from "./models";

export interface User {
    id?: string;
    username?: string | null | undefined;
    email?: string;
    accessToken?: string;
    isAdmin?: boolean;
}

export interface newUserRequest {
    password: string;
    email: string;
    username: string;
}

export interface itemTypeParams {
    type: string;
}

export interface dbRequest {
    skipCount: number;
    filters: Object | null
    searchInput?: string | null
    sortBy?: Object | null
}

export interface CardData {
    keys?: string[];
    values?: string[];
    id?: string;
    name?: string;
    type?: ItemType
}

export interface creationRequest {
    data: ItemData;
    sellerId: string
}

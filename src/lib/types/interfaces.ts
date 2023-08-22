
import { ItemType } from "../maps";
import { ItemData } from "./models";

export interface User {
    id?: string;
    username?: string | null | undefined;
    email?: string;
    accessToken?: string;
    isAdmin?: boolean;
    contact?: string;
}

export interface newUserRequest {
    password: string;
    email: string;
    username: string;
}

export interface loginRequest {
    username: string,
    password: string
}

export interface itemTypeParams {
    type: string;
}

export interface dbRequest {
    skipCount: number;
    filters: [string, string][];
    searchInput?: string | null
    ranges: [string, number[]][];
}

export interface searchRequest {
    search: string;
    type: string;
}

export interface userSellingRequest {
    id: string;
}

export interface CardData {
    keys?: string[];
    values?: string[];
    id: string;
    name?: string;
    type?: ItemType;
    numImages: number;
}

export interface creationRequest {
    id: string;
    data: ItemData;
    sellerId: string;
    numImages: number;
}

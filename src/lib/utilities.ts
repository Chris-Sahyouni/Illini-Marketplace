import { Sublease, Textbook, SportsTicket, TransitTicket, Parking, Misc } from "@prisma/client";

export type anyItem = Sublease | Textbook | TransitTicket | SportsTicket | Parking | Misc;

export type VisibleData = [string[], string[]];

export function alignKeyValues(desiredKeys: readonly string[], keyVals: string[][]): [string[], string[]] {
    let out: [string[], string[]] = [[], []];
    for (let key of keyVals[0]) {
        if (desiredKeys.includes(key)) {
            out[0].push(key);
            out[1].push(keyVals[1][keyVals[0].indexOf(key)]);
        }
    }
    return out;
}

export function getVisibleValues(desiredKeys: readonly string[], keyVals: string[][]): string[] {
    let out: string[] = [];
    for (let key of keyVals[0]) {
        if (desiredKeys.includes(key)) {
            out.push(keyVals[1][keyVals[0].indexOf(key)]);
        }
    }
    return out;
}


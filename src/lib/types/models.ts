


// ItemData is meant to be an intermediary between the prisma item types and raw strings the cards render

export class ItemData {
    readonly keys: readonly string[] | undefined;
    readonly sellQuestions: readonly [string, string][] | undefined;
    values: string[];
    type: ItemType;
    // image

    public constructor(type: ItemType, values: string[]) {
        this.type = type;
        this.keys = typeKeyMap.get(type);
        this.sellQuestions = typeQuestionMap.get(type);
        this.values = values;
    }
    
}



/* -------------------------------------------------------------------------- */

export enum ItemType {
    Sublease,
    Textbook,
    Transit,
    Ticket,
    Parking,
    Misc
}



const subleaseKeys: readonly string[] = ["price", "address", "contact", "company", "numBedrooms", "numBathrooms", "startDate", "endDate", "notes"];
const textbookKeys: readonly string[] = ['course', 'price', 'contact'];
const transitKeys: readonly string[] = [];
const ticketKeys: readonly string[] = [];
const parkingKeys: readonly string[] = [];
const miscKeys: readonly string[] = [];

// these strings are question and placeholder respectively
const subleaseQuestions: readonly [string, string][] = [];
const textbookQuestions: readonly [string, string][] = [['Course Code', 'eg. STAT 100'], ['Price', ''], ['How would you like to be contacted?', 'eg. 123-456-7890, or snap: john_doe123, etc']];
const transitQuestions: readonly [string, string][] = [];
const ticketQuestions: readonly [string, string][] = [];
const parkingQuestions: readonly [string, string][] = [];
const miscQuestions: readonly [string, string][] = [];


const typeKeyMap = new Map<ItemType, readonly string[]>([
    [ItemType.Sublease, subleaseKeys],
    [ItemType.Textbook, textbookKeys],
    [ItemType.Transit, transitKeys],
    [ItemType.Ticket, ticketKeys],
    [ItemType.Parking, parkingKeys],
    [ItemType.Misc, miscKeys],
]);

const typeQuestionMap = new Map<ItemType, readonly [string, string][]>([
    [ItemType.Sublease, subleaseQuestions],
    [ItemType.Textbook, textbookQuestions],
    [ItemType.Transit, transitQuestions],
    [ItemType.Ticket, ticketQuestions],
    [ItemType.Parking, parkingQuestions],
    [ItemType.Misc, miscQuestions]
]);






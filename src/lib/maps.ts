export enum ItemType {
    Sublease,
    Textbook,
    Transit,
    Ticket,
    Parking,
    Misc,
    UnResolved
}

const contactPair: [string, string] = ['How would you like to be contacted?', 'eg. 123-456-7890, or snap: john_doe123, etc'];

// is company really necessary?
export const subleaseKeys:  string[] = ["location", "price", "contact", "company", "bedrooms", "bathrooms", "start", "end", "notes"];
export const textbookKeys:  string[] = ['course', 'price', 'contact'];
export const transitKeys:  string[] = ['mode', 'price', 'date', 'time'];
export const ticketKeys:  string[] = ['event', 'price', 'date', 'seat', 'amount'];
export const parkingKeys:  string[] = ['location', 'price', 'startDate', 'endDate'];
export const miscKeys:  string[] = ['name', 'price', 'notes'];



// these strings are question and placeholder respectively
export const subleaseQuestions:  [string, string][] = [['Address/Location', 'eg. 123 E Green, or HERE'], ['Rent (per person/month)', ''], contactPair, ['Company', 'eg. Smile'], ["How many bedrooms", ""], ['How many bathrooms', ''], ['Start Date', 'YYYY-MM-DD'], ['End Date', 'YYYY-MM-DD'], ['Any other information you want to add', '']];
export const textbookQuestions:  [string, string][] = [['Course Code', 'eg. STAT 100'], ['Price', ''], contactPair, ['Any other information you want to add', '']];
export const transitQuestions:  [string, string][] = [['What mode', 'eg. Amtrack, Peoria Charter'], ['Price', ''], ['Date', 'YYYY-MM-DD'], ['Time', 'eg. 5:00pm'], ['Any other information you want to add', '']];
export const ticketQuestions:  [string, string][] = [['What event', ''], ['Price', ''], ['Date', 'YYYY-MM-DD'], ['Seat (if applicable)', ''], ['How many tickets', ''], ['Any other information you want to add', '']];
export const parkingQuestions:  [string, string][] = [['Location', ''], ['Price', ''], ['Start Date', 'YYYY-MM-DD'], ['End Date', 'YYYY-MM-DD'], ['Any other information you want to add', '']];
export const miscQuestions:  [string, string][] = [['What are you selling', ''], ['Price', ''], ['Any other information you want to add', '']];


export const typeKeyMap = new Map<ItemType,  string[]>([
    [ItemType.Sublease, subleaseKeys],
    [ItemType.Textbook, textbookKeys],
    [ItemType.Transit, transitKeys],
    [ItemType.Ticket, ticketKeys],
    [ItemType.Parking, parkingKeys],
    [ItemType.Misc, miscKeys],
]);

export const typeQuestionMap = new Map<ItemType,  [string, string][]>([
    [ItemType.Sublease, subleaseQuestions],
    [ItemType.Textbook, textbookQuestions],
    [ItemType.Transit, transitQuestions],
    [ItemType.Ticket, ticketQuestions],
    [ItemType.Parking, parkingQuestions],
    [ItemType.Misc, miscQuestions]
]);

const strToType = new Map<string, ItemType>([
    ['sublease', ItemType.Sublease],
    ['textbook', ItemType.Textbook],
    ['transit', ItemType.Transit],
    ['parking', ItemType.Parking],
    ['ticket', ItemType.Ticket],
    ['misc', ItemType.Misc]
]);


const subleaseCheckBoxFilters: [string, string[]][] = [['Term', ['fall', 'spring', 'summer']]];
const textbookCheckBoxFilters: [string, string[]][] = []
const transitCheckBoxFilters: [string, string[]][] = [['Mode', ['Peoria Charter', 'Amtrack', 'other']]]
const ticketCheckBoxFilters: [string, string[]][] = [['Type', ['football', 'basketball', 'concert', 'other']]]
const parkingCheckBoxFilters: [string, string[]][] = []
const miscCheckBoxFilters: [string, string[]][] = [];

const subleaseRanges: string[] = ['price', 'bedrooms', 'bathrooms'];
const textbookRanges: string[] = ['price'];
const transitRanges: string[] = ['price'];
const ticketRanges: string[] = ['price', 'amount'];
const parkingRanges: string[] = ['price'];
const miscRanges: string[] = ['price'];

export const typeFilterMap = new Map<string, [string, string[]][]>([
    ['sublease', subleaseCheckBoxFilters],
    ['textbook', textbookCheckBoxFilters],
    ['transit', transitCheckBoxFilters],
    ['parking', parkingCheckBoxFilters],
    ['ticket', ticketCheckBoxFilters],
    ['misc', miscCheckBoxFilters]
]);

export const typeRangeMap = new Map<string, string[]>([
    ['sublease', subleaseRanges],
    ['textbook', textbookRanges],
    ['transit', transitRanges],
    ['parking', parkingRanges],
    ['ticket', ticketRanges],
    ['misc', miscRanges]
]);
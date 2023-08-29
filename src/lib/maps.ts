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
export const subleaseKeys:  string[] = ["location", "price", "contact", "company", "bedrooms", "bathrooms", "term", "start", "end"];
export const textbookKeys:  string[] = ['course', 'price', 'contact'];
export const transitKeys:  string[] = ['mode', 'price', 'date', 'time', 'from', 'to', 'contact'];
export const ticketKeys:  string[] = ['type', 'event', 'price', 'date', 'amount', 'contact'];
export const parkingKeys:  string[] = ['location', 'price', 'start', 'end', 'contact'];
export const miscKeys:  string[] = ['name', 'price', 'description', 'contact'];

/* -------------------------------- Questions ------------------------------- */

// these strings are question and placeholder respectively
export const subleaseQuestions:  [string, string][] = [['Address/Location', 'eg. 123 E Green, or HERE'],
                                                       ['Rent (per person/month)', ''], 
                                                       contactPair, 
                                                       ['Company', 'eg. Smile'], 
                                                       ["How many bedrooms", ""], 
                                                       ['How many bathrooms', ''], 
                                                       ['Term', ''],
                                                       ['Start Date', 'MM-DD-YYYY'], 
                                                       ['End Date', 'MM-DD-YYYY']];

export const textbookQuestions:  [string, string][] = [['Course Code', 'eg. STAT 100'], 
                                                       ['Price', ''], 
                                                       contactPair];

export const transitQuestions:  [string, string][] = [['What mode', 'eg. Amtrack, Peoria Charter'], 
                                                      ['Price', ''], 
                                                      ['Date', 'MM-DD-YYYY'], 
                                                      ['Time', 'eg. 5:00pm'],
                                                      ['From', 'Departure location'],
                                                      ['To', 'Destination'],
                                                       contactPair];

export const ticketQuestions:  [string, string][] = [['Type', ''],
                                                     ['What event', 'eg. illinois vs wisconsin'], 
                                                     ['Price', ''],
                                                     ['Date', 'MM-DD-YYYY'], 
                                                     ['How many tickets', ''],
                                                      contactPair];

export const parkingQuestions:  [string, string][] = [['Location', ''], 
                                                      ['Price', ''], 
                                                      ['Start Date', 'MM-DD-YYYY'], 
                                                      ['End Date', 'MM-DD-YYYY'],
                                                      contactPair];

export const miscQuestions:  [string, string][] = [['What are you selling', ''], 
                                                   ['Price', ''],
                                                   ['Description', ''],
                                                    contactPair];

/* -------------------------------------------------------------------------- */

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
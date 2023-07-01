import { ItemType } from "../lib/types/models";

interface filtersProps {
    itemType: string
}

export default function Filters({itemType}: filtersProps) {


    const checkBoxes = typeFilterMap.get(itemType);
    return (
        <div className="bg-white rounded w-full px-4 py-2 h-fit flex flex-col">
            {
                checkBoxes?.map((filter, fIdx) => {
                  return (
                    <>
                        <div className="flex flex-col pb-4 pl-1 pt-1">
                            <p className='font-bold' key={fIdx}>{filter[0]}</p>
                            {
                                filter[1].map((option, oIdx) => {
                                    return (
                                        <div className="pl-2">
                                            <input type="checkbox" name="option" value={option} id={option}/> {option}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </>
                  )
                })
            }
            <button className='w-20 bg-blue-600 text-white hover:bg-blue-400 rounded'>Apply</button>
        </div>
    );
}

const strToType = new Map<string, ItemType>([
    ['sublease', ItemType.Sublease],
    ['textbook', ItemType.Textbook],
    ['transit', ItemType.Transit],
    ['parking', ItemType.Parking],
    ['ticket', ItemType.Ticket],
    ['misc', ItemType.Misc]
]);


const subleaseCheckBoxFilters: [string, string[]][] = [['Term', ['fall', 'spring', 'summer']]];
const textbookCheckBoxFilters: [string, string[]][] = [['Mode', ['Peoria Charter', 'Amtrack', 'other']], ['Mode', ['Peoria Charter', 'Amtrack', 'other']]]
const transitCheckBoxFilters: [string, string[]][] = [['Mode', ['Peoria Charter', 'Amtrack', 'other']]]
const ticketCheckBoxFilters: [string, string[]][] = [['Type', ['football', 'basketball', 'concert', 'other']]]
const parkingCheckBoxFilters: [string, string[]][] = []
const miscCheckBoxFilters: [string, string[]][] = [];

const typeFilterMap = new Map<string, [string, string[]][]>([
    ['sublease', subleaseCheckBoxFilters],
    ['textbook', textbookCheckBoxFilters],
    ['transit', transitCheckBoxFilters],
    ['parking', parkingCheckBoxFilters],
    ['ticket', ticketCheckBoxFilters],
    ['misc', miscCheckBoxFilters]
])
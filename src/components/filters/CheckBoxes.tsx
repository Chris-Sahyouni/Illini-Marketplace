import { typeFilterMap } from "@/src/lib/maps";

interface checkBoxProps {
    itemType: string;
    handler: (e: React.MouseEvent<HTMLInputElement>) => void;
}

export function CheckBoxes({itemType, handler}: checkBoxProps) {
    const checkBoxes = typeFilterMap.get(itemType);
    return (
        <div>
            {
                checkBoxes?.map((filter, fIdx) => {
                  return (
                    <div key={filter[0]}>
                        <div className="flex flex-col pb-4 pl-1 pt-1" key={`div-${filter[0]}`}>
                            <p className='font-bold' key={`p${filter[0]}`}>{filter[0]}</p>
                            {
                                filter[1].map((option, oIdx) => {
                                    // note that the name attribute on each input is just used to store the type of filter it is
                                    return (
                                        <div className="pl-2" key={option}>
                                            <input type="checkbox" name={filter[0]} value={option} id={option} onClick={handler} /> {option}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                  )
                })
            }
        </div>
    );
}
import { typeRangeMap } from "@/src/lib/maps";
import { RangeSlider } from "./RangeSlider";
import {Dispatch, SetStateAction } from 'react'

interface rangeProps {
    itemType: string;
    handler: Dispatch<SetStateAction<[string, number[]][]>>;
}

export function Ranges({itemType, handler}: rangeProps) {

    const rangeKeys = typeRangeMap.get(itemType);

    return (
        <div>
            {
                rangeKeys?.map((property, index) => {
                  return (
                    <div className="flex flex-col pb-4 pl-1 pt-1" key={property}>
                        <p className='font-bold' key={`p${property}`}>{property}</p>
                        <div className="p-1 w-4/5 ml-2">
                            <RangeSlider index={index} setParentState={handler} stepSize={itemType === 'sublease' ? 10 : 1}/>
                        </div>
                    </div>
                  );
                })
            }
        </div>
    );



}

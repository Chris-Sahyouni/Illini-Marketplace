import { typeRangeMap } from "@/src/lib/maps";
import { RangeSlider } from "./RangeSlider";
import {Dispatch, SetStateAction, useEffect, useState } from 'react'

interface rangeProps {
    itemType: string;
    handler: Dispatch<SetStateAction<[string, number[]][]>>;
}

export function Ranges({itemType, handler}: rangeProps) {

    const [maxes, setMaxes] = useState<number[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const wrapper = async () => {
          setLoading(true)
          const response = await fetch('https://illinimarketplace.com/api/range-max', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: null,
          });
          const res = await response.json();
          switch (itemType) {
            case "sublease": {
                if (res) { 
                    const {subleasePrice, subleaseBedrooms, subleaseBathrooms} = res
                    setMaxes([subleasePrice, subleaseBedrooms, subleaseBathrooms]);
                }
                break;
            }
            case "ticket": {
                if (res) { 
                    const {ticketPrice, ticketAmount} = res
                    setMaxes([ticketPrice, ticketAmount, ]);
                }
                break;
            }
            case "textbook": {
                if (res) setMaxes([res.textbookPrice]);
                break;
            }
            case 'transit': {
                if (res) setMaxes([res.transitPrice]);
                break;
            }
            case "parking": {
                if (res) setMaxes([res.parkingPrice]);
                break;
            }
            case "misc": {
                if (res) setMaxes([res.miscPrice]);
                break;
            }
          }
          setLoading(false);
        }
        wrapper();
    }, [])

    const rangeKeys = typeRangeMap.get(itemType);

    if (loading) {
        return null
    }

    return (
        <div>
            {
                rangeKeys?.map((property, index) => {
                  return (
                    <div className="flex flex-col pb-4 pl-1 pt-1" key={property}>
                        <p className='font-bold' key={`p${property}`}>{property}</p>
                        <div className="p-1 w-4/5 ml-2">
                            <RangeSlider index={index} setParentState={handler} max={maxes[index]} stepSize={itemType === 'sublease' && property === 'price' ? 10 : 1}/>
                        </div>
                    </div>
                  );
                })
            }
        </div>
    );



}

"use client"
import Card from "@/src/components/Card";
import { useEffect, useRef, useState } from "react";
import { VisibleData } from "@/src/lib/utilities";



export default function Page({params}: {params: {itemType: string}}) {

    const [skipCount, setSkipCount] = useState(0);
    const [data, setData] = useState<VisibleData[]>([]);

    useEffect(() => {

        fetch(`api/items/${params.itemType}`, {
            method: "POST",
            body: JSON.stringify({
                skipCount: skipCount,
                filters: null
            }),
            headers: {
                "Content-Type": "application/json",
                'Accept': "application/json",
            }
        }).then((res: Response) => {
            console.log(res);

            res.json().then((newItems: VisibleData[]) => {
                setData((prevState: VisibleData[]) => [...prevState, ...newItems]);
            });
            setSkipCount((prev) => prev + 1)
        })

    }, [params.itemType]);

    if (!data || data.length === 0 || data === null || data === undefined) {
        return (<></>);
    }

        return (
            <div className="h-screen w-1/2 items-center flex flex-col m-auto p-2 overflow-scroll">
                {
                    data.map((itemData: VisibleData, index: number) => {
                        return (
                            <div key={index} className="w-full py-2">
                                <Card keyVals={itemData} key={index} />
                            </div>
                        );
                    })
                }
            </div>
        );
}

/* -------------------------------------------------------------------------- */

//  function getItems(route: string) {

//     let filters;

    

//       fetch(`/api/items/${route}`, {
//       method: "POST",
//       body: filters,
//       headers: {
//         'Content-Type': "application/json",
//         'Accept': "application/json"
//       }
//     }).then((res: Response) => {
//       return res.json();
//     }).catch((err) => {
//       console.log(err);
//     });
// } 



// export type anyItem = Sublease | Textbook | TransitTicket | SportsTicket | Parking | Misc | Item;

// function getVisibleFields(item: anyItem): VisibleData {

//     let toReturn: VisibleData = [[], []];

//     const map = new Map([
//         ['isSublease', subleaseDisplay],
//         ['isTextbook', textbookDisplay],
//         ['isTransitTicket', transitDisplay],
//         ['isSportsTicket', sportsDisplay],
//         ['IsParking', parkingDisplay],
//         ['isMisc', miscDisplay]
//     ]).forEach((value, key) => {
//       if (key in item) {
//         toReturn = value.call(item, Object.entries(item));
//       }
//     });

//     return toReturn;
// }


// // for each of these, the item is the this object
// const subleaseDisplay = (keyVals: string[][]): VisibleData => {
//     const desiredKeys: string[] = ["price", "address", "contact", "company", "numBedrooms", "numBathrooms", "startDate", "endDate", "notes"];
//     return alignKeyValues(desiredKeys, keyVals);
    
// }

// const textbookDisplay = (keyVals: string[][]): VisibleData => {
//     const desiredKeys: string[] = ['course', 'price', 'contact'];
//     return alignKeyValues(desiredKeys, keyVals);
// }

// const transitDisplay = (keyVals: string[][]): VisibleData => {
//     const desiredKeys: string[] = [''];
//     return alignKeyValues(desiredKeys, keyVals);
// }

// const sportsDisplay = (keyVals: string[][]): VisibleData => {
//     const desiredKeys: string[] = [''];
//     return alignKeyValues(desiredKeys, keyVals);
// }

// const parkingDisplay = (keyVals: string[][]): VisibleData => {
//     const desiredKeys: string[] = [''];
//     return alignKeyValues(desiredKeys, keyVals);
// }

// const miscDisplay = (keyVals: string[][]): VisibleData => {
//     const desiredKeys: string[] = [''];
//     return alignKeyValues(desiredKeys, keyVals);
// }



import { Item } from "@/src/lib/types/models";
import Card from "@/src/components/Card";


export default function Page({params}: {params: {itemType: string}}) {

    let sample: Item = new Item(1.50, 'testUser', '123-456-7890', 'Nasal Ned', 'xxx-xxxx-xxxxx');
    let sampleArr = [sample, sample, sample, sample, sample];


    return (
        <div className="h-screen w-1/2 items-center flex flex-col m-auto p-2 overflow-scroll">
            {
                sampleArr.map((item: Item, index: number) => {
                    return (
                        <div key={index} className="w-full py-2">
                            <Card item={item} key={index} />
                        </div>
                    );
                })
            }
        </div>
    );

}
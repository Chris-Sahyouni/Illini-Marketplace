
interface fieldProps {
    name: string;
    value: string;
    index: number;
    padding: number;
}

export default function Field({name, value, index, padding}: fieldProps) {

    return (
        <div className={`flex flex-row py-${padding}`} key={index}> 
            <p className="font-bold pr-1" key={`key${index}`}>{name}:</p>
            <p key={`val${index}`}>{value}</p>
            {
                name === 'price' ? <p className=" pl-0.5">$</p> : null
            }
        </div>
    );
}
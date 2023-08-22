
interface fieldProps {
    name: string;
    value: string;
    index: number;
}

export default function Field({name, value, index}: fieldProps) {

    return (
        <div className="flex flex-row py-2" key={index}> 
            <p className="font-bold pr-1" key={`key${index}`}>{name}:</p>
            <p key={`val${index}`}>{value}</p>
        </div>
    );
}
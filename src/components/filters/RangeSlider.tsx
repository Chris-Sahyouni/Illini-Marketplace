import { Slider } from '@mui/material'
import { useState, Dispatch, SetStateAction } from 'react'


interface sliderProps {
    index: number;
    setParentState: Dispatch<SetStateAction<[string, number[]][]>>;
    parentState: [string, number[]][];
}

export function RangeSlider({index, setParentState, parentState}: sliderProps) {

    const [state, setState] = useState<number[]>([0, 100])
    const handleChange = (event: Event, newValue: number | number[]) => {
        setState(newValue as number[])
        setParentState((prev) => {
            // let [targetKey, targetRange] = prev[index];
            prev[index][1] = newValue as number[];
            return [...prev];
        })
    }

    // step size should be 10 for subleases
    return (
        <>
            <Slider
                value={state}
                onChange={handleChange}
                valueLabelDisplay="auto"
                disableSwap
                step={1}
                size='small'
            />
        </>
      
    );

}
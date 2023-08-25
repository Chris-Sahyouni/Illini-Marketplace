import { Slider } from '@mui/material'
import { useState, Dispatch, SetStateAction } from 'react'


interface sliderProps {
    index: number;
    setParentState: Dispatch<SetStateAction<[string, number[]][]>>;
    stepSize: number;
    max: number;
}

export function RangeSlider({index, setParentState, stepSize, max}: sliderProps) {

    const [state, setState] = useState<number[]>([0, max])
    const handleChange = (event: Event, newValue: number | number[]) => {
        setState(newValue as number[])
        setParentState((prev) => {
            prev[index][1] = newValue as number[];
            return [...prev];
        })
    }

    return (
        <>
            <Slider
                value={state}
                onChange={handleChange}
                valueLabelDisplay="auto"
                disableSwap
                step={stepSize}
                size='small'
                max={max}
                defaultValue={[0, max]}
            />
        </>
      
    );

}
import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel } from '@mui/material'
import React from 'react'
import { useAppContext } from '../../Hooks/useStoresContext'
import { StpTypeProps } from '../../Interfaces/Types'

type StpTypeFGProps = {
    open: boolean
}
type ChangeFn = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void
type CheckboxGroup = Required<StpTypeProps>

export const StpTypeFormGroup = ({ open }: StpTypeFGProps) => {
    const { _type, setType } = useAppContext()

    function handleChange(prop: keyof CheckboxGroup) {
        const onchange: ChangeFn = (e, checked) => {
            setType(prev => ({ ...prev, [prop]: checked }))

        }


        return onchange
    }
    return (open &&
        <FormControl sx={ { m: 1 } } component="fieldset" variant="filled">
            <FormLabel component="legend" sx={ { textAlign: 'center', color: 'black' } }>Возможные варианты</FormLabel>
            <FormGroup sx={ { display: 'flex', flexDirection: 'row' } }>
                <FormControlLabel
                    control={
                        <Checkbox checked={ _type.simple } onChange={ handleChange('simple') } name="simple" />
                    }
                    label="Простой"
                />
                <FormControlLabel
                    control={
                        <Checkbox checked={ _type.energy } onChange={ handleChange('energy') } name="energy" />
                    }
                    label="Энергосберегающий"
                />
                <FormControlLabel
                    control={
                        <Checkbox checked={ _type.multi } onChange={ handleChange('multi') } name="multi" />
                    }
                    label="Мультифункциональный"
                />
                <FormControlLabel
                    control={
                        <Checkbox checked={ _type.hitproof } onChange={ handleChange('hitproof') } name="hitproof" />
                    }
                    label="Ударопрочный"
                />
                <FormControlLabel
                    control={
                        <Checkbox checked={ _type.solarproof } onChange={ handleChange('solarproof') } name="solarproof" />
                    }
                    label="Солцезащитный"
                />
                <FormControlLabel
                    control={
                        <Checkbox checked={ _type.soundproof } onChange={ handleChange('soundproof') } name="soundproof" />
                    }
                    label="Звуконепроницаемый"
                />

            </FormGroup>
        </FormControl>
    )
}
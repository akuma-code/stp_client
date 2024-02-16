import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel } from '@mui/material'
import React, { useState } from 'react'
import { StpTypeProps } from '../../Interfaces/Types'

type StpTypeFGProps = {
    open: boolean
}
type ChangeFn = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void
type CheckboxGroup = Required<StpTypeProps>

export const StpTypeFormGroup = ({ open }: StpTypeFGProps) => {

    const [group, setGroup] = useState<CheckboxGroup>({
        energy: false,
        hitproof: false,
        multi: false,
        simple: false,
        solarproof: false,
        soundproof: false
    })
    function handleChange(prop: keyof CheckboxGroup) {
        const onchange: ChangeFn = (e, checked) => {
            setGroup(prev => ({ ...prev, [prop]: checked }))
        }
        return onchange
    }
    return (open &&
        <FormControl sx={ { m: 1 } } component="fieldset" variant="filled">
            <FormLabel component="legend" sx={ { textAlign: 'center', color: 'black' } }>Возможные варианты</FormLabel>
            <FormGroup sx={ { display: 'flex', flexDirection: 'row' } }>
                <FormControlLabel
                    control={
                        <Checkbox checked={ group.simple } onChange={ handleChange('simple') } name="simple" />
                    }
                    label="Простой"
                />
                <FormControlLabel
                    control={
                        <Checkbox checked={ group.energy } onChange={ handleChange('energy') } name="energy" />
                    }
                    label="Энергосберегающий"
                />
                <FormControlLabel
                    control={
                        <Checkbox checked={ group.multi } onChange={ handleChange('multi') } name="multi" />
                    }
                    label="Мультифункциональный"
                />
                <FormControlLabel
                    control={
                        <Checkbox checked={ group.hitproof } onChange={ handleChange('hitproof') } name="hitproof" />
                    }
                    label="Ударопрочный"
                />
                <FormControlLabel
                    control={
                        <Checkbox checked={ group.solarproof } onChange={ handleChange('solarproof') } name="solarproof" />
                    }
                    label="Солцезащитный"
                />
                <FormControlLabel
                    control={
                        <Checkbox checked={ group.soundproof } onChange={ handleChange('soundproof') } name="soundproof" />
                    }
                    label="Звуконепроницаемый"
                />

            </FormGroup>
        </FormControl>
    )
}
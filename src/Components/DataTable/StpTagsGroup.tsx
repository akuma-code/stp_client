import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Stack, TextField } from '@mui/material'
import React, { useCallback } from 'react'
import { useAppContext } from '../../Hooks/useStoresContext'
import { StpTypeProps } from '../../Interfaces/Types'
import { useDebounce } from '../../Hooks/useDebounce'

type StpTypeFGProps = {
    open: boolean

}
type ChangeFn = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void
type CheckboxGroup = Required<StpTypeProps>

export const StpTagsForm = ({ open }: StpTypeFGProps) => {
    const { _type, setType, filteredItemsCount, setQuery, query } = useAppContext()



    const labelText = useCallback(() => {
        const allBlank = Object.values(_type).every(v => v === false)
        if (allBlank && query === "") return `Ничего не выбрано!`
        if (filteredItemsCount === 0) return 'Нет совпадений!'

        return `Cовпадений: ${filteredItemsCount}`

    }, [filteredItemsCount])


    // const handleQuery = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    //     const value = e.target.value
    //     setQuery(prev => value)
    // }, [query])



    const lb = labelText()


    function handleChange(prop: keyof CheckboxGroup) {
        const onchange: ChangeFn = (e, checked) => {
            setType(prev => ({ ...prev, [prop]: checked }))
        }
        return onchange
    }

    return (open &&
        <FormControl sx={ { m: .5, } } component="fieldset" variant="outlined" size='small'>
            <FormLabel component="legend" sx={ { textAlign: 'center', color: 'black', flexGrow: 1 } } >
                { lb }
            </FormLabel>
            <FormGroup sx={ { display: 'flex', flexDirection: 'row', alignContent: 'flex-end' } }>


                <TextField
                    name='search_query'
                    helperText='Еще не настроено!!'
                    placeholder='Еще не настроено!!'
                    size='small'
                    variant='standard'
                    inputMode='text'
                    margin='normal'
                    sx={ { maxWidth: 200, mx: 2, textAlign: 'center', color: 'black', } }
                // onChange={ (e) => setQuery(e.target.value) }
                // value={ query }
                />
                <Stack direction={ 'row' } flexWrap={ 'wrap' } width={ '60%' } flexGrow={ 0 }>

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
                        label="Теплый"
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
                        label="Шумоизолирующий"
                    />

                </Stack>
            </FormGroup>
        </FormControl>
    )
}
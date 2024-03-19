import { Autocomplete, TextField } from '@mui/material';
import React, { useCallback, useMemo, useState } from 'react';
import { useAppContext } from '../../Hooks/useStoresContext';

export const AcSearch = React.memo(() => {
    // console.time('search_selected')
    const [value, setValue] = useState<string | null>(null);
    const { query, setQuery, StpStore } = useAppContext();
    const options = StpStore.table.map(stp => stp.name);

    const selectedOptions = useMemo(() => {

        if (!value) return options;
        const selectedOpts = options.filter(o => o.includes(query));
        return selectedOpts;
    }, [query, options, value]);
    const handleQueryInput = useCallback((e: any, value: string) => setQuery(value), [setQuery])
    const handleInput = useCallback((e: any, value: string | null) => setValue(value), [setValue])

    // console.timeEnd('search_selected')
    return (
        <Autocomplete
            clearOnEscape
            autoHighlight
            handleHomeEndKeys
            freeSolo
            options={ selectedOptions }
            noOptionsText='Ничего не найдено!'
            value={ value }
            onChange={ handleInput }
            sx={ { mx: 2, textAlign: 'center', } }

            inputValue={ query }
            onInputChange={ handleQueryInput }
            renderInput={ (params) => <TextField { ...params }
                name='search_query'
                helperText={ 'Начните вводить формулу или выберите стеклопакет для сравнения из таблицы' }
                size='medium'
                variant='outlined'
                inputMode='search'
                margin='dense'
                label="Формула стеклопакета"
            />
            }
        />);
})

AcSearch.displayName = '__QuerySearch'
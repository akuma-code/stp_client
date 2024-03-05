import { Autocomplete, AutocompleteInputChangeReason, TextField } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useAppContext } from '../../Hooks/useStoresContext';
import { useToggle } from '../../Hooks/useToggle';
import { useDebounceCallback } from 'usehooks-ts';








export const AcSearch = () => {
    const [value, setValue] = useState<string | null>(null);
    const { query, setQuery, StpStore } = useAppContext();
    const options = StpStore.table.map(stp => stp.name);
    const [show, control] = useToggle(false)
    // const handleInput = useDebounceCallback((event: React.SyntheticEvent<Element, Event>, value: string, reason: AutocompleteInputChangeReason) => setQuery(value), 500)

    const selectedOptions = useMemo(() => {

        if (!value) return options;
        const selectedOpts = options.filter(o => o.includes(query));
        return selectedOpts;
    }, [options, query, value]);



    return (
        <Autocomplete
            clearOnEscape
            autoHighlight
            handleHomeEndKeys
            freeSolo
            options={ selectedOptions }
            noOptionsText='Ничего не найдено!'
            value={ value }
            onChange={ (e, v) => setValue(v) }
            sx={ { mx: 2, textAlign: 'center', maxWidth: 300 } }

            inputValue={ query }
            onInputChange={ (e, v) => setQuery(v) }
            renderInput={ (params) => <TextField { ...params }
                name='search_query'
                helperText='Начните вводить формулу или выберите стеклопакет для сравнения из таблицы'
                autoFocus

                size='small'
                variant='outlined'
                inputMode='search'
                margin='dense'
                label="Формула стеклопакета"
                fullWidth={ false } />
            }
        />);
};

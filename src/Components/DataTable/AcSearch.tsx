import { Autocomplete, TextField } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useAppContext } from '../../Hooks/useStoresContext';
import { useToggle } from '../../Hooks/useToggle';









export const AcSearch = () => {
    const [value, setValue] = useState<string | null>(null);
    const { query, setQuery, StpStore } = useAppContext();
    const [show, control] = useToggle(false)


    const selectedOptions = useMemo(() => {
        const options = StpStore.table.map(stp => stp.name);
        if (!value) return options;
        const selectedOpts = options.filter(o => o.includes(query));
        return selectedOpts;
    }, [query]);



    return (
        <Autocomplete
            clearOnEscape
            autoHighlight
            handleHomeEndKeys
            options={ selectedOptions }
            noOptionsText='Ничего не найдено!'
            value={ value }
            onChange={ (e, v) => setValue(v) }
            sx={ { mx: 2 } }
            inputValue={ query }
            onInputChange={ (e, v) => setQuery(v) }
            renderInput={ (params) => <TextField { ...params }
                name='search_query'
                helperText='Начните вводить формулу стеклопакета....'
                autoFocus
                size='medium'
                variant='outlined'
                inputMode='search'
                margin='normal'
                label="Формула стеклопакета" /> } />);
};

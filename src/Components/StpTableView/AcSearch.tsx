import { Autocomplete, TextField } from '@mui/material';
import { useMemo, useState } from 'react';
import { useAppContext } from '../../Hooks/useStoresContext';

export const AcSearch = () => {
    const [value, setValue] = useState<string | null>(null);
    const { query, setQuery, StpStore } = useAppContext();
    const options = StpStore.table.map(stp => stp.name);

    console.time('search')
    const selectedOptions = useMemo(() => {

        if (!value) return options;
        const selectedOpts = options.filter(o => o.includes(query));
        return selectedOpts;
    }, [query, options, value]);
    console.timeEnd('search',)


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
            sx={ { mx: 2, textAlign: 'center', } }

            inputValue={ query }
            onInputChange={ (e, v) => setQuery(v) }
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
};

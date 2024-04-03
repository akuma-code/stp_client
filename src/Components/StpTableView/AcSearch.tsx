import { Autocomplete, TextField } from '@mui/material';
import React, { useCallback, useDeferredValue, useMemo, useState } from 'react';
import { useAppContext } from '../../Hooks/useStoresContext';
import { SuspenseLoad } from '../UI/SuspenseLoad';
import { useLoadDataQuery } from '../../Hooks/useLoadAllData';

export const AcSearch = React.memo(() => {
    // console.time('search_selected')
    const [value, setValue] = useState<string | null>(null);
    const { query, setQuery } = useAppContext();
    // const defQuery = useDeferredValue(query)
    const qdata = useLoadDataQuery(query)
    // const isPending = query !== defQuery
    const handleQueryInput = useCallback((e: any, value: string) => setQuery(value), [setQuery])
    const handleInput = useCallback((e: any, value: string | null) => {

        setValue(value)
    }, [setValue])
    const selectedOptions = useMemo(() => {
        // const data = qdata.isSuccess ? qdata.data : []
        const names = qdata.isSuccess ? qdata.data.map(stp => stp.name) : []


        const selectedOpts = names.filter(o => o.toLowerCase().includes(query.toLowerCase()));
        return selectedOpts;
    }, [qdata.data, qdata.isSuccess, query]);

    // console.timeEnd('search_selected')
    return (
        <SuspenseLoad>

            <Autocomplete
                clearOnEscape
                autoHighlight
                handleHomeEndKeys
                freeSolo
                options={ selectedOptions }
                noOptionsText='Ничего не найдено!'
                value={ value }
                onChange={ handleInput }
                sx={ {
                    mx: 2, textAlign: 'center',
                    // [`& .MuiTextField-root`]: { opacity: isPending ? .5 : 1 }

                } }

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
                    sx={ {} }
                />
                }
            />
        </SuspenseLoad>
    );
})

AcSearch.displayName = '__QuerySearch'
import { Autocomplete, TextField } from '@mui/material';
import React, { useCallback, useDeferredValue, useMemo, useState } from 'react';
import { useAppContext } from '../../Hooks/useStoresContext';
import { SuspenseLoad } from '../UI/SuspenseLoad';
import { useLoadDataQuery } from '../../Hooks/useLoadAllData';
import { useFilterContext } from '../../Hooks/useFilterContext';
import { observer } from 'mobx-react-lite';
import { _log } from '../../Helpers/helpersFns';

export const AcSearch = observer(() => {
    // console.time('search_selected')
    // const { query, setQuery } = useAppContext();
    // const defQuery = useDeferredValue(query)
    // const isPending = query !== defQuery
    const [value, setValue] = useState<string | null>(null);
    const { search } = useFilterContext()
    const qdata = useLoadDataQuery(search.query)
    const handleQueryInput = useCallback((e: any, value: string) => {

        search.setQuerySearch(value)
    }, [search])
    const handleInput = useCallback((e: any, value: string | null) => {

        setValue(value)
    }, [])
    const selectedOptions = useMemo(() => {
        // const data = qdata.isSuccess ? qdata.data : []
        const names = qdata.isSuccess ? qdata.data.map(stp => stp.name) : []


        const selectedOpts = names.filter(o => o.toLowerCase().includes(search.query.toLowerCase()));
        return selectedOpts;
    }, [qdata.data, qdata.isSuccess, search.query]);

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
                    mr: 2, textAlign: 'center',
                    // [`& .MuiTextField-root`]: { opacity: isPending ? .5 : 1 }

                } }

                inputValue={ search.query }
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
            />
        </SuspenseLoad>
    );
})

AcSearch.displayName = '__QuerySearch'
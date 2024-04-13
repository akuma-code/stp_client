import { Autocomplete, TextField } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useCallback, useMemo, useState } from 'react';
import { useFilterContext } from '../../Hooks/useFilterContext';
import { useLoadDataQuery } from '../../Hooks/useLoadAllData';
import { SuspenseLoad } from '../UI/SuspenseLoad';
import { useSearchParams } from 'react-router-dom';

export const AcSearch = observer(() => {


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

        const names = qdata.isSuccess ? qdata.data.map(stp => stp.name) : []


        const selectedOpts = names.filter(o => o.toLowerCase().includes(search.query.toLowerCase()));
        return selectedOpts;
    }, [qdata.data, qdata.isSuccess, search.query]);

    // console.timeEnd('search_selected')
    return (
        // <SuspenseLoad loadText='asearch'>

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
                textAlign: 'center', maxWidth: 400
                // [`& .MuiTextField-root`]: { opacity: isPending ? .5 : 1 }

            } }

            inputValue={ search.query }
            onInputChange={ handleQueryInput }
            renderInput={ (params) => <TextField { ...params }
                name='search_query'
                helperText={ 'Начните вводить формулу для поиска по таблице' }
                size='medium'
                variant='outlined'
                inputMode='search'
                margin='none'
                label="Формула стеклопакета"

            />
            }
        />
        // </SuspenseLoad>
    );
})

AcSearch.displayName = '__QuerySearch'
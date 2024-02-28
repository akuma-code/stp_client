import React, { useState } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { StpTypeProps } from '../../Interfaces/Types';
import { StpTags } from '../StpTable/TableObjects';
import { grey } from '@mui/material/colors';
import { Stp_Tags, Stp_TypeFields } from '../../Interfaces/Enums';
import { TextField } from '@mui/material';
import { useAppContext } from '../../Hooks/useStoresContext';

const ITEM_HEIGHT = 50;
const ITEM_PADDING_TOP = 18;
const MenuProps = {
  PaperProps: {
    style: {
      height: ITEM_HEIGHT * 7 + ITEM_PADDING_TOP,
      width: 300,
    },
  },
};



const tagsArray = [
  'energy',
  'hitproof',
  'multi',
  'simple',
  'solarproof',
  'soundproof'
] as const

export default function TagSelector({ filteredCount }: { filteredCount: number }) {
  // const [tags, setTags] = useState<string[]>([]);
  const { selectedTags: tags, setTags } = useAppContext()

  const handleChange = (event: SelectChangeEvent<typeof tags>) => {
    const { target: { value } } = event;
    setTags(     // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div className='flex flex-row gap-2 text-xs min-w-[470px] align-baseline py-1'>

      <ul>
        { tags.map(t =>
          <li key={ t }
            className='list-disc'
          >
            { Stp_Tags[t as keyof typeof Stp_Tags] }
          </li>
        ) }
      </ul>

      <FormControl sx={ { m: 1, width: 300 } } >
        <InputLabel id="demo-multiple-checkbox-label" sx={ {} } >Укажите нужные свойства</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="multitag"
          multiple
          placeholder='Укажите нужные свойства'
          value={ tags }
          onChange={ handleChange }
          input={ <OutlinedInput label="Свойства стеклафффффффффф" sx={ { fontSize: 18 } } /> }
          renderValue={ () => `Найдено: ${filteredCount}` }
          // renderValue={ (selected) => selected.map(s => Stp_Tags[s as keyof typeof Stp_Tags]).join(' | ') }
          MenuProps={ MenuProps }

        >

          { tagsArray.map((tag) => (
            <MenuItem key={ tag } value={ tag } >
              <Checkbox checked={ tags.indexOf(tag) > -1 } name={ tag + '_check' } />
              <ListItemText primary={ Stp_Tags[tag] } />
            </MenuItem>
          )) }

        </Select>

      </FormControl>

    </div>
  );
}



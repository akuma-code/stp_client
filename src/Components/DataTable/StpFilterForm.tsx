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

const ITEM_HEIGHT = 50;
const ITEM_PADDING_TOP = 18;
const MenuProps = {
  PaperProps: {
    style: {
      height: ITEM_HEIGHT * 7 + ITEM_PADDING_TOP,
      width: 250,
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

export default function TagSelector() {
  const [tags, setTags] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof tags>) => {
    const { target: { value } } = event;
    setTags(     // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div>
      <FormControl sx={ { m: 1, width: 300 } }>
        <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="multitag"
          multiple
          value={ tags }
          onChange={ handleChange }
          input={ <OutlinedInput label="Tag" /> }
          renderValue={ (selected) => selected.join(' | ') }
          MenuProps={ MenuProps }

        >
          { tagsArray.map((tag) => (
            <MenuItem key={ tag } value={ tag } >
              <Checkbox checked={ tags.indexOf(tag) > -1 } />
              <ListItemText primary={ tag } />
            </MenuItem>
          )) }
        </Select>
      </FormControl>
    </div>
  );
}

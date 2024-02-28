import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useAppContext } from '../../Hooks/useStoresContext';
import { Stp_Tags } from '../../Interfaces/Enums';

const ITEM_HEIGHT = 50;
const ITEM_PADDING_TOP = 18;
const MenuProps = {
  PaperProps: {
    style: {
      height: ITEM_HEIGHT * 7 + ITEM_PADDING_TOP,
      width: 280,
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

export function TagSelector({ filteredCount }: { filteredCount: number }) {
  // const [tags, setTags] = useState<string[]>([]);
  const { selectedTags: tags, setTags } = useAppContext()

  const handleChange = (event: SelectChangeEvent<typeof tags>) => {
    const { target: { value } } = event;
    setTags(     // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div className='flex flex-row  text-xs align-baseline py-1'>



      <FormControl sx={ { m: 1, width: 250 } } >
        <InputLabel id="demo-multiple-checkbox-label" >Укажите нужные свойства</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="multitag"
          multiple
          placeholder='Укажите нужные свойства'
          value={ tags }
          onChange={ handleChange }
          input={ <OutlinedInput label="Свойства стеклафффффф" sx={ { fontSize: 18 } } /> }
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
      {/* <SelectedTagList tags={ tags } /> */ }
    </div>
  );
}
export function WidthCamsSelector({ filteredCount }: { filteredCount: number }) {
  // const [tags, setTags] = useState<string[]>([]);
  const { selectedTags: tags, setTags } = useAppContext()

  const handleChange = (event: SelectChangeEvent<typeof tags>) => {
    const { target: { value } } = event;
    setTags(     // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div className='flex flex-row  text-xs align-baseline py-1'>



      <FormControl sx={ { m: 1, width: 250 } } >
        <InputLabel id="demo-multiple-checkbox-label" >Укажите нужные свойства</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="multitag"
          multiple
          placeholder='Укажите нужные свойства'
          value={ tags }
          onChange={ handleChange }
          input={ <OutlinedInput label="Свойства стеклафффффф" sx={ { fontSize: 18 } } /> }
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
      {/* <SelectedTagList tags={ tags } /> */ }
    </div>
  );
}




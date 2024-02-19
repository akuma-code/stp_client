import { Stack } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import { useToggle } from '../../Hooks/useToggle';
import { StpTagsForm } from './StpTagsGroup';
import { useAppContext } from '../../Hooks/useStoresContext';
interface TableToolbarProps {
    numSelected: number;
}
export function StpTableToolbar({ numSelected }: TableToolbarProps) {
    const { setType } = useAppContext()
    const [group, make] = useToggle(false)
    const handleTagsClick = () => {
        if (group === false) return make.on()
        else {
            setType({
                energy: false,
                hitproof: false,
                multi: false,
                simple: false,
                solarproof: false,
                soundproof: false
            })
            return make.off()
        }
    }
    return (
        <Toolbar
            sx={ {
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                height: 100,
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            } }
        >
            <Stack sx={ { flex: '1 1 20%', flexDirection: 'row', alignItems: 'center' } }>

                { numSelected > 0 ? (
                    <Typography
                        // sx={ { flex: '1 1 20%' } }
                        textAlign={ 'center' }
                        color="inherit"
                        variant="subtitle1"
                        component="div"
                        id="tableTitle"
                    >
                        { numSelected } выбрано
                    </Typography>
                ) : (
                    <Typography
                        // sx={ { flex: '1 1 20%' } }
                        variant="h6"
                        id="tableTitle"
                        component="div"
                    >
                        Выбрать для сравнения (не более 5!)
                    </Typography>
                ) }
            </Stack>
            <Stack sx={ { flexDirection: 'row', alignItems: 'center' } }>

                <StpTagsForm open={ group } />

                <IconButton onClick={ handleTagsClick } sx={ {
                    // bgcolor: 'inherit',
                    borderRadius: 5,
                    bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity + .5)
                } }>
                    {
                        !group && <div className='mx-3 text-xl '>Выбери основные свойства</div>
                    }

                    {
                        group
                            ? <FaAnglesRight />
                            : <FaAnglesLeft />
                    }
                </IconButton>
            </Stack>

        </Toolbar>
    );
}

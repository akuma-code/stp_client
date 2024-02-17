import { Stack } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import { useToggle } from '../../Hooks/useToggle';
import { StpTypeFormGroup } from './StpTagsGroup';
interface TableToolbarProps {
    numSelected: number;
}
export function StpTableToolbar({ numSelected }: TableToolbarProps) {

    const [group, make] = useToggle(false)
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
                        Выбрать стеклопакет
                    </Typography>
                ) }
            </Stack>
            <Stack sx={ { flexDirection: 'row', alignItems: 'center' } }>
                <StpTypeFormGroup open={ group } />

                <IconButton onClick={ make.toggle } sx={ {
                    // bgcolor: 'inherit',
                    borderRadius: 5,
                    bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity + .5)
                } }>
                    {
                        !group && <div className='mx-3 text-xl '>Показать тэги</div>
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

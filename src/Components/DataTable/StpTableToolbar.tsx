import { Button, Stack } from '@mui/material';
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
    const { setType, setQuery } = useAppContext()
    const [showTags, tagControl] = useToggle(false)
    const handleTagsClick = () => {
        if (showTags === false) return tagControl.on()
        else {
            setType({
                energy: false,
                hitproof: false,
                multi: false,
                simple: false,
                solarproof: false,
                soundproof: false
            })
            setQuery(prev => "")
            return tagControl.off()
        }
    }

    const toggledText = showTags ? "" : `Выбери основные свойства`
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
                        Выбрать стеклопакет для сравнения (не более 5!)
                    </Typography>
                ) }
            </Stack>
            <Stack sx={ { flexDirection: 'row', alignItems: 'center' } }>

                <StpTagsForm open={ showTags } />

                <Button variant='contained' color='success'
                    endIcon={ showTags
                        ? <FaAnglesRight />
                        : <FaAnglesLeft />
                    }
                    onClick={ handleTagsClick }
                    sx={ {
                        // bgcolor: (theme) => theme.palette.success.main,
                        // borderRadius: 5,
                        // bgcolor: (theme) => alpha(theme.palette.success.main, theme.palette.action.activatedOpacity + .5),
                        color: 'white',
                        [`& :hover`]: {
                            opacity: .5,
                            // bgcolor: 'Background' 
                        }
                    } }>
                    { toggledText }

                </Button>
            </Stack>

        </Toolbar>
    );
}

import { Avatar, AvatarGroup, Box } from '@mui/material';
import { StpTag } from '../../StpTable/TableObjects';
import { CamAvatar } from '../CamsAvatars';
import { TagAvatarIcon } from '../TagAvatars';



export const camsAvatarGroup = (selected: number[]) => {

    return (
        <AvatarGroup sx={ { justifyContent: 'space-between', transform: 'scale(2)' } } variant='circular'>
            { selected.map(s => {
                if (s !== 1 && s !== 2) return null;
                return <CamAvatar cam_count={ s } key={ s } wh={ '1em' } />;
            }
            ) }
        </AvatarGroup>);

};

export const tagsAvatarGroup = (selected: StpTag[]) => {
    return (
        <Box display={ 'flex' } flexDirection={ 'row' } gap={ 1 } flexWrap={ 'nowrap' } margin={ 0 }>
            { selected?.map(s => <Avatar key={ s } sx={ { height: 24, width: 24, fontSize: 15, bgcolor: '#3d9fe0' } } variant='rounded'>
                { TagAvatarIcon[s as StpTag] }
            </Avatar>
            ) }
        </Box>
    );
};

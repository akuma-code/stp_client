import { GiSoundOff, GiSolarTime } from "react-icons/gi";
import { SlEnergy } from "react-icons/sl";
import { HiTrendingUp } from "react-icons/hi";
import { PiSidebarSimple } from "react-icons/pi";
import { GrMultiple } from "react-icons/gr";
import { StpTags } from "../StpTable/TableObjects";
import { Avatar, AvatarGroup, Stack, SvgIcon, Tooltip, alpha } from "@mui/material";
import { Stp_Tags } from "../../Interfaces/Enums";

export const TagAvatarIcon: Record<StpTags, JSX.Element> = {
    simple: <PiSidebarSimple />,
    energy: <SlEnergy />,
    multi: <GrMultiple />,
    hitproof: <HiTrendingUp />,
    soundproof: <GiSoundOff />,
    solarproof: <GiSolarTime />,

}

export const TagsAvatarGroup = ({ tags }: { tags: StpTags[] }) => {

    return (
        <AvatarGroup max={ 3 } sx={ { maxWidth: 80, justifyContent: 'left', p: 0, m: 0 } } component={ Stack }>
            { tags.sort().map(t =>
                <Avatar key={ t }
                    sx={ {
                        maxWidth: 22,
                        maxHeight: 22,
                        bgcolor: (theme) => alpha(theme.palette.primary.main, .7),
                        color: 'white',
                        mx: .4
                    } }
                >
                    <Tooltip title={ Stp_Tags[t] }>

                        <SvgIcon sx={ { border: '2px solid #303030' } }>{ TagAvatarIcon[t] }</SvgIcon>
                    </Tooltip>
                </Avatar>
            ) }
        </AvatarGroup>
    )
}
import { GiSoundOff, GiSolarTime } from "react-icons/gi";
import { SlEnergy } from "react-icons/sl";
import { HiTrendingUp } from "react-icons/hi";
import { PiSidebarSimple } from "react-icons/pi";
import { GrMultiple } from "react-icons/gr";
import { StpTags } from "../StpTable/TableObjects";
import { Avatar, AvatarGroup, Stack, SvgIcon, Tooltip, alpha } from "@mui/material";
import { Stp_Tags } from "../../Interfaces/Enums";
import { _log } from "../../Helpers/helpersFns";
import { FaTemperatureLow } from "react-icons/fa6";
import { LiaTemperatureHighSolid } from "react-icons/lia";
export const TagAvatarIcon: Record<StpTags, JSX.Element> = {
    simple: <PiSidebarSimple />,
    energy: <LiaTemperatureHighSolid />,
    multi: <GrMultiple />,
    hitproof: <HiTrendingUp />,
    soundproof: <GiSoundOff />,
    solarproof: <GiSolarTime />,

}

export const TagsAvatarGroup = ({ tags, handleTagsClick }: { tags: StpTags[], handleTagsClick?: (tag: StpTags) => void }) => {
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => (tag: StpTags) => {




        if (handleTagsClick) return handleTagsClick(tag)
        else return console.log(tag)
    }
    return (
        <AvatarGroup max={ 3 } sx={ { maxWidth: 80, justifyContent: 'left', p: 0, m: 0 } } component={ Stack }>
            { tags.sort().map(t =>
                <Avatar key={ t } variant="circular"
                    onClick={ e => handleClick(e)(t) }
                    sx={ {
                        maxWidth: 23,
                        maxHeight: 23,
                        bgcolor: (theme) => alpha(theme.palette.primary.main, .7),
                        color: 'whitesmoke',
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
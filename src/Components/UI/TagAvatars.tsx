import { Avatar, AvatarGroup, Stack, SvgIcon, Tooltip, alpha } from "@mui/material";
import { GiSolarTime, GiSoundOff } from "react-icons/gi";
import { GrMultiple } from "react-icons/gr";
import { HiTrendingUp } from "react-icons/hi";
import { LiaTemperatureHighSolid } from "react-icons/lia";
import { PiSidebarSimple } from "react-icons/pi";
import { TbCircleLetterA } from "react-icons/tb";
import { Stp_Tags } from "../../Interfaces/Enums";
import { StpTag } from "../StpTable/TableObjects";
import { _ID } from "../../Helpers/helpersFns";
export const TagAvatarIcon: Record<StpTag, JSX.Element> = {
    simple: <PiSidebarSimple className="text-xl" />,
    energy: <LiaTemperatureHighSolid className="text-xl" />,
    multi: <GrMultiple className="text-xl" />,
    hitproof: <HiTrendingUp className="text-xl" />,
    soundproof: <GiSoundOff className="text-xl" />,
    solarproof: <GiSolarTime className="text-xl" />,
    standart: <TbCircleLetterA className="text-xl bg-orange-600" />

}
const isStandart = (t: StpTag) => t === 'standart'

const highLight = (t: StpTag) => isStandart(t) ? 'red' : '#1267cfc2'
export const TagsAvatarGroup = ({ tags, handleTagsClick }: { tags: StpTag[], handleTagsClick?: (tag: StpTag) => void }) => {
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => (tag: StpTag) => {

        if (handleTagsClick) return handleTagsClick(tag)
        else return console.log(tag)
    }


    return (
        <AvatarGroup max={ 4 } sx={ { maxWidth: 85, justifyContent: 'center', p: 0, m: 0 } } component={ Stack }>
            { tags.sort().map(t =>
                <Tooltip title={ Stp_Tags[t] } key={ _ID() + t }>
                    <Avatar
                        variant="circular"
                        onClick={ e => handleClick(e)(t) }
                        sx={ {
                            maxWidth: 23,
                            maxHeight: 23,
                            bgcolor: highLight(t),
                            color: 'whitesmoke',
                            mx: .4
                        } }
                    >
                        { TagAvatarIcon[t] }

                    </Avatar>
                </Tooltip>
            ) }
        </AvatarGroup>
    )
}
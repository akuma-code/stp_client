import { Container, ImageListItemBar } from '@mui/material'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import React from 'react'
import { LiaExpandArrowsAltSolid } from "react-icons/lia"
import { ModalImg } from '../../Components/UI/ModalImg'
import path_decibel from './../../Components/StpTable/StpPreset/images/decibels.jpg'
import path_energy from './../../Components/StpTable/StpPreset/images/energyCoeefs.jpg'
import path_light from './../../Components/StpTable/StpPreset/images/lightCoeff.jpg'
import path_triplex from './../../Components/StpTable/StpPreset/images/triplex.jpg'
type InfoPageProps = {}

export const StpInfoPage: React.FC<InfoPageProps> = () => {



    return (
        <Container sx={ { p: 4 } } maxWidth='xl' >

            <StpImageList
                imgItems={ itemData }
                width={ 'fit-content' }
                height={ '100%' }
                rowNumber={ 1 }
                colNumber={ 4 }

            />
        </Container>
    )
}

export type ImageListProps = {
    imgItems: PropImageItem[]
    width?: number | string
    height?: number | string
    colNumber?: number
    rowNumber?: number
    rowHeight?: number | 'auto'
}

export type PropImageItem = {
    img_src: string,
    title: | "light" | "decibel" | "energy" | "triplex",
    rows?: number
    cols?: number
    desc?: string
}
export const StpImageList: React.FC<ImageListProps> = ({ imgItems, colNumber = 1, rowNumber = 1, width = 500, height = 450, rowHeight = 'auto' }) => {


    return (
        <ImageList
            sx={ { width, height } }
            cols={ colNumber }
            variant='masonry'
            rowHeight={ rowHeight }
            gap={ 3 }
        >
            {
                imgItems.map((item) => (
                    <ImageListItem
                        key={ item.img_src }
                        rows={ item.rows || 1 }
                        cols={ item.cols || 1 }
                        sx={ { border: '2px double black' } }
                    >
                        <img
                            { ...srcset(item.img_src, 350, item.rows, item.cols) }
                            alt={ item.title }
                            loading="lazy"
                        />
                        <ImageListItemBar
                            title={ item.desc }
                            actionIcon={
                                <ModalImg
                                    tooltip_title='Развернуть изображение'
                                    btn_icon={ <LiaExpandArrowsAltSolid color='black' /> }

                                >
                                    <img
                                        src={ `${item.img_src}?w=${600}&h=${800}&fit=crop&auto=format` }
                                        alt={ item.title }
                                        loading="lazy"
                                    />
                                </ModalImg>
                            }

                        />
                    </ImageListItem>
                )) }
        </ImageList>
    );
}




function srcset(image_src: string, size: number, rows: number = 1, cols: number = 1) {
    return {
        src: `${image_src}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
        srcSet: `${image_src}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format&dpr=2 4x`,
    };
}
const itemData: PropImageItem[] = [
    {
        img_src: path_energy,
        title: 'energy',
        desc: 'Энергитические коэффициенты',
        rows: 1,
        cols: 1,
    },
    {
        img_src: path_light,
        title: 'light',
        desc: 'Световые коэффициенты',
        rows: 1,
        cols: 1,
    },
    {
        img_src: path_decibel,
        title: 'decibel',
        desc: 'Уровень шума',
        cols: 1,
        rows: 3,
    },
    {
        img_src: path_triplex,
        title: 'triplex',
        desc: 'Сертификат соответствия безопасности стеклопакетов с триплексом',
        cols: 1,
        rows: 3
    },
]

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function ImgSetOld(): React.ReactNode {
    return <div className='flex flex-row gap-2 flex-grow flex-wrap p-4 max-h-[70vh]'>
        <div className='flex-grow'>
            <img src={ path_decibel } alt='decibels' loading='lazy' />
        </div>
        <div className='flex-grow'>
            <img src={ path_energy } alt='energy' loading='lazy' />
        </div>
        <div className='flex-grow'>
            <img src={ path_light } alt='light' loading='lazy' />
        </div>
        <div className='flex-grow'>
            <img src={ path_triplex } alt='triplex' loading='lazy' />
        </div>



    </div>
}

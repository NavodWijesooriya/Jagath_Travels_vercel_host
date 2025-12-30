import React from 'react'
import Gallery from '@/components/gallery/Gallery'
import NFlayout from '@/components/nflayout/NFlayout'
import JagathGallery from '@/components/gallery/JagathGallery'



const page = () => {
    return (

        <div>
             <NFlayout>
            <JagathGallery />
             <Gallery />
            </NFlayout>
        </div>
    )
}

export default page
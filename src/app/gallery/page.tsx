import React from 'react';
import ResponsiveImage from '@/components/ui/image/ResponsiveImage';

export default function page() {
    return (
        <div>
            <ResponsiveImage
            src='bread.png'
            />
            <ResponsiveImage
            src='logo_main.png'
            imageSizes={[24,32,48]}
            />
        </div>
    )
}

import ResponsiveImage from './ui/image/ResponsiveImage'
import HeroVideo from './ui/video/herovideo'

export default function Hero({ home = false }: { home?: boolean }) {

    if (home)
        return (
            <div>
                <HeroVideo/>
            </div>
        )

    return (
        <div>
            <ResponsiveImage src="hero.png" className='w-full h-auto' />
        </div>
    )
}

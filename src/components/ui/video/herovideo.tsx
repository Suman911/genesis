export default function HeroVideo() {
    return (
        <div className="relative h-187.5 overflow-hidden">
            {/* Background Video */}
            <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
            >
                <source src="/assets/videos/home_bg.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Transparent Black Overlay */}
            <div className="absolute inset-0 bg-black/30"></div>

            {/* Centered Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                {/* Add your content here */}
            </div>
        </div>
    );
}

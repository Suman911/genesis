interface OptimisedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    sizes?: string; // Custom format: "sm:800 md:1200 lg:1600"
    _static?: boolean;
}

export default function OptimisedImage({ src, sizes = "", _static = true, ...props }: OptimisedImageProps) {
    const basePath = "/assets/images";
    const subfolder = _static ? "opt" : "uploaded";
    const imageSrc = _static ? "" : "uploaded/";

    // Convert `sizes` string into an array of { width, media }
    const imageSizes = sizes
        ? sizes.split(" ").map((size) => {
            const [breakpoint, width] = size.split(":");
            return {
                width: parseInt(width, 10),
                media: getMediaQuery(breakpoint),
            };
        })
        : [];

    function getMediaQuery(bp: string) {
        const breakpoints: Record<string, string> = {
            sm: "(max-width: 640px)",
            md: "(max-width: 768px)",
            lg: "(max-width: 1024px)",
            xl: "(max-width: 1280px)",
            "2xl": "(max-width: 1536px)",
        };
        return breakpoints[bp] || `(max-width: ${bp}px)`;
    }

    return (
        <picture>
            {imageSizes.map(({ width, media }) => (
                <source
                    key={width}
                    srcSet={`${basePath}/${subfolder}/${src.replace(/\.\w+$/, `-${width}.webp`)}`}
                    media={media}
                    type="image/webp"
                />
            ))}

            {/* Fallback to original image */}
            <img src={`${basePath}/${imageSrc}${src}`} loading="lazy" {...props} />
        </picture>
    );
}

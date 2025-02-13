interface OptimisedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    imageSizes?: [number, number, number];
}

export default function OptimisedImage({ src, imageSizes = [480, 800, 1200], ...props }: OptimisedImageProps) {
    const basePath = "/assets/images";

    return (
        <picture>
            {imageSizes.map((size, index) => (
                <source
                    key={size}
                    srcSet={`${basePath}/uploaded/${src.replace(/\.\w+$/, `-${size}.webp`)}`}
                    media={index === 0 ? `(max-width: 480px)` : index === 1 ? `(max-width: 768px)` : `(max-width: 1280px)`}
                    type="image/webp"
                />
            ))}

            {/* Fallback to original image */}
            <img src={`${basePath}/uploaded/${src}`} loading="lazy" {...props} />
        </picture>
    );
}

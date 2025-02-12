interface OptimisedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    imageSizes?: [number, number, number];
}

export default function OptimisedImage({ src, imageSizes = [480, 800, 1200], ...props }: OptimisedImageProps) {
    const basePath = "/assets/images";

    const srcSet: string = imageSizes
        .map((size) => `${basePath}/uploaded/${src.replace(/\.\w+$/, `-${size}.webp`)} ${size}w`)
        .join(", ");

    return (
        <img
            src={`${basePath}/${src}`}
            srcSet={srcSet}
            sizes="(max-width: 600px) 480px, (max-width: 1024px) 800px, 1200px"
            alt=""
            loading="lazy"
            {...props}
        />
    );
}


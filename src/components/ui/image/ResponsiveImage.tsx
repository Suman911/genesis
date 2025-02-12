import fs from "fs";
import path from "path";

interface ResponsiveImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    imageSizes?: [number, number, number];
}

export default function ResponsiveImage({ src, imageSizes = [480, 800, 1200], ...props }: ResponsiveImageProps) {
    const basePath = "/assets/images";

    const srcSet: string = imageSizes
        .map((size) => `${basePath}/opt/${src.replace(/\.\w+$/, `-${size}.webp`)} ${size}w`)
        .join(", ");

    const sizes = `(max-width: 600px) ${imageSizes[0]}px, (max-width: 1024px) ${imageSizes[1]}px, ${imageSizes[2]}px`;

    if (typeof window === "undefined") {
        const metadataPath: string = path.join(process.cwd(), "public/assets/image-metadata.json");

        let metadata: Record<string, { size: number; path: string }[]> = {};
        if (fs.existsSync(metadataPath)) {
            metadata = JSON.parse(fs.readFileSync(metadataPath, "utf-8")) as typeof metadata;
        }

        metadata[src] = imageSizes.map((size) => ({
            size,
            path: `/public${basePath}/opt/${src.replace(/\.\w+$/, `-${size}.webp`)}`,
        }));

        fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
    }

    return (
        <img
            src={`${basePath}/${src}`}
            srcSet={srcSet}
            sizes={sizes}
            alt=""
            loading="lazy"
            {...props}
        />
    );
}

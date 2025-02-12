import fs from "fs";
import path from "path";
import sharp from "sharp";

interface ResponsiveImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    imageSizes?: [number, number, number];
}

export default function ResponsiveImage({ src, imageSizes = [480, 800, 1200], ...props }: ResponsiveImageProps) {
    const basePath = "/assets/images";
    const optimizedPath = `${basePath}/opt`;
    const metadataPath = path.join(process.cwd(), "public/assets/images/image-metadata.json");
    const imagesDir = path.join(process.cwd(), "public/assets/images");
    const outputDir = path.join(imagesDir, "opt");

    if (typeof window === "undefined") {
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        // Read metadata
        let metadata: Record<string, { size: number; path: string }[]> = {};
        if (fs.existsSync(metadataPath)) {
            metadata = JSON.parse(fs.readFileSync(metadataPath, "utf-8"));
        }

        const previousSizes = new Set(metadata[src]?.map((entry) => entry.size) || []);
        const newSizes = new Set(imageSizes);

        // Identify sizes to delete (present before but not in the new set)
        const sizesToDelete = [...previousSizes].filter((size) => !newSizes.has(size));

        // Identify sizes to create (newly requested but not yet present)
        const sizesToCreate = [...newSizes].filter((size) => !previousSizes.has(size));

        metadata[src] = metadata[src]?.filter((entry) => !sizesToDelete.includes(entry.size)) || [];

        for (const size of sizesToCreate) {
            const outputFileName = src.replace(/\.\w+$/, `-${size}.webp`);
            const outputPath = path.join(outputDir, outputFileName);
            const inputPath = path.join(imagesDir, src);

            if (fs.existsSync(inputPath) && !fs.existsSync(outputPath)) {
                sharp(inputPath).resize(size).toFormat("webp").toFile(outputPath);
            }

            metadata[src].push({
                size,
                path: `/assets/images/opt/${outputFileName}`,
            });
        }

        // Delete only the unused sizes for this specific image
        for (const size of sizesToDelete) {
            const unusedFile = src.replace(/\.\w+$/, `-${size}.webp`);
            const unusedPath = path.join(outputDir, unusedFile);
            if (fs.existsSync(unusedPath)) {
                fs.unlinkSync(unusedPath);
            }
        }

        // Save updated metadata
        fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
    }

    return (
        <picture>
            {imageSizes.map((size, index) => (
                <source
                    key={size}
                    srcSet={`${optimizedPath}/${src.replace(/\.\w+$/, `-${size}.webp`)}`}
                    media={index === 0 ? `(max-width: 640px)` : index === 1 ? `(max-width: 1024px)` : `(max-width: 1536px)`}
                    type="image/webp"
                />
            ))}
            <img src={`${basePath}/${src}`} loading="lazy" {...props} />
        </picture>
    );
}

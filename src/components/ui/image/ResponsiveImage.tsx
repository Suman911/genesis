import fs from "fs";
import path from "path";
import sharp from "sharp";

interface ImageSize {
    width: number;
    breakpoint: string; // Media query string
}

interface ResponsiveImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    sizes?: string; // Custom string format like "md:1200 sm:800 lg:1600"
}

export default function ResponsiveImage({ src, sizes = "", ...props }: ResponsiveImageProps) {
    const basePath = "/assets/images";
    const optimizedPath = `${basePath}/opt`;
    const metadataPath = path.join(process.cwd(), "public/assets/images/image-metadata.json");
    const imagesDir = path.join(process.cwd(), "public/assets/images");
    const outputDir = path.join(imagesDir, "opt");

    // Convert sizes string to an array of objects
    const imageSizes: ImageSize[] = sizes
        ? sizes.split(" ").map((size) => {
            const [breakpoint, width] = size.split(":");
            return {
                width: parseInt(width, 10),
                breakpoint: getMediaQuery(breakpoint),
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

    if (typeof window === "undefined" && imageSizes.length > 0) {
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        // Read metadata
        let metadata: Record<string, { size: number; path: string }[]> = {};
        if (fs.existsSync(metadataPath)) {
            metadata = JSON.parse(fs.readFileSync(metadataPath, "utf-8"));
        }

        const previousSizes = new Set(metadata[src]?.map((entry) => entry.size) || []);
        const newSizes = new Set(imageSizes.map((size) => size.width));

        // Identify sizes to delete (present before but not in the new set)
        const sizesToDelete = [...previousSizes].filter((size) => !newSizes.has(size));

        // Identify sizes to create (newly requested but not yet present)
        const sizesToCreate = imageSizes.filter((size) => !previousSizes.has(size.width));

        metadata[src] = metadata[src]?.filter((entry) => !sizesToDelete.includes(entry.size)) || [];

        for (const { width } of sizesToCreate) {
            const outputFileName = src.replace(/\.\w+$/, `-${width}.webp`);
            const outputPath = path.join(outputDir, outputFileName);
            const inputPath = path.join(imagesDir, src);

            if (fs.existsSync(inputPath) && !fs.existsSync(outputPath)) {
                sharp(inputPath).resize(width).toFormat("webp").toFile(outputPath);
            }

            metadata[src].push({
                size: width,
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
            {imageSizes.map(({ width, breakpoint }) => (
                <source
                    key={width}
                    srcSet={`${optimizedPath}/${src.replace(/\.\w+$/, `-${width}.webp`)}`}
                    media={breakpoint}
                    type="image/webp"
                />
            ))}

            {/* Fallback to original image */}
            <img alt="" src={`${basePath}/${src}`} loading="lazy" {...props} />
        </picture>
    );
}

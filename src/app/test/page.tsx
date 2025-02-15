import ResponsiveImage from "@/components/ui/image/ResponsiveImage";

export default function page() {
    return (
        <div>
            <ResponsiveImage
                src="hero.png"
                alt="image"
                className=""
                sizes="md:1200"
            />
        </div>
    )
}

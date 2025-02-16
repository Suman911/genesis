export default function ImageFrame({children }:{children: React.ReactNode}) {
    return (
        <div className="xl:border-50 border-30 border-primary border-y-transparent">
            {children}
        </div>
    )
}

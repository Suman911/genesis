export default function Paragraph({children }:{children: React.ReactNode[]}) {
    const [scope,title,...para]=children
    return (
        <div className="p-10">
            <div className="text-primary text-2xl relative font-semibold px-6 peer">{scope}</div>
            <div className="inline-block absolute mx-6 h-1 w-8 rounded-full bg-gradient-to-r from-primary to-orange-400 duration-500 peer-hover:w-32"></div>
            <h1 className="font-light font-serif text-4xl p-6">
                {title}
            </h1>
            <p className="font-medium text-justify my-4 cols">
                {para}
            </p>
        </div>
    );
}
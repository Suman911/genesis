import React from 'react'
import { Heading, TopHeading, MainHeading } from "@/components/ui/text/heading";
import Link from 'next/link';

export default function Activites() {
    // const [notices, setNotices] = useState<NoticeType[]>([]);
    //     const [loading, setLoading] = useState(true);
    //     const [error, setError] = useState("");

    //     useEffect(() => {
    //         const fetchNotices = async () => {
    //             try {
    //                 const response = await axios.get("/notices.json");
    //                 setNotices(response.data.notices);
    //             } catch (err) {
    //                 setError("Failed to load notices. Please try again later.");
    //             } finally {
    //                 setLoading(false);
    //             }
    //         };

    //         fetchNotices();
    //     }, []);

    const Workshops = [
        {
            id: 1,
            image: '1736924176_workshop.png',
            desc: 'ONE DAY WORKSHOP ON ELECTROPHORESIS',
            date: '2023-11-05',
            link: '#'
        },
        {
            id: 2,
            image: '1736924309_offer.jpg',
            desc: '2 Days Hands-On Workshop on Western Blot',
            date: '2024-12-22',
            link: '#'
        }
    ]

    return (
        <div className="p-2 py-10 xl:px-8 text-ash">
            <Heading>
                <TopHeading pageTitle="Activities"/>
                <MainHeading>Current Workshop</MainHeading>
            </Heading>

            {/* {loading && <p className="text-center text-gray-500">Loading notices...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}

            {!loading && !error && (
                <div className="py-8 space-y-4 max-w-[1000px] mx-auto">
                    {notices.map((notice) => (
                        <Notice key={notice.id} notice={notice} />
                    ))}
                </div>
            )} */}


            <div className='flex gap-12 justify-center flex-wrap p-10'>
                {Workshops.map((workshop) => (
                    <WorkshopCard key={workshop.id} workshop={workshop} />
                ))}
            </div>

        </div>
    )
}

interface Workshop {
    id: number;
    image: string;
    desc: string;
    date: string;
    link: string;
}

interface WorkshopCardProps extends React.HTMLAttributes<HTMLDivElement> {
    workshop: Workshop;
}


export function WorkshopCard({ workshop, className = "", ...props }: WorkshopCardProps) {
    return (
        <div
            {...props}
            className={`relative h-100 rounded-3xl overflow-hidden group text-xl text-white ${className}`}
        >
            <Link href={workshop.link}>
                <img
                    src={`/assets/images/${workshop.image}`}
                    loading="lazy"
                    alt=""
                    className="h-full w-auto transform transition duration-500 group-hover:scale-110"
                />
                <div
                    className="absolute h-full w-full inset-0 p-10 bg-linear-to-t from-indigo-800/90 to-indigo-500/10 flex flex-col justify-end transform translate-y-full transition-all duration-500 group-hover:translate-y-0"
                >
                    <h3 className="font-extrabold">{workshop.desc}</h3>
                    <br />
                    <div className="">{workshop.date}</div>
                </div>
            </Link>
        </div>

    )
}

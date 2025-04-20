'use client'

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

type ImageType = {
    id: number
    src: string
}

const images: ImageType[] = [
    { id: 1, src: 'gallery_img_1.jpeg' },
    { id: 2, src: 'gallery_img_2.jpg' },
    { id: 5, src: 'gallery_img_5.jpg' },
    { id: 20, src: 'gallery_img_20.jpg' },
    { id: 6, src: 'gallery_img_6.jpg' },
    { id: 39, src: 'gallery_img_39.jpg' },
    { id: 8, src: 'gallery_img_8.jpg' },
    { id: 9, src: 'gallery_img_9.jpg' },
    { id: 10, src: 'gallery_img_10.jpg' },
    { id: 31, src: 'gallery_img_31.jpg' },
    { id: 12, src: 'gallery_img_12.jpg' },
    { id: 13, src: 'gallery_img_13.jpg' },
    { id: 37, src: 'gallery_img_37.jpg' },
    { id: 41, src: 'gallery_img_41.jpg' },
    { id: 15, src: 'gallery_img_15.jpg' },
    { id: 16, src: 'gallery_img_16.jpg' },
    { id: 17, src: 'gallery_img_17.jpg' },
    { id: 18, src: 'gallery_img_18.jpg' },
    { id: 7, src: 'gallery_img_7.jpg' },
    { id: 21, src: 'gallery_img_21.jpg' },
    { id: 22, src: 'gallery_img_22.jpeg' },
    { id: 3, src: 'gallery_img_3.jpg' },
    { id: 25, src: 'gallery_img_25.jpg' },
    { id: 23, src: 'gallery_img_23.jpeg' },
    { id: 26, src: 'gallery_img_26.jpg' },
    { id: 27, src: 'gallery_img_27.jpg' },
    { id: 28, src: 'gallery_img_28.jpg' },
    { id: 11, src: 'gallery_img_11.jpg' },
    { id: 29, src: 'gallery_img_29.jpg' },
    { id: 4, src: 'gallery_img_4.jpg' },
    { id: 30, src: 'gallery_img_30.jpg' },
    { id: 24, src: 'gallery_img_24.jpeg' },
    { id: 32, src: 'gallery_img_32.jpg' },
    { id: 33, src: 'gallery_img_33.jpg' },
    { id: 14, src: 'gallery_img_14.jpg' },
    { id: 34, src: 'gallery_img_34.jpg' },
    { id: 35, src: 'gallery_img_35.jpg' },
    { id: 36, src: 'gallery_img_36.jpg' },
    { id: 38, src: 'gallery_img_38.jpg' },
    { id: 40, src: 'gallery_img_40.jpg' },
    { id: 42, src: 'gallery_img_42.jpg' },
    { id: 19, src: 'gallery_img_19.jpg' },
]

export default function Page() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null)
    const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 })

    const handleImageClick = (e: React.MouseEvent, src: string) => {
        const { clientX, clientY } = e
        setClickPosition({ x: clientX, y: clientY })
        setSelectedImage(src)
    }

    return (
        <div className="group container mx-auto p-4">
            {/* <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-5 space-y-5">
                {images.map((image) => (
                    <div
                        key={image.id}
                        className="relative overflow-hidden rounded-2xl break-inside-avoid w-full cursor-pointer"
                        onClick={(e) => handleImageClick(e, image.src)}
                    >
                        <img
                            src={`/assets/images/gallery/${image.src}`}
                            alt={`Gallery item ${image.id}`}
                            loading="lazy"
                            className="w-full h-auto object-cover transition-transform duration-300 hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                    </div>
                ))}
            </div> */}
            <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-5 space-y-5">
                {images.map((image) => (
                    <div
                        key={image.id}
                        className="relative overflow-hidden rounded-2xl break-inside-avoid w-full group/item"
                        onClick={(e) => handleImageClick(e, image.src)}
                    >
                        <img
                            src={`/assets/images/gallery/${image.src}`}
                            alt={`Gallery item ${image.id}`}
                            loading="lazy"
                            className="w-full h-auto transition-transform duration-500 transform group-hover/item:scale-110 object-cover"
                        />

                        {/* Overlay for all except hovered */}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/item:opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                    </div>
                ))}
            </div>

            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.div
                            className="relative max-w-4xl w-full p-4"
                            initial={{
                                scale: 0.5,
                                opacity: 0,
                                x: clickPosition.x - window.innerWidth / 2,
                                y: clickPosition.y - window.innerHeight / 2
                            }}
                            animate={{
                                scale: 1,
                                opacity: 1,
                                x: 0,
                                y: 0
                            }}
                            exit={{
                                scale: 0.5,
                                opacity: 0,
                                x: clickPosition.x - window.innerWidth / 2,
                                y: clickPosition.y - window.innerHeight / 2
                            }}
                            transition={{ 
                                type: 'spring',
                                stiffness: 300,
                                damping: 25
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                className="absolute top-2 right-2 w-10 h-10 rounded-full flex items-center justify-center text-white text-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition"
                                onClick={() => setSelectedImage(null)}
                            >
                                &times;
                            </button>
                            <img
                                src={`/assets/images/gallery/${selectedImage}`}
                                alt="Enlarged"
                                className="max-h-[90vh] w-auto mx-auto rounded-xl shadow-2xl"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
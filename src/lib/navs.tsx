import { Location, Navs } from "./definitions";
import { FaHome } from "react-icons/fa";
import { IoIosInformationCircle } from "react-icons/io";
import { HiMiniAcademicCap } from "react-icons/hi2";
import { LiaIndustrySolid } from "react-icons/lia";
import { FcBusinessman } from "react-icons/fc";
import { GrGallery } from "react-icons/gr";
import { TiContacts } from "react-icons/ti";

export function flattenNavs(navs: Navs[]): Location[] {
    const result: Location[] = [];
    for (const nav of navs) {
        if ("group" in nav && Array.isArray(nav.locations)) {
            result.push(...nav.locations);
        } else {
            result.push(nav as Location);
        }
    }
    return result;
}

export const navs: Navs[] = [
    { path: '/', name: 'Home', icon: <FaHome /> },
    { path: '/story/', name: 'Our Story', icon: <IoIosInformationCircle /> },
    {
        group: "Career",
        locations: [
            { path: '/career/academic/', name: 'Academic', icon: <HiMiniAcademicCap /> },
            { path: '/career/training/', name: 'Industry Training', icon: <LiaIndustrySolid /> },
            { path: '/career/profession/', name: 'Professional Grooming', icon: <FcBusinessman /> }
        ]
    },
    { path: '/gallery/', name: 'Gallery', icon: <GrGallery /> },
    { path: '/contact/', name: 'Contact', icon: <TiContacts /> }
];

export const supports: Location[] = [
    { path: '/', name: 'Blog' },
    { path: '/', name: 'Notice Board' },
    { path: '/', name: 'Workshop' },
    { path: '/', name: 'Terms' },
    { path: '/', name: 'Privacy' },
    { path: '/', name: 'Cookie policy' },
];


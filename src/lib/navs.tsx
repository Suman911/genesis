import { Location } from "./definitions";
import { FaHome } from "react-icons/fa";
import { IoIosInformationCircle } from "react-icons/io";
import { HiMiniAcademicCap } from "react-icons/hi2";
import { LiaIndustrySolid } from "react-icons/lia";
import { FcBusinessman } from "react-icons/fc";
import { GrGallery } from "react-icons/gr";
import { TiContacts } from "react-icons/ti";

export const navs:Location[]= [
    { path: '/', name: 'Home',icon:<FaHome/> },
    { path: '/story/', name: 'Our Story' ,icon:<IoIosInformationCircle/>},
    { path: '/academic/', name: 'Academic',icon: <HiMiniAcademicCap /> },
    { path: '/training/', name: 'Industry Training' ,icon: <LiaIndustrySolid/> },
    { path: '/profession/', name: 'Professional Grooming' ,icon:<FcBusinessman/>},
    { path: '/gallery/', name: 'Gallery' ,icon:<GrGallery/>},
    { path: '/contact/', name: 'Contact' ,icon: <TiContacts/>}
]

export const supports: Location[] = [
    { path: '/', name: 'Blog' },
    { path: '/', name: 'Notice Board' },
    { path: '/', name: 'Workshop' },
    { path: '/', name: 'Terms' },
    { path: '/', name: 'Privacy' },
    { path: '/', name: 'Cookie policy' },
]


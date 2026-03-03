export type Shape = {
    id: number;
    x: number;
    y: number;
    size: number;
    opacity: number;
    type: string;
    rotation: number;
    rotationSpeed: number;
    moveX: number;
    moveY: number;
    moveSpeed: number;
    pulseSpeed: number;
    isStatic: boolean;
    fadeOut?: boolean;
};
// SVG shapes for UFOs, rockets, and static tech elements
const renderShape = (shape: Shape) => {
    const style = {
        position: "absolute" as const,
        left: `${shape.x}px`,
        top: `${shape.y}px`,
        width: `${shape.size}px`,
        height: `${shape.size}px`,
        transform: `rotate(${shape.rotation}deg)`,
        pointerEvents: "none" as const,
    };
    switch (shape.type) {
        case 'bacteria':
            return (
                <div key={shape.id} style={style}>
                    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                        <ellipse cx="100" cy="100" rx="60" ry="40" fill="#a8e6cf" stroke="#34495e" strokeWidth="3" />
                        <circle cx="80" cy="95" r="6" fill="#ff8a65" />
                        <circle cx="120" cy="105" r="5" fill="#ffd54f" />
                        <circle cx="100" cy="115" r="7" fill="#ba68c8" />
                        <circle cx="90" cy="85" r="4" fill="#4dd0e1" />
                        <circle cx="110" cy="90" r="3" fill="#81c784" />
                        <path d="M80,110 Q100,80 120,110" stroke="#f06292" strokeWidth="2" fill="none" />
                        <path d="M85,110 Q100,85 115,110" stroke="#f06292" strokeWidth="2" fill="none" />
                        <path d="M40,100 Q20,110 30,130" stroke="#2c3e50" strokeWidth="2" fill="none" />
                        <path d="M160,90 Q180,80 170,60" stroke="#2c3e50" strokeWidth="2" fill="none" />
                        <path d="M160,110 Q180,120 170,140" stroke="#2c3e50" strokeWidth="2" fill="none" />
                    </svg>
                </div>
            );
        case 'insect':
            return (
                <div key={shape.id} style={style}>
                    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" width="32"
                        height="32">
                        <ellipse cx="100" cy="100" rx="25" ry="50" fill="#4b4b4b" />
                        <circle cx="100" cy="45" r="12" fill="#333" />
                        <path d="M100,100 Q60,90 40,130 Q60,140 100,120" fill="#b0c4de" />
                        <path d="M100,100 Q140,90 160,130 Q140,140 100,120" fill="#b0c4de" />
                        <path d="M100,100 Q60,90 40,130 Q60,140 100,120" stroke="#666" fill="none" />
                        <path d="M100,100 Q140,90 160,130 Q140,140 100,120" stroke="#666" fill="none" />
                        <line x1="75" y1="110" x2="50" y2="140" stroke="#333" />
                        <line x1="125" y1="110" x2="150" y2="140" stroke="#333" />
                        <line x1="75" y1="90" x2="50" y2="80" stroke="#333" />
                        <line x1="125" y1="90" x2="150" y2="80" stroke="#333" />
                        <line x1="93" y1="35" x2="80" y2="20" stroke="#222" />
                        <line x1="107" y1="35" x2="120" y2="20" stroke="#222" />
                    </svg>
                </div>
            );
        case 'testtube':
            return (
                <div key={shape.id} style={style}>
                    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" width="32"
                        height="32">
                        <rect x="90" y="40" width="20" height="100" rx="10" fill="#e0f7fa" stroke="#00796b" strokeWidth="3" />
                        <rect x="92" y="90" width="16" height="48" rx="8" fill="#4dd0e1" />
                        <ellipse cx="100" cy="90" rx="8" ry="2" fill="#26c6da" />
                        <circle cx="100" cy="100" r="2" fill="#00acc1" />
                        <circle cx="98" cy="110" r="1.5" fill="#00acc1" />
                        <circle cx="102" cy="120" r="1.8" fill="#00acc1" />
                        <path d="M94,42 Q92,70 94,100" stroke="#ffffff99" strokeWidth="2" fill="none" />
                        <ellipse cx="100" cy="142" rx="12" ry="4" fill="#b0bec5" opacity="0.3" />
                    </svg>
                </div>
            );
        case 'injection':
            return (
                <div key={shape.id} style={style}>
                    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" width="32"
                        height="32">
                        <rect x="140" y="90" width="40" height="4" fill="#90a4ae" />
                        <polygon points="180,90 195,92 180,94" fill="#607d8b" />
                        <rect x="60" y="80" width="80" height="20" fill="#bbdefb" stroke="#1976d2" strokeWidth="2" />
                        <rect x="62" y="82" width="50" height="16" fill="#4fc3f7" />
                        <rect x="30" y="85" width="30" height="10" fill="#cfd8dc" stroke="#607d8b" strokeWidth="2" />
                        <rect x="20" y="80" width="10" height="20" fill="#90a4ae" />
                        <line x1="70" y1="80" x2="70" y2="100" stroke="#0d47a1" strokeWidth="1" />
                        <line x1="80" y1="80" x2="80" y2="100" stroke="#0d47a1" strokeWidth="1" />
                        <line x1="90" y1="80" x2="90" y2="100" stroke="#0d47a1" strokeWidth="1" />
                        <line x1="100" y1="80" x2="100" y2="100" stroke="#0d47a1" strokeWidth="1" />
                        <line x1="110" y1="80" x2="110" y2="100" stroke="#0d47a1" strokeWidth="1" />
                    </svg>
                </div>
            );
        case 'microscope':
            return (
                <div key={shape.id} style={style}>
                    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" width="64"
                        height="64">
                        <rect x="60" y="160" width="80" height="10" fill="#546e7a" />
                        <path d="M90 150 Q80 100 120 60" stroke="#455a64" strokeWidth="12" fill="none" />
                        <rect x="110" y="50" width="12" height="50" fill="#78909c" />
                        <rect x="110" y="40" width="12" height="10" fill="#37474f" />
                        <rect x="85" y="130" width="30" height="5" fill="#90a4ae" />
                        <rect x="88" y="131" width="24" height="2" fill="#ffab91" />
                        <circle cx="130" cy="110" r="6" fill="#607d8b" />
                    </svg>
                </div>
            );
        case 'biocell':
            return (
                <div key={shape.id} style={style}>
                    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" width="32"
                        height="32">
                        <ellipse cx="100" cy="100" rx="70" ry="50" fill="#e1f5fe" stroke="#0288d1" strokeWidth="3" />
                        <circle cx="100" cy="100" r="20" fill="#4fc3f7" stroke="#0277bd" strokeWidth="2" />
                        <circle cx="105" cy="105" r="6" fill="#01579b" />
                        <ellipse cx="75" cy="90" rx="10" ry="5" fill="#ff8a65" />
                        <ellipse cx="125" cy="110" rx="10" ry="5" fill="#ff8a65" />
                        <circle cx="80" cy="115" r="4" fill="#81c784" />
                        <circle cx="115" cy="80" r="3" fill="#ba68c8" />
                        <circle cx="95" cy="125" r="3" fill="#4db6ac" />
                    </svg>
                </div>
            );
        case 'dna':
            return (
                <div key={shape.id} style={style}>
                    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" width="32"
                        height="32">
                        <path d="M60,20 C70,40 70,60 60,80 C50,100 50,120 60,140 C70,160 70,180 60,200" stroke="#3f51b5" strokeWidth="4" fill="none" />
                        <path d="M140,20 C130,40 130,60 140,80 C150,100 150,120 140,140 C130,160 130,180 140,200" stroke="#e91e63" strokeWidth="4" fill="none" />
                        <line x1="60" y1="20" x2="140" y2="20" stroke="#4caf50" strokeWidth="2" />
                        <line x1="60" y1="40" x2="140" y2="40" stroke="#ff9800" strokeWidth="2" />
                        <line x1="60" y1="60" x2="140" y2="60" stroke="#009688" strokeWidth="2" />
                        <line x1="60" y1="80" x2="140" y2="80" stroke="#ffc107" strokeWidth="2" />
                        <line x1="60" y1="100" x2="140" y2="100" stroke="#00bcd4" strokeWidth="2" />
                        <line x1="60" y1="120" x2="140" y2="120" stroke="#8bc34a" strokeWidth="2" />
                        <line x1="60" y1="140" x2="140" y2="140" stroke="#f44336" strokeWidth="2" />
                        <line x1="60" y1="160" x2="140" y2="160" stroke="#9c27b0" strokeWidth="2" />
                        <line x1="60" y1="180" x2="140" y2="180" stroke="#00acc1" strokeWidth="2" />
                        <line x1="60" y1="200" x2="140" y2="200" stroke="#cddc39" strokeWidth="2" />
                    </svg>
                </div>
            );
        case 'chemical':
            return (
                <div key={shape.id} style={style}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="32" height="32" fill="none">
                        <g stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="26" y="2" width="12" height="10" fill="#ccc" />
                            <rect x="24" y="0" width="16" height="4" fill="#333" />
                            <path d="M26 12h12v6a6 6 0 0 1-6 6h0a6 6 0 0 1-6-6v-6z" fill="#e0e0e0" />
                            <path d="M20 18h24v26a12 12 0 0 1-12 12h0a12 12 0 0 1-12-12V18z" fill="#a3d2ca" />
                            <rect x="24" y="28" width="16" height="10" rx="2" fill="#fff" stroke="#000" />
                            <circle cx="32" cy="33" r="2" fill="#000" />
                            <circle cx="30" cy="32" r="0.5" fill="#fff" />
                            <circle cx="34" cy="32" r="0.5" fill="#fff" />
                            <path d="M31 35h2" stroke="#000" strokeWidth="1" />
                        </g>
                    </svg>
                </div>
            );
        default:
            return null;
    }
};
export default renderShape;
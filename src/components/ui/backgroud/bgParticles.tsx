'use client'
import { useEffect, useState, useMemo, memo } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine, ISourceOptions } from "@tsparticles/engine";

const BgParticles = () => {
    const [init, setInit] = useState(false);

    useEffect(() => {
        if (!init) {
            initParticlesEngine(async (engine: Engine) => {
                await loadSlim(engine);
            }).then(() => setInit(true));
        }
    }, [init]);

    const options: ISourceOptions = useMemo(() => ({
        background: { color: { value: "transparent" } },
        fpsLimit: 60,
        interactivity: {
            events: { onHover: { enable: true, mode: "connect" }, resize: { enable: true } },
            modes: { connect: { distance: 200, radius: 150, opacity: 0.2 } }
        },
        particles: {
            color: { value: "#8B5CF6" },
            links: { color: "#9b87f5", distance: 200, enable: true, opacity: 0.2, width: 1 },
            move: { enable: true, speed: 3, random: true, outModes: { default: "bounce" } },
            number: { density: { enable: true, area: 500 }, value: 100 },
            opacity: { value: 0.3, animation: { enable: true, speed: 1, sync: false } },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 3 }, animation: { enable: true, speed: 2, sync: false } }
        },
        detectRetina: true
    }), []);

    return init ? <Particles id="tsparticles" options={options} /> : null;
};

export default memo(BgParticles);
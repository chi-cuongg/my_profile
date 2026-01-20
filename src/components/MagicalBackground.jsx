import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';

const MagicalBackground = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [fireflies, setFireflies] = useState([]);
    const [floatingSpells, setFloatingSpells] = useState([]);
    const [shootingStars, setShootingStars] = useState([]);
    const SPELLS = ["Lumos", "Accio", "Alohomora", "Wingardium Leviosa", "Expecto Patronum", "Revelio"];

    const { scrollY } = useScroll();

    // Parallax Transforms
    const y1 = useTransform(scrollY, [0, 1000], [0, 200]);   // Deep stars (slow)
    const y2 = useTransform(scrollY, [0, 1000], [0, 400]);   // Mid stars
    const y3 = useTransform(scrollY, [0, 1000], [0, 600]);   // Near stars (fast)

    // Smooth mouse movement for parallax
    const mouseX = useSpring(0, { stiffness: 50, damping: 20 });
    const mouseY = useSpring(0, { stiffness: 50, damping: 20 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const targetX = (clientX - window.innerWidth / 2) * 0.05;
            const targetY = (clientY - window.innerHeight / 2) * 0.05;

            mouseX.set(targetX);
            mouseY.set(targetY);
            setMousePosition({ x: clientX, y: clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);

        // Init Fireflies
        const initialFireflies = Array.from({ length: 20 }).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 3 + 1,
            duration: Math.random() * 10 + 10,
            delay: Math.random() * 5
        }));
        setFireflies(initialFireflies);

        // Spell Spawner
        const spellInterval = setInterval(() => {
            if (Math.random() > 0.6) {
                const spell = {
                    id: Date.now(),
                    text: SPELLS[Math.floor(Math.random() * SPELLS.length)],
                    x: Math.random() * 80 + 10,
                    y: Math.random() * 80 + 10,
                    scale: Math.random() * 0.5 + 0.8
                };
                setFloatingSpells(prev => [...prev.slice(-4), spell]);

                setTimeout(() => {
                    setFloatingSpells(prev => prev.filter(s => s.id !== spell.id));
                }, 4000);
            }
        }, 2500);

        // Shooting Star Spawner
        const shootingStarInterval = setInterval(() => {
            if (Math.random() > 0.5) { // 50% chance every 2.5s -> Frequent enough
                const id = Date.now();
                const star = {
                    id,
                    x: Math.random() * 100,
                    y: Math.random() * 60, // Top 60%
                    scale: Math.random() * 0.5 + 0.5
                };
                setShootingStars(prev => [...prev, star]);
                setTimeout(() => {
                    setShootingStars(prev => prev.filter(s => s.id !== id));
                }, 1500);
            }
        }, 2000);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            clearInterval(spellInterval);
            clearInterval(shootingStarInterval);
        };
    }, [mouseX, mouseY]);

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: -1,
            pointerEvents: 'none',
            overflow: 'hidden',
            background: 'linear-gradient(to bottom, #050505, #0a0a0a)'
        }}>

            {/* --- Deep Stars Layer (Auto Drift) --- */}
            <motion.div
                animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
                transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
                style={{
                    position: 'absolute', inset: -50,
                    backgroundImage: 'radial-gradient(1px 1px at 50% 50%, rgba(255,255,255,0.4) 1px, transparent 0)',
                    backgroundSize: '80px 80px',
                    y: y1,
                    x: mouseX,
                    opacity: 0.4
                }}
            />

            {/* --- Mid Stars Layer (Auto Drift) --- */}
            <motion.div
                animate={{ backgroundPosition: ["0% 0%", "-50% 100%"] }}
                transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
                style={{
                    position: 'absolute', inset: -50,
                    backgroundImage: 'radial-gradient(1.5px 1.5px at 30% 70%, rgba(255,255,255,0.5) 1px, transparent 0)',
                    backgroundSize: '120px 120px',
                    y: y2,
                    x: useTransform(mouseX, v => v * 1.5),
                    opacity: 0.6
                }}
            />

            {/* --- Shooting Stars --- */}
            <AnimatePresence>
                {shootingStars.map(star => (
                    <motion.div
                        key={star.id}
                        initial={{ x: `${star.x}vw`, y: `${star.y}vh`, opacity: 1, scale: star.scale }}
                        animate={{ x: `${star.x - 20}vw`, y: `${star.y + 20}vh`, opacity: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        style={{
                            position: "absolute",
                            width: "2px",
                            height: "2px",
                            background: "white",
                            boxShadow: "0 0 10px 2px rgba(255, 255, 255, 0.8)",
                            zIndex: 10 // Ensure it's above background/mist
                        }}
                    >
                        {/* Tail */}
                        <div style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%) rotate(135deg) translateX(30px)", // 135deg points South-West
                            width: "80px", // Longer tail
                            height: "2px",
                            background: "linear-gradient(90deg, transparent, white)"
                        }} />
                    </motion.div>
                ))}
            </AnimatePresence>


            {/* --- Ambient Golden Mist / Glow (Enhanced) --- */}
            <motion.div
                animate={{
                    opacity: [0.2, 0.4, 0.2],
                    scale: [1, 1.2, 1],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                style={{
                    position: 'absolute',
                    top: '20%',
                    left: '10%',
                    width: '60vw',
                    height: '60vw',
                    background: 'radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, transparent 70%)',
                    filter: 'blur(60px)',
                    zIndex: 0
                }}
            />
            <motion.div
                animate={{
                    opacity: [0.2, 0.3, 0.2],
                    scale: [1.2, 1, 1.2],
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                style={{
                    position: 'absolute',
                    bottom: '10%',
                    right: '10%',
                    width: '70vw',
                    height: '70vw',
                    background: 'radial-gradient(circle, rgba(16, 26, 64, 0.25) 0%, transparent 70%)',
                    filter: 'blur(70px)',
                    zIndex: 0
                }}
            />

            {/* --- Fireflies --- */}
            {fireflies.map(fly => (
                <motion.div
                    key={fly.id}
                    initial={{ opacity: 0 }}
                    animate={{
                        x: [0, (Math.random() - 0.5) * 150, 0],
                        y: [0, (Math.random() - 0.5) * 150, 0],
                        opacity: [0, 0.8, 0]
                    }}
                    transition={{
                        duration: fly.duration,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: fly.delay
                    }}
                    style={{
                        position: 'absolute',
                        left: `${fly.x}%`,
                        top: `${fly.y}%`,
                        width: fly.size,
                        height: fly.size,
                        borderRadius: '50%',
                        backgroundColor: '#FFD700',
                        boxShadow: '0 0 8px 2px rgba(255, 215, 0, 0.4)',
                        zIndex: 1
                    }}
                />
            ))}

            {/* --- Floating Spells --- */}
            <AnimatePresence>
                {floatingSpells.map(spell => (
                    <motion.div
                        key={spell.id}
                        initial={{ opacity: 0, scale: 0.5, y: 20, filter: 'blur(4px)' }}
                        animate={{ opacity: 0.7, scale: spell.scale, y: -50, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, scale: 1.1, y: -100, filter: 'blur(8px)' }}
                        transition={{ duration: 3.5, ease: "easeOut" }}
                        style={{
                            position: 'absolute',
                            left: `${spell.x}%`,
                            top: `${spell.y}%`,
                            fontFamily: 'Cinzel, serif',
                            fontSize: '1.8rem',
                            color: 'rgba(236, 185, 57, 0.6)',
                            textShadow: '0 0 15px rgba(236, 185, 57, 0.5)',
                            fontStyle: 'italic',
                            fontWeight: 'bold',
                            zIndex: 2,
                            pointerEvents: "none"
                        }}
                    >
                        {spell.text}
                    </motion.div>
                ))}
            </AnimatePresence>

            {/* --- Visible Mist Layers (Enhanced) --- */}
            <motion.div
                animate={{
                    x: ["-25%", "25%"],
                    opacity: [0.3, 0.6, 0.3], // Higher opacity
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                }}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '200%',
                    height: '100%',
                    background: 'radial-gradient(ellipse at center, rgba(160, 160, 180, 0.08) 0%, transparent 70%)', // Distinct color
                    filter: 'blur(80px)',
                    zIndex: 0,
                    pointerEvents: "none"
                }}
            />
            <motion.div
                animate={{
                    x: ["20%", "-20%"],
                    opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                    duration: 35,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                }}
                style={{
                    position: 'absolute',
                    bottom: "-20%",
                    right: 0,
                    width: '200%',
                    height: '100%',
                    background: 'radial-gradient(ellipse at center, rgba(100, 120, 255, 0.05) 0%, transparent 70%)', // Blue-ish mist
                    filter: 'blur(90px)',
                    zIndex: 0,
                    pointerEvents: "none"
                }}
            />
            {/* Added 3rd Mist Layer for density */}
            <motion.div
                animate={{
                    y: ["-10%", "10%"],
                    opacity: [0, 0.3, 0],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                }}
                style={{
                    position: 'absolute',
                    top: '30%',
                    left: '30%',
                    width: '100%',
                    height: '80%',
                    background: 'radial-gradient(circle, rgba(255, 255, 255, 0.04) 0%, transparent 60%)',
                    filter: 'blur(60px)',
                    zIndex: 0,
                    pointerEvents: "none"
                }}
            />

            {/* Fog Overlay (Texture) */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'url("https://raw.githubusercontent.com/daniel-bros/react-parallax-tilt/master/demo/public/img/noise.png")',
                opacity: 0.07, // Slightly bumped
                pointerEvents: 'none',
                zIndex: 3
            }} />
        </div>
    );
};

export default MagicalBackground;

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MagicalBackground = () => {
    const [fireflies, setFireflies] = useState([]);
    const [shootingStars, setShootingStars] = useState([]);

    useEffect(() => {
        // Init Fireflies - reduced from 20 to 8
        const initialFireflies = Array.from({ length: 8 }).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 3 + 1,
            duration: Math.random() * 10 + 15,
            delay: Math.random() * 5
        }));
        setFireflies(initialFireflies);

        // Shooting Star Spawner - reduced frequency
        const shootingStarInterval = setInterval(() => {
            if (Math.random() > 0.7) { // 30% chance every 4s
                const id = Date.now();
                const star = {
                    id,
                    x: Math.random() * 100,
                    y: Math.random() * 40,
                    scale: Math.random() * 0.5 + 0.5
                };
                setShootingStars(prev => [...prev.slice(-2), star]); // Max 3 at a time
                setTimeout(() => {
                    setShootingStars(prev => prev.filter(s => s.id !== id));
                }, 1500);
            }
        }, 4000);

        return () => {
            clearInterval(shootingStarInterval);
        };
    }, []);

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

            {/* Single Stars Layer - CSS animation only, no JS */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: 'radial-gradient(1px 1px at 50% 50%, rgba(255,255,255,0.4) 1px, transparent 0)',
                    backgroundSize: '100px 100px',
                    opacity: 0.5,
                    animation: 'starDrift 60s linear infinite'
                }}
            />

            {/* Shooting Stars */}
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
                            zIndex: 10
                        }}
                    >
                        <div style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%) rotate(135deg) translateX(30px)",
                            width: "60px",
                            height: "2px",
                            background: "linear-gradient(90deg, transparent, white)"
                        }} />
                    </motion.div>
                ))}
            </AnimatePresence>

            {/* Single Ambient Glow */}
            <div
                style={{
                    position: 'absolute',
                    top: '20%',
                    left: '10%',
                    width: '60vw',
                    height: '60vw',
                    background: 'radial-gradient(circle, rgba(212, 175, 55, 0.1) 0%, transparent 70%)',
                    filter: 'blur(60px)',
                    zIndex: 0,
                    animation: 'glowPulse 8s ease-in-out infinite'
                }}
            />

            {/* Fireflies - reduced count */}
            {fireflies.map(fly => (
                <motion.div
                    key={fly.id}
                    initial={{ opacity: 0 }}
                    animate={{
                        x: [0, (Math.random() - 0.5) * 100, 0],
                        y: [0, (Math.random() - 0.5) * 100, 0],
                        opacity: [0, 0.6, 0]
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
                        boxShadow: '0 0 6px 1px rgba(255, 215, 0, 0.3)',
                        zIndex: 1
                    }}
                />
            ))}

            {/* CSS Keyframes */}
            <style>{`
                @keyframes starDrift {
                    from { background-position: 0% 0%; }
                    to { background-position: 100% 100%; }
                }
                @keyframes glowPulse {
                    0%, 100% { opacity: 0.3; transform: scale(1); }
                    50% { opacity: 0.5; transform: scale(1.1); }
                }
            `}</style>
        </div>
    );
};

export default MagicalBackground;

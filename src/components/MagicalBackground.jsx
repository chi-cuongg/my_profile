import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MagicalBackground = () => {
    const [fireflies, setFireflies] = useState([]);
    const [shootingStars, setShootingStars] = useState([]);

    useEffect(() => {
        // Init Fireflies
        const initialFireflies = Array.from({ length: 12 }).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 4 + 2,
            duration: Math.random() * 10 + 12,
            delay: Math.random() * 5
        }));
        setFireflies(initialFireflies);

        // Shooting Star Spawner
        const shootingStarInterval = setInterval(() => {
            if (Math.random() > 0.6) {
                const id = Date.now();
                const star = {
                    id,
                    x: Math.random() * 100,
                    y: Math.random() * 40,
                    scale: Math.random() * 0.5 + 0.5
                };
                setShootingStars(prev => [...prev.slice(-2), star]);
                setTimeout(() => {
                    setShootingStars(prev => prev.filter(s => s.id !== id));
                }, 1500);
            }
        }, 3000);

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
            // Brighter background gradient
            background: 'linear-gradient(to bottom, #0a0a12 0%, #101020 50%, #0a0a12 100%)'
        }}>

            {/* Stars Layer 1 - Bright */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: 'radial-gradient(2px 2px at 50% 50%, rgba(255,255,255,0.8) 1px, transparent 0)',
                    backgroundSize: '120px 120px',
                    opacity: 0.6,
                    animation: 'starDrift 80s linear infinite'
                }}
            />

            {/* Stars Layer 2 - Smaller */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: 'radial-gradient(1px 1px at 30% 70%, rgba(255,255,255,0.6) 1px, transparent 0)',
                    backgroundSize: '80px 80px',
                    opacity: 0.5,
                    animation: 'starDrift2 100s linear infinite'
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
                            width: "3px",
                            height: "3px",
                            background: "white",
                            boxShadow: "0 0 15px 3px rgba(255, 255, 255, 0.9)",
                            zIndex: 10
                        }}
                    >
                        <div style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%) rotate(135deg) translateX(30px)",
                            width: "80px",
                            height: "2px",
                            background: "linear-gradient(90deg, transparent, white)"
                        }} />
                    </motion.div>
                ))}
            </AnimatePresence>

            {/* Golden Ambient Glow - Brighter */}
            <div
                style={{
                    position: 'absolute',
                    top: '10%',
                    left: '5%',
                    width: '70vw',
                    height: '70vw',
                    background: 'radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, transparent 60%)',
                    filter: 'blur(50px)',
                    zIndex: 0,
                    animation: 'glowPulse 6s ease-in-out infinite'
                }}
            />

            {/* Blue Ambient Glow */}
            <div
                style={{
                    position: 'absolute',
                    bottom: '10%',
                    right: '10%',
                    width: '50vw',
                    height: '50vw',
                    background: 'radial-gradient(circle, rgba(30, 60, 120, 0.2) 0%, transparent 60%)',
                    filter: 'blur(60px)',
                    zIndex: 0,
                    animation: 'glowPulse2 8s ease-in-out infinite'
                }}
            />

            {/* Fireflies - Brighter */}
            {fireflies.map(fly => (
                <motion.div
                    key={fly.id}
                    initial={{ opacity: 0 }}
                    animate={{
                        x: [0, (Math.random() - 0.5) * 120, 0],
                        y: [0, (Math.random() - 0.5) * 120, 0],
                        opacity: [0, 0.9, 0]
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
                        boxShadow: '0 0 10px 3px rgba(255, 215, 0, 0.6)',
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
                @keyframes starDrift2 {
                    from { background-position: 100% 0%; }
                    to { background-position: 0% 100%; }
                }
                @keyframes glowPulse {
                    0%, 100% { opacity: 0.4; transform: scale(1); }
                    50% { opacity: 0.7; transform: scale(1.1); }
                }
                @keyframes glowPulse2 {
                    0%, 100% { opacity: 0.3; transform: scale(1.1); }
                    50% { opacity: 0.5; transform: scale(1); }
                }
            `}</style>
        </div>
    );
};

export default MagicalBackground;

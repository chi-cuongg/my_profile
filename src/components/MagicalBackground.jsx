import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MagicalBackground = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [fireflies, setFireflies] = useState([]);
    const [floatingSpells, setFloatingSpells] = useState([]);
    const SPELLS = ["Lumos", "Accio", "Alohomora", "Wingardium Leviosa", "Expecto Patronum", "Revelio"];

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);

        // Init Fireflies
        const initialFireflies = Array.from({ length: 15 }).map((_, i) => ({
            id: i,
            x: Math.random() * 100, // %
            y: Math.random() * 100, // %
            size: Math.random() * 4 + 2,
            duration: Math.random() * 10 + 10
        }));
        setFireflies(initialFireflies);

        // Spell Spawner
        const spellInterval = setInterval(() => {
            if (Math.random() > 0.7) {
                const spell = {
                    id: Date.now(),
                    text: SPELLS[Math.floor(Math.random() * SPELLS.length)],
                    x: Math.random() * 90 + 5,
                    y: Math.random() * 90 + 5,
                    scale: Math.random() * 0.5 + 0.8
                };
                setFloatingSpells(prev => [...prev.slice(-3), spell]); // Keep max 4 spells

                // Cleanup spell
                setTimeout(() => {
                    setFloatingSpells(prev => prev.filter(s => s.id !== spell.id));
                }, 4000);
            }
        }, 3000);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            clearInterval(spellInterval);
        };
    }, []);

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: -1, // Behind everything
            pointerEvents: 'none',
            overflow: 'hidden'
        }}>
            {/* Parallax Stars Layer */}
            <div style={{
                position: 'absolute',
                top: -20, left: -20, right: -20, bottom: -20,
                backgroundImage: 'radial-gradient(1px 1px at 50% 50%, rgba(255,255,255,0.8) 1px, transparent 0)',
                backgroundSize: '100px 100px',
                transform: `translateX(${mousePosition.x * -0.02}px) translateY(${mousePosition.y * -0.02}px)`,
                opacity: 0.3
            }} />
            <div style={{
                position: 'absolute',
                top: -20, left: -20, right: -20, bottom: -20,
                backgroundImage: 'radial-gradient(2px 2px at 20% 80%, rgba(255,255,255,0.6) 1px, transparent 0)',
                backgroundSize: '150px 150px',
                transform: `translateX(${mousePosition.x * -0.05}px) translateY(${mousePosition.y * -0.05}px)`,
                opacity: 0.2
            }} />

            {/* Fireflies */}
            {fireflies.map(fly => (
                <motion.div
                    key={fly.id}
                    animate={{
                        x: [0, (Math.random() - 0.5) * 100, 0],
                        y: [0, (Math.random() - 0.5) * 100, 0],
                        opacity: [0.4, 1, 0.4]
                    }}
                    transition={{
                        duration: fly.duration,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    style={{
                        position: 'absolute',
                        left: `${fly.x}%`,
                        top: `${fly.y}%`,
                        width: fly.size,
                        height: fly.size,
                        borderRadius: '50%',
                        backgroundColor: '#FFD700',
                        boxShadow: '0 0 10px #FFD700'
                    }}
                />
            ))}

            {/* Floating Spells */}
            <AnimatePresence>
                {floatingSpells.map(spell => (
                    <motion.div
                        key={spell.id}
                        initial={{ opacity: 0, scale: 0.5, filter: 'blur(5px)' }}
                        animate={{ opacity: 0.3, scale: spell.scale, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, scale: 1.2, filter: 'blur(10px)' }}
                        transition={{ duration: 4 }}
                        style={{
                            position: 'absolute',
                            left: `${spell.x}%`,
                            top: `${spell.y}%`,
                            fontFamily: 'Cinzel',
                            fontSize: '2rem',
                            color: 'rgba(255, 215, 0, 0.2)',
                            textShadow: '0 0 10px rgba(255, 215, 0, 0.2)',
                            fontStyle: 'italic',
                        }}
                    >
                        {spell.text}
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};

export default MagicalBackground;

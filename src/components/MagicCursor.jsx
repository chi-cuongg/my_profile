import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MagicCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [particles, setParticles] = useState([]);
    const [spells, setSpells] = useState([]);

    const SPELL_COLORS = ['#ff0000', '#00ff00', '#0000ff', '#ffffff', '#9932cc', '#ffd700'];

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });

            // Interactive Element Detection
            const target = e.target;
            const isInteractive = target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button') ||
                target.classList.contains('interactive');
            setIsHovering(!!isInteractive);

            if (Math.random() > 0.6) {
                setParticles(prev => [...prev.slice(-20), {
                    id: Date.now() + Math.random(),
                    x: e.clientX,
                    y: e.clientY,
                    size: Math.random() * 4 + 1,
                    color: Math.random() > 0.5 ? '#FFD700' : '#C0C0C0',
                    life: 1.0
                }]);
            }
        };

        const handleClick = (e) => {
            const spellColor = SPELL_COLORS[Math.floor(Math.random() * SPELL_COLORS.length)];
            const burstId = Date.now();
            const burstParticles = Array.from({ length: 12 }).map((_, i) => ({
                id: burstId + i,
                x: e.clientX,
                y: e.clientY,
                angle: (i / 12) * 360,
                color: spellColor
            }));
            setSpells(prev => [...prev, { id: burstId, particles: burstParticles, color: spellColor }]);
            setTimeout(() => setSpells(prev => prev.filter(s => s.id !== burstId)), 1000);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('click', handleClick);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('click', handleClick);
        };
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setParticles(prev => prev.filter(p => p.id > Date.now() - 1000));
        }, 100);
        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 9999, overflow: 'hidden' }}>
            {/* Flashlight */}
            <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                background: `radial-gradient(${isHovering ? '250px' : '150px'} circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 215, 0, 0.15), rgba(100, 100, 100, 0.05) 50%, transparent 80%)`,
                transition: 'background 0.3s ease'
            }} />

            {/* Runes Ring on Hover */}
            <AnimatePresence>
                {isHovering && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
                        animate={{ opacity: 1, scale: 1, rotate: 360 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.5, ease: "easeOut", rotate: { duration: 4, repeat: Infinity, ease: "linear" } }}
                        style={{
                            position: 'absolute',
                            top: mousePosition.y - 40,
                            left: mousePosition.x - 40,
                            width: '80px',
                            height: '80px',
                            borderRadius: '50%',
                            border: '1px dashed rgba(255, 215, 0, 0.6)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        {/* Simulated Runes Text */}
                        <svg viewBox="0 0 100 100" width="100%" height="100%" style={{ overflow: 'visible' }}>
                            <path id="curve" d="M 10, 50 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" fill="transparent" />
                            <text width="500">
                                <textPath xlinkHref="#curve" fill="#FFD700" style={{ fontSize: '10px', letterSpacing: '5px', fontFamily: 'Cinzel' }}>
                                    ⚡ ᚠ ᚢ ᚦ ᚨ ᚱ ᚲ ᚷ ᚹ ⚡ ᚺ ᚨ ᚷ ᚨ ᛚ
                                </textPath>
                            </text>
                        </svg>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Particles & Spells (Existing logic) */}
            <AnimatePresence>
                {particles.map((p) => (
                    <motion.div key={p.id} initial={{ opacity: 1, x: p.x, y: p.y, scale: 1 }} animate={{ opacity: 0, scale: 0, y: p.y + 20, x: p.x + (Math.random() - 0.5) * 20 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }}
                        style={{ position: 'absolute', width: p.size, height: p.size, backgroundColor: p.color, borderRadius: '50%', boxShadow: `0 0 ${p.size * 2}px ${p.color}` }} />
                ))}
                {spells.map((s) => (
                    <React.Fragment key={s.id}>
                        <motion.div initial={{ x: s.particles[0].x - 10, y: s.particles[0].y - 10, width: 20, height: 20, opacity: 0.8, borderWidth: 4 }}
                            animate={{ width: 300, height: 300, opacity: 0, borderWidth: 0, x: s.particles[0].x - 150, y: s.particles[0].y - 150 }}
                            transition={{ duration: 0.5 }}
                            style={{ position: 'absolute', borderRadius: '50%', borderStyle: 'solid', borderColor: s.color }} />
                        {s.particles.map((p) => (
                            <motion.div key={p.id} initial={{ x: p.x, y: p.y, opacity: 1 }} animate={{ x: p.x + Math.cos(p.angle * Math.PI / 180) * 120, y: p.y + Math.sin(p.angle * Math.PI / 180) * 120, opacity: 0 }}
                                transition={{ duration: 0.6 }} style={{ position: 'absolute', width: '8px', height: '8px', backgroundColor: s.color, borderRadius: '50%', boxShadow: `0 0 10px ${s.color}` }} />
                        ))}
                    </React.Fragment>
                ))}
            </AnimatePresence>

            {/* Wand Tip Core */}
            <div style={{ position: 'absolute', top: mousePosition.y - 2, left: mousePosition.x - 2, width: '4px', height: '4px', background: '#fff', borderRadius: '50%', boxShadow: `0 0 ${isHovering ? '20px' : '10px'} #fff, 0 0 ${isHovering ? '40px' : '20px'} #FFD700` }} />
        </div>
    );
};

export default MagicCursor;

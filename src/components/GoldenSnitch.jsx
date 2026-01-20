import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GoldenSnitch = () => {
    const [position, setPosition] = useState({ x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight });
    const [velocity, setVelocity] = useState({ x: (Math.random() - 0.5) * 15, y: (Math.random() - 0.5) * 15 });
    const [isCaught, setIsCaught] = useState(false);
    const [particles, setParticles] = useState([]);
    const requestRef = useRef();

    // Flight & Physics Logic
    const animate = () => {
        if (!isCaught) {
            setPosition(prev => {
                let newX = prev.x + velocity.x;
                let newY = prev.y + velocity.y;
                let newVx = velocity.x;
                let newVy = velocity.y;

                // Bounce off walls
                if (newX <= 0 || newX >= window.innerWidth - 30) {
                    newVx = -newVx;
                    newX = Math.max(0, Math.min(newX, window.innerWidth - 30));
                }
                if (newY <= 0 || newY >= window.innerHeight - 30) {
                    newVy = -newVy;
                    newY = Math.max(0, Math.min(newY, window.innerHeight - 30));
                }

                // Random jitters
                if (Math.random() < 0.05) {
                    newVx += (Math.random() - 0.5) * 5;
                    newVy += (Math.random() - 0.5) * 5;
                }

                // Speed limit
                const speed = Math.sqrt(newVx * newVx + newVy * newVy);
                const maxSpeed = 15;
                if (speed > maxSpeed) {
                    newVx = (newVx / speed) * maxSpeed;
                    newVy = (newVy / speed) * maxSpeed;
                }

                setVelocity({ x: newVx, y: newVy });
                return { x: newX, y: newY };
            });

            // Add trail particles while flying
            if (Math.random() > 0.3) {
                setParticles(prev => [...prev.slice(-15), {
                    id: Date.now() + Math.random(),
                    x: position.x + 12.5, // Center offset (25px width)
                    y: position.y + 12.5,
                    size: Math.random() * 3 + 1,
                    life: 1.0
                }]);
            }
        }

        requestRef.current = requestAnimationFrame(animate);
    };

    // Main Loop
    useEffect(() => {
        requestRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef.current);
    }, [isCaught, velocity, position]);

    // Draggable Logic (When Caught)
    useEffect(() => {
        if (isCaught) {
            const handlePointerMove = (e) => {
                setPosition({ x: e.clientX - 12.5, y: e.clientY - 12.5 });
            };
            const handlePointerUp = () => {
                setIsCaught(false);
                // Give it a random burst of speed on release
                setVelocity({
                    x: (Math.random() - 0.5) * 20,
                    y: (Math.random() - 0.5) * 20
                });
            };

            window.addEventListener('pointermove', handlePointerMove);
            window.addEventListener('pointerup', handlePointerUp);

            return () => {
                window.removeEventListener('pointermove', handlePointerMove);
                window.removeEventListener('pointerup', handlePointerUp);
            };
        }
    }, [isCaught]);

    // Particle Cleanup
    useEffect(() => {
        const interval = setInterval(() => {
            setParticles(prev => prev.filter(p => p.id > Date.now() - 500));
        }, 100);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            {/* Trail Particles Layer (Rendered separately to avoid z-index issues or sticking to snitch) */}
            <AnimatePresence>
                {particles.map((p) => (
                    <motion.div
                        key={p.id}
                        initial={{ opacity: 0.8, x: p.x, y: p.y, scale: 1 }}
                        animate={{ opacity: 0, scale: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        style={{
                            position: 'fixed',
                            left: 0,
                            top: 0,
                            width: p.size,
                            height: p.size,
                            background: '#FFD700',
                            borderRadius: '50%',
                            pointerEvents: 'none',
                            zIndex: 9997,
                            boxShadow: '0 0 5px #FFD700'
                        }}
                    />
                ))}
            </AnimatePresence>

            {/* The Snitch */}
            <motion.div
                style={{
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    x: position.x,
                    y: position.y,
                    zIndex: 9998,
                    cursor: isCaught ? 'grabbing' : 'grab',
                }}
                onPointerDown={() => setIsCaught(true)}
            >
                <div style={{ position: 'relative', width: '25px', height: '25px' }}>
                    {/* Wings */}
                    <motion.div
                        animate={isCaught ? { rotate: 0 } : { rotate: [0, 60, -20, 40, 0] }}
                        transition={{ duration: 0.08, repeat: Infinity, repeatType: "mirror" }}
                        style={{
                            position: 'absolute',
                            top: '2px',
                            left: '-22px', // Tighter wings
                            width: '28px',
                            height: '10px',
                            background: 'linear-gradient(90deg, rgba(255,255,255,0.9), rgba(200,200,200,0.5))',
                            borderRadius: '50% 0 0 50%',
                            transformOrigin: 'right center',
                            boxShadow: '0 0 8px rgba(255,255,255,0.6)',
                        }}
                    />
                    <motion.div
                        animate={isCaught ? { rotate: 0 } : { rotate: [0, -60, 20, -40, 0] }}
                        transition={{ duration: 0.08, repeat: Infinity, repeatType: "mirror" }}
                        style={{
                            position: 'absolute',
                            top: '2px',
                            right: '-22px',
                            width: '28px',
                            height: '10px',
                            background: 'linear-gradient(-90deg, rgba(255,255,255,0.9), rgba(200,200,200,0.5))',
                            borderRadius: '0 50% 50% 0',
                            transformOrigin: 'left center',
                            boxShadow: '0 0 8px rgba(255,255,255,0.6)',
                        }}
                    />

                    {/* Core Sphere */}
                    <div style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle at 30% 30%, #FFD700, #DAA520, #8B4513)',
                        boxShadow: '0 0 10px rgba(255, 215, 0, 0.8), inset -2px -2px 5px rgba(0,0,0,0.4)',
                        border: '1px solid #B8860B',
                        zIndex: 2,
                        position: 'relative',
                    }}>
                        {/* Detail line */}
                        <div style={{
                            position: 'absolute', top: '20%', left: '10%', width: '80%', height: '60%',
                            borderTop: '1px solid rgba(255,255,255,0.4)', borderRadius: '50%'
                        }} />
                    </div>
                </div>

                {isCaught && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        style={{
                            position: 'absolute',
                            top: -30,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            color: '#FFD700',
                            fontWeight: 'bold',
                            whiteSpace: 'nowrap',
                            textShadow: '0 0 5px #000',
                            fontFamily: 'var(--font-title)',
                            fontSize: '0.8rem',
                            pointerEvents: 'none'
                        }}
                    >
                        Success!
                    </motion.div>
                )}
            </motion.div>
        </>
    );
};

export default GoldenSnitch;

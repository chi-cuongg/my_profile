import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

const GoldenSnitch = () => {
    const [isCaught, setIsCaught] = useState(false);
    const [flyPosition, setFlyPosition] = useState({ x: 200, y: 150 });
    const constraintsRef = useRef(null);

    // Random flight path when not caught
    const flyAnimation = {
        x: [
            flyPosition.x,
            flyPosition.x + 200 + Math.random() * 200,
            flyPosition.x + 100 + Math.random() * 300,
            flyPosition.x + 300 + Math.random() * 200,
            flyPosition.x
        ],
        y: [
            flyPosition.y,
            flyPosition.y + 100 + Math.random() * 100,
            flyPosition.y + 50 + Math.random() * 150,
            flyPosition.y + 150 + Math.random() * 100,
            flyPosition.y
        ],
        transition: {
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
        }
    };

    const handleDragEnd = (event, info) => {
        // Save the release position so the snitch flies around from here
        setFlyPosition({ x: info.point.x - 12, y: info.point.y - 12 });
        setIsCaught(false);
    };

    return (
        <>
            {/* Drag constraints container */}
            <div
                ref={constraintsRef}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    pointerEvents: 'none',
                    zIndex: 9997
                }}
            />

            <motion.div
                style={{
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    zIndex: 9998,
                    cursor: isCaught ? 'grabbing' : 'grab',
                    pointerEvents: 'auto',
                    touchAction: 'none'
                }}
                initial={{ x: flyPosition.x, y: flyPosition.y }}
                animate={isCaught ? undefined : flyAnimation}
                drag
                dragConstraints={constraintsRef}
                dragElastic={0}
                dragMomentum={false}
                onDragStart={() => setIsCaught(true)}
                onDragEnd={handleDragEnd}
                whileDrag={{ scale: 1.2 }}
            >
                <div style={{ position: 'relative', width: '25px', height: '25px' }}>
                    {/* Wings */}
                    <div
                        style={{
                            position: 'absolute',
                            top: '2px',
                            left: '-22px',
                            width: '28px',
                            height: '10px',
                            background: 'linear-gradient(90deg, rgba(255,255,255,0.9), rgba(200,200,200,0.5))',
                            borderRadius: '50% 0 0 50%',
                            transformOrigin: 'right center',
                            boxShadow: '0 0 8px rgba(255,255,255,0.6)',
                            animation: isCaught ? 'none' : 'wingFlap 0.1s infinite alternate'
                        }}
                    />
                    <div
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
                            animation: isCaught ? 'none' : 'wingFlapRight 0.1s infinite alternate'
                        }}
                    />

                    {/* Core Sphere */}
                    <div style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle at 30% 30%, #FFD700, #DAA520, #8B4513)',
                        boxShadow: '0 0 15px rgba(255, 215, 0, 0.9), inset -2px -2px 5px rgba(0,0,0,0.4)',
                        border: '1px solid #B8860B',
                        zIndex: 2,
                        position: 'relative',
                    }}>
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

                <style>{`
                    @keyframes wingFlap {
                        from { transform: rotate(-30deg); }
                        to { transform: rotate(30deg); }
                    }
                    @keyframes wingFlapRight {
                        from { transform: rotate(30deg); }
                        to { transform: rotate(-30deg); }
                    }
                `}</style>
            </motion.div>
        </>
    );
};

export default GoldenSnitch;

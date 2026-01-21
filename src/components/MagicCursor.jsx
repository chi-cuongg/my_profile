import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MagicCursor = () => {
    const cursorRef = useRef(null);
    const flashlightRef = useRef(null);
    const [isHovering, setIsHovering] = useState(false);
    const [clickBurst, setClickBurst] = useState(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            // Update DOM directly via refs - no state updates = no re-renders
            if (cursorRef.current) {
                cursorRef.current.style.left = `${e.clientX - 2}px`;
                cursorRef.current.style.top = `${e.clientY - 2}px`;
            }
            if (flashlightRef.current) {
                flashlightRef.current.style.background = `radial-gradient(150px circle at ${e.clientX}px ${e.clientY}px, rgba(255, 215, 0, 0.12), rgba(100, 100, 100, 0.03) 50%, transparent 80%)`;
            }

            // Check for interactive elements
            const target = e.target;
            const isInteractive = target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button');
            setIsHovering(!!isInteractive);
        };

        const handleClick = (e) => {
            // Simple burst effect on click
            setClickBurst({ x: e.clientX, y: e.clientY, id: Date.now() });
            setTimeout(() => setClickBurst(null), 500);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('click', handleClick);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('click', handleClick);
        };
    }, []);

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 9999, overflow: 'hidden' }}>
            {/* Flashlight - updated via ref, not state */}
            <div
                ref={flashlightRef}
                style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    transition: 'background 0.1s ease'
                }}
            />

            {/* Click Burst Effect */}
            <AnimatePresence>
                {clickBurst && (
                    <motion.div
                        key={clickBurst.id}
                        initial={{ scale: 0, opacity: 0.8 }}
                        animate={{ scale: 3, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        style={{
                            position: 'absolute',
                            left: clickBurst.x - 25,
                            top: clickBurst.y - 25,
                            width: 50,
                            height: 50,
                            borderRadius: '50%',
                            border: '2px solid #FFD700',
                            pointerEvents: 'none'
                        }}
                    />
                )}
            </AnimatePresence>

            {/* Wand Tip Core - updated via ref */}
            <div
                ref={cursorRef}
                style={{
                    position: 'absolute',
                    width: '4px',
                    height: '4px',
                    background: '#fff',
                    borderRadius: '50%',
                    boxShadow: `0 0 ${isHovering ? '20px' : '10px'} #fff, 0 0 ${isHovering ? '40px' : '20px'} #FFD700`,
                    transition: 'box-shadow 0.2s ease'
                }}
            />
        </div>
    );
};

export default MagicCursor;

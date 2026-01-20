import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Footprint = ({ x, y, rotation, delay, side }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 3.5, delay: delay, times: [0, 0.15, 1] }}
            style={{
                position: 'absolute',
                left: x,
                top: y,
                transform: `rotate(${rotation}deg) scaleX(${side === 'left' ? -1 : 1})`, // Mirror for Left foot
                width: '28px',
                height: '42px',
                pointerEvents: 'none',
                zIndex: 2 // Above "ink" layer but below text?
            }}
        >
            {/* Solid Shoe Sole SVG */}
            <svg viewBox="0 0 100 200" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                <path d="M30,20 C10,20 0,60 0,90 C0,130 20,130 20,130 L20,150 C20,180 30,190 50,190 C70,190 80,180 80,150 L80,130 C80,130 100,130 100,90 C100,50 80,20 30,20 Z"
                    fill="#3a2a1a" opacity="0.8" />
            </svg>
        </motion.div>
    );
};

const MarauderFootprints = () => {
    // Walking Logic: Left/Right sequence
    const steps = [
        { side: 'left', x: '5%', y: '10%', r: 150 },
        { side: 'right', x: '10%', y: '12%', r: 150 },
        { side: 'left', x: '6%', y: '20%', r: 160 },
        { side: 'right', x: '11%', y: '22%', r: 160 },
        { side: 'left', x: '8%', y: '30%', r: 140 },
        { side: 'right', x: '13%', y: '32%', r: 140 },

        { side: 'left', x: '20%', y: '38%', r: 120 }, // Turning
        { side: 'right', x: '25%', y: '40%', r: 120 },

        { side: 'left', x: '35%', y: '45%', r: 100 },
        { side: 'right', x: '40%', y: '45%', r: 100 },

        { side: 'left', x: '50%', y: '50%', r: 135 }, // Turning Down
        { side: 'right', x: '55%', y: '52%', r: 135 },

        { side: 'left', x: '52%', y: '62%', r: 160 },
        { side: 'right', x: '57%', y: '64%', r: 160 },

        { side: 'left', x: '55%', y: '75%', r: 170 },
        { side: 'right', x: '60%', y: '77%', r: 170 },

        { side: 'left', x: '65%', y: '85%', r: 130 },
        { side: 'right', x: '70%', y: '87%', r: 130 },
    ];

    return (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
            {steps.map((step, index) => (
                <Footprint
                    key={index}
                    x={step.x}
                    y={step.y}
                    rotation={step.r}
                    side={step.side}
                    delay={index * 1.0} // 1 second per step
                />
            ))}
        </div>
    );
};

export default MarauderFootprints;

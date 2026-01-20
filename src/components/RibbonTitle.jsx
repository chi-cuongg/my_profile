import React from 'react';
import { motion } from 'framer-motion';

const RibbonTitle = ({ text }) => {
    return (
        <div style={{ position: 'relative', width: '100%', maxWidth: '600px', margin: '0 auto 3rem auto', textAlign: 'center', height: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* SVG Background Layer */}
            <motion.svg
                viewBox="0 0 600 140"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1, filter: 'drop-shadow(0px 5px 5px rgba(0,0,0,0.5))' }}
            >
                {/* --- Definitions for Gradients --- */}
                <defs>
                    <linearGradient id="parchmentGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#dcc696" />
                        <stop offset="100%" stopColor="#c2a372" />
                    </linearGradient>
                    <linearGradient id="shadowGrad" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="rgba(0,0,0,0.3)" />
                        <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                </defs>

                {/* --- Back Folds (Darker) --- */}
                {/* Left Back Fold */}
                <path d="M60 40 L160 40 L160 90 L60 110 Z" fill="#8b5e3c" stroke="#3a2a1a" strokeWidth="1" />
                {/* Right Back Fold */}
                <path d="M540 40 L440 40 L440 90 L540 110 Z" fill="#8b5e3c" stroke="#3a2a1a" strokeWidth="1" />

                {/* --- Connecting Folds (Shaded) --- */}
                {/* Left Connector */}
                <path d="M160 40 L180 20 L180 80 L160 90 Z" fill="#5a3a2a" stroke="#3a2a1a" strokeWidth="1" />
                {/* Right Connector */}
                <path d="M440 40 L420 20 L420 80 L440 90 Z" fill="#5a3a1a" stroke="#3a2a1a" strokeWidth="1" />

                {/* --- Main Center Scrolls --- */}
                {/* Left Wing */}
                <path d="M20 50 C20 50, 40 40, 60 40 C120 40, 150 50, 160 40 L160 90 C150 100, 100 120, 60 110 C40 105, 20 120, 20 120 L20 50 Z"
                    fill="url(#parchmentGrad)" stroke="#3a2a1a" strokeWidth="1.5" />

                {/* Right Wing */}
                <path d="M580 50 C580 50, 560 40, 540 40 C480 40, 450 50, 440 40 L440 90 C450 100, 500 120, 540 110 C560 105, 580 120, 580 120 L580 50 Z"
                    fill="url(#parchmentGrad)" stroke="#3a2a1a" strokeWidth="1.5" />

                {/* Center Banner Main Body */}
                <path d="M180 20 L420 20 C420 20, 430 50, 420 80 L180 80 C170 50, 180 20, 180 20 Z"
                    fill="#e6d2b5" stroke="#3a2a1a" strokeWidth="2" />

                {/* Bottom Ribbon Tail (Center) */}
                <path d="M180 80 C240 95, 360 95, 420 80 L420 100 C360 115, 240 115, 180 100 Z"
                    fill="#dcc696" stroke="#3a2a1a" strokeWidth="1.5" />


                {/* Decorative Lines */}
                <path d="M190 30 L410 30" stroke="#3a2a1a" strokeWidth="0.5" />
                <path d="M190 70 L410 70" stroke="#3a2a1a" strokeWidth="0.5" />

            </motion.svg>

            {/* Text Overlay Layer */}
            <h2 style={{
                position: 'absolute',
                zIndex: 100,
                top: '42%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                margin: 0,
                fontFamily: '"Cinzel", serif',
                fontSize: '2.5rem',
                fontWeight: 'bold',
                color: '#2a1a0a',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                textShadow: '0px 1px 1px rgba(255,255,255,0.4)',
                width: '100%',
                pointerEvents: 'none',
                textAlign: 'center'
            }}
            >
                {text}
            </h2>
        </div>
    );
};

export default RibbonTitle;

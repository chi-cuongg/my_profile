import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

const RevealOnScroll = ({ children, width = "fit-content", fullHeight = false }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { margin: "-75px" });
    const mainControls = useAnimation();

    useEffect(() => {
        if (isInView) {
            mainControls.start("visible");
        } else {
            mainControls.start("hidden"); // Animate out when scrolling out
        }
    }, [isInView, mainControls]);

    return (
        <div ref={ref} style={{ position: "relative", width, overflow: "hidden", height: fullHeight ? "100%" : "auto" }}>
            <motion.div
                variants={{
                    hidden: { opacity: 0, y: 50, scale: 0.95, filter: "blur(10px)" },
                    visible: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
                }}
                initial="hidden"
                animate={mainControls}
                transition={{ duration: 0.5, delay: 0.25 }}
                style={{
                    height: fullHeight ? "100%" : "auto",
                    display: fullHeight ? "flex" : "block",
                    flexDirection: fullHeight ? "column" : "initial"
                }}
            >
                {children}
            </motion.div>
        </div>
    );
};

export default RevealOnScroll;

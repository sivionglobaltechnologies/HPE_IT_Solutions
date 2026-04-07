import React from 'react';
import { motion, useScroll, useSpring } from "framer-motion";
const ScrollIndicator = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <>
            {/* Top Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-hpe-cyan to-brand-orange origin-left z-[200]"
                style={{ scaleX }}
            />
        </>
    );
};

export default ScrollIndicator;

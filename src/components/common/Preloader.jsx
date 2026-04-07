import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = ({ onFinish }) => {
    const [isLoading, setIsLoading] = useState(true);
    const videoRef = useRef(null);

    const dismiss = () => {
        setIsLoading(false);
        // Notify parent to finalize state after animation duration
        setTimeout(() => {
            if (onFinish) onFinish();
        }, 800);
    };

    useEffect(() => {
        // Fallback: if video doesn't end within 15 seconds, dismiss preloader anyway
        const fallback = setTimeout(dismiss, 15000);

        // Attempt to play the video (required for some browsers)
        if (videoRef.current) {
            videoRef.current.play().catch(() => {
                // If autoplay is blocked, dismiss after a short delay
                setTimeout(dismiss, 2000);
            });
        }

        return () => clearTimeout(fallback);
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
                    }}
                    className="fixed inset-0 z-[10000] bg-black overflow-hidden"
                >
                    <video
                        ref={videoRef}
                        src="/preloader_video.mp4"
                        autoPlay
                        muted
                        playsInline
                        onEnded={dismiss}
                        className="absolute inset-0 w-full h-full object-contain md:object-cover"
                    />

                    {/* Skip Intro Button */}
                    <motion.button
                        initial={{ opacity: 0, x: 20 }}
                        animate={{
                            opacity: 1,
                            x: 0,
                            backgroundImage: [
                                "linear-gradient(90deg, rgba(0,0,0,0.4) 0%, rgba(40,40,40,0.4) 50%, rgba(0,0,0,0.4) 100%)",
                                "linear-gradient(90deg, rgba(40,40,40,0.4) 0%, rgba(0,0,0,0.4) 50%, rgba(40,40,40,0.4) 100%)",
                                "linear-gradient(90deg, rgba(0,0,0,0.4) 0%, rgba(40,40,40,0.4) 50%, rgba(0,0,0,0.4) 100%)"
                            ]
                        }}
                        transition={{
                            opacity: { delay: 2, duration: 0.5 },
                            x: { delay: 2, duration: 0.5 },
                            backgroundImage: {
                                repeat: Infinity,
                                duration: 3,
                                ease: "linear"
                            }
                        }}
                        onClick={dismiss}
                        className="absolute bottom-20 right-8 z-[1000] px-6 py-2.5 backdrop-blur-md border border-white/20 rounded-sm text-white text-[14px] font-medium transition-all flex items-center gap-2 group overflow-hidden"
                    >
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
                            animate={{ x: ["-100%", "200%"] }}
                            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", delay: 2.5 }}
                        />
                        <span className="relative z-10">Skip Intro</span>
                        <svg className="relative z-10 w-5 h-5 transition-transform group-hover:translate-x-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
                        </svg>
                    </motion.button>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Preloader;

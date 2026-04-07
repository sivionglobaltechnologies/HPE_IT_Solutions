import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToHash = () => {
    const { pathname, hash, key } = useLocation();

    useEffect(() => {
        const scrollToElement = () => {
            if (hash) {
                const id = hash.replace('#', '');
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    return true;
                }
            }
            return false;
        };

        if (hash) {
            // Initial attempt
            const found = scrollToElement();

            // If not found or if layout might shift, retry a few times
            if (!found) {
                let attempts = 0;
                const interval = setInterval(() => {
                    attempts++;
                    const nowFound = scrollToElement();
                    if (nowFound || attempts > 10) {
                        clearInterval(interval);
                    }
                }, 200);
                return () => clearInterval(interval);
            }
        } else {
            // If no hash, scroll to top on page change
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [pathname, hash, key]);

    return null;
};

export default ScrollToHash;

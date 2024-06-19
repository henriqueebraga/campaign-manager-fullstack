import { useState, useEffect } from 'react';

const useScroll = (scrollYThreshold: number) => {
    const [scrolledDown, setScrolledDown] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrolled = window.scrollY > scrollYThreshold;
            setScrolledDown(scrolled);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [scrollYThreshold]);

    return scrolledDown;
};

export default useScroll;

import { useState, useEffect, useRef } from 'react'
function BackToTop() {
    const [fixed, setFixed] = useState(false)

    const targetRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            setFixed(isInViewport(targetRef.current))
        };
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }
    return (
        <div className='flex w-full justify-center' ref={targetRef}>
            <button
                className={`${fixed ? 'fixed z-20 bottom-4' : ''} hover:opacity-80 rounded-full bg-blue-500 dark:bg-white-reddit text-white-reddit dark:text-black-reddit font-bold px-4 py-1 `}
                onClick={scrollToTop}>
                Back to Top
            </button>
        </div>
    );
}

const isInViewport = (element) => {
    const rect = element.getBoundingClientRect();
    return (
        rect.bottom + 48 <= (window.innerHeight || document.documentElement.clientHeight)
    );
};
export default BackToTop;
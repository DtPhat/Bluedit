import { useState, useEffect } from 'react'
function BackToTop() {
    const [visible, setVisible] = useState(false)
    useEffect(() => {
        window.addEventListener('scroll', toggleVisible)
    }, []);
    const toggleVisible = () => {
        if (document.documentElement.scrollTop > 300) {
            setVisible(true)
        } else {
            setVisible(false)
        }
    }
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'auto'
        })
    }
    return (
        <button
            className={`fixed z-10 bottom-2 rounded-full bg-blue-500 dark:bg-white-reddit text-white-reddit dark:text-black-reddit font-bold px-4 py-1 ${visible ? 'block' : 'hidden'}`}
            onClick={scrollToTop}>
            Back to Top
        </button>
    );
}

export default BackToTop;
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
            behavior: 'smooth'
        })
    }
    return (
        <button
            className={`fixed z-10 bottom-2 rounded-full bg-white-reddit text-black-reddit font-semibold px-4 py-1 ${visible ? 'block' : 'none'}`}
            onClick={scrollToTop}
            style={{visibility: visible?'block':'hidden'}}>
            Back to Top
        </button>
    );
}

export default BackToTop;
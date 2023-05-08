import { useState, useEffect, useRef } from 'react'
export default function useExpandableComponent(initialVisibility: boolean) {
    const expandableRef = useRef<HTMLElement>()
    const [expanding, setExpanding] = useState(initialVisibility)
    const rect = expandableRef.current && expandableRef.current.getBoundingClientRect()
    const isOffScreen = rect && (rect.y + rect.height * 4 > window.innerHeight);
    const handleClickOutside = (e: Event): void => {
        if (expandableRef.current && !expandableRef.current.contains(e.target as HTMLElement)) {
            setExpanding(false)
        }
    }
    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);

    return { expandableRef, expanding, setExpanding, isOffScreen }
}

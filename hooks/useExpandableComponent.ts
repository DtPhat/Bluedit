import { useState, useEffect, useRef } from 'react'
export default function useExpandableComponent(initialVisibility: boolean) {
    const expandableRef = useRef<HTMLElement>(null)
    const [expanding, setExpanding] = useState(initialVisibility)
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
    return {expandableRef, expanding, setExpanding}
}

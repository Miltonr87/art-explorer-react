import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function useSparkNavigation(delay: number = 400) {
    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate();

    const triggerSpark = (path: string) => {
        setIsVisible(true);
        setTimeout(() => {
            setIsVisible(false);
            navigate(path);
        }, delay);
    };

    return { isVisible, triggerSpark };
}

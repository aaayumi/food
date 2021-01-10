import React, { useState, useEffect } from 'react';

export const useMobileWindow = () => {
    const [isWindowMobile, setWindowSize] = useState(false);

    const checkWindowSize = () => setWindowSize(window.innerWidth < 768);

    useEffect(() => {
        checkWindowSize();
        window.addEventListener("resize", checkWindowSize);

        return () => window.removeEventListener("resize", checkWindowSize);
    }, [])
    return isWindowMobile;
}
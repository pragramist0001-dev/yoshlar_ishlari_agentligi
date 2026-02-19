import React, { createContext, useContext, useState, useCallback, useRef } from 'react';

interface LoaderContextType {
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
    showLoader: () => void;
    hideLoader: () => void;
}

const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

export const LoaderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isLoading, setIsLoadingState] = useState(false);
    const lastShowTimeRef = useRef<number>(0);
    const MIN_DURATION = 800; // Minimum duration in ms

    const showLoader = useCallback(() => {
        setIsLoadingState(true);
        lastShowTimeRef.current = Date.now();
    }, []);

    const hideLoader = useCallback(() => {
        const timeElapsed = Date.now() - lastShowTimeRef.current;
        const remainingTime = Math.max(0, MIN_DURATION - timeElapsed);

        setTimeout(() => {
            setIsLoadingState(false);
        }, remainingTime);
    }, []);

    const setIsLoading = useCallback((loading: boolean) => {
        if (loading) showLoader();
        else hideLoader();
    }, [showLoader, hideLoader]);

    return (
        <LoaderContext.Provider value={{ isLoading, setIsLoading, showLoader, hideLoader }}>
            {children}
        </LoaderContext.Provider>
    );
};

export const useLoader = () => {
    const context = useContext(LoaderContext);
    if (!context) {
        throw new Error('useLoader must be used within a LoaderProvider');
    }
    return context;
};

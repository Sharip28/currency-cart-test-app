import * as React from "react";

 export const useDebounce = (fn:any, delay = 1000) => {
    const timeoutRef = React.useRef<any>(null);
    const debounceFn = (...args:any) => {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            fn(...args);
        }, delay);
    };

    return debounceFn;
};
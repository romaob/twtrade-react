import {useState, useEffect, useCallback} from 'react';

type useDebounceValueResult<T> = {
    debouncedValue: T;
};

export interface useDebounceValueProps<T> {
    value: T;
    delay: number;
}

export default function useDebounceValue<T>({
    value,
    delay,
}: useDebounceValueProps<T>): useDebounceValueResult<T> {
    const [debouncedValue, setDebouncedValue] = useState(value);

    const debounce = useCallback(
        (value: T) => {
            const timer = setTimeout(() => {
                setDebouncedValue(value);
            }, delay);

            return () => {
                clearTimeout(timer);
            };
        },
        [delay],
    );

    useEffect(() => {
        return debounce(value);
    }, [value, debounce]);

    return {
        debouncedValue,
    };
}
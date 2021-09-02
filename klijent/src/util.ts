import React from "react";


export function setFormState<T>(setState: ((val: T) => void)) {
    return function (e: any) {
        const value = e.currentTarget.value;
        setState(value);
    }
}
export function onRowClick<T>(setState: React.Dispatch<React.SetStateAction<T | undefined>>) {
    return function (value: T) {
        setState(prev => {
            if (prev === value) {
                return undefined;
            }
            return value;
        })
    }
}
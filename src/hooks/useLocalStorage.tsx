import React,{ useEffect, useState } from 'react'


const PREFIX = 'codepen-clone-';
export default function useLocalStorage<T>(key: string, initialValue: T | (() => T)): [T, React.Dispatch<React.SetStateAction<T>>]{

    const prefixkey= PREFIX+key
    const [value, setValue] =useState(()=>{
        const jsonValue = localStorage.getItem(prefixkey);    
        if (jsonValue != null) {
            try {
              return JSON.parse(jsonValue);
            } catch (e) {
              console.error("Error parsing localStorage value", e);
              return initialValue instanceof Function ? initialValue() : initialValue;
            }
          } 
        if (typeof initialValue === 'function') {
            return (initialValue as () => T)();
        }else{
            return initialValue
        }
    })

    useEffect(()=>{
        localStorage.setItem(prefixkey, JSON.stringify(value));
    },[prefixkey, value])
    return [value,setValue]
}
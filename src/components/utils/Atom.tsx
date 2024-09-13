import { atom } from 'jotai';

const defaultLanguage = parseInt(localStorage.getItem('language') || '0', 10) 

export const languageAtom = atom<number>(defaultLanguage);
// export const languageAtom = atom<number>(0);
export const timerDuration = atom<number>(100);
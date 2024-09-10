import { atom } from 'jotai';

// Create an atom (global state)
export const languageAtom = atom<number>(0);
export const timerDuration = atom<number>(100);
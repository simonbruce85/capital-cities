export interface Country {
    name: {
      common: string;
    };
    capital: string[];
  }
  
  export interface Option {
    id: number;
    city: string;
  }
  
  export const getRandomInt = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  
  export const getRandomElements = <T>(arr: T[], count: number): T[] => {
    const shuffled = arr.slice().sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };
  
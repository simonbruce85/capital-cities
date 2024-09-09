import React, { useCallback, useState } from 'react';
import { Country, Option, getRandomInt, getRandomElements } from '../../util';
import styles from './GameByCountry.module.css';
import { CapitalQuizProps } from '../../util';
import FinalScore from '../finalScore/FinalScore';
import { useAtom } from 'jotai';
import {languageAtom} from "../utils/Atom"

const GameByCountry: React.FC<CapitalQuizProps> = ({ countries, questions }) => {
    const [currentCountry, setCurrentCountry] = useState<Country | null>(null);
    const [options, setOptions] = useState<Option[]>([]);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [count, setCount] = useState<number>(0);
    const [disabled, setDisabled] = useState<boolean>(false);
    const [hasSelected, setHasSelected] = useState<boolean>(false);
    const [remainingCountries, setRemainingCountries] = useState<Country[]>(countries)
    const [isComplete, setIsComplete] = useState<boolean>(false)
    const totalCountries: number = countries.length
    const [language] = useAtom(languageAtom);



    const initializeQuiz = useCallback(() => {
        if (totalCountries-remainingCountries.length<questions ){
            const allCountries = countries.flatMap(country => country.name.common[language]);
            const correctCountry = remainingCountries[getRandomInt(0, remainingCountries.length - 1)];
    
            // Get 5 incorrect capitals
            const incorrectCountries = getRandomElements(allCountries.filter(c => c !== correctCountry.name.common[language]), 5);
            const allOptions = [...incorrectCountries, correctCountry.name.common[language]].map((countryName, index) => ({
                id: index,
                city: countryName
            }));
    
            setOptions(getRandomElements(allOptions, allOptions.length));
            setCurrentCountry(correctCountry);
            setSelectedOption(null);
            setIsCorrect(null);
            setHasSelected(false)
        }else{
            setIsComplete(true)
        }
    }, [countries,remainingCountries,language]);


    const handleOptionClick = (option: Option) => {
        setHasSelected(true)
        setSelectedOption(option.id);
        setIsCorrect(option.city === currentCountry?.name.common[language]);
        if (option.city === currentCountry?.name.common[language]) {
            setCount(count + 1)
        }
        setDisabled(true)
        setTimeout(() => {
            setDisabled(false)
            setRemainingCountries(prevCountries => prevCountries.filter(item => item.name.common[language] !== currentCountry?.name.common[language]));
        }, 1000)
    };

    // Initialize the quiz when the component mounts
    React.useEffect(() => {
        initializeQuiz();
    }, [initializeQuiz]);

    if (!currentCountry) return null;

    const styleSelector = (option: Option) => {
        if (hasSelected) {
            if (option.city === currentCountry.name.common[language]) {
                return `${styles.correct}`
            }
        }

        if (selectedOption === option.id) {
            if (isCorrect) {
                return `${styles.correct}`
            } else {
                return `${styles.incorrect}`
            }
        } else {
            return `${styles.blackDefault}`
        }
    }

    return (
        <>
        {!isComplete?(
        <div className={styles.container}>
            <div className={styles.scoreContainer}>
                <div className={styles.scoreWrapper}>
                    <div style={{ display: "flex" }}>
                        <p style={{ width: "100%", marginLeft: "5px", marginRight: "5px" }}>Score:</p>
                        <p >{count}</p>
                    </div>
                    <div>
                        {totalCountries - remainingCountries.length+1}/{questions}
                    </div>
                    <div onClick={()=>{window.location.reload()}} style={{ marginLeft: "5px", marginRight: "5px" }}>
                        Restart
                    </div>
                </div>
            </div>
            <div className={styles.titleContainer}>
                <div className={styles.titleWrapper}>
                    <img style={{ height: "120px", width: "200px" }} src={currentCountry.flags.svg}></img>
                </div>
            </div>
            <div className={styles.optionsContainer}>
                {options.map(option => (
                    <div className={styles.optionItem} key={`${currentCountry.name.common}-${option.city}`}>
                        <button
                            disabled={disabled}
                            className={`${styleSelector(option)} ${styles.button}`}
                            onClick={() => handleOptionClick(option)}
                        >
                            {option.city}
                        </button>
                    </div>
                ))}
            </div>
        </div>):<FinalScore score={count}/>}
        </>
    );
};

export default GameByCountry
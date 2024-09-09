import React, { useCallback, useState, useEffect } from 'react';
import { Country, Option, getRandomInt, getRandomElements } from '../../util';
import styles from './GameByCountry.module.css';
import FinalScore from '../finalScore/FinalScore';
import { CapitalQuizProps } from '../../util';
import { useAtom } from 'jotai';
import { languageAtom } from '../utils/Atom';

const GameByCountry: React.FC<CapitalQuizProps> = ({ countries, questions }) => {
    const [currentCountry, setCurrentCountry] = useState<Country | null>(null);
    const [options, setOptions] = useState<Option[]>([]);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [hasSelected, setHasSelected] = useState<boolean>(false);
    const [count, setCount] = useState<number>(0);
    const [disabled, setDisabled] = useState<boolean>(false);
    const [remainingCountries, setRemainingCountries] = useState<Country[]>(countries);
    const [isComplete, setIsComplete] = useState<boolean>(false);
    const totalCountries: number = countries.length;
    const [language] = useAtom(languageAtom);


    const initializeQuiz = useCallback(() => {
        if (totalCountries - remainingCountries.length < questions) {
            const allCapitals = countries.flatMap(country => country.capital[language]);
            const randomCountry = remainingCountries[getRandomInt(0, remainingCountries.length - 1)];
            const correctCapital = randomCountry.capital[language];

            const incorrectCapitals = getRandomElements(allCapitals.filter(c => c !== correctCapital), 5);
            const allOptions = [...incorrectCapitals, correctCapital].map((city, index) => ({
                id: index,
                city
            }));

            setOptions(getRandomElements(allOptions, allOptions.length));
            setCurrentCountry(randomCountry);
            setSelectedOption(null);
            setIsCorrect(null);
            setHasSelected(false);
        } else {
            setIsComplete(true);
        }
    }, [countries, remainingCountries, language]);

    const handleOptionClick = (option: Option, event: React.MouseEvent<HTMLButtonElement>) => {
        setHasSelected(true);
        setSelectedOption(option.id);
        setIsCorrect(option.city === currentCountry?.capital[language]);

        if (option.city === currentCountry?.capital[language]) {
            setCount(count + 1);
        }

        setDisabled(true);
        setTimeout(() => {
            setDisabled(false);
            setRemainingCountries(prevCountries =>
                prevCountries.filter(item => item.capital[language] !== currentCountry?.capital[language])
            );
        }, 1000);
    };

    useEffect(() => {
        initializeQuiz();
    }, [initializeQuiz]);

    if (!currentCountry) return null;

    const styleSelector = (option: Option) => {
        if (hasSelected) {
            if (option.city === currentCountry.capital[language]) {
                return `${styles.correct}`;
            }
        }

        if (selectedOption === option.id) {
            if (isCorrect) {
                return `${styles.correct}`;
            } else {
                return `${styles.incorrect}`;
            }
        } else {
            return `${styles.blackDefault}`;
        }
    };

    return (
        <>
            {!isComplete ? (
                <div className={styles.container}>
                    <div className={styles.scoreContainer}>
                        <div className={styles.scoreWrapper}>
                            <div style={{ display: "flex" }}>
                                <p style={{ width: "100%", marginLeft: "5px", marginRight: "5px" }}>Score:</p>
                                <p>{count}</p>
                            </div>
                            <div>
                                {totalCountries - remainingCountries.length + 1}/{questions}
                            </div>
                            <div onClick={() => { window.location.reload(); }} style={{ marginLeft: "5px", marginRight: "5px" }}>
                                Restart
                            </div>
                        </div>
                    </div>
                    <div className={styles.titleContainer}>
                        <div className={styles.titleWrapper}>
                            <h2 className={styles.title}>{currentCountry.name.common[language]}</h2>
                        </div>
                    </div>
                    <div className={styles.optionsContainer}>
                        {options.map(option => (
                            <div className={styles.optionItem} key={`${currentCountry.name.common}-${option.city}`}>
                                <button
                                    disabled={disabled}
                                    className={`${styleSelector(option)} ${styles.button}`}
                                    onClick={(e) => handleOptionClick(option,e)}
                                >
                                    {option.city}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <FinalScore score={count} />
            )}
        </>
    );
};

export default GameByCountry;

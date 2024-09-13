import React, { useCallback, useState, useEffect } from 'react';
import { Country, getRandomInt } from '../../util';
import styles from './GameByCountry.module.css';
import FinalScore from '../finalScore/FinalScore';
import { CapitalQuizProps } from '../../util';
import { languageAtom } from '../utils/Atom';
import { useAtom } from 'jotai';

const StudyCards: React.FC<CapitalQuizProps> = ({ countries, questions }) => {
    const [currentCountry, setCurrentCountry] = useState<Country | null>(null);
    const [correctCapitalOption, setCorrectCapitalOption] = useState<string>("");
    const [disabled, setDisabled] = useState<boolean>(false);
    const [remainingCountries, setRemainingCountries] = useState<Country[]>(countries);
    const [isComplete, setIsComplete] = useState<boolean>(false);
    const totalCountries: number = countries.length;
    const [hasSelected, setHasSelected] = useState<boolean>(false);

    const [language] = useAtom(languageAtom);

    const initializeQuiz = useCallback(() => {
        if (totalCountries - remainingCountries.length < questions) {
            const randomCountry = remainingCountries[getRandomInt(0, remainingCountries.length - 1)];
            const correctCapital = randomCountry.capital[language];

            setCorrectCapitalOption(correctCapital)
            setCurrentCountry(randomCountry);
        } else {
            setIsComplete(true);
        }
    }, [countries, remainingCountries, language]);

    const handleOptionClick = () => {
        setDisabled(true);
        setHasSelected(true)
        setTimeout(() => {
            setDisabled(false);
            setHasSelected(false)
            setRemainingCountries(prevCountries =>
                prevCountries.filter(item => item.capital[language] !== currentCountry?.capital[language])
            );
        }, 2000);
    };

    useEffect(() => {
        initializeQuiz();
    }, [initializeQuiz]);

    if (!currentCountry) return null;

    return (
        <>
            {!isComplete ? (
                <div className={styles.container}>
                    <div className={styles.scoreContainer}>
                        <div className={styles.scoreWrapper}>
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
                    <div className={styles.onlyOneOptionContainer}>
                            <div className={styles.optionItem} key={`${currentCountry.name.common}-${correctCapitalOption}`}>
                                <button
                                    disabled={disabled}
                                    className={`${styles.button}`}
                                    onClick={() => handleOptionClick()}
                                >
                                    <span className={`${hasSelected?styles.revealed:styles.hidden}`} >
                                    {correctCapitalOption}
                                    </span>
                                </button>
                            </div>
                    </div>
                </div>
            ) : (
                <FinalScore score={(questions != countries.length) ? 100:100} total={(questions != countries.length) ? (questions*1000):questions} />
            )}
        </>
    );
};

export default StudyCards;

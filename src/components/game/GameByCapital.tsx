import React, { useCallback, useState } from 'react';
import { Country, Option, getRandomInt, getRandomElements } from '../../util';
import styles from './GameByCountry.module.css';



interface CapitalQuizProps {
    countries: Country[];
}

const GameByCapital: React.FC<CapitalQuizProps> = ({ countries }) => {
    const [currentCountry, setCurrentCountry] = useState<Country | null>(null);
    const [options, setOptions] = useState<Option[]>([]);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [count, setCount] = useState<number>(0);
    const [disabled, setDisabled] = useState<boolean>(false);
    const [hasSelected, setHasSelected] = useState<boolean>(false);



    // Function to get random country and options
    const initializeQuiz = useCallback(() => {
        const allCountries = countries.flatMap(country => country.name.common);
        const correctCountry = countries[getRandomInt(0, countries.length - 1)];

        // Get 5 incorrect capitals
        const incorrectCountries = getRandomElements(allCountries.filter(c => c !== correctCountry.name.common), 5);
        const allOptions = [...incorrectCountries, correctCountry.name.common].map((countryName, index) => ({
            id: index,
            city: countryName
        }));

        setOptions(getRandomElements(allOptions, allOptions.length));
        setCurrentCountry(correctCountry);
        setSelectedOption(null);
        setIsCorrect(null);
        setHasSelected(false)
    }, [countries]);

    const handleOptionClick = (option: Option) => {
        setHasSelected(true)
        setSelectedOption(option.id);
        setIsCorrect(option.city === currentCountry?.name.common);
        if (option.city === currentCountry?.name.common) {
            setCount(count + 1)
        }
        setDisabled(true)
        setTimeout(() => {
            initializeQuiz();
            setDisabled(false)
        }, 1000);
    };

    // Initialize the quiz when the component mounts
    React.useEffect(() => {
        initializeQuiz();
    }, [initializeQuiz]);

    if (!currentCountry) return null;

    const styleSelector = (option: Option) => {
        if (hasSelected) {
            if (option.city === currentCountry.name.common) {
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
        <div className={styles.container}>
            <div className={styles.scoreContainer}>
                <div className={styles.scoreWrapper}>
                    <div style={{ display: "flex" }}>
                        <p style={{ width: "100%", marginLeft: "5px", marginRight: "5px" }}>Score:</p>
                        <p >{count}</p>
                    </div>
                    <div onClick={()=>{window.location.reload()}} style={{ marginLeft: "5px", marginRight: "5px" }}>
                        Restart
                    </div>
                </div>
            </div>
            <div className={styles.titleContainer}>
                <div className={styles.titleWrapper}>
                    <h2 className={styles.title}>{currentCountry.capital}</h2>
                </div>
            </div>
            <div className={styles.optionsContainer}>
                {options.map(option => (
                    <div className={styles.optionItem} key={option.id}>
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
        </div>
    );
};

export default GameByCapital
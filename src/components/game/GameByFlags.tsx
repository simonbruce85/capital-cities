import React, { useCallback, useState } from 'react';
import { Country, Option, getRandomInt, getRandomElements } from '../../util';
import styles from './GameByCountry.module.css';



interface CapitalQuizProps {
    countries: Country[];
}

const GameByCountry: React.FC<CapitalQuizProps> = ({ countries }) => {
    const [currentCountry, setCurrentCountry] = useState<Country | null>(null);
    const [options, setOptions] = useState<Option[]>([]);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [count, setCount] = useState<number>(0);
    const [disabled, setDisabled] = useState<boolean>(false);


    // Function to get random country and options
    const initializeQuiz = useCallback(() => {
        const allCountries = countries.flatMap(country => country.name.common);
        const randomCountry = countries[getRandomInt(0, countries.length - 1)];

        // Get 5 incorrect capitals
        const incorrectCapitals = getRandomElements(allCountries.filter(c => c !== randomCountry.name.common), 5);
        const allOptions = [...incorrectCapitals, randomCountry.name.common].map((city, index) => ({
            id: index,
            city
        }));

        setOptions(getRandomElements(allOptions, allOptions.length));
        setCurrentCountry(randomCountry);
        setSelectedOption(null);
        setIsCorrect(null);
    }, [countries]);

    const handleOptionClick = (option: Option) => {
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

    return (
        <div className={styles.container}>
            <div className={styles.scoreContainer}>
                <div className={styles.scoreWrapper}>
                    <div style={{ display: "flex"}}>
                        <p style={{ width: "100%", marginLeft: "5px", marginRight:"5px"}}>Score:</p>
                        <p >{count}</p>
                    </div>
                    <div style={{marginLeft: "5px", marginRight:"5px"}}>
                        Restart
                    </div>
                </div>
            </div>
            <div className={styles.titleContainer}>
                <div className={styles.titleWrapper}>
                    <img style={{height:"120px",width:"200px"}} src={currentCountry.flags.svg}></img>
                </div>
            </div>
            <div className={styles.optionsContainer}>
                {options.map(option => (
                    <div className={styles.optionItem} key={option.id}>
                        <button
                        disabled={disabled}
                            className={`${styles.button} ${selectedOption === option.id
                                ? (isCorrect ? styles.correct : styles.incorrect)
                                : styles.blackDefault}`}
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

export default GameByCountry
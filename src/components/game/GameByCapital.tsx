import React, { useState } from 'react';

// Define the types
interface Option {
  id: number;
  city: string;
}

interface CapitalQuizProps {
  country: string;
  correctCapital: string;
  options: Option[];
}

const GameByCapital: React.FC<CapitalQuizProps> = ({ country, correctCapital, options }) => {
  // State to track the selected option
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option.id);
    setIsCorrect(option.city === correctCapital);
  };

  return (
    <div>
      <h2>What is the capital city of {country}?</h2>
      <ul>
        {options.map(option => (
          <li key={option.id}>
            <button
              style={{ 
                backgroundColor: selectedOption === option.id 
                  ? (isCorrect ? 'lightgreen' : 'lightcoral') 
                  : '' 
              }}
              onClick={() => handleOptionClick(option)}
            >
              {option.city}
            </button>
          </li>
        ))}
      </ul>
      {isCorrect !== null && (
        <div>
          {isCorrect ? <p>Correct!</p> : <p>Incorrect. Try again.</p>}
        </div>
      )}
    </div>
  );
};

export default GameByCapital;
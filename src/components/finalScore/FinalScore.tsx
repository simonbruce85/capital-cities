import React from 'react';
import styles from './FinalScore.module.css';

interface FinalScoreProps {
    score: number;
}

const FinalScore: React.FC<FinalScoreProps> = ({ score }) => {
    return (
        <div className={styles.finalScoreContainer}>
            <div className={styles.finalScoreWrapper}>
                <h1>Final Score</h1>
                <p className={styles.score}>{score}</p>
            </div>
        </div>
    );
};

export default FinalScore;

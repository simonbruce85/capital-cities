import React from 'react';
import styles from './FinalScore.module.css';
import ShareScore from '../utils/ShareScore';

interface FinalScoreProps {
    score: number;
    total:number;
}

const FinalScore: React.FC<FinalScoreProps> = ({ score, total }) => {
    return (
        <div className={styles.finalScoreContainer}>
            <div className={styles.finalScoreWrapper}>
                <h1>Final Score</h1>
                <p className={styles.score}>{score}</p>
                <ShareScore score={score} total={total}/>
            </div>
        </div>
    );
};

export default FinalScore;

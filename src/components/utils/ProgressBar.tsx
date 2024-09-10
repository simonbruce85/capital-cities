import React, { useEffect } from 'react';
import './ProgressBar.css'; // Optional for styling
import { useAtom } from 'jotai';
import { timerDuration } from './Atom';

const ProgressBar: React.FC = () => {
  const [progress, setProgress] = useAtom(timerDuration); // Start at 100%

  useEffect(() => {
    const duration = 10000; // 10 seconds in milliseconds
    const interval = 100; // Update interval in milliseconds
    const decrementPerInterval = 100 / (duration / interval); // Calculate how much to decrease each interval

    const timer = setInterval(() => {
      setProgress(prev => Math.max(prev - decrementPerInterval, 0)); // Ensure it doesn't go below 0
    }, interval);

    return () => clearInterval(timer); // Cleanup on component unmount
  }, []);

  return (
    <div className="progress-container">
      <div
        className="progress-bar"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;

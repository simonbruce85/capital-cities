import React, { useState } from 'react';

interface Props {
  score: number;
  total: number;
}

const ShareScore: React.FC<Props> = ({ score, total }) => {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    const formattedScore = `🎉 I scored ${score} out of ${total}! 🏆 \n https://geoquizgame.netlify.app/`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(formattedScore)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch((err) => {
          console.error('Failed to copy text: ', err);
          fallbackCopyText(formattedScore); // Use fallback if copy fails
        });
    } else {
      fallbackCopyText(formattedScore); // Fallback for older browsers
    }
  };

  // Fallback function for older browsers
  const fallbackCopyText = (text: string) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    textArea.setSelectionRange(0, 99999); // For mobile devices
    document.execCommand('copy');
    document.body.removeChild(textArea);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <div className="start-button" onClick={handleShare}>
        Share Score
      </div>
      {copied && <p style={{color:'white'}}>Score copied to clipboard! 🎉</p>}
    </div>
  );
};

export default ShareScore;


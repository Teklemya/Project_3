import { useState } from 'react';
import PropTypes from 'prop-types';
import ReactCardFlip from 'react-card-flip';
import MedCard from '../MedCards/Medcard.jsx' // Import the array of card pairs

const Flashcard = ({ question, answer }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
      {/* Front side (medicine) */}
      <div 
        onClick={handleClick} 
        className="card front" 
        style={{ 
          border: '1px solid #ccc', 
          padding: '20px', 
          textAlign: 'center',
          cursor: 'pointer'
        }}
      >
        <h2>{question}</h2>
        <p>Click to see the use</p>
      </div>

      {/* Back side (use) */}
      <div 
        onClick={handleClick} 
        className="card back" 
        style={{ 
          border: '1px solid #ccc', 
          padding: '20px', 
          textAlign: 'center',
          cursor: 'pointer'
        }}
      >
        <h2>{answer}</h2>
        <p>Click to go back</p>
      </div>
    </ReactCardFlip>
  );
};

const FlashcardDeck = () => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
      {MedCard.map((pair, index) => (
        <Flashcard key={index} question={pair.question} answer={pair.answer} />
      ))}
    </div>
  );
};
Flashcard.propTypes = {
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
};

export default FlashcardDeck;


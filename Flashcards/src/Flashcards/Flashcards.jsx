import { useState } from 'react';
import PropTypes from 'prop-types';
import ReactCardFlip from 'react-card-flip';
import Medcardpair from '../MedCards/Medcard.jsx' // Import the array of card pairs

const Flashcard = ({ question, answer, handleNextCard }) => {
  Flashcard.propTypes = {
    question: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
    handleNextCard: PropTypes.func.isRequired,
  };
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div>
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
      <button 
        onClick={() => {
          setIsFlipped(false); 
          handleNextCard();
        }} 
        style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }}
      >
        Next Card
      </button>
    </div>
  );
};

const FlashcardDeck = () => {
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [usedIndices, setUsedIndices] = useState([]);
  
    const getNextCardIndex = () => {
      if (usedIndices.length === Medcardpair.length) {
        // Reset if all cards have been used
        setUsedIndices([]);
      }
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * Medcardpair.length);
      } while (usedIndices.includes(randomIndex)); // Ensure it's a new random index
  
      setUsedIndices([...usedIndices, randomIndex]);
      return randomIndex;
    };
  
    const handleNextCard = () => {
      const nextIndex = getNextCardIndex();
      setCurrentCardIndex(nextIndex);
    };
  
    const currentCard = Medcardpair[currentCardIndex];
  
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Flashcard 
          question={currentCard.question} 
          answer={currentCard.answer} 
          handleNextCard={handleNextCard} 
        />
      </div>
    );
  };
  
  export default FlashcardDeck;
  

